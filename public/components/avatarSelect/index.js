import { html } from "common-tags";

import API from "../../api";

import "./style.css";

export default class AvatarSelect {
    constructor(parent, userAvatarUrl) {
        this.parent = parent;
        this.userAvatarUrl = userAvatarUrl;
    }

    render(avatarUrl = "") {
        this.parent.innerHTML = html`
            <input
                type="file"
                class="avatar-input"
                name="avatar"
                id="avatar-input"
            />
            <label for="avatar-input">
                <img
                    class="avatar"
                    src="${avatarUrl ? avatarUrl : this.userAvatarUrl}"
                />
                <span class="avatar-input__tip">Edit</span>
            </label>
        `;
        this.parent
            .querySelector("input[type=file]")
            .addEventListener("change", e => {
                const filename = e.target.value.split("\\").pop();
                const tip =
                    filename.slice(0, 10) + (filename.length > 10 ? "..." : "");
                this.parent.querySelector(".avatar-input__tip").innerHTML = tip;
            });
    }

    async previewByName(name = "") {
        const avatarUrl = name ? await API.getAvatarPreviewUrl(name) : null;
        this.render(avatarUrl);
    }
}
