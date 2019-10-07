import "./form__field.css";
import "./form__field__size-big.css";
import "./form__field__label.css";
import "./form__field__type-setting.css";

class FormField{
    constructor(){

    }

    render(type, placeHolder, formFieldExtraClass = "", label = "", disabled = false, ...elements){
        const formField = document.createElement("input");
        const formFieldWrapper = document.createElement("div");
        formFieldWrapper.className = "form__field-wrapper";
        if(label !== "") {
            const formLabel = document.createElement("label");
            formLabel.className = "form__field__label";
            formLabel.innerText = "Username: " + label;
            formFieldWrapper.appendChild(formLabel);
        }

        if(type !== "submit") {
            formField.className = "form__field " + formFieldExtraClass;
            formField.placeholder = placeHolder;
        }
        else {
            formField.className = formFieldExtraClass;
            formField.value = placeHolder;
        }
        formField.type = type;
        formField.disabled = disabled;

        formFieldWrapper.appendChild(formField);
        elements.forEach(function (element) {
            formFieldWrapper.appendChild(element);
        });
        return formFieldWrapper;
    }

}

export default FormField;
