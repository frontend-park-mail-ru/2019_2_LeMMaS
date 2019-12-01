import ModalWindow from "components/modalWindow";
import router from "modules/router";
import User from "modules/user";
import Food from "./food/food";

import "./style.css";

export default class Singleplayer {
    constructor(parent) {
        this.parent = parent;
    }

    start = () => {
        document.addEventListener("keydown", this._escapeKeyHandler);
        document
            .querySelector(".game__finish-button")
            .addEventListener("click", this._modalWindowHandler);

        window.addEventListener("pushstate", this._onPageChange);

        this.foodCanvas = document.querySelector(".foodCanvas");
        this.score = document.querySelector(".gameScore__number");
        this.ball = {
            x: 0,
            y: 0,
            radius: 40,
            strokeStyle: "rgba(0, 0, 255, 0.5)",
            color: "green",
            easing: 0.01 * 2,
            alive: true,
            canvas: document.querySelector(".ballCanvas"),
        };

        this.ball.x = this.ball.canvas.width / 2;
        this.ball.y = this.ball.canvas.height / 2;

        const user = User.getCurrentUser();
        if (user) {
            if (user.avatar_path) {
                const backgroundImage = new Image();
                backgroundImage.src = user.avatar_path;
                this.ball.backgroundImage = backgroundImage;
            }
        }
        this.enemies = [];
        this.modalWindow = new ModalWindow(document.body);

        for (let count = 0; count < 3; count++) {
            const canvas = document.createElement("canvas");
            canvas.className = "enemyCanvas";
            canvas.width = window.innerWidth * 2;
            canvas.height = window.innerHeight * 2;
            this.parent.appendChild(canvas);

            this.enemies[count] = {
                x: (Math.random() * window.innerWidth) / 2,
                y: (Math.random() * window.innerHeight) / 2,
                radius: 40,
                color: "#ffff00",
                dx: 2,
                dy: -1,
                easing: 1,
                alive: true,
                canvas: canvas,
            };
        }

        this.easingTargetX = 0;
        this.easingTargetY = 0;

        this.food = new Food(this.foodCanvas);

        for (let count = 0; count < 100; count++) {
            this.food.add(
                count,
                Math.round(Math.random() * window.innerWidth * 2),
                Math.round(Math.random() * window.innerHeight * 2)
            );
        }

        window.addEventListener("resize", this._onWindowResize);

        this.food.draw();
        requestAnimationFrame(this._redrawAllBalls);

        this.timeouts = [];

        document.addEventListener("mousemove", this._handleMouseMove);
    };

    _onWindowResize = () => {
        this.ball.canvas.width = window.innerWidth * 2;
        this.ball.canvas.height = window.innerHeight * 2;
        this.foodCanvas.width = window.innerWidth * 2;
        this.foodCanvas.height = window.innerHeight * 2;
        this.enemies.forEach(enemy => {
            enemy.canvas.height = window.innerHeight * 2;
            enemy.canvas.width = window.innerWidth * 2;
        });
    };

    _handleMouseMove = event => {
        this.easingTargetX = event.clientX * 2;
        this.easingTargetY = event.clientY * 2;
        this._moveMyBall();
    };

    _moveMyBall = () => {
        if (
            this.easingTargetX === this.ball.x + this.ball.radius &&
            this.easingTargetY === this.ball.y + this.ball.radius
        ) {
            return;
        }

        this.ball.x += (this.easingTargetX - this.ball.x) * this.ball.easing;
        this.ball.y += (this.easingTargetY - this.ball.y) * this.ball.easing;

        this.timeouts.push(setTimeout(() => this._moveMyBall(), 100));
    };

    _detectFoodEating = ball => {
        this.food.getFood().forEach(foodElement => {
            if (
                ball.x > foodElement.x - ball.radius &&
                ball.x < foodElement.x + ball.radius &&
                ball.y > foodElement.y - ball.radius &&
                ball.y < foodElement.y + ball.radius
            ) {
                this.food.delete(foodElement.id);
                this.food.draw();
                this._scoreIncrement(ball);
            }
        });
    };

    _redrawAllBalls = () => {
        if (!this.enemies.length) {
            this._end();
            document.removeEventListener("keydown", this._modalWindowHandler);
            this.modalWindow.start(
                "Вы выиграли! Хотите сыграть еще раз?",
                this._playAgain,
                () => {
                    this.exit();
                }
            );
            return;
        }

        this._drawOneBall(this.ball);
        this.enemies.forEach(enemy => {
            this._drawOneBall(enemy, enemy.canvas);
            if (
                enemy.x + enemy.dx > enemy.canvas.width - enemy.radius ||
                enemy.x + enemy.dx < enemy.radius
            ) {
                enemy.dx = -enemy.dx;
            }
            if (
                enemy.y + enemy.dy > enemy.canvas.height - enemy.radius ||
                enemy.y + enemy.dy < enemy.radius
            ) {
                enemy.dy = -enemy.dy;
            }

            enemy.x += enemy.dx * 2;
            enemy.y += enemy.dy * 2;
        });

        this.enemies.forEach(enemy => {
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

        requestAnimationFrame(() => {
            if (!this.gameEnded) {
                this._redrawAllBalls();
            }
        });
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
        document.removeEventListener("mousemove", this._handleMouseMove);
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
                enemy.dx = 0;
                enemy.dy = 0;
            });
            this.enemies.length = 0;
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

    _escapeKeyHandler = event => {
        if (event.key === "Escape" || event.keyCode === 27) {
            this._modalWindowHandler();
        }
    };

    _modalWindowHandler = () => {
        document.removeEventListener("keydown", this._escapeKeyHandler);
        this._pause();
        this.modalWindow.start("Покинуть игру?", this.exit, () => {
            this.modalWindow.close();
            document.addEventListener("keydown", this._escapeKeyHandler);
            this._resume();
        });
    };
}