import httpNetwork from "./http";
import User from "../modules/user";

const BACKEND_URL = "http://localhost:8080";
const API_V1_PREFIX = "api/v1";
const API_PUBLIC_PREFIX = "public";
const API_PRIVATE_PREFIX = "private";

const routes = {
    USER_LIST: API_PUBLIC_PREFIX + "/user/list",
    USER_LOGIN: API_PUBLIC_PREFIX + "/user/login",
    USER_REGISTER: API_PUBLIC_PREFIX + "/user/register",
    USER_UPDATE: API_PRIVATE_PREFIX + "/user/update",
    USER_PROFILE: API_PRIVATE_PREFIX + "/user/me",
    USER_LOGOUT: API_PRIVATE_PREFIX + "/user/logout",
    USER_AVATAR_UPLOAD: API_PRIVATE_PREFIX + "/user/avatar/upload",
    USER_AVATAR_PREVIEW: API_PRIVATE_PREFIX + "/user/avatar/getByName",

    ACCESS_CSRF_TOKEN: API_PUBLIC_PREFIX + "/access/csrf",
};

const CSRF_TOKEN_HEADER = "X-CSRF-Token";

class API {
    constructor() {
        this.csrfToken = null;
    }

    registerUser(email, name, password) {
        return this._post(routes.USER_REGISTER, {
            email,
            name,
            password,
        });
    }

    loginUser(email, password) {
        return this._post(routes.USER_LOGIN, {
            email,
            password,
        }).then(response => {
                if (response.status === 200) {
                    User.setLogin(true);
                    return response;
                }
            });
    }

    logoutUser() {
        return this._post(routes.USER_LOGOUT);
    }

    changeUserData(name, password) {
        return this._post(routes.USER_UPDATE, {
            name,
            password,
        });
    }

    changeAvatar(formData) {
        return this._post(routes.USER_AVATAR_UPLOAD, formData);
    }

    getAvatarPreviewUrl(name) {
        return this._get(routes.USER_AVATAR_PREVIEW + "?name=" + name)
            .then(response => response.json())
            .then(response => response.body.avatar_url);
    }

    currentUserProfile() {
        return this._get(routes.USER_PROFILE)
            .then(response => response.json())
            .then(response => response.body.user);
    }

    listUsers() {
        return this._get(routes.USER_LIST)
            .then(response => response.json())
            .then(response => response.body.users);
    }

    _get(route) {
        return httpNetwork.get(this._getUrl(route));
    }

    async _post(route, body) {
        const headers = {};
        if (this._isPrivateRoute(route)) {
            if (this.csrfToken === null) {
                this.csrfToken = await this._getCSRFToken();
            }
            headers[CSRF_TOKEN_HEADER] = this.csrfToken;
        }
        return httpNetwork.post(this._getUrl(route), body, headers);
    }

    _getUrl(route) {
        return [BACKEND_URL, API_V1_PREFIX, route].join("/");
    }

    _isPrivateRoute(route) {
        return route.startsWith(API_PRIVATE_PREFIX);
    }

    _getCSRFToken() {
        return this._get(routes.ACCESS_CSRF_TOKEN)
            .then(response => response.json())
            .then(response => response.body.token);
    }
}

const api = new API();
export default api;
