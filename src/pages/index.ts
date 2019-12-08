import { html } from "common-tags";

import BasePage from "pages/basePage";
import Login from "pages/user/login";
import { LinkButton } from "components/buttons";
import User from "modules/user";
import ModalWindow from "components/modalWindow";

import "components/startGameMenu/style.css";

export default class Index extends BasePage {
    renderContent = (parent: Element): void => {
        const interval = setInterval(() => {
            if (User.getCurrentUser() !== undefined) {
                this._render(parent);
                clearInterval(interval);
            }
        }, 200);
    };

    _render = (parent: Element): void => {
        document.title = "LeMMaS";

        const multiHref = User.getCurrentUser() ? "/game/multiplayer" : null;
        parent.innerHTML = html`
            <div class="plate start-game-menu">
                <div class="plate__innerContent">
                    <div class="start-game-buttons-wrapper">
                        ${new LinkButton({
                            text: "Одиночная",
                            href: "/game/singleplayer",
                            icon: "😎",
                            extraClass: "button__type-primary",
                        }).renderString()}
                        ${new LinkButton({
                            text: "Мультиплеер",
                            href: multiHref,
                            icon: "👨‍👩‍👧‍👦",
                            extraClass: "button__type-danger multiplayer",
                        }).renderString()}
                    </div>
                </div>
            </div>
        `;

        if (!User.getCurrentUser()) {
            const multiplayer = document
                .querySelector(".multiplayer");

            multiplayer && multiplayer
                .addEventListener("click", () => {
                    const loginWindow = new ModalWindow(document.body);
                    loginWindow.start(
                        "Сначала нужно войти",
                        null,
                        null,
                        new Login()
                    );
                });
        }
    };
}
