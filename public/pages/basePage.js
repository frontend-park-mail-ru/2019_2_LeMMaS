import { html } from "common-tags";

import Header from "../components/header";
import "../static/assets/css/reset.css";
import "../static/assets/css/common.css";

export default class BasePage {
    render() {
        document.body.innerHTML = html`
            <header class="header"></header>
            <div class="content"></div>
        `;
        new Header(document.querySelector(".header")).render();
        this.renderContent(document.querySelector(".content"));
    }

    renderContent() {}
}
