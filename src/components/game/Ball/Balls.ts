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

    public clear = () => {
        this.balls.clear();

    };

    public draw = () => {

        const sortedBalls = [...this.balls.values()].sort(this.compare);

        if (sortedBalls) {
            const ballCtx: CanvasRenderingContext2D | null =
                this.canvas && this.canvas.getContext("2d");

            if (!ballCtx) {
                return;
            }

            sortedBalls.forEach(ball => {
                ball.draw();
            });
        }
    };

    compare = (a: Ball, b: Ball) => {
        if (a.radius >= b.radius) return 1;
        if (a.radius < b.radius) return -1;
    };

    public getAllBalls = () =>
        this.balls;
}
