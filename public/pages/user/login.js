import { html } from "common-tags";

import { routes } from "../../router";
import BasePage from "../basePage";
import Form from "../../components/form";
import Input from "../../components/form/elements/input";
import SubmitButton from "../../components/form/elements/submitButton";
import API from "../../api";

export default class Login extends BasePage {
    constructor() {
        super();
        this.onLoginFormSubmit = this.onLoginFormSubmit.bind(this);
    }

    renderContent(parent) {
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

        const email = this.loginForm.getValue("email");
        const password = this.loginForm.getValue("password");

        API.loginUser(email, password);
    }
}
