import BaseComponent from "../baseComponent";

import "./style.css";

const LOADER_SHOWN_CLASS = "loader-shown";

export default class Loader extends BaseComponent {
    constructor(parent = null) {
        const htmlElement = document.querySelector("html");
        super(parent === null ? htmlElement : parent);
    }

    show() {
        document.body.classList.add(LOADER_SHOWN_CLASS);

        this.loader = document.createElement("div");
        this.loader.className = "loader";

        const loaderInner = document.createElement("p");
        loaderInner.innerHTML = '<i class="fas fa-spinner fa-pulse"></i>';
        loaderInner.className = "loader__inner";
        this.loader.appendChild(loaderInner);

        this.parent.appendChild(this.loader);
    }

    hide() {
        this.parent.removeChild(this.loader);
        document.body.classList.remove(LOADER_SHOWN_CLASS);
    }
}
