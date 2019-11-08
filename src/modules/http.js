import user from "../modules/user";

const HEADER_CONTENT_TYPE = "Content-Type";
const CSRF_TOKEN_HEADER = "X-CSRF-Token";
const CONTENT_TYPE_JSON = "application/json;charset=utf-8";

class HttpNetwork {
    constructor() {}

    get = url =>
        this._request(url, {
            method: "GET",
            mode: "cors",
            origin: true,
            credentials: "include",
        });

    post = async (url, body) =>
        this._request(url, {
            method: "POST",
            mode: "cors",
            origin: true,
            credentials: "include",
            body,
        });

    _request = (url, options) => {
        const { body } = options;
        const { method } = options;
        const headers =
            method === "GET"
                ? {}
                : {
                      [CSRF_TOKEN_HEADER]: user.getCSRF(),
                  };

        const isFormData = body instanceof FormData;
        if (!isFormData) {
            headers[HEADER_CONTENT_TYPE] = CONTENT_TYPE_JSON;
        }

        return fetch(url, {
            ...options,
            headers: headers,
            body: isFormData ? body : JSON.stringify(body),
        });
    };
}

export default new HttpNetwork();
