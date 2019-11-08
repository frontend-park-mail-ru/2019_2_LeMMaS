import httpNetwork from "./http";

const BACKEND_URL = "http://95.163.212.121";
const API_V1_PREFIX = "api/v1";

const routes = {
    USER_LIST_PATH: "public/user/list",
    USER_LOGIN_PATH: "public/user/login",
    USER_REGISTER_PATH: "public/user/register",
    USER_UPDATE_PATH: "private/user/update",
    CURRENT_USER_PROFILE_PATH: "private/user/me",
    USER_LOGOUT_PATH: "private/user/logout",
    USER_AVATAR_UPLOAD_PATH: "private/user/avatar/upload",
    USER_AVATAR_PREVIEW_PATH: "private/user/avatar/getByName",
};

let csrfToken = null;

class API {
    registerUser(email, name, password) {
        return this._post(routes.USER_REGISTER_PATH, {
            email,
            name,
            password,
        });
    }

    loginUser(email, password) {
        return this._post(routes.USER_LOGIN_PATH, {
            email,
            password,
        });
    }

    logoutUser() {
        return this._post(routes.USER_LOGOUT_PATH);
    }

    changeUserData(name, password) {
        return this._post(routes.USER_UPDATE_PATH, {
            name,
            password,
        });
    }

    changeAvatar(formData) {
        return this._post(routes.USER_AVATAR_UPLOAD_PATH, formData);
    }

    getAvatarPreviewUrl(name) {
        return this._get(routes.USER_AVATAR_PREVIEW_PATH + "?name=" + name)
            .then(response => response.json())
            .then(response => response.body.avatar_url);
    }

    currentUserProfile() {
        return this._get(routes.CURRENT_USER_PROFILE_PATH)
            .then(response => response.json())
            .then(response => response.body.user);
    }

    listUsers() {
        return this._get(routes.USER_LIST_PATH)
            .then(response => response.json())
            .then(response => response.body.users);
    }

    _get(route) {
        return httpNetwork.get(this._getUrl(route));
    }

    _post(route, body) {
        if (this._isPrivateRoute(route)) {
            if (csrfToken === null) {
                csrfToken = this._getCSRFToken();
            }
        }
        return httpNetwork.post(this._getUrl(route), body);
    }

    _getUrl(route) {
        return [BACKEND_URL, API_V1_PREFIX, route].join("/");
    }
}

const api = new API();
export default api;
