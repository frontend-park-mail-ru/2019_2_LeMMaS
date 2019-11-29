import { safeHtml } from "common-tags";

import BaseComponent from "components/baseComponent";
import { routes } from "modules/router";
import User from "modules/user";

import "./style.css";

export default class UserInfo extends BaseComponent {
    start() {
        const interval = setInterval(() => {
            if (User.getCurrentUser() !== undefined) {
                this.render(User.getCurrentUser());
                clearInterval(interval);
            }
        }, 200);
    }

    async render(currentUser) {
        if (currentUser === null) {
            return;
        }
        this.parent.innerHTML = `
            <a href="${routes.USER_PROFILE}" class="userinfo">
                <span class="userinfo__name">${safeHtml`${currentUser.name}`}</span>
                <img
                    class="userinfo__avatar"
                    src="${await User.getAvatarUrl()}"
                />
            </a>
        `;
    }
}
