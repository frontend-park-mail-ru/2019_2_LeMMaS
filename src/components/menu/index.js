import BaseComponent from "components/baseComponent";
import { LinkButton, Button } from "components/buttons";
import UserInfo from "components/userInfo";
import User from "modules/user";
import router, { routes } from "modules/router";

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
        User.isLoggedIn() ? this._renderForLoggedIn() : this._renderForNoUser();
    };

    _renderForLoggedIn = () => {
        this.parent.innerHTML = `
            <span class="userinfo-wrapper"></span>
        `;
        new Button(this.parent, {
            text: "Выйти",
            onClick: this._onLogoutButtonClick,
            extraClass: "button__type-secondary",
        }).render();
        new UserInfo(this.parent.querySelector(".userinfo-wrapper")).start();
    };

    _renderForNoUser = () => {
        this.parent.innerHTML = `
            ${new LinkButton({
                text: "Войти",
                href: routes.USER_LOGIN,
                extraClass: "button__color-gold",
            }).renderString()}
            ${new LinkButton({
                text: "Регистрация",
                href: routes.USER_REGISTER,
                extraClass: "button__type-secondary",
            }).renderString()}
        `;
    };

    _onLogoutButtonClick = async () => {
        await User.logout();
        router.redirect(routes.INDEX);
    };
}
