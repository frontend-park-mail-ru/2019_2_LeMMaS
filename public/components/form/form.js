import "./form.css";
import "./form__type-setting.css";

class Form {
    constructor() {}

    render(formExtraClass = "", ...elements) {
        const form = document.createElement("form");
        form.className = "form " + formExtraClass;
        elements.forEach(function(element) {
            form.appendChild(element);
        });

        return form;
    }
}

export default Form;
