import DefaultView from "./view";
import Plate from "../components/plate/plate";
import Text from "../components/text/text";
import Form from "../components/form/form";
import FormField from "../components/form/__field/form__field";
import FormError from "../components/form/__error/form__error";
import BackendIntegrator from "../network";

class Login extends DefaultView {
    constructor() {
        super();
    }

    render() {
        const plate = new Plate();
        const text = new Text();
        const form = new Form();
        const formField = new FormField();
        const formError = new FormError();

        const dontHaveP = document.createElement("p");
        const dontHaveA = document.createElement("a");
        dontHaveP.innerText = "Don't have an account? ";
        dontHaveA.href = "register";
        dontHaveA.innerText = "Register";
        dontHaveP.appendChild(dontHaveA);

        const plateLogin = plate.render(
            "plate__size-big",
            text.render("text__align-center text__size-big", "h2", "Login"),
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
                    "submit",
                    "Login",
                    "button button__size-big button__color-lavender"
                ),
                formError.render("All is incorrect")
            ),
            dontHaveP
        );

        const platesWrapper = document.querySelector(".plates__wrapper");
        platesWrapper.appendChild(plateLogin);
        document.querySelector("form").addEventListener("submit", function(e) {
            e.preventDefault();
            console.log("submit");
            const loginValue = document.querySelector("input[type=login]")
                .value;
            const passwordValue = document.querySelector("input[type=password]")
                .value;
            if (loginValue.match(/^\w{6,19}$/)) {
                console.log("loginmatch");
                const back = new BackendIntegrator();
                back.login(loginValue, passwordValue);
            }
        });
    }
}

export default Login;
