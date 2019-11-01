import { html } from "common-tags";

import "./style.css";

export class LinkButton {
    constructor({ text, href = "", extraClass = "" }) {
        this.text = text;
        this.href = href;
        this.extraClass = extraClass;
    }

    renderString() {
        return html`
            <a class="button ${this.extraClass}" href="${this.href}">
                ${this.text}
            </a>
        `;
    }
}

export class Button {
    constructor({ text, onClick, extraClass = "" }) {
        this.text = text;
        this.onClick = onClick;
        this.extraClass = extraClass;
    }

    renderString() {
        return html`
            <a class="button ${this.extraClass}" href="#" onclick="${this.onClick}">
                ${this.text}
            </a>
        `;
    }

}
