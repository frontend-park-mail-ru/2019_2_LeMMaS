import API from "../../../modules/api";
import { koeff } from "../resolution";

export default class Ball {
    public backgroundImage: HTMLImageElement;
    public radius: number;
    public x: number;
    public y: number;

    private alive: boolean;
    private id: number;
    private easingTargetX: number;
    private easingTargetY: number;
    private easing: number;
    private strokeStyle: string;
    private color: string;
    private canvas: HTMLCanvasElement;

    constructor(id: number, x: number, y: number, radius: number, color: string) {
        this.id = id;
        this.alive = true;

        this.x = x;
        this.y = y;
        this.easingTargetX = 0;
        this.easingTargetY = 0;
        this.easing = 0.01;

        this.radius = radius * koeff;
        this.strokeStyle = "rgba(128, 0, 0, 0.5)";
        this.color = color ? color : "green";
        this.backgroundImage = undefined;

        const ballCanvas: HTMLCanvasElement = document.createElement("canvas");
        ballCanvas.width =  window.innerWidth * koeff;
        ballCanvas.height =  window.innerHeight * koeff;
        ballCanvas.classList.add("id_" + id, "ballCanvas");
        ballCanvas.style.zIndex = String(radius);

        this.canvas = ballCanvas;

        document.querySelector(".game__wrapper").appendChild(ballCanvas);

        this.getAvatar();
    }

    public draw = () => {
        const ballCtx: CanvasRenderingContext2D = this.canvas.getContext("2d");
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
        this.canvas.style.zIndex = String(this.radius);
    };

    public getId = (): number => this.id;

    public setTarget = (x: number, y: number) => {
        this.easingTargetX = x;
        this.easingTargetY = y;
    };

    public delete = () => {
        this.canvas.parentNode.removeChild(this.canvas);
    };

    private getAvatar() {
        API.getAvatarById(this.id).then(user => {
            if (user.avatar_path) {
                const backgroundImage = new Image();
                backgroundImage.src = user.avatar_path;
                this.backgroundImage = backgroundImage;
            }
        });
    }
}
