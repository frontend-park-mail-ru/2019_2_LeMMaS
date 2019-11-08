const DEFAULT_POST_HEADERS = {
    "Content-Type": "application/json;charset=utf-8",
};

class HttpNetwork {
    get(url) {
        return this._request(url, {
            method: "GET",
            mode: "cors",
            origin: true,
            credentials: "include",
        });
    }

    post(url, body, headers = DEFAULT_POST_HEADERS) {
        return this._request(
            url,
            {
                method: "POST",
                mode: "cors",
                origin: true,
                credentials: "include",
                body,
            },
            headers
        );
    }

    _request(url, options, headers = {}) {
        const { body } = options;
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
