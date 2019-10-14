import { html } from "common-tags";

import BasePage from "./basePage";
import Leaderboard from "../components/leaderboard";
import Button from "../components/buttons";
import UserPicName from "../components/userPicName";
import UserAchievement from "../components/userAchievement";

export default class Index extends BasePage {
    renderContent(parent) {
        const players = [];
        for (let i = 1; i < 10; i++) {
            players.push({ id: i, isMe: i === 4 });
        }
        parent.innerHTML = html`
            <div class="plate">
                <h2 class="text__align-center">Leaderboard</h2>
                ${new Leaderboard(players).renderString()}
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
                ${new UserPicName().renderString()}
                ${new UserAchievement("XP", "100").renderString()}
                ${new UserAchievement("Coins", "130").renderString()}
                ${new Button({
                    text: "Shop",
                    href: "shop",
                    extraClass: "button__size-big button__color-violet",
                }).renderString()}
            </div>
        `;
    }
}
