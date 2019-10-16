const BACKEND_URL = "https://quiet-depths-50475.herokuapp.com";

const routes = {
    USER_LIST_PATH: "/api/v1/user/list",
    CURRENT_USER_PROFILE_PATH: "/api/v1/user/me",
    USER_LOGIN_PATH: "/api/v1/user/login",
    USER_LOGOUT_PATH: "/api/v1/user/logout",
    USER_REGISTER_PATH: "/api/v1/user/register",
};

export default class API {
    static registerUser(email, name, password) {
        return this._post(routes.USER_REGISTER_PATH, { email, name, password });
    }

    static loginUser(email, password) {
        return this._post(routes.USER_LOGIN_PATH, { email, password });
    }

    static logoutUser() {
        return this._post(routes.USER_LOGOUT_PATH);
    }

    static currentUserProfile() {
        return this._get(routes.CURRENT_USER_PROFILE_PATH).then(response =>
            response ? response["user"] : null
        );
    }

    static listUsers() {
        return this._get(routes.USER_LIST_PATH).then(response =>
            response ? response["users"] : null
        );
    }

    static _get(path) {
        const url = BACKEND_URL + path;
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

    static _post(path, body) {
        const url = BACKEND_URL + path;
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

    static _processResponse(requestedUrl, responsePromise) {
        return responsePromise
            .then(response => response.json())
            .then(response => {
                if (response["status"] === "error") {
                    this._processResponseError(requestedUrl, response);
                    return null;
                }
                return response["body"];
            });
    }

    static _processResponseError(url, response) {
        console.error(
            `API request failed. \n${url}\n ${response["body"]["message"]}`
        );
    }
}
