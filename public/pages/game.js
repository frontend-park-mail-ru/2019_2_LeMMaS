import { html } from "common-tags";

import "../static/assets/css/reset.css";
import "../static/assets/css/common.css";
import "../components/gameCanvas/style.css";
import "../components/gameScore/style.css";
import "../components/infoLeft/style.css";

import GameDemo from "../game/gameDemo";
import Router from "../router";

export default class GamePage {
    render() {
        const width = window.innerWidth;
        const height = window.innerHeight;

        document.body.innerHTML = html`
            <div class="gameScore"><p>Score: <span class="gameScore__number">0</span></p></div>
            <div class="infoLeft"><p>Press Escape to exit the game</p></div>
            <canvas width="${width}" height="${height}" class="foodCanvas"></canvas>
            <canvas width="${width}" height="${height}" class="ballCanvas"></canvas>
        `;

        document.querySelector(".body").style.background = "white";

        document.addEventListener('keydown', event => {
            if (event.key === 'Escape' || event.keyCode === 27) {
                document.querySelector(".body").style.background = null;

                window.history.pushState(
                    {},
                    document.querySelector("title").innerText,
                    "/"
                );
                (new Router()).renderPage();
            }
        });

        const gameDemo = new GameDemo();
        gameDemo.start();
    }


}