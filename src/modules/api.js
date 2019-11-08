import httpNetwork from "./http";
import User from "../modules/user";

const BACKEND_URL = "http://95.163.212.121";
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

class API {
    registerUser = (email, name, password) =>
        httpNetwork.post(this._getUrl(routes.USER_REGISTER), {
            email,
            name,
            password,
        });

    loginUser = (email, password) =>
        httpNetwork
            .post(this._getUrl(routes.USER_LOGIN), {
                email,
                password,
            })
            .then(response => {
                if (response.status === 200) {
                    User.setLogin(true);
                    User.updateCurrentUser();
                    return response;
                }
                return response;
            });

    logoutUser = () =>
        httpNetwork.post(this._getUrl(routes.USER_LOGOUT)).then(response => {
            if (response.status === 200) {
                User.setLogin(false);
                User.reset();
                return response;
            }
            return response;
        });

    changeUserData = (name, password) =>
        httpNetwork.post(this._getUrl(routes.USER_UPDATE), {
            name,
            password,
        });

    changeAvatar = formData =>
        httpNetwork.post(this._getUrl(routes.USER_AVATAR_UPLOAD), formData);

    getAvatarPreviewUrl = name =>
        httpNetwork
            .get(this._getUrl(routes.USER_AVATAR_PREVIEW + "?name=" + name))
            .then(response => response.json())
            .then(response => response.body.avatar_url);

    currentUserProfile = () =>
        httpNetwork
            .get(this._getUrl(routes.USER_PROFILE))
            .then(response => response.json())
            .then(response => response.body.user);

    listUsers = () =>
        httpNetwork
            .get(this._getUrl(routes.USER_LIST))
            .then(response => response.json())
            .then(response => response.body.users);

    getCSRFToken = () =>
        httpNetwork
            .get(this._getUrl(routes.ACCESS_CSRF_TOKEN))
            .then(response => response.json())
            .then(response => response.body.token);

    _getUrl = route => [BACKEND_URL, API_V1_PREFIX, route].join("/");
}

export default new API();
