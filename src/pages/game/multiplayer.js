import { html } from "common-tags";

import User from "modules/user";
import MultiPlayer from "components/game/multiplayer";
import { koeff } from "components/game/resolution";

import "static/css/common.css";

export default class Multiplayer {
    render = () => {
        const width = window.innerWidth * koeff;
        const height = window.innerHeight * koeff;

        document.body.innerHTML = html`
            <div class="game__wrapper">
                <div class="game__info plate leaderboard-plate plate__size-auto">
                    <div class="plate__innerContent">
                        <h2 class="text__align-center">
                            <i class="fas fa-trophy"></i> Лучшие игроки
                        </h2>
                        <div class="leaderboard-wrapper"></div>
                    </div>
                </div>
                <div class="game__finish-button plate plate__size-auto">
                    <i class="fas fa-times"></i>
                </div>
                <canvas
                    width="${width}"
                    height="${height}"
                    class="foodCanvas"
                ></canvas>
            </div>
        `;

        document.body.style.background = "white";

        this.gamePlay = new MultiPlayer(
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
