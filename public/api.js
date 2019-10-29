import HttpNetwork from "./http";

const BACKEND_URL = "https://quiet-depths-50475.herokuapp.com";
const PREFIX = "/api/v1/user";

const routes = {
    USER_LIST_PATH: "/list",
    USER_SETTINGS_PATH: "/update",
    CURRENT_USER_PROFILE_PATH: "/me",
    USER_LOGIN_PATH: "/login",
    USER_LOGOUT_PATH: "/logout",
    USER_REGISTER_PATH: "/register",
    USER_PIC_PATH: "/avatar/upload",
};

export default class API {
    static registerUser(email, name, password) {
        return new HttpNetwork()._post(
            BACKEND_URL + PREFIX + routes.USER_REGISTER_PATH,
            { body: { email, name, password } }
        );
    }

    static loginUser(email, password) {
        return new HttpNetwork()._post(
            BACKEND_URL + PREFIX + routes.USER_LOGIN_PATH,
            { body: { email, password } }
        );
    }

    static logoutUser() {
        return new HttpNetwork()._post(
            BACKEND_URL + PREFIX + routes.USER_LOGOUT_PATH,
            { body: {} }
        );
    }

    static changeUserData(name = "", password = "") {
        return new HttpNetwork()._post(
            BACKEND_URL + PREFIX + routes.USER_SETTINGS_PATH,
            { body: { name, password } }
        );
    }

    static changeAvatar(formData) {
        return new HttpNetwork()._post(
            BACKEND_URL + PREFIX + routes.USER_PIC_PATH,
            { body: formData }
        );
    }

    static currentUserProfile() {
        return new HttpNetwork()._get(
            BACKEND_URL + PREFIX + routes.CURRENT_USER_PROFILE_PATH
        );
    }

    static listUsers() {
        return new HttpNetwork()
            ._get(BACKEND_URL + PREFIX + routes.USER_LIST_PATH)
            .then(response => response.json());
    }
}
