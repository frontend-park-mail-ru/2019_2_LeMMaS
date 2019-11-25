import httpNetwork from "./http";

const BACKEND_URL = "95.163.212.121";
const API_V1_PREFIX = "api/v1";
const API_PUBLIC_PREFIX = "public";
const API_PRIVATE_PREFIX = "private";
const USER_PREFIX = "/user/";
const PUBLIC_USER = API_PUBLIC_PREFIX + USER_PREFIX;
const PRIVATE_USER = API_PRIVATE_PREFIX + USER_PREFIX;

const routes = {
    USER_LIST: PUBLIC_USER + "list",
    USER_LOGIN: PUBLIC_USER + "login",
    USER_REGISTER: PUBLIC_USER + "register",
    USER_UPDATE: PRIVATE_USER + "update",
    USER_PROFILE: PRIVATE_USER + "me",
    USER_LOGOUT: PRIVATE_USER + "logout",
    USER_AVATAR_UPLOAD: PRIVATE_USER + "avatar/upload",
    USER_AVATAR_PREVIEW: PRIVATE_USER + "avatar/getByName",

    ACCESS_CSRF_TOKEN: API_PUBLIC_PREFIX + "/access/csrf",

    GAME_SOCKET: API_PRIVATE_PREFIX + "/game",
};

export const STATUS_OK = "ok";

const CSRF_TOKEN_HEADER = "X-CSRF-Token";

class API {
    constructor() {
        this.csrfToken = null;
    }

    registerUser = (email, name, password) =>
        this._post(routes.USER_REGISTER, {
            email,
            name,
            password,
        });

    loginUser = (email, password) =>
        this._post(routes.USER_LOGIN, {
            email,
            password,
        });

    logoutUser = () => this._post(routes.USER_LOGOUT);

    updateUser = (name, password) =>
        this._post(routes.USER_UPDATE, {
            name,
            password,
        });

    updateAvatar = formData => this._post(routes.USER_AVATAR_UPLOAD, formData);

    currentUserProfile = () =>
        this._get(routes.USER_PROFILE).then(response => response.body.user);

    getAvatarPreviewUrl = name =>
        this._get(routes.USER_AVATAR_PREVIEW + "?name=" + name).then(
            response => response.body
        );

    getAvatarById = id =>
        this._get(PUBLIC_USER + id).then(
            response => response.body.user
        );

    listUsers = () =>
        this._get(routes.USER_LIST).then(response => response.body.users);

    openGameWebSocket = () =>
        new WebSocket(this._getUrlByRoute(routes.GAME_SOCKET, "ws"))

    _getCSRFToken = () =>
        this._get(routes.ACCESS_CSRF_TOKEN).then(
            response => response.body.token
        );

    _get = route =>
        httpNetwork
            .get(this._getUrlByRoute(route));

    _post = async (route, body) => {
        const headers = {};
        if (this._isPrivateRoute(route)) {
            if (this.csrfToken === null) {
                this.csrfToken = await this._getCSRFToken();
            }
            headers[CSRF_TOKEN_HEADER] = this.csrfToken;
        }
        const response = await httpNetwork.post(this._getUrlByRoute(route), body, headers);
        if (!response.ok && response.body && response.body.message === "incorrect CSRF token") {
            this.csrfToken = await this._getCSRFToken();
            headers[CSRF_TOKEN_HEADER] = this.csrfToken;
            return await httpNetwork.post(this._getUrlByRoute(route), body, headers);
        }
        return response;
    };

    _getUrlByRoute = (route, protocol = "http") => protocol + "://" + [BACKEND_URL, API_V1_PREFIX, route].join("/");

    _isPrivateRoute = route => route.startsWith(API_PRIVATE_PREFIX);
}

export default new API();
