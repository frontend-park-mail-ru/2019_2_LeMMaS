import DefaultView from "./view";
import Plate from "../components/plate/plate";
import Text from "../components/text/text";
import Form from "../components/form/form";
import FormField from "../components/form/__field/form__field";
import FormError from "../components/form/__error/form__error";
import UserPicName from "../components/userPicName/userPicName";
import Button from "../components/buttons/button";

class Settings extends DefaultView{
    constructor() {
        super();
    }

    render()
    {

        const plate = new Plate();
        const text = new Text();
        const form = new Form();
        const formField = new FormField();
        const formError = new FormError();
        const userPicName = new UserPicName();
        const button = new Button();

        const buttonLogin = button.render("", "Change Username", "editLogin");
        const formLogin = form.render("form__type-setting",
            formField.render("", "login", "", "", true),
            formError.render("Login incorrect"),
            formField.render("submit", "Save", "form__field button button__color-lavender", "", true));
        formLogin.classList += " editLogin";
        buttonLogin.addEventListener("click", function () {
            if(formLogin.classList.contains("opened")) {
                formLogin.style.display = "none";
                formLogin.classList.remove("opened");
            }
            else {
                formLogin.style.display = "flex";
                formLogin.classList.toggle("opened");
                buttonLogin.style.display = "none";
            }
        });


        const buttonPassword = button.render("", "Change Password", "editPassword");
        const formPassword = form.render("form__type-setting",
            formField.render("", "password", "", "", true),
            formError.render("Password incorrect"),
            formField.render("", "repeat password", "form__field__type-setting", "", true),
            formError.render("Passwords don't match"),
            formField.render("submit", "Save", "form__field form__field__type-setting button button__color-lavender", "", true));
        formPassword.classList += " editPassword";

        buttonPassword.addEventListener("click", function () {
            if(formPassword.classList.contains("opened")) {
                formPassword.style.display = "none";
                formPassword.classList.remove("opened");
            }
            else {
                formPassword.style.display = "flex";
                formPassword.classList.toggle("opened");
                buttonLogin.style.display = "none";
            }
        });

        const buttonUserPic = button.render("", "Change profile Pic", "editUserPic");
        const formUserPic = form.render("form__type-setting",
            formField.render("file", "", "", "", true),
            formField.render("submit", "Save", "form__field form__field__type-setting button button__color-lavender", "", true));
        formUserPic.classList += " editUserPic";

        const plateRegister = plate.render("plate__size-big", userPicName.render(),
            text.render("text__size-normal text__align-center", "h2", "Account settings"),
            formLogin,
            buttonLogin,
            formPassword,
            buttonPassword,
            formUserPic,
            buttonUserPic);

     //   const forms = [["editLogin", formLogin], ["editPassword", formPassword], ["editUserPic", formUserPic]];



        /*editButton.addEventListener("click", function (e) {
            e.preventDefault();
            plateRegister.querySelectorAll(".form__field").forEach(function (element) {
                element.disabled = false;
                element.style.opacity = 1;

            });
            plateRegister.querySelectorAll(".form__field__label").forEach(function (element) {
                element.style.display = "none";
            });
            editButton.style.display = "none";
        });*/

        const platesWrapper = document.querySelector(".plates__wrapper");
        platesWrapper.appendChild(plateRegister);




    }
}


export default Settings;