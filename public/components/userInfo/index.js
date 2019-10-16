import { html } from "common-tags";

import { routes } from "../../router";
import Session from "../../session";
import UserAchievement from "../userAchievement";
import { LinkButton } from "../buttons";

import "./style.css";

export default class UserInfo {
    constructor(parent) {
        this.parent = parent;
    }

    async render() {
        const currentUser = await Session.user();
        if (currentUser === null) {
            this.parent.innerHTML = html`
                <p>
                    <a href="${routes.USER_LOGIN_PAGE_ROUTE}">Log in</a> to
                    play!
                </p>
            `;
        } else {
            this.parent.innerHTML = html`
                <div class="userPicName">
                    <div class="anchorImg__wrapper">
                        <img
                            class="userPicName__img"
                            alt="userpic"
                            src="static/assets/img/userpic.png"
                        />
                        <a
                            href="${routes.USER_PROFILE_PAGE_ROUTE}"
                            class="anchorImg__position-absolute"
                        ></a>
                    </div>
                    <a
                        class="userPicName__name"
                        href="${routes.USER_PROFILE_PAGE_ROUTE}"
                    >
                        ${currentUser.name}
                    </a>
                </div>
                ${new UserAchievement("XP", "100").renderString()}
                ${new UserAchievement("Coins", "130").renderString()}
                ${new LinkButton({
                    text: "Shop",
                    href: "shop",
                    extraClass: "button__size-big button__color-violet",
                }).renderString()}
            `;
        }
    }
}