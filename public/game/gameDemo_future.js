export default class GameDemo {
    start = () => {
        this.foodCanvas = document.querySelector(".foodCanvas");
        this.ballCanvas = document.querySelector(".ballCanvas");
        this.enemiesCanvas = document.querySelector(".enemiesCanvas");

        this.score = document.querySelector(".gameScore__number");
        this.ball = {
            x: this.ballCanvas.width / 2,
            y: this.ballCanvas.height / 2,
            radius: 20,
            
        };
        
        this.easing = 0.01;
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
            this.ballCanvas.width = window.innerWidth;
            this.ballCanvas.height = window.innerHeight;
            this.foodCanvas.width = window.innerWidth;
            this.foodCanvas.height = window.innerHeight;
        });

        this.drawFood();
        this.drawMyBall();

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
        this.drawMyBall(this.easingTargetX, this.easingTargetY);

        setTimeout(() => this.moveMyBall(), 100);
    };

    drawMyBall = (relativeX, relativeY) => {
        if (relativeX !== undefined) {
            this.ball.x += (relativeX - this.ball.x) * this.easing;
            this.ball.y += (relativeY - this.ball.y) * this.easing;
        }

        const ctx = this.ballCanvas.getContext("2d");

        ctx.clearRect(0, 0, this.ballCanvas.width, this.ballCanvas.height);

        ctx.beginPath();
        ctx.arc(this.ball.x, this.ball.y, this.ball.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = "green";
        ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
        ctx.fill();
        ctx.stroke();
        ctx.closePath();

        this.detectFoodEating(this.ball.x, this.ball.y);
    };


    drawFood = () => {
        const ctx = this.foodCanvas.getContext("2d");
        ctx.clearRect(0, 0, this.foodCanvas.width, this.foodCanvas.height);

        this.food.forEach((foodElement) =>{
            if (foodElement.status === 1) {
                ctx.beginPath();
                ctx.arc(foodElement.x, foodElement.y, 5, 0, Math.PI * 2, false);
                ctx.fillStyle = foodElement.color;
                ctx.fill();
                ctx.closePath();
            }
        });
    };

    detectFoodEating = (x, y) =>
        this.food.forEach( (foodElement) => {
            if (x > foodElement.x - this.ball.radius
                && x < foodElement.x + this.ball.radius
                && y > foodElement.y - this.ball.radius
                && y < foodElement.y + this.ball.radius) {
                if (foodElement.status === 1) {
                    foodElement.status = 0;
                    this.drawFood();
                    this.scoreIncrement();
                }
            }
        });

    drawOneEnemy = (x, y, radius, color, dx, dy) => {
        setInterval(() => {

            const ctx = this.enemiesCanvas.getContext("2d");
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2, false);
            ctx.fillStyle = color;
            ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
            ctx.fill();
            ctx.stroke();
            ctx.closePath();
            if (x + dx > this.enemiesCanvas.width - radius || x + dx < radius) {
                dx = -dx;
            }
            if (y + dy > this.enemiesCanvas.height - radius || y + dy < radius) {
                dy = -dy;
            }

            this.detectFoodEating(x, y);

        }, 5);
    };

    scoreIncrement = () => {
        this.ball.radius++;
        this.easing /= 1.06;
        this.score.innerText = parseInt(this.score.innerText) + 1;
    };
}
