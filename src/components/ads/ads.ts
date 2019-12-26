import { html } from "common-tags";

import { getCookie } from "../../modules/cookies";

import * as citiImg from "assets/img/sitimobilad.jpg";
import * as mailImg from "assets/img/mailad.jpg";
import * as deliImg from "assets/img/deliveryad.jpg";

import "../modalWindow/style.css";
import "./ads.css";

const ads = [
    { img: citiImg, href: "https://city-mobil.ru/" },
    { img: mailImg, href: "https://mail.ru/" },
    { img: deliImg, href: "https://www.delivery-club.ru/" },
];

export default class Ad {
    private parent: HTMLDivElement;

    constructor (parent: HTMLDivElement) {
        this.parent = parent;
    }

    render = () => {
        if (getCookie("ad") !== undefined) {
            return;
        }
        const ad = ads[Math.floor(Math.random() * 3)];

        this.parent.innerHTML += html`
            <a href="${ad.href}">
                    <img
                        class="ad__img"
                        alt="ads"
                        src="${ad.img}"
                    />
            </a>
             <a class="ad__close-button"
                    ><i class="fas fa-times"></i
             ></a>
        `;
        this.parent.querySelector(".ad__close-button").addEventListener("click", this.hide);
    };

    hide = () => {
        this.parent.querySelector(".ad__close-button").removeEventListener("click", this.hide);
        this.parent.innerHTML = '';
        document.cookie = "ad=false; max-age=1800";
    }
}