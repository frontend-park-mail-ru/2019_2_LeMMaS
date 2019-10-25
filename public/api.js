import HttpNetwork from "./http";

const BACKEND_URL = "https://quiet-depths-50475.herokuapp.com";
const PREFIX = "/api/v1/user";

const routes = {
    USER_LIST_PATH: "/list",
    USER_SETIINGS_PATH: "/update",
    CURRENT_USER_PROFILE_PATH: "/me",
    USER_LOGIN_PATH: "/login",
    USER_LOGOUT_PATH: "/logout",
    USER_REGISTER_PATH: "/register",
    USER_PIC_PATH: "/upload"
};

export default class API {
    static registerUser(email, name, password) {
        return (new HttpNetwork())._post(
            BACKEND_URL + PREFIX + routes.USER_REGISTER_PATH,
            JSON.stringify(email, name, password),
            {headers: {
            "Content-Type": "application/json;charset=utf-8"}} );
    }

    static changeUserData(name = "", password = "") {
        return (new HttpNetwork())._post(
            BACKEND_URL + PREFIX + routes.USER_SETIINGS_PATH,
            JSON.stringify(name, password),
            {headers: {
                    "Content-Type": "application/json;charset=utf-8"}} );
    }

    static changeAvatar(formData) {
        return (new HttpNetwork())._post(BACKEND_URL + PREFIX + routes.USER_PIC_PATH, formData);

    }

    static loginUser(email, password) {
        console.log("login");
        return (new HttpNetwork())._post(
            BACKEND_URL + PREFIX + routes.USER_LOGIN_PATH,
            {body : {email, password}} );
    }

    static logoutUser() {
        return (new HttpNetwork())._post(
            BACKEND_URL + PREFIX + routes.USER_LOGOUT_PATH,
            JSON.stringify(""),
            {headers: {
                    "Content-Type": "application/json;charset=utf-8"}});
    }

    static currentUserProfile() {
        return (new HttpNetwork())._get(BACKEND_URL + PREFIX + routes.CURRENT_USER_PROFILE_PATH).then(response =>
            response ? response["user"] : null
        );
    }

    static listUsers() {
        return this._get(routes.USER_LIST_PATH).then(response =>
            response ? response["users"] : null
        );
    }

    static _request(method, path) {
        const url = BACKEND_URL + PREFIX + path;
        return this._processResponse(
            url,
            fetch(url, {
                method: method,
                mode: "cors",
                origin: true,
                credentials: "include",
            })
        );
    }

    static _get(path) {
        const url = BACKEND_URL + PREFIX + path;
        return this._processResponse(
            url,
            fetch(url, {
                method: "GET",
                mode: "cors",
                origin: true,
                credentials: "include",
            })
        );
    }

    static _postMultipart(path, formaData) {
        const url = BACKEND_URL + PREFIX + path;
        return this._processResponse(
            url,
            fetch(url, {
                method: "POST",
                mode: "cors",
                origin: true,
                credentials: "include",
                body: formaData,
            })
        );
    }

    static _post(path, body) {
        const url = BACKEND_URL + PREFIX + path;
        return this._processResponse(
            url,
            fetch(url, {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                },
                origin: true,
                credentials: "include",
                body: JSON.stringify(body),
            })
        );
    }
}
