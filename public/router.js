import Index from "./pages/index";
import Login from "./pages/user/login";
import Register from "./pages/user/register";
import Profile from "./pages/user/profile";
import Page404 from "./pages/page404";

export default class Router {
    constructor() {
        this.routes = {
            "/": Index,
            "/user/login": Login,
            "/user/register": Register,
            "/user/profile": Profile
        };
    }

    getView(url) {
        return this.routes[url] ? new this.routes[url]() : new Page404();
    }
}
