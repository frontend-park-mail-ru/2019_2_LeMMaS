import { html } from "common-tags";

import BasePage from "../basePage";
import Form from "../../components/form";
import Input from "../../components/form/elements/input";
import SubmitButton from "../../components/form/elements/submitButton";

export default class Profile extends BasePage {
    constructor() {
        super();
        this.onEditProfileFormSubmit = this.onEditProfileFormSubmit.bind(this);
    }

    renderContent(parent) {
        parent.innerHTML = html`
            <div class="plate plate__size-big">
                <h2 class="text__align-center text__size-big">Edit profile</h2>
                <div class="form-wrapper"></div>
            </div>
        `;
        const formElements = [
            new Input("login", "Login"),
            new Input("password", "Password", "password"),
            new Input("password-repeat", "Repeat password", "password"),
            new Input("email", "Email", "email"),
            new SubmitButton("Save", "lavender"),
        ];
        this.profileForm = new Form(
            parent.querySelector(".form-wrapper"),
            formElements,
            this.onEditProfileFormSubmit,
            true
        );
        this.profileForm.render();
    }

    onEditProfileFormSubmit(e) {
        e.preventDefault();

        const login = this.profileForm.getValue("login");
        const password = this.profileForm.getValue("password");
        const passwordRepeat = this.profileForm.getValue("password-repeat");
        const email = this.profileForm.getValue("email");

        console.log(login);
        console.log(password);
        console.log(passwordRepeat);
        console.log(email);
    }
}
