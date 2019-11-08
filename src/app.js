import router from "./modules/router";

window.onpopstate = () => {
    router.renderPage();
};
window.addEventListener("DOMContentLoaded", router.renderPage);

document.addEventListener("click", e => {
    const link = findParent("A", e.target || e.srcElement);
    if (link === null) {
        return;
    }
    e.preventDefault();
    const { href } = link;
    if (!href || href === location.pathname) {
        return;
    }
    window.history.pushState({}, document.title, href);
    router.renderPage();
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
