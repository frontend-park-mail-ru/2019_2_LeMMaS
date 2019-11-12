import { html } from "common-tags";

import BasePage from "../basePage";
import User from "../../modules/user";
import ProfileForm from "../../components/profileForm";
import Loader from "../../components/loader/index";

export default class Profile extends BasePage {
    constructor() {
        super();
        this.avatarPreviewTimeoutHandler = null;
        this.onEditProfileFormSubmit = this.onEditProfileFormSubmit.bind(this);
    }

    async renderContent(parent) {
        document.title = "Мой профиль | LeMMaS";
        parent.innerHTML = html`
            <div class="plate plate__size-big profile-wrapper">
                <h2 class="text__align-center text__size-big">Мой профиль</h2>
                <div class="form-wrapper"></div>
            </div>
        `;

        this.profileForm = new ProfileForm(
            parent.querySelector(".form-wrapper"),
            this.onEditProfileFormSubmit
        );
        await this.profileForm.start();
    }

    onEditProfileFormSubmit(e) {
        e.preventDefault();
        const loader = new Loader();
        loader.show();

        const name = this.profileForm.getValue("name");
        const password = this.profileForm.getValue("password");
        const passwordRepeat = this.profileForm.getValue("password-repeat");
        const userPic = document.querySelector('input[type="file"]');

        const error = document.querySelector(".form__error");
        error.style.visibility = "hidden";
        error.style.color = "red";

        if (password.length < 6 && password.length > 1) {
            error.innerText = "Пароль должен содержать не менее 6 символов";
            error.style.visibility = "visible";
            loader.hide();
            return;
        }

        if (password !== passwordRepeat) {
            error.innerText = "Пароли не совпадают";
            error.style.visibility = "visible";
            loader.hide();
            return;
        }

        if (
            (name !== "" && name !== User.getCurrentUser().name) ||
            password !== ""
        ) {
            User.update(name, password).then(response => {
                if (response.status !== 200) {
                    error.innerText = "Произошла ошибка";
                    error.style.visibility = "visible";
                } else {
                    error.innerText = "Изменения сохранены";
                    error.style.color = "green";
                    error.style.visibility = "visible";
                }
            });
        }

        if (userPic.files[0]) {
            const formData = new FormData();
            formData.append("avatar", userPic.files[0]);

            User.updateAvatar(formData)
                .then(response => {
                    if (response.status !== 200) {
                        error.innerText = "Произошла ошибка";
                        error.style.visibility = "visible";
                    } else if (response.status === 403) {
                        error.innerText += "\nАватарка слишком большая";
                        error.style.visibility = "visible";
                    } else if (response.status === 200) {
                        error.innerText = "Изменения сохранены";
                        error.style.color = "green";
                        error.style.visibility = "visible";
                    }
                })
                .finally(() => loader.hide())
                .catch(error =>
                    error ? console.log(error) : console.log("errorr")
                );
        } else {
            loader.hide();
        }
    }
}
