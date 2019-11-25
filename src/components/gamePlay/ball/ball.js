export default class Ball {
    constructor(id, x, y, radius, color) {
        this.id = id;
        this.alive = true;

        this.x = x;
        this.y = y;
        this.easingTargetX = 0;
        this.easingTargetY = 0;
        this.easing = 0.01;

        this.radius = radius;
        this.strokeStyle = "rgba(128, 0, 0, 0.5)";
        this.color = color ? color : "green";
        this.backgroundImage = undefined;

        const ballCanvas = document.createElement("canvas");
        ballCanvas.width =  window.innerWidth;
        ballCanvas.height =  window.innerHeight;
        ballCanvas.classList.add("id_" + id, "ballCanvas");
        ballCanvas.style.zIndex = radius;

        this.canvas = ballCanvas;

        document.querySelector(".game__wrapper").appendChild(ballCanvas);
    }

    draw = () => {
        const ballCtx = this.canvas.getContext("2d");
        ballCtx.restore();
        ballCtx.save();
        ballCtx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (!this.alive) {
            return;
        }
        ballCtx.beginPath();
        ballCtx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ballCtx.clip();
        if (this.backgroundImage) {
            ballCtx.fillStyle = "white";
            ballCtx.fill();
            ballCtx.drawImage(
                this.backgroundImage,
                this.x - this.radius,
                this.y - this.radius,
                this.radius * 2,
                this.radius * 2
            );
        } else {
            ballCtx.fillStyle = this.color;
            ballCtx.fill();
        }
        ballCtx.strokeStyle = this.strokeStyle;
        ballCtx.lineWidth = 5;
        ballCtx.stroke();
        this.canvas.style.zIndex = this.radius;
    };

    delete = () => {
        this.canvas.parentNode.removeChild(this.canvas);
    };
}
