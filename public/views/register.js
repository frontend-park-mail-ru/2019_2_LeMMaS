import DefaultView from "./view";
import Plate from "../components/plate/plate";
import Text from "../components/text/text";
import Form from "../components/form/form";
import FormField from "../components/form/__field/form__field";
import FormError from "../components/form/__error/form__error";
import BackendIntegrator from "../network";

class Register extends DefaultView {
    constructor() {
        super();
    }

    render() {
        const plate = new Plate();
        const text = new Text();
        const form = new Form();
        const formField = new FormField();
        const formError = new FormError();

        const plateRegister = plate.render(
            "plate__size-big",
            text.render("text__align-center text__size-big", "h2", "Register"),
            form.render(
                "",
                formField.render("login", "login", "form__field__size-big"),
                formError.render("Login incorrect"),
                formField.render(
                    "password",
                    "password",
                    "form__field__size-big"
                ),
                formError.render("Password incorrect"),
                formField.render(
                    "passwordRepeat",
                    "repeat password",
                    "form__field__size-big"
                ),
                formError.render("Passwords don't match"),
                formField.render("email", "email", "form__field__size-big"),
                formError.render("Email incorrect"),
                formField.render(
                    "submit",
                    "Register",
                    "button button__size-big button__color-lavender"
                ),
                formError.render("All is incorrect")
            )
        );

        const platesWrapper = document.querySelector(".plates__wrapper");
        platesWrapper.appendChild(plateRegister);
        document.querySelector("form").addEventListener("submit", function(e) {
            e.preventDefault();
            console.log("submit");
            const loginValue = document.querySelector("input[type=login]")
                .value;
            const passwordValue = document.querySelector("input[type=password]")
                .value;
            const emailValue = document.querySelector("input[type=email]")
                .value;
            if (loginValue.match(/^\w{6,19}$/)) {
                console.log("loginmatch");
                const back = new BackendIntegrator();
                back.register(loginValue, passwordValue, emailValue);
            }
        });
    }
}

export default Register;
