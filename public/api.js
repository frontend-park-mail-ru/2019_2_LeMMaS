const BACKEND_URL = "https://quiet-depths-50475.herokuapp.com";

const routes = {
    USER_LIST_PATH: "/api/v1/user/list",
    USER_SETIINGS_PATH: "/api/v1/user/update",
    CURRENT_USER_PROFILE_PATH: "/api/v1/user/me",
    USER_LOGIN_PATH: "/api/v1/user/login",
    USER_LOGOUT_PATH: "/api/v1/user/logout",
    USER_REGISTER_PATH: "/api/v1/user/register",
    USER_PIC_PATH: "/api/v1/user/avatar/upload"
};

export default class API {
    static registerUser(email, name, password) {
        return this._post(routes.USER_REGISTER_PATH, { email, name, password });
    }

    static changeUserData(name = "", password = "") {
        return this._post(routes.USER_SETIINGS_PATH, { name, password });
    }

    static changeAvatar(formData) {
        return this._postMultipart(routes.USER_PIC_PATH, formData);
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

    static _postMultipart(path, formaData) {
        const url = BACKEND_URL + path;
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
                }
                if (response["body"] !== null) {
                    return response["body"];
                }
                return response;
            });
    }

    static _processResponseError(url, response) {
        console.error(
            `API request failed. \n${url}\n ${response["body"]["message"]}`
        );
    }
}
