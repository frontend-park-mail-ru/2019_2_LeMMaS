export default class GameDemo {
    start() {
        this.foodCanvas = document.querySelector(".foodCanvas");
        this.ballCanvas = document.querySelector(".ballCanvas");
        this.score = document.querySelector(".gameScore__number");
        window.addEventListener("resize", () => {
            this.ballCanvas.width = window.innerWidth;
            this.ballCanvas.height = window.innerHeight;
            this.foodCanvas.width = window.innerWidth;
            this.foodCanvas.height = window.innerHeight;
        });
        console.log(this);


        this.x = this.ballCanvas.width / 3;
        this.y = this.ballCanvas.height - 80;
        this.dx = 1;
        this.dy = -1;
        this.food = [];

        for (let c = 0; c < 10; c++) {
            this.food[c] = [];
            for (let r = 0; r < 10; r++) {
                this.food[c][r] = {
                    x: Math.round(Math.random() * window.innerWidth),
                    y: Math.round(Math.random() * window.innerHeight),
                    status: 1,
                };
            }
        }
        this.drawFood();
        document.addEventListener("mousemove", (event) => {
            let relativeX = event.clientX - this.ballCanvas.offsetLeft;
            let relativeY = event.clientY - this.ballCanvas.offsetLeft;
            this.x = relativeX;
            this.y = relativeY;
        });
        this.gameDemonstration();
    }

    gameDemonstration() {
        setInterval(() => {
            const ballRadius = 20;
            const ctx = this.ballCanvas.getContext("2d");
            ctx.clearRect(0, 0, this.ballCanvas.width, this.ballCanvas.height);
            ctx.beginPath();
            ctx.arc(this.x, this.y, ballRadius, 0, Math.PI * 2, false);
            ctx.fillStyle = "green";
            ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
            ctx.fill();
            ctx.stroke();
            ctx.closePath();
            if (this.x + this.dx > this.ballCanvas.width - ballRadius || this.x + this.dx < ballRadius) {
                this.dx = -this.dx;
            }
            if (this.y + this.dy > this.ballCanvas.height - ballRadius || this.y + this.dy < ballRadius) {
                this.dy = -this.dy;
            }
            this.detectCollision(this.x, this.y);
        }, 5);
    }


    drawFood() {
        console.log("drawing food");
        const ctx = this.foodCanvas.getContext("2d");
        ctx.clearRect(0, 0, this.foodCanvas.width, this.foodCanvas.height);

        for (let c = 0; c < 10; c++) {
            for (let r = 0; r < 10; r++) {
                let foodElement = this.food[c][r];
                if(foodElement.status === 1) {
                    ctx.beginPath();
                    ctx.arc(foodElement.x, foodElement.y, 5, 0, Math.PI * 2, false);
                    ctx.fillStyle = "#0095DD";
                    ctx.fill();
                    ctx.closePath();
                }
            }
        }
    }

    detectCollision(x, y) {
        for (let c = 0; c < 10; c++) {
            for (let r = 0; r < 10; r++) {
                let foodElement = this.food[c][r];

                if (x > foodElement.x && x < foodElement.x + 20 && y > foodElement.y && y < foodElement.y + 20) {
                    if (foodElement.status === 1) {
                        if (x > foodElement.x && x < foodElement.x + 20 && y > foodElement.y && y < foodElement.y + 20) {
                            foodElement.status = 0;
                            this.drawFood();
                            this.scoreIncrement();
                        }
                    }
                }
            }
        }
    }

    scoreIncrement() {
        this.score.innerText = parseInt(this.score.innerText) + 1;
    }


    linePoints(x2, y2, frames) {
        let dx = x2 - this.x;
        let dy = y2 - this.y;
        let incrementX = dx / frames;
        let incrementY = dy / frames;
        let a = new Array();

        a.push({
            x: this.x,
            y: this.y
        });
        for (let frame = 0; frame < frames - 1; frame++) {
            a.push({
                x: this.x + (incrementX * frame),
                y: this.y + (incrementY * frame)
            });
        }
        a.push({
            x: x2,
            y: y2
        });
        return (a);
    }
}
