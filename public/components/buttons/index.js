import { html } from "common-tags";

import "./style.css";

export default class Button {
    constructor({ text, href = "", extraClass = "" }) {
        this.text = text;
        this.href = href;
        this.extraClass = extraClass;
    }

    render() {
        return html`
            <a class="button ${this.extraClass}" href="${this.href}">
                ${this.text}
            </a>
        `;
    }
}
