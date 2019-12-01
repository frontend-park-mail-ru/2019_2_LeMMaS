import { html } from "common-tags";

import Header from "components/header";
import Wallpaper from "components/wallpaper";

import "static/css/common.css";
import "@fortawesome/fontawesome-free/css/solid.min.css";
import "@fortawesome/fontawesome-free/css/fontawesome.min.css";

export default class BasePage {
    render() {
        document.body.innerHTML = html`
            <div class="wallpaper"></div>
            <div class="header-wrapper"></div>
            <div class="content"></div>
        `;
        new Header(document.querySelector(".header-wrapper")).render();
        this.renderContent(document.querySelector(".content"));
        new Wallpaper(document.querySelector(".wallpaper")).render();
    }

    renderContent() {}
}
