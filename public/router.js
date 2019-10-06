import Index from "../public/views/index";
import Login from "../public/views/login";
import Register from "./views/register";
import FourOFour from "./views/404";
import Settings from "./views/settings";

class Router
{
    constructor() {
        this.routes = {};
    }

    addController(url, controller) {
        this.routes[url] = controller;
    }

    getController(url) {
        return this.routes[url] ? this.routes[url] : this.routes["/404"];
    }
}


const router = new Router();
router.addController("/", Index);
router.addController("/login", Login);
router.addController("/register", Register);
router.addController("/404", FourOFour);
router.addController("/settings", Settings);

export default router;