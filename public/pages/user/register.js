import { html } from "common-tags";

import BasePage from "../basePage";
import Form from "../../components/form";
import Input from "../../components/form/elements/input";
import SubmitButton from "../../components/form/elements/submitButton";

export default class Register extends BasePage {
    renderContent() {
        const formElements = [
            new Input("Login"),
            new Input("Password", "password"),
            new Input("Repeat password", "password"),
            new Input("Email", "email"),
            new SubmitButton("Register", "lavender"),
        ];
        return html`
            <div class="plate plate__size-big">
                <h2 class="text__align-center text__size-big">Register</h2>
                ${new Form(
                    formElements,
                    this.onRegisterFormSubmit,
                    true
                ).render()}
            </div>
        `;
    }

    onRegisterFormSubmit(e) {
        e.preventDefault();
        console.log("submit");
        // const loginValue = document.querySelector("input[type=login]").value;
        // const passwordValue = document.querySelector("input[type=password]")
        //     .value;
        // const emailValue = document.querySelector("input[type=email]").value;
        // if (loginValue.match(/^\w{6,19}$/)) {
        //     console.log("loginmatch");
        //     const back = new BackendIntegrator();
        //     back.register(loginValue, passwordValue, emailValue);
        // }
    }
}
