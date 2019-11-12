import { html } from "common-tags";

import { routes } from "../../modules/router";
import BasePage from "../basePage";
import Form from "../../components/form";
import Input from "../../components/form/elements/input";
import SubmitButton from "../../components/form/elements/submitButton";
import User from "../../modules/user";
import Router from "../../modules/router";
import Loader from "../../components/loader/index";

export default class Login extends BasePage {
    constructor() {
        super();
        this.onLoginFormSubmit = this.onLoginFormSubmit.bind(this);
    }

    renderContent(parent) {
        document.title = "Login | LeMMaS";
        parent.innerHTML = html`
            <div class="plate plate__size-big">
                <h2 class="text__align-center text__size-big">Войти</h2>
                <div class="form-wrapper"></div>
                <p>
                    Нет аккаунта?
                    <a href="${routes.USER_REGISTER}">Зарегистрироваться</a>
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
            new SubmitButton("Войти", "yellow"),
        ];
        this.loginForm = new Form({
            parent: parent.querySelector(".form-wrapper"),
            elements: formElements,
            onSubmit: this.onLoginFormSubmit,
            big: true,
        });
        this.loginForm.render();
    }

    onLoginFormSubmit(e) {
        e.preventDefault();

        const email = this.loginForm.getValue("email");
        const password = this.loginForm.getValue("password");

        if (password.length < 6) {
            this.loginForm.showError("Слишком короткий пароль");
            return;
        }
        this.login(email, password);
    }

    login(email, password) {
        const loader = new Loader();
        loader.show();

        User.login(email, password)
            .then(response => {
                if (!response.ok) {
                    this.loginForm.showError("Неверная почта или пароль");
                    return;
                }
                window.history.pushState({}, document.title, "/");
                Router.renderPage();
            })
            .finally(loader.hide())
            .catch(error => console.log(error));
    }
}
