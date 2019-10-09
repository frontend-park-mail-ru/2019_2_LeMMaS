import { html } from "common-tags";
import "./form.css";

export default class Form {
    constructor(elements, onSubmit = null, big = false) {
        this.elements = elements;
        this.onSubmit = onSubmit;
        this.big = big;
    }

    render() {
        return html`
            <form class="form ${this.big ? "form__size-big" : ""}">
                ${this.elements.map(element => element.render())}
            </form>
        `;
    }
}
