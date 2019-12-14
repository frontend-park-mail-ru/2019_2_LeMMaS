import Ball from "./Ball";

export default class Balls {
    private balls: Map<number, Ball>;
    private canvas: HTMLCanvasElement;

    constructor(canvas: HTMLCanvasElement) {
        this.balls = new Map<number, Ball>();
        this.canvas = canvas;
    }

    public get = (id: number): Ball => this.balls.get(id);
    public set = (id: number, ball: Ball): Map<number, Ball> =>
        this.balls.set(id, ball);
    public delete = (id: number): boolean => this.balls.delete(id);

    public draw = () => {
        if (this.balls) {
            const ballCtx: CanvasRenderingContext2D | null =
                this.canvas && this.canvas.getContext("2d");

            if (!ballCtx) {
                return;
            }

            this.balls.forEach(ball => {
                ball.draw();
            });
        }
    };
}
