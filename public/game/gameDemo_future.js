export default class GameDemo {
    start = () => {
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

        for (let count = 0; count < 3; count++) {
            const canvas = document.createElement("canvas");
            canvas.className = "enemyCanvas";
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            document.body.appendChild(canvas);

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

        window.addEventListener("resize", () => {
            this.ball.canvas.width = window.innerWidth;
            this.ball.canvas.height = window.innerHeight;
            this.foodCanvas.width = window.innerWidth;
            this.foodCanvas.height = window.innerHeight;
            this.enemies.forEach((enemy) => {
                enemy.canvas.height = window.innerHeight;
                enemy.canvas.width = window.innerWidth;
            });
        });


        this.drawFood();
        this.redrawAllBalls();

        document.addEventListener("mousemove", (event) => {
            this.easingTargetX = event.clientX;
            this.easingTargetY = event.clientY;
            this.moveMyBall();
        });
    };

    moveMyBall = () => {
        if (this.easingTargetX === (this.ball.x + this.ball.radius) && this.easingTargetY === (this.ball.y + this.ball.radius)) {
            return;
        }

        this.ball.x += (this.easingTargetX - this.ball.x) * this.ball.easing;
        this.ball.y += (this.easingTargetY - this.ball.y) * this.ball.easing;


        setTimeout(() => this.moveMyBall(), 100);
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

    detectFoodEating = (x, y, ball) =>
        this.food.forEach((foodElement) => {
            if (x > foodElement.x - this.ball.radius
                && x < foodElement.x + this.ball.radius
                && y > foodElement.y - this.ball.radius
                && y < foodElement.y + this.ball.radius) {
                if (foodElement.status === 1) {
                    foodElement.status = 0;
                    this.drawFood();
                    this.scoreIncrement(ball);
                }
            }
        });

    redrawAllBalls = () => {
        setInterval(() => {
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
                this.detectBallEating(enemy, this.ball);
            });

            this.enemies.forEach((enemy1) => this.enemies.forEach((enemy2) => {
                    if(enemy1 !== enemy2) {
                        this.detectBallEating(enemy1, enemy2);
                    }
            }));
        }, 1000 / 60);
    };

    detectBallEating = (ball1, ball2) => {
        if(!ball1.alive || !ball2.alive) {
            return;
        }
        let small = ball1, large = ball1;
        if(ball1.radius === ball2.radius) {
            return;
        } else if(ball1.radius < ball2.radius) {
            large = ball2;
        } else {
            small = ball2;
        }

        if(small.x + small.radius < large.x + large.radius
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

        if(!ball.alive) {
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

        this.detectFoodEating(ball.x, ball.y, ball);
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
        delete this.ball;
        delete this.enemies;
        delete this.food;
    }
}
