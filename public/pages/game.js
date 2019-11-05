import { html } from "common-tags";

import "../static/assets/css/common.css";
import "../components/gameCanvas/style.css";
import "../components/gameScore/style.css";
import "../components/infoLeft/style.css";

import GameDemo from "../game/gameDemo_future";
import Router from "../modules/router";
//import ModalWindow from "../components/modalWindow";

export default class GamePage {
    render() {
        const width = window.innerWidth;
        const height = window.innerHeight;

        document.body.innerHTML = html`
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
        `;

        document.body.style.background = "white";

        document.addEventListener("keydown", event => {
            if (event.key === "Escape" || event.keyCode === 27) {
                document.body.style.background = null;

                window.history.pushState({}, document.title, "/");
                Router.renderPage();
                window.history.pushState(
                    {},
                    document.querySelector("title").innerText,
                    "/"
                );
                Router.renderPage();

                // TODO make modal window
                // const modalWindow = new ModalWindow(document.body);
                //modalWindow.start("Do you really want to exit?");
            }
        });

        const gameDemo = new GameDemo();
        gameDemo.start();
    }
}
