import { html, safeHtml } from "common-tags";

import BaseComponent from "../baseComponent";
import Loader from "../loader";
import { routes } from "../../modules/router";
import User from "../../modules/user";

import "./style.css";

export default class UserInfo extends BaseComponent {
    start() {
        const loader = new Loader(this.parent, this.parent.parentElement);
        loader.show();
        const interval = setInterval(() => {
            if (User.getCurrentUser() !== undefined) {
                this.render(User.getCurrentUser()).then(() => loader.hide());
                clearInterval(interval);
            }
        }, 200);
    }

    async render(currentUser) {
        if (currentUser === null) {
            return;
        }
        this.parent.innerHTML = html`
            <div class="plate">
                <div class="plate__innerContent ">
            <h2 class="text__align-center">Профиль</h2>
            <div class="userPicName">
                <a href="${routes.USER_PROFILE}">
                    <div class="anchorImg__wrapper">
                        <img
                            class="userPicName__img"
                            alt="userpic"
                            src="${await User.getAvatarUrl()}"
                        />
                    </div>
                    ${safeHtml`${currentUser.name}`}
                </a>
            </div>
            </div>
            </div>
        `;
    }
}
