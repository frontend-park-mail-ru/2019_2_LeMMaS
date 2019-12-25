import Scale from "../Scale";
import { foods, winter } from "components/foods";

import Offset from "../Offset";
import { FoodElement } from "../types";
import { getCookie } from "../../../modules/cookies";

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
        const foodEmojis = getCookie("theme") === "winter" ? winter : foods;

        const food = foodEmojis[Math.round(Math.random() * 20)];
        const color: string =
            "#" +
            (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);
        const x = Scale.countWithScale(x_);
        const y = Scale.countWithScale(y_);
        this.food.set(id, { id, x, y, color, emoji: food });
    }

    public delete = (id: number): void => {
        this.food.delete(id);
    };

    public clear = () => {
        this.food.clear();
    };

    public draw = (): void => {
        const ctx: CanvasRenderingContext2D | null = this.foodCanvas.getContext(
            "2d"
        );
        if (ctx) {
            this.food.forEach(foodElement => {
                ctx.beginPath();
                ctx.font = `${Scale.countWithScale(15)}px serif`;
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText(
                    foodElement.emoji,
                    foodElement.x + Offset.x,
                    foodElement.y + Offset.y
                );
                ctx.closePath();
            });
        }
    };

    public getFood = (): Map<number, FoodElement> => this.food;

    public getCloserFood = (x: number, y: number): FoodElement => {
        let closerEl: FoodElement | undefined = this.food.values().next().value;
        if (closerEl) {
            let minDistance: number = this.getDistance(closerEl.x, closerEl.y, x, y);

            this.food.forEach(foodEl => {
                const distance = this.getDistance(foodEl.x, foodEl.y, x, y);
                if (distance < minDistance) {
                    closerEl = foodEl;
                    minDistance = distance;
                }
            });

            return closerEl;
        }
    };

    private getDistance = (x1: number, y1: number, x2: number, y2: number) =>
        Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
}
