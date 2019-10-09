import "../public/static/assets/css/reset.css";
import router from "./router.js";

function firstLoad() {}

function renderPage() {
    const url = location.pathname;
    console.log("url: " + url);
    let controller = router.getController(url);
    controller = new controller();
    controller.beforeRender(url.substr(1, 1).toUpperCase() + url.slice(2));
    controller.render();
    controller.afterRender();
}

function callback(e) {
    if (e.target.tagName !== "A") return;

    const href = e.target.getAttribute("href");
    if (href === location.pathname || href === "" || href === null) {
        e.preventDefault();
        return;
    }

    e.preventDefault();
    window.history.pushState(
        {},
        document.querySelector("title").innerText,
        href
    );
    renderPage();
}

window.onpopstate = function() {
    renderPage();
};

document.addEventListener("click", callback);

window.addEventListener("DOMContentLoaded", firstLoad);
window.addEventListener("DOMContentLoaded", renderPage);
