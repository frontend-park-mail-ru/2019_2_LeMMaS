import { html } from "common-tags";

import Header from "components/header";
import Wallpaper from "components/wallpaper";

import "assets/css/common.css";
import "@fortawesome/fontawesome-free/css/solid.min.css";
import "@fortawesome/fontawesome-free/css/fontawesome.min.css";

export default class BasePage {
    render = (): void => {
        document.body.innerHTML = html`
            <div class="wallpaper"></div>
            <div class="header-wrapper"></div>
            <div class="content"></div>
        `;
        const headerWrapper: HTMLDivElement | null = document.querySelector(".header-wrapper");
        if (headerWrapper) {
            new Header(headerWrapper).render();
        }
        const contentWrapper: HTMLDivElement | null = document.querySelector(".content");
        if (contentWrapper) {
            this.renderContent(contentWrapper);
        }
        const wallpaperWrapper: HTMLDivElement | null = document.querySelector(".wallpaper");
        if (wallpaperWrapper) {
            new Wallpaper(wallpaperWrapper).render();
        }
    };

    public renderContent: (element: HTMLElement) => unknown;
}
