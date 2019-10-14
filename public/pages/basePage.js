import { html } from "common-tags";

import Header from "../components/header";
import "../static/assets/css/reset.css";
import "../static/assets/css/common.css";

export default class BasePage {
    render() {
        document.body.innerHTML = html`
            ${new Header().render()}
            <div class="content"></div>
        `;
        this.renderContent(document.querySelector(".content"));
    }

    renderContent() {}
}
