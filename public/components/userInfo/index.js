import { html, safeHtml } from "common-tags";
import { routes } from "../../router";
import User from "../../user";
import { LinkButton } from "../buttons";
import "./style.css";
import Loader from "../../components/loader/index";

export default class UserInfo {
    constructor(parent) {
        this.parent = parent;
    }

    start() {
        const loader = new Loader();
        loader.show();
        User.getCurrentUser().then(currentUser => {
            this.render(currentUser);
            loader.hide();
        });
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
            this.parent.innerHTML = html`
                <h2 class="text__align-center">You</h2>
                <div class="userPicName">
                    <a href="${routes.USER_PROFILE_PAGE_ROUTE}">
                        <div class="anchorImg__wrapper">
                            <img
                                class="userPicName__img"
                                alt="userpic"
                                src="${User.getAvatarUrl()}"
                            />
                        </div>
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
}
