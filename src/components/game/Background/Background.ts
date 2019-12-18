import Offset from "../Offset";
import Scale from "../Scale";

const BACK_COLOR = "rgb(238,238,238)";
const LINE_COLOR = "white";
const LINE_WIDTH = 20;
const LINE_PULSE_WIDTH = 27;

export default class Background {
    private canvas: HTMLCanvasElement;
    private linesVertical: Array<number>;
    private linesHorizontal: Array<number>;
    private lineWidth = LINE_WIDTH;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.linesVertical = [];
        this.linesHorizontal = [];
        for (let x = 0; x <= Scale.countWithScale(3000); x += 150) {
            this.linesVertical.push(x);
        }
        for (let y = 0; y <= Scale.countWithScale(3000); y += 150) {
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
                ctx.lineWidth = this.lineWidth;
                ctx.moveTo(line + Offset.x, Offset.y);
                ctx.lineTo(
                    line + Offset.x,
                    Scale.countWithScale(3000) + Offset.y
                );
                ctx.stroke();
                ctx.closePath();
            });
            this.linesHorizontal.forEach(line => {
                ctx.beginPath();
                ctx.strokeStyle = LINE_COLOR;
                ctx.lineWidth = this.lineWidth;
                ctx.moveTo(Offset.x, line + Offset.y);
                ctx.lineTo(
                    Scale.countWithScale(3000) + Offset.x,
                    line + Offset.y
                );
                ctx.stroke();
                ctx.closePath();
            });
        }
    };

    public pulse = (): void => {
        this.lineWidth = LINE_PULSE_WIDTH;
        setTimeout(() => {this.lineWidth = LINE_WIDTH;}, 200);
    };
}
