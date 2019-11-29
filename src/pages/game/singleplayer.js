import { html } from "common-tags";

import SinglePlayer from "components/game/singleplayer";
import User from "modules/user";

import "static/css/common.css";

export default class Singleplayer {
    render() {
        const width = window.innerWidth * 2;
        const height = window.innerHeight * 2;

        document.body.innerHTML = html`
            <div class="game__wrapper">
                <div class="game__finish-button plate plate__size-auto">
                    <i class="fas fa-times"></i>
                </div>
                <div class="game__info plate plate__size-auto">
                    <p>Счет: <span class="gameScore__number">0</span></p>
                </div>
                <canvas
                    width="${width}"
                    height="${height}"
                    class="foodCanvas"
                ></canvas>
                <canvas
                    width="${width}"
                    height="${height}"
                    class="ballCanvas"
                ></canvas>
            </div>
        `;

        document.body.style.background = "white";

        this.gamePlay = new SinglePlayer(
            document.body.querySelector(".game__wrapper")
        );
        const interval = setInterval(() => {
            if (User.getCurrentUser() !== undefined) {
                this.gamePlay.start();
                clearInterval(interval);
            }
        }, 200);
    }
}
