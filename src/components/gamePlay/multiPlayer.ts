import ModalWindow from "../modalWindow";
import router from "../../modules/router";
import User from "../../modules/user";
import API from "../../modules/api";
import Ball from "./ball/ball";

export default class MultiPlayer {
    parent: Element;
    private foodCanvas: Element;
    private score: Element;
    private balls: Map<number, Ball>;
    private food: Map<number, Ball>;
    private mouseCoordinates: { x: number; y: number };
    private userBackgroundImage: HTMLImageElement;
    private currentUserID: number;
    private socket: WebSocket;
    private modalWindow: ModalWindow;
    private timeouts: any;
    private gameEnded: boolean;

    constructor(parent) {
        this.parent = parent;
    }

    start = () => {
        document.addEventListener("keydown", this._modalWindowHandler);

        window.addEventListener("pushstate", this._onPageChange);
        this.foodCanvas = document.querySelector(".foodCanvas");
        this.score = document.querySelector(".gameScore__number");

        this.balls = new Map();
        this.food = new Map();

        this.mouseCoordinates = {
            x: 0,
            y: 0,
        };

        const user = User.getCurrentUser();
        if (user) {
            if (user.avatar_path) {
                const backgroundImage = new Image();
                backgroundImage.src = user.avatar_path;
                this.userBackgroundImage = backgroundImage;
            }
            this.currentUserID = user.id;
        }

        this.socket = API.openGameWebSocket();
        this.socket.onopen = () => {
            console.log("[open] Соединение установлено");
            console.log("Отправляем данные на сервер");
            this.socket.send(`{"type" : "start"}`);
        };

        this.socket.onmessage = this._messageHandler;

        this.socket.onclose = (event) => {
            if (event.wasClean) {
                console.log(`[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`);
            } else {
                console.log('[close] Соединение прервано');
            }
        };

        this.socket.onerror = (error) => {
            console.log(`[error] ${error.message}`);
        };

        this.modalWindow = new ModalWindow(document.body);

        //window.addEventListener("resize", this._onWindowResize);

        this.timeouts = [];
    };

    _messageHandler = event => {
        const data = JSON.parse(event.data);
        switch (data.type) {
            case "start" : {
                data.foods.forEach(element => {
                    this.food.set(element.id, {
                        id: element.id,
                        x: element.position.x,
                        y: element.position.y,
                        status: 1,
                        color:
                            "#" +
                            (0x1000000 + Math.random() * 0xffffff)
                                .toString(16)
                                .substr(1, 6),
                    });
                });

                this._drawFood();

                if (data && data.players) {
                    data.players.forEach(player => {
                        const ball = new Ball(
                            player.user_id,
                            player.position.x,
                            player.position.y,
                            player.size / 2,
                            "yellow",
                        );

                        if(ball.id === this.currentUserID) {
                            ball.backgroundImage = this.userBackgroundImage;
                        }

                        API.getAvatarById(player.user_id).then(user => {
                            if (user.avatar_path) {
                                const backgroundImage = new Image();
                                backgroundImage.src = user.avatar_path;
                                const currentBall = this.balls.get(player.user_id);
                                if(currentBall) {
                                    currentBall.backgroundImage = backgroundImage;
                                } else {
                                    ball.backgroundImage = backgroundImage;
                                }
                            }
                        });

                        if(!this.balls.get(player.user_id)) {
                            this.balls.set(player.user_id, ball);
                        }
                    });
                }
                document.addEventListener("mousemove", this._handleMouseMove);

                requestAnimationFrame(this._redrawAllBalls);
                break;
            }
            case "move": {
                const ballToMove = this.balls.get(data.player.id);

                ballToMove.easingTargetX = data.player.x;
                ballToMove.easingTargetY = data.player.y;
                if(data.player.size / 2 - ballToMove.radius > 0) {
                    this._scoreIncrement(ballToMove);
                }
                ballToMove.radius = data.player.size / 2;
                this._moveBall(ballToMove);

                if (data.eatenFood.length > 0) {
                    data.eatenFood.forEach(id => {
                        this.food.get(id).status = 0;
                        this._drawFood();
                    });
                }
                break;
            }
            case "new_player": {
                const player = data.player;
                const ball = new Ball(
                    player.user_id,
                    player.position.x,
                    player.position.y,
                    player.size / 2,
                    "yellow",
                );

                if(ball.id === this.currentUserID) {
                    ball.backgroundImage = this.userBackgroundImage;
                }

                API.getAvatarById(player.user_id).then(user => {
                    if (user.avatar_path) {
                        const backgroundImage = new Image();
                        backgroundImage.src = user.avatar_path;
                        const currentBall = this.balls.get(player.user_id);
                        if(currentBall) {
                            currentBall.backgroundImage = backgroundImage;
                        } else {
                            ball.backgroundImage = backgroundImage;
                        }
                    }
                });

                if(!this.balls.get(player.user_id)) {
                    this.balls.set(player.user_id, ball);
                }
                break;
            }
            case "new_food": {
                data.food.forEach(element => {
                    this.food.set(element.id, {
                        id: element.id,
                        x: element.position.x,
                        y: element.position.y,
                        status: 1,
                        color:
                            "#" +
                            (0x1000000 + Math.random() * 0xffffff)
                                .toString(16)
                                .substr(1, 6),
                    });
                });

                this._drawFood();

                break;
            }
            case "stop": {
                console.log(data.user_id);
                console.log(this.currentUserID);
                if(data.user_id === this.currentUserID){
                    console.log("все");
                    this.modalWindow.start(
                        "Вы проиграли. Хотите сыграть еще раз?",
                        this._playAgain,
                        () => {
                            this.exit();
                        }
                    );
                }
                this.balls.get(data.user_id).delete();
                this.balls.delete(data.user_id);
            }
        }
    };

