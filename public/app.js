import Router from "./router";

const LINK_TAG_NAME = "A";

window.onpopstate = () => {
    Router.renderPage();
};
window.addEventListener("DOMContentLoaded", Router.renderPage);

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
    window.history.pushState({}, document.title, href);
    Router.renderPage();
});
