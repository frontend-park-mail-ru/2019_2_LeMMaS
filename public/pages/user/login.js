import { html } from "common-tags";

import { routes } from "../../router";
import BasePage from "../basePage";
import Form from "../../components/form";
import Input from "../../components/form/elements/input";
import SubmitButton from "../../components/form/elements/submitButton";
import API from "../../api";
import Router from "../../router";

export default class Login extends BasePage {
    constructor() {
        super();
        this.onLoginFormSubmit = this.onLoginFormSubmit.bind(this);
    }

    renderContent(parent) {
        document.querySelector("title").innerText = "Login | LeMMaS";
        parent.innerHTML = html`
            <div class="plate plate__size-big">
                <h2 class="text__align-center text__size-big">Login</h2>
                <div class="form-wrapper"></div>
                <p>
                    Don't have an account?
                    <a href="${routes.USER_REGISTER_PAGE_ROUTE}">Register</a>
                </p>
            </div>
        `;
        const formElements = [
            new Input({ name: "email", label: "Email", required: true }),
            new Input({
                name: "password",
                label: "Password",
                type: "password",
                required: true,
            }),
            new SubmitButton("Login", "lavender"),
        ];
        this.loginForm = new Form(
            parent.querySelector(".form-wrapper"),
            formElements,
            this.onLoginFormSubmit,
            true
        );
        this.loginForm.render();
    }

    onLoginFormSubmit(e) {
        e.preventDefault();
        document.querySelector("body").style.filter = "blur(4px)";

        const email = this.loginForm.getValue("email");
        const password = this.loginForm.getValue("password");
        const error = document.querySelector(".form__error");

        if(!email.match(/.+@.+\..+/))
        {
            error.innerText = "Wrong email format!";
            error.style.visibility = "visible";
            return;
        }
        if(password.length < 6)
        {
            error.innerText = "Wrong email or password!";
            error.style.visibility = "visible";
            return;
        }

        this.login(email, password, error);
    }

    login(email, password, error) {
        API.loginUser(email, password).then(async response => {
            if (response.status !== "ok") {
                error.innerText = "Wrong email or password!";
                error.style.visibility = "visible";
            } else {
                window.history.pushState(
                    {},
                    document.querySelector("title").innerText,
                    "/"
                );
                (new Router()).renderPage();
            }
        }).finally(
            document.querySelector("body").style.filter = "none"
        );
    }
}
