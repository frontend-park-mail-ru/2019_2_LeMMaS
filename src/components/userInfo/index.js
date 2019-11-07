import { html, safeHtml } from "common-tags";

import BaseComponent from "../baseComponent";
import Loader from "../loader";
import { routes } from "../../modules/router";
import User from "../../modules/user";

import "./style.css";

export default class UserInfo extends BaseComponent {
    start() {
        const loader = new Loader();
        loader.show();
        User.updateCurrentUser().then(currentUser => {
            this.render(currentUser);
            loader.hide();
        });
    }

    async render(currentUser) {
        if (currentUser === null) {
            this.parent.innerHTML = html`
                <p>
                    <a href="${routes.USER_LOGIN}">Войдите</a>, чтобы начать
                    игру
                </p>
            `;
            return;
        }
        this.parent.innerHTML = html`
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
        `;
    }
}
