import Router from "./modules/router";
// import registerServiceWorker from "./modules/sw";
//
// registerServiceWorker();

window.onpopstate = () => {
    Router.renderPage();
};
window.addEventListener("DOMContentLoaded", () => {
    Router.renderPage();
});

const findParent = (tag, element) => {
    while (element) {
        if ((element.nodeName || element.tagName) === tag) {
            return element;
        }
        element = element.parentNode;
    }
    return null;
};

document.addEventListener("click", e => {
    const link = findParent("A", e.target || e.srcElement);
    if (link === null) {
        return;
    }
    e.preventDefault();
    if (link.classList.contains("button__type-disabled")) {
        return;
    }
    const { href } = link;
    if (!href || href === location.pathname) {
        return;
    }

    try {
        window.history.pushState({}, document.title, href);
    } catch (e) {
        if (e.toString().startsWith("SecurityError: Failed to execute 'pushState' on 'History'")) {
            location = href;
        }
    }
    Router.renderPage();
});
