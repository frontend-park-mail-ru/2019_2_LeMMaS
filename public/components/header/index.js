import { html } from "common-tags";

import "./style.css";
import Logo from "../logo";
import Menu from "../menu";

export default class Header {
    constructor(parent) {
        this.parent = parent;
    }

    render() {
        this.parent.innerHTML = html`
            ${new Logo().renderString()}
            <div class="menu"></div>
        `;
        new Menu(this.parent.querySelector(".menu")).render();
    }
}
