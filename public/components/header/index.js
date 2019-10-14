import { html } from "common-tags";

import "./style.css";
import Logo from "../logo";
import Menu from "../menu";

export default class Header {
    renderString() {
        return html`
            <header class="header">
                ${new Logo().renderString()} ${new Menu().renderString()}
            </header>
        `;
    }
}
