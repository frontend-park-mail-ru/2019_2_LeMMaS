import ModalWindow from "../components/modalWindow";
import router from "../modules/router";

export default class GamePlay {
    constructor(parent) {
        this.parent = parent;
    }

    start = () => {
        document.addEventListener('keydown', this.modalWindowHandler);

        window.addEventListener('pushstate', this.onPageChange);

        this.foodCanvas = document.querySelector(".foodCanvas");
        this.score = document.querySelector(".gameScore__number");
        this.ball = {
            x: 0,
            y: 0,
            radius: 20,
            color: "green",
            strokeStyle: "rgba(0, 0, 255, 0.5)",
            easing: 0.01,
            alive: true,
            canvas: document.querySelector(".ballCanvas"),
        };

        this.ball.x = this.ball.canvas.width / 2;
        this.ball.y = this.ball.canvas.height / 2;

        this.enemies = [];
        this.modalWindow = new ModalWindow(document.body);

        for (let count = 0; count < 3; count++) {
            const canvas = document.createElement("canvas");
            canvas.className = "enemyCanvas";
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            this.parent.appendChild(canvas);

            this.enemies[count] = {
                x: Math.random() * window.innerWidth / 2,
                y: Math.random() * window.innerHeight / 2,
                radius: 20,
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

        this.food = [];

        for (let count = 0; count < 100; count++) {
            this.food[count] = {
                x: Math.round(Math.random() * window.innerWidth),
                y: Math.round(Math.random() * window.innerHeight),
                status: 1,
                color: "#" + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6),
            };
        }

        window.addEventListener("resize", this.onWindowResize);

        this.drawFood();
        this.interval = setInterval(this.redrawAllBalls, 1000 / 60);

        this.timeouts = [];

        document.addEventListener("mousemove", this.handleMouseMove);
    };

    onWindowResize = () => {
        this.ball.canvas.width = window.innerWidth;
        this.ball.canvas.height = window.innerHeight;
        this.foodCanvas.width = window.innerWidth;
        this.foodCanvas.height = window.innerHeight;
        this.enemies.forEach((enemy) => {
            enemy.canvas.height = window.innerHeight;
            enemy.canvas.width = window.innerWidth;
        });
    };

    handleMouseMove = (event) => {
        this.easingTargetX = event.clientX;
        this.easingTargetY = event.clientY;
        this.moveMyBall();
    };

    moveMyBall = () => {
        if (this.easingTargetX === (this.ball.x + this.ball.radius) && this.easingTargetY === (this.ball.y + this.ball.radius)) {
            return;
        }

        this.ball.x += (this.easingTargetX - this.ball.x) * this.ball.easing;
        this.ball.y += (this.easingTargetY - this.ball.y) * this.ball.easing;


        this.timeouts.push(setTimeout(() => this.moveMyBall(), 100));
    };

    drawFood = () => {
        const ctx = this.foodCanvas.getContext("2d");
        ctx.clearRect(0, 0, this.foodCanvas.width, this.foodCanvas.height);

        this.food.forEach((foodElement) => {
            if (foodElement.status === 1) {
                ctx.beginPath();
                ctx.arc(foodElement.x, foodElement.y, 5, 0, Math.PI * 2, false);
                ctx.fillStyle = foodElement.color;
                ctx.fill();
                ctx.closePath();
            }
        });
    };

    detectFoodEating = (ball) =>
        this.food.forEach((foodElement) => {
            if (ball.x > foodElement.x - this.ball.radius
                && ball.x < foodElement.x + this.ball.radius
                && ball.y > foodElement.y - this.ball.radius
                && ball.y < foodElement.y + this.ball.radius) {
                if (foodElement.status === 1) {
                    foodElement.status = 0;
                    this.drawFood();
                    this.scoreIncrement(ball);
                }
            }
        });

    redrawAllBalls = () => {
        if (!this.enemies.length) {
            this.end();
            document.removeEventListener('keydown', this.modalWindowHandler);
            console.log("win");
            this.modalWindow.start("You win. Do you want to play again?", this.playAgain, () => {
                this.exit();
            });
            return;
        }

        this.drawOneBall(this.ball);
        this.enemies.forEach((enemy) => {
            this.drawOneBall(enemy, enemy.canvas);
            if (enemy.x + enemy.dx > enemy.canvas.width - enemy.radius
                || enemy.x + enemy.dx < enemy.radius) {
                enemy.dx = -enemy.dx;
            }
            if (enemy.y + enemy.dy > enemy.canvas.height - enemy.radius
                || enemy.y + enemy.dy < enemy.radius) {
                enemy.dy = -enemy.dy;
            }

            enemy.x += enemy.dx;
            enemy.y += enemy.dy;
        });

        this.enemies.forEach((enemy) => {
            const eatenBall = this.detectBallEating(enemy, this.ball);
            if (eatenBall === this.ball) {
                document.removeEventListener('keydown', this.modalWindowHandler);
                this.modalWindow.start("You lost. Do you want to play again?", this.playAgain, () => {
                    this.exit();
                });
            }
            if (eatenBall === enemy) {
                this.parent.removeChild(enemy.canvas);
                this.enemies.splice(this.enemies.indexOf(enemy), 1);
            }
        });

        this.enemies.forEach((enemy1) => this.enemies.forEach((enemy2) => {
            if (enemy1 !== enemy2) {
                const eatenBall = this.detectBallEating(enemy1, enemy2);
                if (eatenBall === enemy1) {
                    this.enemies.splice(this.enemies.indexOf(enemy1), 1);
                }
                if (eatenBall === enemy2) {
                    this.enemies.splice(this.enemies.indexOf(enemy2), 1);
                }

            }
        }));
    };

    detectBallEating = (ball1, ball2) => {
        if (!ball1.alive || !ball2.alive) {
            return;
        }
        let small = ball1, large = ball1;
        if (ball1.radius === ball2.radius) {
            return;
        } else if (ball1.radius < ball2.radius) {
            large = ball2;
        } else {
            small = ball2;
        }

        if (small.x + small.radius < large.x + large.radius
            && small.x - small.radius > large.x - large.radius
            && small.y + small.radius < large.y + large.radius
            && small.y - small.radius > large.y - large.radius) {
            small.alive = false;

            large.radius += small.radius;
            if (large === this.ball) {
                this.score.innerText = parseInt(this.score.innerText) + small.radius;
            }
            return small;
        }
    };

    drawOneBall = (ball) => {
        const ballCtx = ball.canvas.getContext("2d");
        ballCtx.clearRect(0, 0, ball.canvas.width, ball.canvas.height);

        if (!ball.alive) {
            ballCtx.clearRect(0, 0, ball.canvas.width, ball.canvas.height);
            return;
        }

        ballCtx.beginPath();
        ballCtx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, false);
        ballCtx.fillStyle = ball.color;
        ballCtx.strokeStyle = ball.strokeStyle;
        ballCtx.fill();
        ballCtx.stroke();
        ballCtx.closePath();

        this.detectFoodEating(ball);
    };

