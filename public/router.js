import Index from "./pages/index";
import Login from "./pages/login";
import Register from "./pages/register";
import Settings from "./pages/settings";
import Page404 from "./pages/page404";

export default class Router {
    constructor() {
        this.routes = {
            "/": Index,
            "/login": Login,
            "/register": Register,
            "/settings": Settings
        };
    }

    getView(url) {
        return this.routes[url] ? new this.routes[url]() : new Page404();
    }
}
