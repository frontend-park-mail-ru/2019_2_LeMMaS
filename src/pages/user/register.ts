import { html } from "common-tags";

import BasePage from "pages/basePage";
import Form from "components/form";
import Input from "components/form/elements/input";
import SubmitButton from "components/form/elements/submitButton";
import User from "modules/user";
import Router from "../../modules/router";

export default class Register extends BasePage {
    private registerForm: HTMLFormElement | undefined;

    constructor() {
        super();
    }

    renderContent = (parent: HTMLElement) => {
        document.title = "Register | LeMMaS";

        parent.innerHTML = html`
            <div class="plate plate__size-m">
                <h2 class="text__align-center text__size-big">Регистрация</h2>
                <p class="form__caption">
                    Зарегистрируйтесь, чтобы играть с друзьями и сохранять
                    игровой прогресс
                </p>
                <div class="form-wrapper"></div>
            </div>
        `;
        const formElements = [
            new Input({
                name: "email",
                label: "Email",
                type: "email",
                required: true,
            }),
            new Input({ name: "name", label: "Имя", required: true }),
            new Input({
                name: "password",
                label: "Пароль",
                type: "password",
                required: true,
            }),
            new Input({
                name: "password-repeat",
                label: "Повторите пароль",
                type: "password",
                required: true,
            }),
            new SubmitButton("Зарегистрироваться"),
        ];
        this.registerForm = new Form({
            parent: parent.querySelector(".form-wrapper"),
            elements: formElements,
            onSubmit: this.onRegisterFormSubmit,
        });
        this.registerForm && this.registerForm.render();
    };

    onRegisterFormSubmit = async (e: Event): Promise<void> => {
        e.preventDefault();

        if (!this.registerForm) {
            return;
        }

        const email = this.registerForm.getValue("email");
        const name = this.registerForm.getValue("name");
        const password = this.registerForm.getValue("password");
        const passwordRepeat = this.registerForm.getValue("password-repeat");

        if (password.length < 6) {
            this.registerForm.showError(
                "Пароль не должен быть короче 6 символов"
            );
            return;
        }

        if (password !== passwordRepeat) {
            this.registerForm.showError("Пароли не совпадают");
            return;
        }

        const response = await User.register(email, name, password);
        if (response.ok) {
            const response = await User.login(email, password);
            if (response.ok) {
                window.history.pushState({}, document.title, "/");
                Router.renderPage();
            } else {
                this.registerForm.showError("Неизвестная ошибка");
            }
            return;
        }

        const responseJson = await response.json();

        if (
            responseJson.body.message ===
            "user with this email already registered"
        ) {
            this.registerForm.showError(
                "Пользователь с таким email уже существует"
            );
        } else {
            this.registerForm.showError("Произошла неизвестная ошибка");
        }
    };
}