    scoreIncrement = (ball) => {
        ball.radius++;
        ball.canvas.style.zIndex++;
        ball.easing /= 1.06;
        if (ball === this.ball) {
            this.score.innerText = parseInt(this.score.innerText) + 1;
        }
    };

    end = () => {
        document.removeEventListener("mousemove", this.handleMouseMove);
        window.removeEventListener("resize", this.onWindowResize);
        if (this.timeouts) {
            this.timeouts.forEach((timer) => {
                clearTimeout(timer);
            });
        }

        if (this.interval) {
            clearInterval(this.interval);
        }
        if (this.ball) {
            delete this.ball;
        }
        if (this.enemies) {
            this.enemies.forEach((enemy) => {
                this.parent.removeChild(enemy.canvas);
            });
            delete this.enemies;
        }
        if (this.food) {
            delete this.food;
        }
    };

    pause = () => {
        document.removeEventListener("mousemove", this.handleMouseMove);
    };

    resume = () => {
        document.addEventListener("mousemove", this.handleMouseMove);
    };

    exit = () => {
        this.end();

        document.body.style.background = null;

        window.history.pushState(
            {},
            document.querySelector("title").innerText,
            "/",
        );
        router.renderPage();

    };

    playAgain = () => {
        this.modalWindow.close();
        this.end();
        this.start();
    };

    onPageChange = () => {
        document.removeEventListener('keydown', this.modalWindowHandler);
        window.removeEventListener('popstate', this.onPageChange);
    };

    modalWindowHandler = (event) => {
        if (event.key === 'Escape' || event.keyCode === 27) {
            document.removeEventListener('keydown', this.modalWindowHandler);
            this.pause();
            this.modalWindow.start("Do you really want to exit?", this.gameExitHandler, () => {
                this.modalWindow.close();
                document.addEventListener('keydown', this.modalWindowHandler);
                this.resume();
            });
        }
    };

    gameExitHandler = () => {
        this.exit();
    };
}
