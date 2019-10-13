const routes = {
    USER_REGISTER_ROUTE: "/api/v1/register/login",
};

export default class API {
    static register(login, password, email) {
        return this._post(routes.USER_REGISTER_ROUTE, {
            login: login,
            password: password,
            email: email,
        });
    }

    static _post(url, body) {
        return fetch(url, {
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
