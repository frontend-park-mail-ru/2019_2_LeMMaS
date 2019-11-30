import { koeff } from "../resolution";
import { foods } from "components/foods";

interface FoodElement {
    id: number;
    x: number;
    y: number;
    color: string;
    emoji: string;
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
        const food = foods[Math.round(Math.random() * 20)];
        const color: string =
            "#" +
            (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);
        const x = x_ * koeff;
        const y = y_ * koeff;
        this.food.set(id, { id, x, y, color, emoji: food });
    }

    public delete(id: number) {
        this.food.delete(id);
    }

    public draw = () => {
        const ctx: CanvasRenderingContext2D | null = this.foodCanvas.getContext("2d");
        if(ctx) {
            ctx.clearRect(0, 0, this.foodCanvas.width, this.foodCanvas.height);
            this.food.forEach(foodElement => {
                ctx.beginPath();
                ctx.font = `${20 * koeff}px serif`;
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText(foodElement.emoji, foodElement.x, foodElement.y);
                ctx.closePath();
            });
        }
    };

    getFood = () => this.food;
}
