import { html } from "common-tags";

import "./form__field.css";
import "./form__field__label.css";

export default class Input {
    constructor({
        name,
        label,
        type = "text",
        required = false,
        placeholder = null,
        disabled = false,
    }) {
        this.name = name;
        this.label = label;
        this.type = type;
        this.required = required;
        this.placeholder = placeholder || label;
        this.disabled = disabled;
    }

    renderString() {
        return html`
            <div class="form__field-wrapper">
                ${this.renderLabel()}
                <input
                    type="${this.type}"
                    class="form__field ${this.name}"
                    placeholder="${this.placeholder}"
                    ${this.required ? "required" : ""}
                    ${this.disabled ? "disabled" : ""}
                />
            </div>
        `;
    }

    renderLabel() {
        return this.label === null
            ? ""
            : html`
                  <label class="form__field__label">${this.label}</label>
              `;
    }
}
