import { html } from "common-tags";

import API from "../../api";

import "./style.css";

export default class AvatarPreview {
    constructor(parent) {
        this.parent = parent;
    }

    async render(name = "") {
        const avatarUrl =
            name === "" ? "" : await API.getAvatarPreviewUrl(name);
        this.parent.innerHTML = html`
            <img class="avatar-preview" src="${avatarUrl}" />
        `;
    }
}
