import { html } from "common-tags";

import BaseComponent from "../baseComponent";

import "./style.css";

export default class Form extends BaseComponent {
    constructor({
        parent,
        elements,
        onSubmit = null,
        extraClass = null,
        big = false,
    }) {
        super(parent);
        this.elements = elements;
        this.onSubmit = onSubmit;
        this.extraClass = extraClass;
        this.big = big;
    }

    async render() {
        let formClass = "";
        formClass += this.big ? "form__size-big" : "";
        formClass += this.extraClass ? this.extraClass : "";

        this.parent.innerHTML = html`
            <form class="form ${formClass}"></form>
            <span class="form__error">Error</span>
        `;
        const form = this.parent.querySelector(".form");
        this._renderElements(form);
        form.addEventListener("submit", this.onSubmit);
    }

    getValue(fieldName) {
        return this.parent.querySelector(".form ." + fieldName).value;
    }

    _renderElements(form) {
        form.innerHTML = html`
            ${this.elements.map(e => e.renderString())}
        `;
    }
}
