import { html } from "common-tags";

import "../static/css/common.css";
import "../components/gameCanvas/style.css";
import "../components/gameScore/style.css";
import "../components/infoLeft/style.css";
import MultiPlayer from "../components/gamePlay/multiPlayer.ts";
import User from "../modules/user";
import { koeff } from "../components/gamePlay/resolution";

export default class MultiPlayerPage {
    render() {
        const width = window.innerWidth * koeff;
        const height = window.innerHeight * koeff;

        document.body.innerHTML = html`
            <div class="game__wrapper">
                <div class="gameScore plate plate__size-auto">
                    <p>Счет: <span class="gameScore__number">0</span></p>
                    <div class="plate leaderboard-plate plate__size-auto">
                <div class="plate__innerContent">
                    <h2 class="text__align-center">
                        <i class="fas fa-trophy"></i> Лучшие игроки
                    </h2>
                    <div class="leaderboard-wrapper"></div>
                </div>
            </div>
                </div>
                <div class="infoLeft plate plate__size-auto">
                    <a><i class="fas fa-times"></i></a>
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
