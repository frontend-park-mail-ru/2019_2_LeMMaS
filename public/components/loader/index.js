import "./style.css";

export default class Loader {
    constructor(parent = null) {
        const htmlElement = document.querySelector("html");
        this.parent = parent === null ? htmlElement : parent;
    }

    show() {
        document.body.classList.add("loader-shown");
        this.loader = document.createElement("div");
        this.loader.className = "loader";
        const loaderText = document.createElement("p");
        loaderText.innerHTML = '<i class="fas fa-spinner fa-pulse"></i>';
        loaderText.className = "loader__text";
        this.loader.appendChild(loaderText);

        this.parent.appendChild(this.loader);
    }

    hide() {
        this.parent.removeChild(this.loader);
        document.body.classList.remove("loader-shown");
    }
}
