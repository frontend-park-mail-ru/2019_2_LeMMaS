import { html } from "common-tags";
import "./style.css";

export default class UserPicName {
    render() {
        return html`
            <div class="userPicName">
                <div class="anchorImg__wrapper">
                    <a href="settings" class="anchorImg__position-absolute">
                        <img
                            class="userPicName__img"
                            alt="userpic"
                            src="static/assets/img/userpic.png"
                        />
                        UserName
                    </a>
                </div>
            </div>
        `;
    }
}
