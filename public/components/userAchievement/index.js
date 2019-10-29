import { html } from "common-tags";

import "./style.css";

export default class UserAchievement {
    constructor(name, value) {
        this.name = name;
        this.value = value;
    }

    renderString() {
        return html`
            <div class="userAchievement">
                <p>${this.name}</p>
                <p>${this.value}</p>
            </div>
        `;
    }
}
