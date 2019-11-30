import { html } from "common-tags";

import BaseComponent from "components/baseComponent";
import Logo from "components/logo";
import Menu from "components/menu";

import "./style.css";

export default class Header extends BaseComponent {
    render = () => {
        this.parent.innerHTML = html`
            ${new Logo().renderString()}
            <div class="menu"></div>
        `;
        new Menu(this.parent.querySelector(".menu")).start();
    };
}
