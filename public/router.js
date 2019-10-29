import Index from "./pages/index";
import Login from "./pages/user/login";
import Register from "./pages/user/register";
import Profile from "./pages/user/profile";
import Page404 from "./pages/page404";
import GamePage from "./pages/game";

export const routes = {
    INDEX_PAGE_ROUTE: "/",
    USER_LOGIN_PAGE_ROUTE: "/user/login",
    USER_REGISTER_PAGE_ROUTE: "/user/register",
    USER_PROFILE_PAGE_ROUTE: "/user/profile",
    GAME_SINGLE_PAGE_ROUTE: "/game/singleplayer",
};

export default class Router {
    constructor() {
        this.routes = {};
        this.routes[routes.INDEX_PAGE_ROUTE] = Index;
        this.routes[routes.USER_LOGIN_PAGE_ROUTE] = Login;
        this.routes[routes.USER_REGISTER_PAGE_ROUTE] = Register;
        this.routes[routes.USER_PROFILE_PAGE_ROUTE] = Profile;
        this.routes[routes.GAME_SINGLE_PAGE_ROUTE] = GamePage;
    }

    getView(url) {
        return this.routes[url] ? new this.routes[url]() : new Page404();
    }

    renderPage() {
        const url = location.pathname;
        const view = this.routes[url] ? new this.routes[url]() : new Page404();
        view.render();
    }
}
