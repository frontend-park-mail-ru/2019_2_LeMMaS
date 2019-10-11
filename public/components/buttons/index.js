import { html } from "common-tags";

import "./style.css";

export default class Button {
    constructor(href, text, extraClass = "") {
        this.href = href;
        this.text = text;
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
