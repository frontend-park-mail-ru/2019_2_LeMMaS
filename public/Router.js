import Index from "../public/views/Index";
import Login from "../public/views/Login";
import Register from "./views/Register";
import Page404 from "./views/Page404";
import Settings from "./views/Settings";

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
