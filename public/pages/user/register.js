import { html } from "common-tags";

import BasePage from "../basePage";
import Form from "../../components/form";
import Input from "../../components/form/elements/input";
import SubmitButton from "../../components/form/elements/submitButton";

export default class Register extends BasePage {
    constructor() {
        super();
        this.onRegisterFormSubmit = this.onRegisterFormSubmit.bind(this);
    }

    renderContent(parent) {
        const formElements = [
            new Input("login", "Login"),
            new Input("password", "Password", "password"),
            new Input("password-repeat", "Repeat password", "password"),
            new Input("email", "Email", "email"),
            new SubmitButton("Register", "lavender"),
        ];
        parent.innerHTML = html`
            <div class="plate plate__size-big">
                <h2 class="text__align-center text__size-big">Register</h2>
                <div class="form-wrapper"></div>
            </div>
        `;
        this.registerForm = new Form(
            parent.querySelector(".form-wrapper"),
            formElements,
            this.onRegisterFormSubmit,
            true
        );
        this.registerForm.render();
    }

    onRegisterFormSubmit(e) {
        e.preventDefault();

        const login = this.registerForm.getValue("login");
        const password = this.registerForm.getValue("password");
        const passwordRepeat = this.registerForm.getValue("password-repeat");
        const email = this.registerForm.getValue("email");

        console.log(login);
        console.log(password);
        console.log(passwordRepeat);
        console.log(email);
    }
}
