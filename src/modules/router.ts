import Index from "pages";
import Login from "pages/user/login";
import Register from "pages/user/register";
import Profile from "pages/user/profile";
import Page404 from "pages/page404";
import Singleplayer from "pages/game/singleplayer";
import Multiplayer from "pages/game/multiplayer";

export const routes = {
    INDEX: "/",
    USER_LOGIN: "/user/login",
    USER_REGISTER: "/user/register",
    USER_PROFILE: "/user/profile",
    SINGLEPLAYER: "/game/singleplayer",
    MULTIPLAYER: "/game/multiplayer",
};

const views = {};
views[routes.INDEX] = Index;
views[routes.USER_LOGIN] = Login;
views[routes.USER_REGISTER] = Register;
views[routes.USER_PROFILE] = Profile;
views[routes.SINGLEPLAYER] = Singleplayer;
views[routes.MULTIPLAYER] = Multiplayer;

class Router {
    renderPage = (): void => {
        this._renderView(location.pathname);
    };

    redirect = (route: string): void => {
        window.history.pushState({}, document.title, route);
        this._renderView(route);
    };

    render404 = (): void => {
        new Page404().render();
    };

    _renderView = (route: string): void => {
        const view = views[route] ? new views[route]() : new Page404();
        view.render();
    };
}

export default new Router();
