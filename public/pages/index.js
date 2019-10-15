import { html } from "common-tags";

import BasePage from "./basePage";
import Leaderboard from "../components/leaderboard";
import Button from "../components/buttons";
import UserInfo from "../components/userInfo";

export default class Index extends BasePage {
    renderContent(parent) {
        parent.innerHTML = html`
            <div class="plate">
                <h2 class="text__align-center">Leaderboard</h2>
                <div class="leaderboard-wrapper"></div>
            </div>
            <div class="plate plate__size-big start-game-menu">
                <h2 class="text__size-big text__align-center">Play</h2>
                ${new Button({
                    text: "Singleplayer",
                    extraClass:
                        "button__size-big button__transparency-transparent",
                }).renderString()}
                ${new Button({
                    text: "Multiplayer",
                    extraClass: "button__size-big button__color-yellow",
                }).renderString()}
                ${new Button({
                    text: "Experimental",
                    extraClass: "button__size-big button__color-red",
                }).renderString()}
            </div>
            <div class="plate user-info-wrapper"></div>
        `;

        const leaderboardWrapper = parent.querySelector(".leaderboard-wrapper");
        new Leaderboard(leaderboardWrapper).render();

        const userInfoWrapper = parent.querySelector(".user-info-wrapper");
        new UserInfo(userInfoWrapper).render();
    }
}
