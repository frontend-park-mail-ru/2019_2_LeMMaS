import { html, safeHtml } from "common-tags";
import { routes } from "../../router";
import Session from "../../session";
import { LinkButton } from "../buttons";
import "./style.css";
import Loader from "../../components/loader/index";
import { BACKEND_URL } from "../../api";

export default class UserInfo {
    constructor(parent) {
        this.parent = parent;
    }

    start() {
        const loader = new Loader(document.querySelector("html"));
        loader.showLoader();
        this.preRender().then(currentUser => {
            this.render(currentUser);
            loader.hideLoader();
        });
    }

    preRender() {
        return Session.getUserData();
    }

    render(currentUser) {
        if (currentUser === null) {
            this.parent.innerHTML = html`
                <p>
                    <a href="${routes.USER_LOGIN_PAGE_ROUTE}">Log in</a> to
                    play!
                </p>
            `;
        } else {
            const avatarImageSrc = this.getAvatarUrl(currentUser);
            this.parent.innerHTML = html`
                <div class="userPicName">
                    <div class="anchorImg__wrapper">
                        <img
                            class="userPicName__img"
                            alt="userpic"
                            src="${avatarImageSrc}"
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
                        ${safeHtml`${currentUser.name}`}
                    </a>
                </div>
                ${new LinkButton({
                    text: "Shop",
                    href: "shop",
                    extraClass:
                        "button__size-big button__color-violet shop-button",
                }).renderString()}
            `;
        }
    }

    getAvatarUrl(user) {
        if (!user.avatar_path) {
            return "static/assets/img/userpic.png";
        }
        return user.avatar_path.indexOf("http") === 0
            ? user.avatar_path
            : BACKEND_URL + "/" + user.avatar_path;
    }
}
