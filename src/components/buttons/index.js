import { html } from "common-tags";

import BaseComponent from "../baseComponent";
import BaseStringComponent from "../baseStringComponent";

import "./style.scss";

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
        const button = document.createElement("a");
        button.className = "button " + this.extraClass;
        button.innerText = this.text;
        button.addEventListener("click", this.onClick);

        this.parent.appendChild(button);
    }
}

export default class HomeButton {
    static renderString() {
        return html`
            <a
                class="button button__position-absolute button__type-home"
                href="/"
            >
                <i class="fa fa-home"></i>
            </a>
        `;
    }
}