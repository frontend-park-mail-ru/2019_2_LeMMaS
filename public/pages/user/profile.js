import { html } from "common-tags";

import BasePage from "../basePage";
import Form from "../../components/form";
import Input from "../../components/form/elements/input";
import SubmitButton from "../../components/form/elements/submitButton";
import API from "../../api";

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
            new Input({
                name: "name",
                label: "Name",
            }),
            new Input({
                name: "password",
                label: "Password",
                type: "password",
            }),
            new Input({
                name: "password-repeat",
                label: "Repeat password",
                type: "password",
            }),
            new Input({
                name: "avatar",
                label: "User pic",
                type: "file",
            }),
            new SubmitButton("Save", "lavender"),
        ];
        this.profileForm = new Form(
            parent.querySelector(".form-wrapper"),
            formElements,
            this.onEditProfileFormSubmit,
            true
        );
        this.profileForm.render();

        document.querySelector("input[type=\"password\"").autocomplete = "new-password";
    }

    onEditProfileFormSubmit(e) {
        e.preventDefault();
        document.querySelector("body").style.filter = "blur(4px)";

        const name = this.profileForm.getValue("name");
        const password = this.profileForm.getValue("password");
        const passwordRepeat = this.profileForm.getValue("password-repeat");
        const userPic = document.querySelector("input[type=\"file\"]");

        const error = document.querySelector(".form__error");
        error.style.visibility = "hidden";
        error.style.color = "red";

        let changeFlag = false;

        if(password.length < 6 && password.length > 1)
        {
            error.innerText = "Password must be 6 letters or more!";
            error.style.visibility = "visible";
            return;
        }

        if(password !== passwordRepeat)
        {
            error.innerText = "Passwords don't match!!";
            error.style.visibility = "visible";
            return;
        }


        API.changeUserData(name, password).then(response => {
            if (response === null) {
                error.innerText = "Wrong name or password!";
                error.style.visibility = "visible";
            } else {
                changeFlag = true;
            }
        });

        if(userPic.files[0] !== undefined) {
            const formData = new FormData();
            formData.append("avatar", userPic.files[0]);

            API.changeAvatar(formData).then(response => {
                if (response === null) {
                    error.innerText = "Something went wrong!";
                    error.style.visibility = "visible";
                } else {
                    console.log(changeFlag);
                    changeFlag = true;
                }
            });
        }
        if(changeFlag === true)
        {
            error.innerText = "Success!";
            error.style.visibility = "visible";
            error.style.color = "green";
        }
        document.querySelector("body").style.filter = "none";
    }
}
