import { html } from "common-tags";

import "./style.css";

export default class Form {
    constructor(parent, elements, onSubmit = null, big = false) {
        this.parent = parent;
        this.elements = elements;
        this.onSubmit = onSubmit;
        this.big = big;
    }

    render() {
        this.parent.innerHTML = html`
            <form class="form ${this.big ? "form__size-big" : ""}">
                ${this.elements.map(element => element.renderString())}
            </form>
        `;
        this.parent
            .querySelector(".form")
            .addEventListener("submit", this.onSubmit);
    }

    getValue(fieldName) {
        return this.parent.querySelector(".form ." + fieldName).value;
    }
}
