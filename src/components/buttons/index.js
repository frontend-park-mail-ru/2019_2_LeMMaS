import classNames from "classnames";

import BaseComponent from "components/baseComponent";
import BaseStringComponent from "components/baseStringComponent";

import "./style.css";

export class LinkButton extends BaseStringComponent {
    constructor({
        text,
        href,
        icon = null,
        extraClass = "",
        disabled = false,
    }) {
        super();
        this.text = text;
        this.href = href;
        this.icon = icon;
        this.extraClass = extraClass;
        this.disabled = disabled;
    }

    _makeHref = () => {
        if (this.href) {
            return `href="${this.href}"`;
        }
        return "notLoggedIn";
    };

    renderString() {
        const buttonClass = classNames(this.extraClass, {
            "button__type-disabled": this.disabled,
        });
        const icon = this.icon
            ? `<span class="button-icon">${this.icon}</span>`
            : "";
        return `
            <a class="button ${buttonClass}" ${this._makeHref()}">
                ${icon}
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
