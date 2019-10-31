import { html } from "common-tags";

import BasePage from "../basePage";
import Form from "../../components/form";
import Input from "../../components/form/elements/input";
import SubmitButton from "../../components/form/elements/submitButton";
import API from "../../api";
import Login from "./login";

export default class Register extends BasePage {
    constructor() {
        super();
        this.onRegisterFormSubmit = this.onRegisterFormSubmit.bind(this);
    }

    renderContent(parent) {
        document.querySelector("title").innerText = "Register | LeMMaS";

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
            new SubmitButton("Register", "yellow"),
        ];
        this.registerForm = new Form({
            parent: parent.querySelector(".form-wrapper"),
            elements: formElements,
            onSubmit: this.onRegisterFormSubmit,
            big: true,
        });
        this.registerForm.render();
    }

    onRegisterFormSubmit(e) {
        e.preventDefault();

        const email = this.registerForm.getValue("email");
        const name = this.registerForm.getValue("name");
        const password = this.registerForm.getValue("password");
        const passwordRepeat = this.registerForm.getValue("password-repeat");
        const error = document.querySelector(".form__error");

        if (password.length < 6) {
            error.innerText = "Password must be 6 letters or more";
            error.style.visibility = "visible";
            return;
        }

        if (password !== passwordRepeat) {
            error.innerText = "Passwords don't match";
            error.style.visibility = "visible";
            return;
        }

        API.registerUser(email, name, password).then(response => {
            if (response.status !== 200) {
                error.innerText = "User already exists";
                error.style.visibility = "visible";
            } else {
                Login.prototype.login(email, password, error);
            }
        });
    }
}
