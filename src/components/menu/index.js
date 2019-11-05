import { html } from "common-tags";

import BaseComponent from "../baseComponent";
import { LinkButton, Button } from "../buttons";
import { routes } from "../../modules/router";
import User from "../../modules/user";
import API from "../../modules/api";

import "./style.css";

export default class Menu extends BaseComponent {
    constructor(parent) {
        super(parent);
        this._onLogoutButtonClick = this._onLogoutButtonClick.bind(this);
    }

    async render() {
        const currentUser = await User.getCurrentUser();
        if (currentUser !== null) {
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
    }

    async _onLogoutButtonClick() {
        await API.logoutUser();
        location.reload();
    }
}
