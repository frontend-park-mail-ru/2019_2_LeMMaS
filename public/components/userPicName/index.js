import { html } from "common-tags";
import "./style.css";

export default class UserPicName {
    render() {
        return html`
            <div class="userPicName">
                <div class="anchorImg__wrapper">
                    <img
                        class="userPicName__img"
                        alt="userpic"
                        src="static/assets/img/userpic.png"
                    />
                    <a href="settings" class="anchorImg__position-absolute"></a>
                </div>
                <a class="userPicName__name" href="settings">UserName</a>
            </div>
        `;
    }
}
