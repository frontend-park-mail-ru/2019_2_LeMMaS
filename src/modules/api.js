import HttpNetwork from "./http";

const API_V1_PATH_PREFIX = "/api/v1";

const routes = {
    USER_LIST_PATH: API_V1_PATH_PREFIX + "/user/list",
    USER_SETTINGS_PATH: API_V1_PATH_PREFIX + "/user/update",
    CURRENT_USER_PROFILE_PATH: API_V1_PATH_PREFIX + "/user/me",
    USER_LOGIN_PATH: API_V1_PATH_PREFIX + "/user/login",
    USER_LOGOUT_PATH: API_V1_PATH_PREFIX + "/user/logout",
    USER_REGISTER_PATH: API_V1_PATH_PREFIX + "/user/register",
    USER_AVATAR_UPLOAD_PATH: API_V1_PATH_PREFIX + "/user/avatar/upload",
    USER_AVATAR_PREVIEW_PATH: API_V1_PATH_PREFIX + "/user/avatar/getByName",
};

export default class API {
    static registerUser(email, name, password) {
        return new HttpNetwork().post(routes.USER_REGISTER_PATH, {
            email,
            name,
            password,
        });
    }

    static loginUser(email, password) {
        return new HttpNetwork().post(routes.USER_LOGIN_PATH, {
            email,
            password,
        });
    }

    static logoutUser() {
        return new HttpNetwork().post(routes.USER_LOGOUT_PATH);
    }

    static changeUserData(name, password) {
        return new HttpNetwork().post(routes.USER_SETTINGS_PATH, {
            name,
            password,
        });
    }

    static changeAvatar(formData) {
        return new HttpNetwork().post(routes.USER_AVATAR_UPLOAD_PATH, formData);
    }

    static getAvatarPreviewUrl(name) {
        const path = routes.USER_AVATAR_PREVIEW_PATH + "?name=" + name;
        return new HttpNetwork()
            .get(path)
            .then(response => response.json())
            .then(response => response.body.avatar_url);
    }

    static currentUserProfile() {
        return new HttpNetwork()
            .get(routes.CURRENT_USER_PROFILE_PATH)
            .then(response => response.json())
            .then(response => response.body.user);
    }

    static listUsers() {
        return new HttpNetwork()
            .get(routes.USER_LIST_PATH)
            .then(response => response.json())
            .then(response => response.body.users);
    }
}
