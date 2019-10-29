import { html } from "common-tags";

import BasePage from "../basePage";
import Form from "../../components/form";
import Input from "../../components/form/elements/input";
import SubmitButton from "../../components/form/elements/submitButton";
import AvatarPreview from "../../components/avatarPreview";
import API from "../../api";
import Loader from "../../components/loader/index";

const AVATAR_PREVIEW_TIMEOUT = 650;

export default class Profile extends BasePage {
    constructor() {
        super();

        this.avatarPreviewTimeoutHandler = null;

        this.onEditProfileFormSubmit = this.onEditProfileFormSubmit.bind(this);
        this.onNameTyped = this.onNameTyped.bind(this);
    }

    async renderContent(parent) {
        document.querySelector("title").innerText = "Settings | LeMMaS";
        parent.innerHTML = html`
            <div class="plate plate__size-big profile-wrapper">
                <h2 class="text__align-center text__size-big">Edit profile</h2>
                <div class="avatar-preview-wrapper"></div>
                <div class="form-wrapper"></div>
            </div>
        `;

        this.avatarPreview = new AvatarPreview(
            parent.querySelector(".avatar-preview-wrapper")
        );
        this.avatarPreview.render();

        const formElements = [
            new Input({
                name: "name",
                label: "Name",
                tip: 'Try "trump", "cat" to get special avatar',
            }),
            new Input({
                name: "avatar",
                label: "Upload avatar manualy",
                type: "file",
            }),
            new Input({
                name: "password",
                label: "Change password",
                type: "password",
            }),
            new Input({
                name: "password-repeat",
                label: "Repeat password",
                type: "password",
            }),
            new SubmitButton("Save", "lavender"),
        ];
        this.profileForm = new Form(
            parent.querySelector(".form-wrapper"),
            formElements,
            this.onEditProfileFormSubmit,
            true
        );
        this.profileForm.render();

        parent
            .querySelector(".form__field.name")
            .addEventListener("input", this.onNameTyped);
    }

    onEditProfileFormSubmit(e) {
        e.preventDefault();
        const loader = new Loader(document.querySelector("html"));
        loader.showLoader();

        const name = this.profileForm.getValue("name");
        const password = this.profileForm.getValue("password");
        const passwordRepeat = this.profileForm.getValue("password-repeat");
        const userPic = document.querySelector('input[type="file"]');

        const error = document.querySelector(".form__error");
        error.style.visibility = "hidden";
        error.style.color = "red";

        if (password.length < 6 && password.length > 1) {
            error.innerText = "Password must be 6 letters or more";
            error.style.visibility = "visible";
            loader.hideLoader();
            return;
        }

        if (password !== passwordRepeat) {
            error.innerText = "Passwords don't match";
            error.style.visibility = "visible";
            loader.hideLoader();
            return;
        }

        let nameAndPasswordChange = false;

        if (name !== "" || password !== "") {
            API.changeUserData(name, password).then(response => {
                if (response.status !== 200) {
                    error.innerText = "Wrong name or password";
                    error.style.visibility = "visible";
                } else {
                    nameAndPasswordChange = true;
                    error.innerText = "Info changed";
                    error.style.color = "green";
                    error.style.visibility = "visible";
                }
            });
        }

        if (userPic.files[0] !== undefined) {
            const formData = new FormData();
            formData.append("avatar", userPic.files[0]);

            API.changeAvatar(formData).then(response => {
                if (response.status !== 200) {
                    error.innerText = "Something went wrong";
                    error.style.visibility = "visible";
                } else {
                    if (nameAndPasswordChange) {
                        error.innerText += "\nAvatar changed";
                    } else {
                        error.innerText = "Avatar changed";
                    }

                    error.style.color = "green";
                    error.style.visibility = "visible";
                    loader.hideLoader();
                }
            });
        } else {
            loader.hideLoader();
        }
    }

    onNameTyped(e) {
        const name = e.target.value;
        if (name === "") {
            this.avatarPreview.render();
            return;
        }
        if (this.avatarPreviewTimeoutHandler !== null) {
            clearTimeout(this.avatarPreviewTimeoutHandler);
        }
        this.avatarPreviewTimeoutHandler = setTimeout(() => {
            this.avatarPreview.render(name);
        }, AVATAR_PREVIEW_TIMEOUT);
    }
}
