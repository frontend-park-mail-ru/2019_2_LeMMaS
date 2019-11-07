import { html } from "common-tags";
import Form from "../form";
import Input from "../form/elements/input";
import SubmitButton from "../form/elements/submitButton";
import AvatarSelect from "../avatarSelect";
import User from "../../user";

import "./style.css";

const AVATAR_PREVIEW_TIMEOUT = 600;

export default class ProfileForm extends Form {
    constructor(parent, onSubmit) {
        super({
            parent,
            elements: [],
            onSubmit,
            extraClass: "profile-form",
            big: true,
        });
        this.parent = parent;
        this.onSubmit = onSubmit;
        this.onNameTyped = this.onNameTyped.bind(this);
    }

    async renderElements(form) {
        const user = await User.getCurrentUser();
        form.innerHTML = html`
            <div class="form__row">
                <div class="form__column avatar-select-wrapper"></div>
                <div class="form__column">
                    ${new Input({
                        name: "name",
                        label: "Name",
                        value: user.name,
                        tip: 'Try "trump", "cat" to get special avatar',
                    }).renderString()}
                </div>
            </div>
            ${new Input({
                name: "password",
                label: "Change password",
                type: "password",
            }).renderString()}
            ${new Input({
                name: "password-repeat",
                label: "Repeat password",
                type: "password",
            }).renderString()}
            ${new SubmitButton("Save", "yellow").renderString()}
        `;

        this.avatarSelect = new AvatarSelect(
            form.querySelector(".avatar-select-wrapper"),
            await User.getAvatarUrl()
        );
        this.avatarSelect.render();

        form.querySelector(".form__field.name").addEventListener(
            "input",
            this.onNameTyped
        );
        form.querySelector(".form__field.password").autocomplete =
            "new-password";
        form.querySelector(".form__field.password-repeat").autocomplete =
            "new-password";
    }

    onNameTyped(e) {
        const name = e.target.value;
        if (name === "") {
            this.avatarSelect.render();
            return;
        }
        if (this.avatarPreviewTimeoutHandler !== null) {
            clearTimeout(this.avatarPreviewTimeoutHandler);
        }
        this.avatarPreviewTimeoutHandler = setTimeout(() => {
            this.avatarSelect.previewByName(name);
        }, AVATAR_PREVIEW_TIMEOUT);
    }
}
