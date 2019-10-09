import { html } from "common-tags";
import "./form__field.css";
import "./form__field__label.css";

export default class Input {
    constructor(
        labelText,
        type = "text",
        placeholder = null,
        disabled = false
    ) {
        this.labelText = labelText;
        this.type = type;
        this.placeholder = placeholder === null ? labelText : placeholder;
        this.disabled = disabled;
    }

    render() {
        const label =
            this.labelText === null
                ? ""
                : html`
                      <label class="form__field__label"
                          >${this.labelText}</label
                      >
                  `;

        return html`
            <div class="form__field-wrapper">
                ${label}
                <input
                    type="${this.type}"
                    class="form__field"
                    placeholder="${this.placeholder}"
                    ${this.disabled ? "disabled" : ""}
                />
            </div>
        `;
    }
}
