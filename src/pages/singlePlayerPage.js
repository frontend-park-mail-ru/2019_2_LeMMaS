import { html } from "common-tags";

import "../static/css/common.css";
import "../components/gameCanvas/style.css";
import "../components/gameScore/style.css";
import "../components/infoLeft/style.css";
import SinglePlayer from "../components/gamePlay/singlePlayer";
import User from "../modules/user";

export default class SinglePlayerPage {
    render() {
        const width = window.innerWidth;
        const height = window.innerHeight;

        document.body.innerHTML = html`
            <div class="game__wrapper">
                <div class="gameScore">
                    <p>Счет: <span class="gameScore__number">0</span></p>
                </div>
                <div class="infoLeft">
                    <p><b>ESC</b> для выхода из игры</p>
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
