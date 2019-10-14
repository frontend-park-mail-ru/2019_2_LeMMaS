import { html } from "common-tags";

import BasePage from "../basePage";
import Form from "../../components/form";
import Input from "../../components/form/elements/input";
import SubmitButton from "../../components/form/elements/submitButton";
import API from "../../api";

export default class Register extends BasePage {
    constructor() {
        super();
        this.onRegisterFormSubmit = this.onRegisterFormSubmit.bind(this);
    }

    renderContent(parent) {
        parent.innerHTML = html`
            <div class="plate plate__size-big">
                <h2 class="text__align-center text__size-big">Register</h2>
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
            new Input({ name: "name", label: "Name", required: true }),
            new Input({
                name: "password",
                label: "Password",
                type: "password",
                required: true,
            }),
            new Input({
                name: "password-repeat",
                label: "Repeat password",
                type: "password",
                required: true,
            }),
            new SubmitButton("Register", "lavender"),
        ];
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

        const email = this.registerForm.getValue("email");
        const name = this.registerForm.getValue("name");
        const password = this.registerForm.getValue("password");
        const passwordRepeat = this.registerForm.getValue("password-repeat");

        if (password !== passwordRepeat) {
            console.log("passwords mismatch");
            return;
        }
        API.registerUser(email, name, password);
    }
}
