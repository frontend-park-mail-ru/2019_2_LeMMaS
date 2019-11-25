import { html } from "common-tags";

import BasePage from "./basePage";
import Leaderboard from "../components/leaderboard";
import { LinkButton } from "../components/buttons";

import "../components/startGameMenu/style.css";

export default class Index extends BasePage {
    renderContent(parent) {
        document.title = "LeMMaS";
        parent.innerHTML = html`
            <div class="plate start-game-menu">
                <div class="plate__innerContent">
                    <h2 class="text__size-big text__align-center">
                        Играть
                    </h2>
                    <div class="start-game-buttons-wrapper">
                        ${new LinkButton({
                            text: "Одиночная",
                            href: "/game/singleplayer",
                            icon: "😎",
                            extraClass: "button__type-primary",
                        }).renderString()}
                        ${new LinkButton({
                            text: "Мультиплеер",
                            href: "/game/multiplayer",
                            icon: "👨‍👩‍👧‍👦",
                            extraClass: "button__type-danger",
                        }).renderString()}
                    </div>
                </div>
            </div>
            <div class="plate leaderboard-plate">
                <div class="plate__innerContent">
                    <h2 class="text__align-center">
                        <i class="fas fa-trophy"></i> Лучшие игроки
                    </h2>
                    <div class="leaderboard-wrapper"></div>
                </div>
            </div>
        `;

        const leaderboardWrapper = parent.querySelector(".leaderboard-wrapper");
        new Leaderboard(leaderboardWrapper).start();
    }
}
