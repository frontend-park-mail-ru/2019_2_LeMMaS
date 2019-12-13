import { html } from "common-tags";

import "../static/css/common.css";
import "../components/gameCanvas/style.css";
import "../components/gameScore/style.css";
import "../components/infoLeft/style.css";
import MultiPlayer from "../components/gamePlay/multiPlayer";
import User from "../modules/user";

export default class MultiPlayerPage {
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
