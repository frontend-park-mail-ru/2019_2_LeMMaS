import Router from "./router";

const LINK_TAG_NAME = "A";

function renderPage() {
    const view = new Router().getView(location.pathname);
    view.render();
}

window.onpopstate = () => {
    renderPage();
};
window.addEventListener("DOMContentLoaded", renderPage);

document.addEventListener("click", e => {
    if (e.target.tagName !== LINK_TAG_NAME) {
        return;
    }

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
