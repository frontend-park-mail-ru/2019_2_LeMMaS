import Offset from "../Offset";
import Scale from "../Scale";
import { GAME_FIELD_SIZE } from "../const";

const BACK_COLOR = "rgb(238,238,238)";
const LINE_COLOR = "white";
const LINE_WIDTH = 20;

export default class Background {
    private canvas: HTMLCanvasElement;
    private linesVertical: Array<number>;
    private linesHorizontal: Array<number>;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.linesVertical = [];
        this.linesHorizontal = [];
        for (let x = 0; x <= Scale.countWithScale(GAME_FIELD_SIZE); x += 150) {
            this.linesVertical.push(x);
        }
        for (let y = 0; y <= Scale.countWithScale(GAME_FIELD_SIZE); y += 150) {
            this.linesHorizontal.push(y);
        }
    }

    public draw = (): void => {
        const ctx: CanvasRenderingContext2D | null = this.canvas.getContext(
            "2d"
        );
        ctx.restore();
        ctx.save();
        ctx.fillStyle = BACK_COLOR;
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        if (ctx) {
            this.linesVertical.forEach(line => {
                ctx.beginPath();
                ctx.strokeStyle = LINE_COLOR;
                ctx.lineWidth = LINE_WIDTH;
                ctx.moveTo(line + Offset.x, Offset.y);
                ctx.lineTo(
                    line + Offset.x,
                    Scale.countWithScale(GAME_FIELD_SIZE) + Offset.y
                );
                ctx.stroke();
                ctx.closePath();
            });
            this.linesHorizontal.forEach(line => {
                ctx.beginPath();
                ctx.strokeStyle = LINE_COLOR;
                ctx.lineWidth = LINE_WIDTH;
                ctx.moveTo(Offset.x, line + Offset.y);
                ctx.lineTo(
                    Scale.countWithScale(GAME_FIELD_SIZE) + Offset.x,
                    line + Offset.y
                );
                ctx.stroke();
                ctx.closePath();
            });
        }
    };
}
