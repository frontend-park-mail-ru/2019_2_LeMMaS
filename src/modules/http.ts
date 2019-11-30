import { Options } from "./options";

const HEADER_CONTENT_TYPE = "Content-Type";
const CONTENT_TYPE_JSON = "application/json;charset=utf-8";

class HttpNetwork {
    get = (url: string, headers?: Headers | undefined): Promise<Response> =>
        this._request(
            url,
            {
                method: "GET",
                mode: "cors",
                origin: true,
                credentials: "include",
                body: "",
            },
            headers
        );

    post = <Body>(url: string, body: Body | undefined, headers: Headers): Promise<Response> =>
        this._request<Body>(
            url,
            {
                method: "POST",
                mode: "cors",
                origin: true,
                credentials: "include",
                body: body,
            },
            headers
        );

    _request = <Body>(url: string, options: Partial<Options<Body>>, headers: Headers | undefined): Promise<Response> => {
        const { body } = options;

        if (!headers) {
            headers = new Headers();
        }

        if (body instanceof FormData) {
            headers.set(HEADER_CONTENT_TYPE, CONTENT_TYPE_JSON);
            return fetch(url, {
                ...options,
                headers,
                body: body,
            });
        } else if (body instanceof Object) {
            return fetch(url, {
                ...options,
                headers,
                body: JSON.stringify(body),
            });
        }
        return fetch(url, {
            ...options,
            headers,
            body: null
        });
    }
}

export default new HttpNetwork();
