const BACKEND_URL = "http://95.163.212.121";
const API_V1_PATH_PREFIX = "api/v1";

const routes = {
    USER_LIST_PATH: "user/list",
    USER_SETTINGS_PATH: "user/update",
    CURRENT_USER_PROFILE_PATH: "user/me",
    USER_LOGIN_PATH: "user/login",
    USER_LOGOUT_PATH: "user/logout",
    USER_REGISTER_PATH: "user/register",
    USER_AVATAR_UPLOAD_PATH: "user/avatar/upload",
    USER_AVATAR_PREVIEW_PATH: "user/avatar/getByName",
};

export default class API {
    static registerUser(email, name, password) {
        return this._post(routes.USER_REGISTER_PATH, {
            email,
            name,
            password,
        });
    }

    static loginUser(email, password) {
        return this._post(routes.USER_LOGIN_PATH, {
            email,
            password,
        });
    }

    static logoutUser() {
        return this._post(routes.USER_LOGOUT_PATH);
    }

    static changeUserData(name, password) {
        return this._post(routes.USER_SETTINGS_PATH, {
            name,
            password,
        });
    }

    static changeAvatar(formData) {
        return this._post(routes.USER_AVATAR_UPLOAD_PATH, formData);
    }

    static getAvatarPreviewUrl(name) {
        const path = routes.USER_AVATAR_PREVIEW_PATH + "?name=" + name;
        return this._get(path)
            .then(response => response.json())
            .then(response => response.body.avatar_url);
    }

    static currentUserProfile() {
        return this._get(routes.CURRENT_USER_PROFILE_PATH)
            .then(response => response.json())
            .then(response => response.body.user);
    }

    static listUsers() {
        return this._get(routes.USER_LIST_PATH)
            .then(response => response.json())
            .then(response => response.body.users);
    }

    static _get(route) {
        return this._request(route, {
            method: "GET",
            mode: "cors",
            origin: true,
            credentials: "include",
        });
    }

    static _post(route, body) {
        return this._request(route, {
            method: "POST",
            mode: "cors",
            origin: true,
            credentials: "include",
            body,
        });
    }

    static _request(route, options) {
        const url = [BACKEND_URL, API_V1_PATH_PREFIX, route].join("/");
        const { body } = options;
        const { method } = options;
        const headers =
            method === "GET"
                ? {}
                : { "Content-Type": "application/json;charset=utf-8" };

        const isFormData = body instanceof FormData;
        return fetch(url, {
            ...options,
            headers: isFormData ? undefined : headers,
            body: isFormData ? body : JSON.stringify(body),
        });
    }
}
