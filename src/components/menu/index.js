import { html } from "common-tags";

import BaseComponent from "../baseComponent";
import { LinkButton, Button } from "../buttons";
import User from "../../modules/user";
import router, { routes } from "../../modules/router";

import "./style.css";

export default class Menu extends BaseComponent {
    constructor(parent) {
        super(parent);
    }

    start = () => {
        const interval = setInterval(() => {
            if (User.getCurrentUser() !== undefined) {
                this._render();
                clearInterval(interval);
            }
        }, 200);
    };

    _render = async () => {
        if (User.isLoggedIn()) {
            new Button(this.parent, {
                text: "Выйти",
                onClick: this._onLogoutButtonClick,
                extraClass: "button__type-secondary",
            }).render();
            return;
        }
        this.parent.innerHTML = html`
            ${new LinkButton({
                text: "Войти",
                href: routes.USER_LOGIN,
                extraClass: "button__color-violet",
            }).renderString()}
            ${new LinkButton({
                text: "Регистрация",
                href: routes.USER_REGISTER,
                extraClass: "button__type-secondary",
            }).renderString()}
        `;
    };

    async _onLogoutButtonClick() {
        await User.logout();
        router.redirect(routes.INDEX);
    }
}
