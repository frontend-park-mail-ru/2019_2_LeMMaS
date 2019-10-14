import { html } from "common-tags";

import { routes } from "../../router";
import BasePage from "../basePage";
import Form from "../../components/form";
import Input from "../../components/form/elements/input";
import SubmitButton from "../../components/form/elements/submitButton";
// import BackendIntegrator from "../network";

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
            new Input("login", "Login"),
            new Input("password", "Password", "password"),
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

        const login = this.loginForm.getValue("login");
        const password = this.loginForm.getValue("password");

        console.log(login);
        console.log(password);
    }
}