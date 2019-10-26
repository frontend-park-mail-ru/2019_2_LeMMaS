export default class HttpNetwork {

    _request(path, options) {
        const {body} = options;
        let headers;
        if (typeof body === "object") {
            headers = {"Content-Type" : "application/json;charset=utf-8"};
        }
        console.log(headers);
        return fetch(path, {
            ...options,
            headers: headers,
            body: body instanceof FormData
                    ? body
                    : JSON.stringify(body)
        });
    }

    _get(path) {
        return this._request(path, {method: "GET", mode: "cors", origin: true, credentials: "include"});
    }

    _post(path, options) {
        return this._request(path, {method: "POST", mode: "cors",  origin: true, credentials: "include",  ...options});
    }
}
