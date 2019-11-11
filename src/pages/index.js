import { html } from "common-tags";

import BasePage from "./basePage";
import Leaderboard from "../components/leaderboard";
import { LinkButton } from "../components/buttons";
import UserInfo from "../components/userInfo";

export default class Index extends BasePage {
    renderContent(parent) {
        document.title = "LeMMaS";
        parent.innerHTML = html`
            <div class="plate">
                <div class="plate__innerContent">
                    <h2 class="text__align-center">Лучшие игроки</h2>
                    <div class="leaderboard-wrapper"></div>
                </div>
            </div>
            <div class="plate plate__size-big start-game-menu">
                <div class="plate__innerContent">
                    <h2 class="text__size-big text__align-center">Играть</h2>
                    ${new LinkButton({
                        text: "Одиночная",
                        href: "/game/singleplayer",
                        extraClass:
                            "button__size-big button__transparency-transparent",
                    }).renderString()}
                    ${new LinkButton({
                        text: "Мультиплеер (в разработке)",
                        disabled: true,
                        extraClass: "button__size-big button__color-red",
                    }).renderString()}
                </div>
            </div>
            <div class="plate">
                <div class="plate__innerContent user-info-wrapper"></div>
            </div>
        `;

        const leaderboardWrapper = parent.querySelector(".leaderboard-wrapper");
        new Leaderboard(leaderboardWrapper).start();

        const userInfoWrapper = parent.querySelector(".user-info-wrapper");
        const userInfo = new UserInfo(userInfoWrapper);
        userInfo.start();
    }
}
