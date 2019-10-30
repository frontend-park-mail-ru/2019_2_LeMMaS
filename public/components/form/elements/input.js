import { html } from "common-tags";

import "./style.css";

export default class Input {
    constructor({
        name,
        label,
        type = "text",
        value = null,
        tip = null,
        required = false,
        placeholder = null,
        disabled = false,
    }) {
        this.name = name;
        this.label = label;
        this.type = type;
        this.value = value;
        this.tip = tip;
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
                    value="${this.value}"
                    ${this.required ? "required" : ""}
                    ${this.disabled ? "disabled" : ""}
                />
                ${this.renderTip()}
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

    renderTip() {
        return this.tip === null
            ? ""
            : html`
                  <span class="form__field__tip">${this.tip}</span>
              `;
    }
}
