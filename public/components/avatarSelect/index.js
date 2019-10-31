import { html } from "common-tags";

import API from "../../api";

import "./style.css";

const FILE_NAME_DISPLAY_LIMIT = 9;

export default class AvatarSelect {
    constructor(parent, userAvatarUrl) {
        this.parent = parent;
        this.userAvatarUrl = userAvatarUrl;
    }

    render(avatarUrl = "") {
        this.parent.innerHTML = html`
            <div class="avatar-input-wrapper">
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
                    <i class="avatar-input__upload-icon fas fa-upload"></i>
                </label>
            </div>
        `;
        this.parent
            .querySelector("input[type=file]")
            .addEventListener("change", e => {
                const filename = e.target.value.split("\\").pop();
                const tip =
                    filename.slice(0, FILE_NAME_DISPLAY_LIMIT) +
                    (filename.length > FILE_NAME_DISPLAY_LIMIT ? "..." : "");
                this.parent.querySelector(".avatar-input__tip").innerHTML = tip;
                this.parent
                    .querySelector(".avatar-input-wrapper")
                    .classList.add("avatar-input-wrapper_file-selected");
            });
    }

    async previewByName(name = "") {
        const avatarUrl = name ? await API.getAvatarPreviewUrl(name) : null;
        this.render(avatarUrl);
    }
}
