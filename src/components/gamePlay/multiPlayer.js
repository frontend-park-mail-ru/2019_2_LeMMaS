import ModalWindow from "../modalWindow";
import router from "../../modules/router";
import User from "../../modules/user";
import Ball from "./ball/ball";

export default class MultiPlayer {
    constructor(parent) {
        this.parent = parent;
    }

    start = () => {
        document.addEventListener("keydown", this._modalWindowHandler);

        window.addEventListener("pushstate", this._onPageChange);
        this.foodCanvas = document.querySelector(".foodCanvas");
        this.score = document.querySelector(".gameScore__number");

        this.balls = new Map();

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

        this.socket = new WebSocket("ws://95.163.212.121/api/v1/private/game");
        this.socket.onopen = () => {
            console.log("[open] Соединение установлено");
            console.log("Отправляем данные на сервер");
            this.socket.send(`{"type" : "start"}`);
        };

        this.socket.onmessage = event =>  {
           // console.log(`[message] Данные получены с сервера: ${event.data}`);
            const data = JSON.parse(event.data);

            if(data.type === "start") {
                this.food = [];
                data.foods.forEach(element => {
                    this.food.push({
                        id: element.id,
                        x: element.x,
                        y: element.y,
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
                        const ballCanvas = document.createElement("canvas");
                        const ball = new Ball(
                            player.id,
                            player.x,
                            player.y,
                            "yellow",
                            ballCanvas);
                        ballCanvas.width =  window.innerWidth;
                        ballCanvas.height =  window.innerHeight;
                        ballCanvas.classList.add("id_" + player.id, "ballCanvas");

                        document.querySelector(".game__wrapper").appendChild(ballCanvas);
                        if(ball.id === this.currentUserID) {
                            ball.backgroundImage = this.userBackgroundImage;
                        }

                        this.balls.set(player.id, ball);
                       //console.log(this.balls.get(player.id));

                    });
                }

                requestAnimationFrame(this._redrawAllBalls);
            }
            if(data.type === "move") {
                // console.log(this.ball.x + ' ' + data.player.x);
                const ballToMove = this.balls.get(data.player.id);
                ballToMove.easingTargetX = data.player.x;
                ballToMove.easingTargetY = data.player.y;
                this._moveBall(ballToMove);
            }
        };

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


       /*

        this.ball.x = this.ball.canvas.width / 2;
        this.ball.y = this.ball.canvas.height / 2;
*/


        this.modalWindow = new ModalWindow(document.body);

        /*
        this.enemies = [];

        for (let count = 0; count < 3; count++) {
            const canvas = document.createElement("canvas");
            canvas.className = "enemyCanvas";
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            this.parent.appendChild(canvas);

            this.enemies[count] = {
                x: (Math.random() * window.innerWidth) / 2,
                y: (Math.random() * window.innerHeight) / 2,
                radius: 20,
                color: "#ffff00",
                dx: 2,
                dy: -1,
                easing: 1,
                alive: true,
                canvas: canvas,
            };
        }
*/


        //window.addEventListener("resize", this._onWindowResize);


        this.timeouts = [];

        document.addEventListener("mousemove", this._handleMouseMove);
    };

    _onWindowResize = () => {
        this.balls.get(this.currentUserID).canvas.width = window.innerWidth;
        this.balls.get(this.currentUserID).canvas.height = window.innerHeight;
        this.foodCanvas.width = window.innerWidth;
        this.foodCanvas.height = window.innerHeight;
        this.enemies.forEach(enemy => {
            enemy.canvas.height = window.innerHeight;
            enemy.canvas.width = window.innerWidth;
        });
    };

    _handleMouseMove = event => {
        const dis = Math.sqrt( Math.pow(event.clientX - this.balls.get(this.currentUserID).x, 2) + Math.pow(event.clientY - this.balls.get(this.currentUserID).y,2) );

        let angle = 180 - Math.round(Math.acos((event.clientY - this.balls.get(this.currentUserID).y) / dis) / Math.PI * 180);

        if ((event.clientX - this.balls.get(this.currentUserID).x > 0 && event.clientY - this.balls.get(this.currentUserID).y < 0) || (event.clientX - this.balls.get(this.currentUserID).x > 0 && event.clientY - this.balls.get(this.currentUserID).y > 0)) {
            angle = 180 + (180 - angle);
        }
        /*
        this.easingTargetX = event.clientX;
        this.easingTargetY = event.clientY;
           */

       // console.log(360 - angle);
        this.socket.send(`{"type":"direction", "direction":${360 - angle}}`);
        this.socket.send(`{"type":"speed", "speed":100}`);

        this.mouseCoordinates.x = event.clientX;
        this.mouseCoordinates.y = event.clientY;
      //  console.log(`x: ${event.clientX}, y: ${event.clientY}`);

        /*const directionRadians = angle * Math.PI / 180;
        const distance = 100;
        const deltaX = distance * Math.sin(directionRadians);
        const deltaY = -distance * Math.cos(directionRadians);*/

       // this._moveMyBall();
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
                ball.y < this.mouseCoordinates.y + ball.radius ) {
                this.socket.send(`{"type":"direction", "direction":0}`);
                this.socket.send(`{"type":"speed", "speed":0}`);
            }
        }