    _onWindowResize = () => {
        this.balls.get(this.currentUserID).canvas.width = window.innerWidth;
        this.balls.get(this.currentUserID).canvas.height = window.innerHeight;
        this.foodCanvas.width = window.innerWidth;
        this.foodCanvas.height = window.innerHeight;
    };

    _handleMouseMove = event => {
        this._countAndSendSpeed(event.clientX, event.clientY);
        this._countAndSendDirection(event.clientX, event.clientY);

        this.mouseCoordinates.x = event.clientX;
        this.mouseCoordinates.y = event.clientY;
    };

    _countAndSendSpeed = (x, y) => {
        const dis = Math.sqrt( Math.pow(x - this.balls.get(this.currentUserID).x, 2) + Math.pow(y - this.balls.get(this.currentUserID).y,2) );
        const diagonal = Math.sqrt(Math.pow(window.innerHeight, 2) + Math.pow(window.innerWidth, 2));
        const speed = Math.floor(Math.sqrt(dis / diagonal * 100)) * 10;

        this.socket.send(`{"type":"speed", "speed":${speed}}`);
    };

    _countAndSendDirection = (x, y) => {
        const dis = Math.sqrt( Math.pow(x - this.balls.get(this.currentUserID).x, 2) + Math.pow(y - this.balls.get(this.currentUserID).y,2) );
        let angle = 180 - Math.round(Math.acos((y - this.balls.get(this.currentUserID).y) / dis) / Math.PI * 180);

        if ((x - this.balls.get(this.currentUserID).x > 0 && y - this.balls.get(this.currentUserID).y < 0) || (x - this.balls.get(this.currentUserID).x > 0 && y - this.balls.get(this.currentUserID).y > 0)) {
            angle = 180 + (180 - angle);
        }

        this.socket.send(`{"type":"direction", "direction":${360 - angle}}`);
    };

    _moveBall = ball => {
        if (
            ball.easingTargetX === ball.x + ball.radius &&
            ball.easingTargetY === ball.y + ball.radius
        ) {
            return;
        }

        ball.x += (ball.easingTargetX - ball.x) * ball.easing;
        ball.y += (ball.easingTargetY - ball.y) * ball.easing;

        if(ball.id === this.currentUserID) {
            if (ball.x > this.mouseCoordinates.x - ball.radius &&
                ball.x < this.mouseCoordinates.x + ball.radius &&
                ball.y > this.mouseCoordinates.y - ball.radius &&
                ball.y < this.mouseCoordinates.y + ball.radius) {
                this.socket.send(`{"type":"speed", "speed":0}`);
            } else {
                this._countAndSendSpeed(this.mouseCoordinates.x, this.mouseCoordinates.y);
                this.timeouts.push(setTimeout(() => this._moveBall(ball), 100));
            }
        } else {
            this.timeouts.push(setTimeout(() => this._moveBall(ball), 100));
        }
    };

    _drawFood = () => {
        const ctx = this.foodCanvas.getContext("2d");
        ctx.clearRect(0, 0, this.foodCanvas.width, this.foodCanvas.height);

        this.food.forEach(foodElement => {
            if (foodElement.status === 1) {
                ctx.beginPath();
                ctx.arc(foodElement.x, foodElement.y, 5, 0, Math.PI * 2, false);
                ctx.fillStyle = foodElement.color;
                ctx.fill();
                ctx.closePath();
            }
        });
    };

    _redrawAllBalls = () => {
        if (this.balls) {
            this.balls.forEach(ball => {
                ball.draw();
            });
        }
        requestAnimationFrame(() => {
            if(!this.gameEnded) {
                this._redrawAllBalls();
            }
        });
    };

    _scoreIncrement = ball => {
        if(ball.id === this.currentUserID) {
            this.score.innerText = parseInt(this.score.innerText) + 1;
        }
    };

    _end = () => {
        this.socket.close(1000, "endGame");

        document.removeEventListener("mousemove", this._handleMouseMove);
        window.removeEventListener("resize", this._onWindowResize);
        if (this.timeouts) {
            this.timeouts.forEach(timer => {
                clearTimeout(timer);
            });
        }
        if (this.food) {
            delete this.food;
        }
    };

    _pause = () => {
        document.removeEventListener("mousemove", this._handleMouseMove);
    };

    _resume = () => {
        document.addEventListener("mousemove", this._handleMouseMove);
    };

    exit = () => {
        this.gameEnded = true;
        this._end();

        document.body.style.background = null;

        window.history.pushState(
            {},
            document.querySelector("title").innerText,
            "/"
        );
        router.renderPage();
    };

    _playAgain = () => {
        this.modalWindow.close();
        this._end();
        this.start();
    };

    _onPageChange = () => {
        document.removeEventListener("keydown", this._modalWindowHandler);
        window.removeEventListener("popstate", this._onPageChange);
    };

    _modalWindowHandler = event => {
        if (event.key === "Escape" || event.keyCode === 27) {
            document.removeEventListener("keydown", this._modalWindowHandler);
            this._pause();
            this.modalWindow.start("Покинуть игру?", this.exit, () => {
                this.modalWindow.close();
                document.addEventListener("keydown", this._modalWindowHandler);
                this._resume();
            });
        }
    };
}
