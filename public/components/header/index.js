import { html } from "common-tags";
import "./style.css";
import Logo from "../logo";
import Menu from "../menu";

export default class Header {
    render() {
        return html`
            <header class="header">
                ${new Logo().render()} ${new Menu().render()}
            </header>
        `;
    }
}
