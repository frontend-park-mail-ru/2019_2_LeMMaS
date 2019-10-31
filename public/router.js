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

let views = {};
views[routes.INDEX_PAGE_ROUTE] = Index;
views[routes.USER_LOGIN_PAGE_ROUTE] = Login;
views[routes.USER_REGISTER_PAGE_ROUTE] = Register;
views[routes.USER_PROFILE_PAGE_ROUTE] = Profile;
views[routes.GAME_SINGLE_PAGE_ROUTE] = GamePage;

export default class Router {
    static renderPage() {
        const url = location.pathname;
        const view = views[url] ? new views[url]() : new Page404();
        view.render();
    }
}
