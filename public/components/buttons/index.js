import { html } from "common-tags";

import BaseComponent from "../baseComponent";
import BaseStringComponent from "../baseStringComponent";

import "./style.css";

export class LinkButton extends BaseStringComponent {
    constructor({ text, href = "", extraClass = "" }) {
        super();
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

export class Button extends BaseComponent {
    constructor(parent, { text, onClick, extraClass = "" }) {
        super(parent);
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
