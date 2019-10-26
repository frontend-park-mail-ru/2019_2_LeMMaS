import { html } from "common-tags";

import { routes } from "../../router";
import { LinkButton, Button } from "../buttons";
import Session from "../../session";
import API from "../../api";

import "./style.css";

export default class Menu {
    constructor(parent) {
        this.parent = parent;

        this._onLogoutButtonClick = this._onLogoutButtonClick.bind(this);
    }

    async render() {
        const currentUser = await Session.getUserData();
        if (currentUser != null) {
            this.parent.innerHTML = html`
                <span class="logout-button-wrapper"></span>
            `;
            const logoutButtonWrapper = this.parent.querySelector(
                ".logout-button-wrapper"
            );
            new Button(logoutButtonWrapper, {
                text: "LOGOUT",
                extraClass: "button__transparency-transparent",
                onClick: this._onLogoutButtonClick,
            }).render();
        } else {
            this.parent.innerHTML = html`
                ${new LinkButton({
                    text: "LOGIN",
                    href: routes.USER_LOGIN_PAGE_ROUTE,
                    extraClass: "button__transparency-transparent",
                }).renderString()}
                ${new LinkButton({
                    text: "REGISTER",
                    href: routes.USER_REGISTER_PAGE_ROUTE,
                }).renderString()}
            `;
        }
    }

    async _onLogoutButtonClick() {
        await API.logoutUser();
        location.reload();
    }
}
