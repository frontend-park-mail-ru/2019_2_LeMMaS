import { html } from "common-tags";

import "./style.css";

export default class Form {
    constructor({
        parent,
        elements,
        onSubmit = null,
        extraClass = null,
        big = false,
    }) {
        this.parent = parent;
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
        this.renderElements(form);
        form.addEventListener("submit", this.onSubmit);
    }

    renderElements(form) {
        form.innerHTML = html`
            ${this.elements.map(e => e.renderString())}
        `;
    }

    getValue(fieldName) {
        return this.parent.querySelector(".form ." + fieldName).value;
    }
}
