export default class HttpNetwork {

    _request(path, ...options) {
        console.log(options);
        return fetch(path, ...options);
    }

    _get(path) {
        return this._request(path, {method: "GET", mode: "cors", origin: true, credentials: "include"});
    }

    _post(path, ...options) {
        return this._request(path, {method: "POST", mode: "cors",  origin: true, credentials: "include",  ...options});
    }
}
