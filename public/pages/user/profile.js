import { html } from "common-tags";

import BasePage from "../basePage";
import ProfileForm from "../../components/profileForm";
import API from "../../api";
import Loader from "../../components/loader/index";

export default class Profile extends BasePage {
    constructor() {
        super();
        this.avatarPreviewTimeoutHandler = null;
        this.onEditProfileFormSubmit = this.onEditProfileFormSubmit.bind(this);
    }

    async renderContent(parent) {
        document.title = "Settings | LeMMaS";
        parent.innerHTML = html`
            <div class="plate plate__size-big profile-wrapper">
                <h2 class="text__align-center text__size-big">Edit profile</h2>
                <div class="form-wrapper"></div>
            </div>
        `;

        this.profileForm = new ProfileForm(
            parent.querySelector(".form-wrapper"),
            this.onEditProfileFormSubmit
        );
        this.profileForm.render();
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
}
