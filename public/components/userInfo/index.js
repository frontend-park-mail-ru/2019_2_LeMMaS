import { html } from "common-tags";
const BACKEND_URL = "https://quiet-depths-50475.herokuapp.com/";

import { routes } from "../../router";
import Session from "../../session";
import { LinkButton } from "../buttons";
import "./style.css";

export default class UserInfo {
    constructor(parent) {
        this.parent = parent;
    }

    start() {
        this.preRender().then(
            currentUser => {
                this.render(currentUser);
            }
        );
    }

     preRender() {
        const currentUser = Session.user();
        return currentUser;
    }

    async render(currentUser) {
        if (currentUser === null) {
            this.parent.innerHTML = html`
                <p>
                    <a href="${routes.USER_LOGIN_PAGE_ROUTE}">Log in</a> to
                    play!
                </p>
            `;
        } else {
            let src;
            if(currentUser.avatar_path !== null)
            {
                src = BACKEND_URL + currentUser.avatar_path;
            } else {
                src = "static/assets/img/userpic.png";
            }
            this.parent.innerHTML = html`
                <div class="userPicName">
                    <div class="anchorImg__wrapper">
                        <img
                            class="userPicName__img"
                            alt="userpic"
                            src="${src}"
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
                ${new LinkButton({
                    text: "Shop",
                    href: "shop",
                    extraClass: "button__size-big button__color-violet",
                }).renderString()}
            `;
        }
    }
}
