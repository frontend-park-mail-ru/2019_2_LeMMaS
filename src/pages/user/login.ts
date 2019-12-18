import { html } from "common-tags";

import { routes } from "modules/router";
import BasePage from "pages/basePage";
import Form from "components/form";
import Input from "components/form/elements/input";
import SubmitButton from "components/form/elements/submitButton";
import User from "modules/user";
import Router from "modules/router";
import Loader from "components/loader/index";

export default class Login extends BasePage {
    private loginForm: HTMLFormElement | undefined;

    renderContent = (parent: HTMLElement): void => {
        document.title = "Войти | LeMMaS";
        parent.innerHTML = html`
            <div class="plate plate__size-m">
                <h2 class="text__align-center text__size-big">Вход в игру</h2>
                <div class="form-wrapper"></div>
                <p>
                    Нет аккаунта?
                    <a href="${routes.USER_REGISTER}" class="link">Зарегистрироваться</a>
                </p>
            </div>
        `;
        const formElements = [
            new Input({
                name: "email",
                type: "email",
                label: "Email",
                required: true,
            }),
            new Input({
                name: "password",
                label: "Пароль",
                type: "password",
                required: true,
            }),
            new SubmitButton("Войти"),
        ];
        this.loginForm = new Form({
            parent: parent.querySelector(".form-wrapper"),
            elements: formElements,
            onSubmit: this.onLoginFormSubmit,
        });
        this.loginForm && this.loginForm.render();
    };

    onLoginFormSubmit = (e: Event): void => {
        e.preventDefault();

        if (!this.loginForm) {
            return;
        }

        const email = this.loginForm.getValue("email");
        const password = this.loginForm.getValue("password");

        if (password.length < 6) {
            this.loginForm.showError("Слишком короткий пароль");
            return;
        }
        this.login(email, password);
    };

    login = async (email: string, password: string): Promise<void> => {
        const loader = new Loader();
        loader.show();
        const response = await User.login(email, password);
        if (response.ok) {
            window.history.pushState({}, document.title, "/");
            Router.renderPage();
        } else {
            this.loginForm &&
                this.loginForm.showError("Неверная почта или пароль");
        }
        loader.hide();
    };
}
