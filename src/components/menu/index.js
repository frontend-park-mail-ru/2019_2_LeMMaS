import { html } from "common-tags";

import BaseComponent from "../baseComponent";
import { LinkButton, Button } from "../buttons";
import { routes } from "../../modules/router";
import User from "../../modules/user";
import API from "../../modules/api";
import router from "../../modules/router";

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
                extraClass: "button__transparency-transparent",
                onClick: this._onLogoutButtonClick,
            }).render();
            return;
        }
        this.parent.innerHTML = html`
            ${new LinkButton({
                text: "Войти",
                href: routes.USER_LOGIN,
                extraClass: "button__transparency-transparent",
            }).renderString()}
            ${new LinkButton({
                text: "Регистрация",
                href: routes.USER_REGISTER,
            }).renderString()}
        `;
    };

    _onLogoutButtonClick = async () =>
        API.logoutUser().then(() => {
            router.renderPage();
        });
}
