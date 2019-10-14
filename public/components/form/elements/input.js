import { html } from "common-tags";

import "./form__field.css";
import "./form__field__label.css";

export default class Input {
    constructor(
        fieldName,
        labelText,
        type = "text",
        placeholder = null,
        disabled = false
    ) {
        this.fieldName = fieldName;
        this.labelText = labelText;
        this.type = type;
        this.placeholder = placeholder || labelText;
        this.disabled = disabled;
    }

    renderString() {
        return html`
            <div class="form__field-wrapper">
                ${this.renderLabel()}
                <input
                    type="${this.type}"
                    class="form__field ${this.fieldName}"
                    placeholder="${this.placeholder}"
                    ${this.disabled ? "disabled" : ""}
                />
            </div>
        `;
    }

    renderLabel() {
        return this.labelText === null
            ? ""
            : html`
                  <label class="form__field__label">${this.labelText}</label>
              `;
    }
}