        this.timeouts.push(setTimeout(() => this._moveBall(ball), 100));
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

    _detectFoodEating = ball =>
        this.food ? this.food.forEach(foodElement => {
            if (
                ball.x > foodElement.x - ball.radius &&
                ball.x < foodElement.x + ball.radius &&
                ball.y > foodElement.y - ball.radius &&
                ball.y < foodElement.y + ball.radius
            ) {
                if (foodElement.status === 1) {
                    foodElement.status = 0;
                    this._drawFood();
                    this._scoreIncrement(ball);
                }
            }
        }) : {};

    _redrawAllBalls = () => {

        //this._drawOneBall(this.ball);

        if (this.balls) {
            this.balls.forEach(ball => {
                this._drawOneBall(ball);
               /* if (
                    ball.x + ball.dx > ball.canvas.width - ball.radius ||
                    ball.x + ball.dx < ball.radius
                ) {
                    ball.dx = -ball.dx;
                }
                if (
                    ball.y + ball.dy > ball.canvas.height - ball.radius ||
                    ball.y + ball.dy < ball.radius
                ) {
                    ball.dy = -ball.dy;
                }

                ball.x += ball.dx;
                ball.y += ball.dy;*/
            });
        }
            /*this.enemies.forEach(enemy => {
                const eatenBall = this._detectBallEating(enemy, this.ball);
                if (eatenBall === this.ball) {
                    document.removeEventListener(
                        "keydown",
                        this._modalWindowHandler
                    );
                    this.modalWindow.start(
                        "Вы проиграли. Хотите сыграть еще раз?",
                        this._playAgain,
                        () => {
                            this.exit();
                        }
                    );
                }
                if (eatenBall === enemy) {
                    this.parent.removeChild(enemy.canvas);
                    this.enemies.splice(this.enemies.indexOf(enemy), 1);
                }
            });

            this.enemies.forEach(enemy1 =>
                this.enemies.forEach(enemy2 => {
                    if (enemy1 !== enemy2) {
                        const eatenBall = this._detectBallEating(enemy1, enemy2);
                        if (eatenBall === enemy1) {
                            this.parent.removeChild(enemy1.canvas);
                            this.enemies.splice(this.enemies.indexOf(enemy1), 1);
                        }
                        if (eatenBall === enemy2) {
                            this.parent.removeChild(enemy2.canvas);
                            this.enemies.splice(this.enemies.indexOf(enemy2), 1);
                        }
                    }
                })
            );
        }*/
        requestAnimationFrame(this._redrawAllBalls);
    };

    _detectBallEating = (ball1, ball2) => {
        if (!ball1.alive || !ball2.alive) {
            return;
        }

        let small = ball1,
            large = ball1;
        if (ball1.radius === ball2.radius) {
            return;
        } else if (ball1.radius < ball2.radius) {
            large = ball2;
        } else {
            small = ball2;
        }

        if (
            small.x + small.radius < large.x + large.radius &&
            small.x - small.radius > large.x - large.radius &&
            small.y + small.radius < large.y + large.radius &&
            small.y - small.radius > large.y - large.radius
        ) {
            small.alive = false;

            large.radius += small.radius;
            if (large === this.ball) {
                this.score.innerText =
                    parseInt(this.score.innerText) + small.radius;
            }
            return small;
        }
    };

    _drawOneBall = ball => {
        const ballCtx = ball.canvas.getContext("2d");
        ballCtx.restore();
        ballCtx.save();
        ballCtx.clearRect(0, 0, ball.canvas.width, ball.canvas.height);
        if (!ball.alive) {
            return;
        }
        ballCtx.beginPath();
        ballCtx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, false);
        ballCtx.clip();
        if (ball.backgroundImage) {
            ballCtx.fillStyle = "white";
            ballCtx.fill();
            ballCtx.drawImage(
                ball.backgroundImage,
                ball.x - ball.radius,
                ball.y - ball.radius,
                ball.radius * 2,
                ball.radius * 2
            );
        } else {
            ballCtx.fillStyle = ball.color;
            ballCtx.fill();
        }
        ballCtx.strokeStyle = ball.strokeStyle;
        ballCtx.lineWidth = 2;
        ballCtx.stroke();

        this._detectFoodEating(ball);
    };

    _scoreIncrement = ball => {
        ball.radius++;
        ball.canvas.style.zIndex++;
        ball.easing /= 1.06;
        if (ball === this.ball) {
            this.score.innerText = parseInt(this.score.innerText) + 1;
        }
    };

    _end = () => {
        document.removeEventListener("mousedown", this._handleMouseMove);
        window.removeEventListener("resize", this._onWindowResize);
        if (this.timeouts) {
            this.timeouts.forEach(timer => {
                clearTimeout(timer);
            });
        }
        if (this.ball) {
            delete this.ball;
        }
        if (this.enemies) {
            this.enemies.forEach(enemy => {
                this.parent.removeChild(enemy.canvas);
            });
            delete this.enemies;
        }
        if (this.food) {
            delete this.food;
        }
    };

    _pause = () => {
        document.removeEventListener("mousedown", this._handleMouseMove);
    };

    _resume = () => {
        document.addEventListener("mousedown", this._handleMouseMove);
    };

    exit = () => {
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
