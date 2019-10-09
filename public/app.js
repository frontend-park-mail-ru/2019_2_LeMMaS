import "../public/static/assets/css/reset.css";

import Router from "./Router";

function renderPage() {
    const url = location.pathname;
    const view = new Router().getView(url);
    view.beforeRender(url.substr(1, 1).toUpperCase() + url.slice(2));
    view.render();
}

window.onpopstate = () => {
    renderPage();
};
window.addEventListener("DOMContentLoaded", renderPage);

document.addEventListener("click", e => {
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
});
