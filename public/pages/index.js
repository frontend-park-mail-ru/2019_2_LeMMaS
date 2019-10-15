import { html } from "common-tags";

import BasePage from "./basePage";
import Leaderboard from "../components/leaderboard";
import Button from "../components/buttons";
import UserPicName from "../components/userPicName";
import UserAchievement from "../components/userAchievement";

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
            <div class="plate">
                <span class="userPicName-wrapper"></span>
                ${new UserAchievement("XP", "100").renderString()}
                ${new UserAchievement("Coins", "130").renderString()}
                ${new Button({
                    text: "Shop",
                    href: "shop",
                    extraClass: "button__size-big button__color-violet",
                }).renderString()}
            </div>
        `;

        const leaderboardWrapper = parent.querySelector(".leaderboard-wrapper");
        new Leaderboard(leaderboardWrapper).render();

        const userPicNameWrapper = parent.querySelector(".userPicName-wrapper");
        new UserPicName(userPicNameWrapper).render();
    }
}
