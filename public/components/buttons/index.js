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
    constructor(parent, { text, onClick, extraClass = "" }) {
        this.parent = parent;
        this.text = text;
        this.onClick = onClick;
        this.extraClass = extraClass;
    }

    render() {
        this.parent.innerHTML = html`
            <a class="button ${this.extraClass}" href="#">
                ${this.text}
            </a>
        `;
        this.parent
            .querySelector(".button")
            .addEventListener("click", this.onClick);
    }
}
