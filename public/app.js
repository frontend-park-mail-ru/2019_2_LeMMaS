import "../public/static/assets/css/reset.css";
import router from "./router.js";

function firstLoad() {
    const newEl = document.createElement("div");
    newEl.innerText = "first";
    document.querySelector(".body").appendChild(newEl);
}

function renderPage () {
    const url = location.pathname;
    console.log("url: " + url);
    let controller = router.getController(url);
    controller = new controller;
    controller.beforeRender();
    controller.render();
    controller.afterRender();
}



function callback(e) {

    if (e.target.tagName !== "A")
        return;

    e.preventDefault();
    window.history.pushState({}, document.querySelector("title").innerText, e.target.getAttribute("href"));
    renderPage();
}

window.onpopstate = function() {
    renderPage();
};


document.addEventListener("click", callback);


window.addEventListener("DOMContentLoaded", firstLoad);
window.addEventListener("DOMContentLoaded", renderPage);
