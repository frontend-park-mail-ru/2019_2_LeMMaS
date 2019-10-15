import { html } from "common-tags";

import { routes } from "../../router";
import Session from "../../session";
import "./style.css";

export default class UserPicName {
    constructor(parent) {
        this.parent = parent;
    }

    async render() {
        console.log("rendering");
        const user = await Session.user();
        console.log("user = ");
        console.log(user);
        if (user !== null) {
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
                        ${user.name}
                    </a>
                </div>
            `;
        }
    }
}
