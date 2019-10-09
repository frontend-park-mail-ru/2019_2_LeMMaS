import "./form__error.css";

class FormError {
    constructor() {}

    render(error) {
        const formError = document.createElement("span");
        formError.className = "form__error";
        formError.innerText = error;
        return formError;
    }
}

export default FormError;
