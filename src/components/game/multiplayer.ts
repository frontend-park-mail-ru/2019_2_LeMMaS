import ModalWindow from "components/modalWindow";
import { GameLeaderboard } from "components/leaderboard";
import router from "modules/router";
import User from "modules/user";
import API from "modules/api";
import Ball from "./ball/ball";
import Food from "./food/food";
import { koeff } from "./resolution";

import "./style.css";

export default class Multiplayer {
    private parent: Element;
    private balls: Map<number, Ball>;
    private food: Food;
    private mouseCoordinates: { x: number; y: number };
    private userBackgroundImage: HTMLImageElement;
    private currentUserID: number;
    private socket: WebSocket;
    private modalWindow: ModalWindow;
    private timeouts: any;
    private gameEnded: boolean;
    private leaderBoard: GameLeaderboard;
    private prevSpeed: number;
    private prevDirection: number;

    constructor(parent) {
        this.parent = parent;
    }

    public start = (): void => {
        document.addEventListener("keydown", this._escapeKeyHandler);
        document
            .querySelector(".game__finish-button")
            .addEventListener("click", this._modalWindowHandler);

        window.addEventListener("pushstate", this._onPageChange);

        this.balls = new Map<number, Ball>();
        this.food = new Food(document.querySelector(".foodCanvas"));

        this.mouseCoordinates = {
            x: 0,
            y: 0,
        };

        this.prevSpeed = 0;

        const user = User.getCurrentUser();
        if (user) {
            if (user.avatar_path) {
                const backgroundImage: HTMLImageElement = new Image();
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

        this.socket.onclose = (event: CloseEvent) => {
            if (event.wasClean) {
                console.log(
                    `[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`
                );
            } else {
                this._end();
                console.log("[close] Соединение прервано");
            }
        };

        this.socket.onerror = (error: ErrorEvent) => {
            console.log(`[error] ${error.message}`);
        };

        this.modalWindow = new ModalWindow(document.body);

        //window.addEventListener("resize", this._onWindowResize);

        this.timeouts = [];

        const leaderboardWrapper = document.querySelector(
            ".leaderboard-wrapper"
        );
        this.leaderBoard = new GameLeaderboard(leaderboardWrapper);
    };

    private _messageHandler = (event: MessageEvent) => {
        const data = JSON.parse(event.data);
        switch (data.type) {
            case "start": {
                data.food.forEach(element => {
                    this.food.add(
                        element.id,
                        element.position.x,
                        element.position.y
                    );
                });

                this.food.draw();

                if (data && data.players) {
                    data.players.forEach(player => {
                        API.getUserInfoById(player.user_id).then(user => {
                            if (user.name) {
                                this.leaderBoard.addPlayer(
                                    user.name,
                                    user.id,
                                    this.currentUserID === user.id,
                                    player.size
                                );
                            }
                        });

                        const ball: Ball = new Ball(
                            player.user_id,
                            player.position.x,
                            player.position.y,
                            player.size / 2,
                            "yellow"
                        );

                        if (!this.balls.get(player.user_id)) {
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
                ballToMove.setTarget(
                    data.player.x * koeff,
                    data.player.y * koeff
                );

                if ((data.player.size / 2) * koeff - ballToMove.radius > 0) {
                    this.leaderBoard.update(data.player.id, data.player.size);
                }
                ballToMove.radius = (data.player.size / 2) * koeff;
                this._moveBall(ballToMove);

                if (data.eatenFood.length > 0) {
                    data.eatenFood.forEach(id => {
                        this.food.delete(id);
                    });
                }
                this.food.draw();

                break;
            }
            case "new_player": {
                const player = data.player;
                API.getUserInfoById(player.user_id).then(user => {
                    if (user.name) {
                        this.leaderBoard.addPlayer(
                            user.name,
                            user.id,
                            this.currentUserID === user.id,
                            player.size
                        );
                    }
                });

                const ball = new Ball(
                    player.user_id,
                    player.position.x,
                    player.position.y,
                    player.size / 2,
                    "yellow"
                );

                if (ball.getId() === this.currentUserID) {
                    ball.backgroundImage = this.userBackgroundImage;
                }

                API.getUserInfoById(player.user_id).then(user => {
                    if (user.avatar_path) {
                        const backgroundImage = new Image();
                        backgroundImage.src = user.avatar_path;
                        const currentBall = this.balls.get(player.user_id);
                        if (currentBall) {
                            currentBall.backgroundImage = backgroundImage;
                        } else {
                            ball.backgroundImage = backgroundImage;
                        }
                    }
                });

                if (!this.balls.get(player.user_id)) {
                    this.balls.set(player.user_id, ball);
                }
                break;
            }
            case "new_food": {
                data.food.forEach(element => {
                    this.food.add(
                        element.id,
                        element.position.x,
                        element.position.y
                    );
                });

                this.food.draw();

                break;
            }
            case "stop": {
                this.leaderBoard.removePlayer(data.user_id);
                if (data.user_id === this.currentUserID) {
                    this._pause();
                    this.modalWindow.start(
                        "Вы проиграли. Хотите сыграть еще раз?",
                        this._playAgain,
                        this._exit,
                        null
                    );
                }
                this.balls.get(data.user_id).delete();
                this.balls.delete(data.user_id);
            }
        }
    };

    private _onWindowResize = () => {
        /*this.balls.get(this.currentUserID).canvas.width = window.innerWidth;
        this.balls.get(this.currentUserID).canvas.height = window.innerHeight;*/
    };

    private _handleMouseMove = event => {
        this._countAndSendSpeed(event.clientX * koeff, event.clientY * koeff);
        this._countAndSendDirection(
            event.clientX * koeff,
            event.clientY * koeff
        );

        this.mouseCoordinates.x = event.clientX * koeff;
        this.mouseCoordinates.y = event.clientY * koeff;
    };

    private _countAndSendSpeed = (x, y) => {
        const dis = Math.sqrt(
            Math.pow(x - this.balls.get(this.currentUserID).x, 2) +
                Math.pow(y - this.balls.get(this.currentUserID).y, 2)
        );
        const diagonal = Math.sqrt(
            Math.pow(window.innerHeight * koeff, 2) +
                Math.pow(window.innerWidth * koeff, 2)
        );
        const speed = Math.floor((dis / diagonal) * 100);
        if (this.prevSpeed !== speed) {
            this.prevSpeed = speed;
            this.socket.send(`{"type":"speed", "speed":${speed}}`);
        }
    };

    private _countAndSendDirection = (x, y) => {
        const dis = Math.sqrt(
            Math.pow(x - this.balls.get(this.currentUserID).x, 2) +
                Math.pow(y - this.balls.get(this.currentUserID).y, 2)
        );
        let angle =
            180 -
            Math.round(
                (Math.acos((y - this.balls.get(this.currentUserID).y) / dis) /
                    Math.PI) *
                    180
            );

        if (
            (x - this.balls.get(this.currentUserID).x > 0 &&
                y - this.balls.get(this.currentUserID).y < 0) ||
            (x - this.balls.get(this.currentUserID).x > 0 &&
                y - this.balls.get(this.currentUserID).y > 0)
        ) {
            angle = 180 + (180 - angle);
        }
        if (this.prevDirection !== angle) {
            this.prevDirection = angle;
            this.socket.send(
                `{"type":"direction", "direction":${360 - angle}}`
            );
        }
    };

    private _moveBall = ball => {
        if (
            ball.easingTargetX === ball.x + ball.radius &&
            ball.easingTargetY === ball.y + ball.radius
        ) {
            return;
        }

        ball.x += (ball.easingTargetX - ball.x) * ball.easing;
        ball.y += (ball.easingTargetY - ball.y) * ball.easing;

        if (ball.id === this.currentUserID) {
            if (
                ball.x > this.mouseCoordinates.x - ball.radius &&
                ball.x < this.mouseCoordinates.x + ball.radius &&
                ball.y > this.mouseCoordinates.y - ball.radius &&
                ball.y < this.mouseCoordinates.y + ball.radius
            ) {
                this.socket.send(`{"type":"speed", "speed":0}`);
            } else {
                this._countAndSendSpeed(
                    this.mouseCoordinates.x,
                    this.mouseCoordinates.y
                );
                this.timeouts.push(setTimeout(() => this._moveBall(ball), 100));
            }
        } else {
            this.timeouts.push(setTimeout(() => this._moveBall(ball), 100));
        }
    };

    private _redrawAllBalls = () => {
        if (this.balls) {
            this.balls.forEach(ball => {
                ball.draw();
            });
        }
        requestAnimationFrame(() => {
            if (!this.gameEnded) {
                this._redrawAllBalls();
            }
        });
    };

    private _end = () => {
        this.socket.close(1000, "endGame");
        document.removeEventListener("keydown", this._escapeKeyHandler);
        document
            .querySelector(".game__finish-button")
            .removeEventListener("click", this._modalWindowHandler);

        document.removeEventListener("mousemove", this._handleMouseMove);
        window.removeEventListener("resize", this._onWindowResize);
        if (this.timeouts) {
            this.timeouts.forEach(timer => {
                clearTimeout(timer);
            });
        }
    };

    private _pause = () => {
        document.removeEventListener("mousemove", this._handleMouseMove);
    };

    private _resume = () => {
        document.addEventListener("mousemove", this._handleMouseMove);
    };

    private _exit = () => {
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

    private _playAgain = () => {
        this.modalWindow.close();
        this._end();
        this.start();
    };

    private _onPageChange = () => {
        document.removeEventListener("keydown", this._escapeKeyHandler);
        window.removeEventListener("popstate", this._onPageChange);
    };

    private _escapeKeyHandler = event => {
        if (event.key === "Escape" || event.keyCode === 27) {
            this._modalWindowHandler();
        }
    };

    private _modalWindowHandler = () => {
        document.removeEventListener("keydown", this._escapeKeyHandler);
        this._pause();
        this.modalWindow.start(
            "Покинуть игру?",
            () => {
                this.modalWindow.close();
                this._exit();
            },
            () => {
                this.modalWindow.close();
                document.addEventListener("keydown", this._escapeKeyHandler);
                this._resume();
            }
        );
    };
}
