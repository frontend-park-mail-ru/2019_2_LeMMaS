import API from "modules/api";
import Offset from "../Offset";
import Scale from "../Scale";
import { ResponseUser } from "../../../modules/responseBody";

const DEFAULT_COLOR = "green";
const DEFAULT_STROKE = "rgba(128, 0, 0, 0.5)";
const EASING = 1;

export default class Ball {
    public backgroundImage: HTMLImageElement | undefined;
    public radius: number;
    public x: number;
    public y: number;

    public id: number;
    private easingTargetX: number;
    private easingTargetY: number;
    private readonly easing: number;
    private readonly strokeStyle: string;
    private readonly color: string;
    private readonly canvas: HTMLCanvasElement | null;

    constructor(
        id: number,
        x: number,
        y: number,
        radius: number,
        color: string
    ) {
        this.id = id;

        this.x = Scale.countWithScale(x);
        this.y = Scale.countWithScale(y);
        this.easingTargetX = 0;
        this.easingTargetY = 0;
        this.easing = EASING;

        this.radius = Scale.countWithScale(radius);
        this.strokeStyle = DEFAULT_STROKE;
        this.color = color || DEFAULT_COLOR;

        this.canvas = document.querySelector(".gameCanvas");

        this.getAvatar();
    }

    public draw = (): void => {
        const ballCtx: CanvasRenderingContext2D | null =
            this.canvas && this.canvas.getContext("2d");
        if (ballCtx) {
            ballCtx.beginPath();
            ballCtx.arc(
                this.x + Offset.x,
                this.y + Offset.y,
                this.radius,
                0,
                Math.PI * 2,
                false
            );
            ballCtx.clip();

            if (this.backgroundImage) {
                ballCtx.fillStyle = "white";
                ballCtx.fill();
                ballCtx.drawImage(
                    this.backgroundImage,
                    this.x + Offset.x - this.radius,
                    this.y + Offset.y - this.radius,
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
            ballCtx.closePath();
        }
    };

    public setTarget = (x: number, y: number): void => {
        this.x = x;
        this.y = y;
    };

    private getAvatar = (): void => {
        API.getUserInfoById(this.id).then((user: ResponseUser) => {
            if (user.avatar_path) {
                const backgroundImage = new Image();
                backgroundImage.src = user.avatar_path;
                this.backgroundImage = backgroundImage;
            }
        });
    };
}
