import "./style.css";

export default class Loader {
    constructor(parent) {
        this.parent = parent;
    }

    showLoader() {
        this.loader = document.createElement("div");
        this.loader.className = "loader";
        const loaderText = document.createElement("p");
        loaderText.innerText = "Loading..";
        loaderText.className = "loader__text";
        this.loader.appendChild(loaderText);

        this.parent.appendChild(this.loader);
    }

    hideLoader() {
        this.parent.removeChild(this.loader);
    }
}
