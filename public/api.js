const BACKEND_URL = "https://quiet-depths-50475.herokuapp.com";

const routes = {
    USER_LIST_PATH: "/api/v1/user/list",
    CURRENT_USER_PROFILE_PATH: "/api/v1/user/me",
    USER_LOGIN_PATH: "/api/v1/user/login",
    USER_REGISTER_PATH: "/api/v1/user/register",
};

export default class API {
    static registerUser(email, name, password) {
        return this._post(routes.USER_REGISTER_PATH, { email, name, password });
    }

    static loginUser(email, password) {
        return this._post(routes.USER_LOGIN_PATH, { email, password });
    }

    static currentUserProfile() {
        return this._get(routes.CURRENT_USER_PROFILE_PATH).then(
            response => response["user"]
        );
    }

    static listUsers() {
        return this._get(routes.USER_LIST_PATH).then(
            response => response["users"]
        );
    }

    static _get(path) {
        return fetch(BACKEND_URL + path, {
            method: "GET",
            mode: "cors",
            origin: true,
            credentials: "include",
        })
            .then(response => response.json())
            .then(response => response["body"]);
    }

    static _post(path, body) {
        return fetch(BACKEND_URL + path, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            origin: true,
            credentials: "include",
            body: JSON.stringify(body),
        })
            .then(response => response.json())
            .then(response => response["body"]);
    }
}
