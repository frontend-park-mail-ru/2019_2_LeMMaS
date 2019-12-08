import Offset from "../Offset";
import Scale from "../Scale";

const LINES_COLOR = 'rgba(0, 0, 0, 0.05)';

export default class Background {
    private canvas: HTMLCanvasElement;
    private linesVertical: Array<number>;
    private linesHorizontal: Array<number>;

    constructor (canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.linesVertical = [];
        this.linesHorizontal = [];
        for (let x = 0; x <= Scale.countWithScale(3000); x += 100) {
            this.linesVertical.push(x);
        }
        for (let y = 0; y <= Scale.countWithScale(3000); y += 100) {
            this.linesHorizontal.push(y);
        }
    }

    public draw = (): void => {
        const ctx: CanvasRenderingContext2D | null = this.canvas.getContext("2d");
        ctx.restore();
        ctx.save();
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if(ctx) {
            this.linesVertical.forEach(line => {
                ctx.beginPath();
                ctx.strokeStyle = LINES_COLOR;
                ctx.lineWidth = 3;
                ctx.moveTo(line + Offset.x, Offset.y);
                ctx.lineTo(line + Offset.x, Scale.countWithScale(3000) + Offset.y);
                ctx.stroke();
                ctx.closePath();
            });
            this.linesHorizontal.forEach(line => {
                ctx.beginPath();
                ctx.strokeStyle = LINES_COLOR;
                ctx.lineWidth = 3;
                ctx.moveTo(Offset.x, line + Offset.y);
                ctx.lineTo(Scale.countWithScale(3000) + Offset.x, line + Offset.y);
                ctx.stroke();
                ctx.closePath();
            });
        }
    }


}
