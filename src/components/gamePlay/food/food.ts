import { koeff } from "../resolution";

interface FoodElement {
    x: number,
    y: number,
    color: string,
}

export default class Food {
    private foodCanvas: HTMLCanvasElement;
    private food: Map<number, FoodElement>;
    private radius: number;

    constructor(canvas: HTMLCanvasElement) {
        this.foodCanvas = canvas;
        this.food = new Map<number, FoodElement>();
        this.radius = 5 * koeff;
    }

    public add(id: number, x_: number, y_: number) {
        const color: string = "#" + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);
        const x = x_ * koeff;
        const y = y_ * koeff;
        this.food.set(id, {x, y, color});
    }

    public delete(id: number) {
        this.food.delete(id);
    }

    public draw = () => {
        const ctx: CanvasRenderingContext2D = this.foodCanvas.getContext("2d");
        ctx.clearRect(0, 0, this.foodCanvas.width, this.foodCanvas.height);

        this.food.forEach(foodElement => {
            ctx.beginPath();
            ctx.arc(foodElement.x, foodElement.y, this.radius, 0, Math.PI * 2, false);
            ctx.fillStyle = foodElement.color;
            ctx.fill();
            ctx.closePath();
        });
    };
}
