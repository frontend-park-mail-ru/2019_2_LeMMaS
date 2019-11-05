export default class HttpNetwork {
    get(path) {
        return this._request(path, {
            method: "GET",
            mode: "cors",
            origin: true,
            credentials: "include",
        });
    }

    post(path, body) {
        return this._request(path, {
            method: "POST",
            mode: "cors",
            origin: true,
            credentials: "include",
            body,
        });
    }

    _request(path, options) {
        const { body } = options;
        const { method } = options;
        const headers =
            method === "GET"
                ? {}
                : { "Content-Type": "application/json;charset=utf-8" };

        const isFormData = body instanceof FormData;
        return fetch(path, {
            ...options,
            headers: isFormData ? undefined : headers,
            body: isFormData ? body : JSON.stringify(body),
        });
    }
}
