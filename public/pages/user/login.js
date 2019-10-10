import { html } from "common-tags";
import { routes } from "../../router";
import BasePage from "../basePage";
import Form from "../../components/form/form";
import Input from "../../components/form/elements/input";
import SubmitButton from "../../components/form/elements/submitButton";
// import BackendIntegrator from "../network";

export default class Login extends BasePage {
    renderContent() {
        const formElements = [
            new Input("Login"),
            new Input("Password"),
            new SubmitButton("Login", "lavender")
        ];
        return html`
            <div class="plate plate__size-big">
                <h2 class="text__align-center text__size-big">Login</h2>
                ${new Form(formElements, this.onLoginFormSubmit, true).render()}
                <p>
                    Don't have an account?
                    <a href="${routes.USER_REGISTER_PAGE_ROUTE}">Register</a>
                </p>
            </div>
        `;
    }

    onLoginFormSubmit(e) {
        e.preventDefault();
        //     console.log("submit");
        //     const loginValue = document.querySelector("input[type=login]")
        //         .value;
        //     const passwordValue = document.querySelector("input[type=password]")
        //         .value;
        //     if (loginValue.match(/^\w{6,19}$/)) {
        //         console.log("loginmatch");
        //         const back = new BackendIntegrator();
        //         back.login(loginValue, passwordValue);
        //     }
    }
}
