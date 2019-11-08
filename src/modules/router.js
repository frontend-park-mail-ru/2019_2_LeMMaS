import Index from "../pages";
import Login from "../pages/user/login";
import Register from "../pages/user/register";
import Profile from "../pages/user/profile";
import Page404 from "../pages/page404";
import GamePage from "../pages/game";

export const routes = {
    INDEX: "/",
    USER_LOGIN: "/user/login",
    USER_REGISTER: "/user/register",
    USER_PROFILE: "/user/profile",
    SINGLEPLAYER: "/game/singleplayer",
};

let views = {};
views[routes.INDEX] = Index;
views[routes.USER_LOGIN] = Login;
views[routes.USER_REGISTER] = Register;
views[routes.USER_PROFILE] = Profile;
views[routes.SINGLEPLAYER] = GamePage;

class Router {
    renderPage() {
        const url = location.pathname;
        const view = views[url] ? new views[url]() : new Page404();
        view.render();
    }
}

const router = new Router();

export default router;
