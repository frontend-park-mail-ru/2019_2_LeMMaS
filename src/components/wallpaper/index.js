import { html } from "common-tags";

import BaseComponent from "components/baseComponent";
import { foods } from "components/foods";

import "./style.css";

const FOOD_SPEED = 1;

export default class Wallpaper extends BaseComponent {
    render = () => {
        this.parent.innerHTML = html`
            ${foods.map(food => `<span class="food">${food}</span>`)}
        `;
        this.foods = document.querySelectorAll(".wallpaper .food");
        this.foods.forEach(food => {
            const height = Math.floor(Math.random() * window.innerHeight);
            const width = Math.random() * window.innerWidth;
            food.style.top = `${height}px`;
            food.style.left = `${width}px`;
        });

        this._moveFoods();
    };

    _moveFoods = () => {
        this.foods.forEach(food => {
            let position = parseInt(food.style.top.replace("px", ""));
            if (position > window.innerHeight + 50) {
                position = -75;
                food.style.left = `${Math.random() * window.innerWidth}px`;
            }
            food.style.top = `${position + FOOD_SPEED}px`;
        });

        requestAnimationFrame(this._moveFoods);
    };
}
