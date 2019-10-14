import { html } from "common-tags";

import { routes } from "../../router";
import "./style.css";

export default class UserPicName {
    renderString() {
        return html`
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
                    >UserName</a
                >
            </div>
        `;
    }
}
