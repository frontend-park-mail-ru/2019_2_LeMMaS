import { html } from "common-tags";

import Header from "../components/header";
import Wallpaper from "../components/wallpaper";

import "@fortawesome/fontawesome-free/css/solid.min.css";
import "@fortawesome/fontawesome-free/css/fontawesome.min.css";
import "../static/css/common.css";

export default class BasePage {
    render() {
        document.body.innerHTML = html`
            <div class="vegWrapper">
                <div class="veg">🍅</div>
                <div class="veg">🍆</div>
                <div class="veg">🍇</div>
                <div class="veg">🍈</div>
                <div class="veg">🍉</div>
                <div class="veg">🍊</div>
                <div class="veg">🍌</div>
                <div class="veg">🍍</div>
                <div class="veg">🍎</div>
                <div class="veg">🍒</div>
                <div class="veg">🍓</div>
                <div class="veg">🥑</div>
                <div class="veg">🥕</div>
                <div class="veg">🌽</div>
                <div class="veg">🥦</div>
                <div class="veg">🥔</div>
                <div class="veg">🍄</div>
                <div class="veg">🥥</div>
                <div class="veg">🍑</div>
                <div class="veg">🍐</div>
                <div class="veg">🥒</div>
           </div>
            <header class="header"></header>
            <div class="content"></div>
        `;
        new Header(document.querySelector(".header")).render();
        this.renderContent(document.querySelector(".content"));
        new Wallpaper().render();
    }

    renderContent() {}
}
