import { html } from "common-tags";

import BasePage from "pages/basePage";
import User from "modules/user";
import ProfileForm from "components/profileForm";
import Loader from "components/loader/index";
import router from "modules/router";
import Menu from "components/menu";

const TITLE = "О себе";

export default class Profile extends BasePage {
    private profileForm: HTMLFormElement | undefined;

    constructor() {
        super();
    }

    renderContent = (parent: HTMLElement): void => {
        const interval = setInterval(() => {
            if (User.getCurrentUser() !== undefined) {
                this._render(parent);
                clearInterval(interval);
            }
        }, 200);
    };

    _render = async (parent: HTMLElement): Promise<void> => {
        if (!User.isLoggedIn()) {
            router.render404();
            return;
        }

        document.title = TITLE + " | LeMMaS";
        parent.innerHTML = html`
            <div class="plate profile-wrapper">
                <h2 class="text__align-center text__size-big">${TITLE}</h2>
                <div class="form-wrapper"></div>
            </div>
        `;

        this.profileForm = new ProfileForm(
            parent.querySelector(".form-wrapper"),
            this.onEditProfileFormSubmit
        );
        await (this.profileForm && this.profileForm.start());
    };

    onEditProfileFormSubmit = async (e: Event): Promise<void> => {
        e.preventDefault();
        const loader = new Loader();
        loader.show();

        if (!this.profileForm) {
            return;
        }

        const name = this.profileForm.getValue("name");
        const password = this.profileForm.getValue("password");
        const passwordRepeat = this.profileForm.getValue("password-repeat");
        const userPic: HTMLInputElement | null = document.querySelector(
            'input[type="file"]'
        );

        if (password.length < 6 && password.length > 0) {
            this.profileForm.showError(
                "Пароль не должен быть короче 6 символов"
            );
            loader.hide();
            return;
        }

        if (password !== passwordRepeat) {
            this.profileForm.showError("Пароли не совпадают");
            loader.hide();
            return;
        }

        const user = User.getCurrentUser();

        if (user) {
            if ((name !== "" && name !== user.name) || password !== "") {
                const response = await User.update(name, password);
                response.ok
                    ? this.profileForm.showOK("Изменения сохранены")
                    : this.profileForm.showError("Произошла ошибка");
            }
        }

        if (userPic && userPic.files && userPic.files[0]) {
            const formData = new FormData();
            formData.append("avatar", userPic.files[0]);
            const response = await User.updateAvatar(formData);
            if (!response.ok) {
                this.profileForm.showError("Произошла ошибка");
                return;
            }
            this.profileForm.showOK("Изменения сохранены");
        }

        User.updateCurrentUser().then(() => {
            new Menu(document.querySelector(".menu")).start();
        });

        loader.hide();
    };
}
