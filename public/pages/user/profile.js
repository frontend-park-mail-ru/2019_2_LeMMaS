import { html } from "common-tags";
import BasePage from "../basePage";
import Form from "../../components/form/form";
import Input from "../../components/form/elements/input";
import SubmitButton from "../../components/form/elements/submitButton";

export default class Profile extends BasePage {
    renderContent() {
        const formElements = [
            new Input("Login"),
            new Input("Password", "password"),
            new Input("Repeat password", "password"),
            new Input("Email", "email"),
            new SubmitButton("Save", "lavender"),
        ];
        return html`
            <div class="plate plate__size-big">
                <h2 class="text__align-center text__size-big">Edit profile</h2>
                ${new Form(
                    formElements,
                    this.onEditProfileFormSubmit,
                    true
                ).render()}
            </div>
        `;
    }

    onEditProfileFormSubmit(e) {
        e.preventDefault();
    }
}
