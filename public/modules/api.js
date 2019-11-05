import HttpNetwork from "./http";

export const BACKEND_URL = "https://quiet-depths-50475.herokuapp.com";

const API_V1_PATH_PREFIX = "/api/v1/user";

const routes = {
    USER_LIST_PATH: "/list",
    USER_SETTINGS_PATH: "/update",
    CURRENT_USER_PROFILE_PATH: "/me",
    USER_LOGIN_PATH: "/login",
    USER_LOGOUT_PATH: "/logout",
    USER_REGISTER_PATH: "/register",
    USER_AVATAR_UPLOAD_PATH: "/avatar/upload",
    USER_AVATAR_PREVIEW_PATH: "/avatar/getByName",
};

export default class API {
    static registerUser(email, name, password) {
        return new HttpNetwork().post(
            BACKEND_URL + API_V1_PATH_PREFIX + routes.USER_REGISTER_PATH,
            { email, name, password }
        );
    }

    static loginUser(email, password) {
        return new HttpNetwork().post(
            BACKEND_URL + API_V1_PATH_PREFIX + routes.USER_LOGIN_PATH,
            { email, password }
        );
    }

    static logoutUser() {
        return new HttpNetwork().post(
            BACKEND_URL + API_V1_PATH_PREFIX + routes.USER_LOGOUT_PATH
        );
    }

    static changeUserData(name, password) {
        return new HttpNetwork().post(
            BACKEND_URL + API_V1_PATH_PREFIX + routes.USER_SETTINGS_PATH,
            { name, password }
        );
    }

    static changeAvatar(formData) {
        return new HttpNetwork().post(
            BACKEND_URL + API_V1_PATH_PREFIX + routes.USER_AVATAR_UPLOAD_PATH,
            formData
        );
    }

    static getAvatarPreviewUrl(name) {
        const path =
            BACKEND_URL +
            API_V1_PATH_PREFIX +
            routes.USER_AVATAR_PREVIEW_PATH +
            "?name=" +
            name;
        return new HttpNetwork()
            .get(path)
            .then(response => response.json())
            .then(response => response.body.avatar_url);
    }

    static currentUserProfile() {
        return new HttpNetwork()
            .get(
                BACKEND_URL +
                    API_V1_PATH_PREFIX +
                    routes.CURRENT_USER_PROFILE_PATH
            )
            .then(response => response.json())
            .then(response => response.body.user);
    }

    static listUsers() {
        return new HttpNetwork()
            .get(BACKEND_URL + API_V1_PATH_PREFIX + routes.USER_LIST_PATH)
            .then(response => response.json())
            .then(response => response.body.users);
    }
}
