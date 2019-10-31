import "./style.css";

export default class Loader {
    constructor(parent) {
        this.parent = parent;
    }

    show() {
        document.body.classList.add("loader-shown");
        this.loader = document.createElement("div");
        this.loader.className = "loader";
        const loaderText = document.createElement("p");
        loaderText.innerText = "Loading...";
        loaderText.className = "loader__text";
        this.loader.appendChild(loaderText);

        this.parent.appendChild(this.loader);
    }

    hide() {
        this.parent.removeChild(this.loader);
        document.body.classList.remove("loader-shown");
    }
}
