import { html } from "common-tags";

import User from "modules/user";
import MultiPlayer from "components/game/Multiplayer";

import "static/css/common.css";

export default class Multiplayer {
    private gamePlay: MultiPlayer;

    render = () => {
        const width = window.innerWidth * 2;
        const height = window.innerHeight * 2;

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
                    class="gameCanvas"
                ></canvas>
            </div>
        `;

        document.body.style.background = "white";

        const interval = setInterval(() => {
            if (User.getCurrentUser() !== undefined) {
                this.gamePlay = new MultiPlayer(
                    document.body.querySelector(".game__wrapper")
                );
                this.gamePlay.start();
                clearInterval(interval);
            }
        }, 200);
    };

}
