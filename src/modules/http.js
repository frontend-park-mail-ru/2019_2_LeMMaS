class HttpNetwork {
    get(url) {
        return this._request(url, {
            method: "GET",
            mode: "cors",
            origin: true,
            credentials: "include",
        });
    }

    post(url, body) {
        return this._request(url, {
            method: "POST",
            mode: "cors",
            origin: true,
            credentials: "include",
            body,
        });
    }

    _request(url, options) {
        const { body } = options;
        const { method } = options;
        const headers =
            method === "GET"
                ? {}
                : { "Content-Type": "application/json;charset=utf-8" };

        const isFormData = body instanceof FormData;
        return fetch(url, {
            ...options,
            headers: isFormData ? undefined : headers,
            body: isFormData ? body : JSON.stringify(body),
        });
    }
}

const httpNetwork = new HttpNetwork();

export default httpNetwork;
