import Scale from "../Scale";
import { foods } from "components/foods";

import Offset from "../Offset";
import { FoodElement } from "../types";

export default class Food {
    private foodCanvas: HTMLCanvasElement;
    private food: Map<number, FoodElement>;
    private radius: number;

    constructor(canvas: HTMLCanvasElement) {
        this.foodCanvas = canvas;
        this.food = new Map<number, FoodElement>();
        this.radius = Scale.countWithScale(5);
    }

    public add(id: number, x_: number, y_: number): void {
        const food = foods[Math.round(Math.random() * 20)];
        const color: string =
            "#" +
            (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);
        const x = Scale.countWithScale(x_);
        const y = Scale.countWithScale(y_);
        this.food.set(id, { id, x, y, color, emoji: food });
    }

    public delete(id: number): void {
        this.food.delete(id);
    }

    public draw = (): void => {
        const ctx: CanvasRenderingContext2D | null = this.foodCanvas.getContext("2d");
        if(ctx) {
            this.food.forEach(foodElement => {
                ctx.beginPath();
                ctx.font = `${Scale.countWithScale(20)}px serif`;
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText(foodElement.emoji, foodElement.x + Offset.x, foodElement.y + Offset.y);
                ctx.closePath();
            });
        }
    };

    getFood = (): Map<number, FoodElement> => this.food;
}
