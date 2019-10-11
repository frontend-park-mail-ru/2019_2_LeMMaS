import { html } from "common-tags";

import BasePage from "./basePage";
import Leaderboard from "../components/leaderboard";
import Button from "../components/buttons";
import UserPicName from "../components/userPicName";
import UserAchievement from "../components/userAchievement";

export default class Index extends BasePage {
    renderContent() {
        const players = [];
        for (let i = 1; i < 10; i++) {
            players.push({ id: i, isMe: i === 4 });
        }
        return html`
            <div class="plate">
                <h2 class="text__align-center">Leaderboard</h2>
                ${new Leaderboard(players).render()}
            </div>
            <div class="plate plate__size-big start-game-menu">
                <h2 class="text__size-big text__align-center">Play</h2>
                ${new Button(
                    "",
                    "Singleplayer",
                    "button__size-big button__transparency-transparent"
                ).render()}
                ${new Button(
                    "",
                    "Multiplayer",
                    "button__size-big button__color-yellow"
                ).render()}
                ${new Button(
                    "",
                    "Experimental",
                    "button__size-big button__color-red"
                ).render()}
            </div>
            <div class="plate">
                ${new UserPicName().render()}
                ${new UserAchievement("XP", "100").render()}
                ${new UserAchievement("Coins", "130").render()}
                ${new Button(
                    "shop",
                    "Shop",
                    "button__size-big button__color-violet"
                ).render()}
            </div>
        `;
    }
}
