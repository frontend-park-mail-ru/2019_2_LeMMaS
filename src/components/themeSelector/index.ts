import { getCookie } from "../../modules/cookies";
import { html } from "common-tags";

import "./style.css";
import Wallpaper from "../wallpaper";

export default class ThemeSelector {
    private parent: HTMLDivElement;
    private wallpaper;

    constructor (parent: HTMLDivElement, wallpaper: Wallpaper) {
        this.parent = parent;
        this.wallpaper = wallpaper;
    }

    render = () => {
        const themeLogo = getCookie("theme") === "winter" ? "🎄" : "🍉";

        this.parent.innerHTML += html`
            <div class="themeSelector">
                <a class="button button__type-secondary button__alignment-right">
                    ${themeLogo}
                </a>
            </div>
        `;
        this.parent.querySelector(".themeSelector .button").addEventListener("click",() => {
            if (getCookie("theme") === "winter") {
                document.cookie = "theme=summer; max-age=10000000";
                this.parent.querySelector(".themeSelector .button").innerHTML = "🍉";
                this.wallpaper.renderWallpaper();
            } else {
                document.cookie = "theme=winter; max-age=10000000";
                this.parent.querySelector(".themeSelector .button").innerHTML = "🎄";
                this.wallpaper.renderWallpaper();
            }
        });
    };
}