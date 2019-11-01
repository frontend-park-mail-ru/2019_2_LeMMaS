import Router from "./router";

window.onpopstate = () => {
    Router.renderPage();
};
window.addEventListener("DOMContentLoaded", Router.renderPage);

document.addEventListener("click", e => {
    const link = findParent("A", e.target || e.srcElement);
    if (link === null) {
        return;
    }
    e.preventDefault();
    const href = link.href;
    if (href === location.pathname || href === "" || href === null) {
        return;
    }
    window.history.pushState({}, document.title, href);
    Router.renderPage();
});

function findParent(tag, element) {
    while (element) {
        if ((element.nodeName || element.tagName) === tag) {
            return element;
        }
        element = element.parentNode;
    }
    return null;
}
