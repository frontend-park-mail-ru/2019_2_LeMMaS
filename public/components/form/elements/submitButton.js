import { html } from "common-tags";

export default class SubmitButton {
    constructor(text, color = null) {
        this.text = text;
        this.color = color;
    }

    render() {
        const colorClass = this.color ? "button__color-" + this.color : "";
        return html`
            <div class="form__field-wrapper">
                <button type="submit" class="form__field button ${colorClass}">
                    ${this.text}
                </button>
            </div>
        `;
    }
}
