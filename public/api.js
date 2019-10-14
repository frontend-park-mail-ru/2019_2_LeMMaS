const BACKEND_URL = "https://quiet-depths-50475.herokuapp.com";

const routes = {
    USER_REGISTER_PATH: "/api/v1/user/register",
};

export default class API {
    static register(email, name, password) {
        return this._post(routes.USER_REGISTER_PATH, {
            email: email,
            name: name,
            password: password,
        });
    }

    static _post(path, body) {
        return fetch(BACKEND_URL + path, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            origin: true,
            body: JSON.stringify(body),
        }).then(response => {
            console.log("status = " + response.status);
            return response;
        });
    }
}
