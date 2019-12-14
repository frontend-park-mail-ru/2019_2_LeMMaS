import httpNetwork from "./http";
import { MyResponse, ResponseUser } from "./responseBody";
import { StandartJSONResponse } from "common-api";

const BACKEND_URL = "lemmas.ru";
const API_V1_PREFIX = "api/v1";
const API_PUBLIC_PREFIX = "public";
const API_PRIVATE_PREFIX = "private";
const USER_PREFIX = "/user/";
const PUBLIC_USER = API_PUBLIC_PREFIX + USER_PREFIX;
const PRIVATE_USER = API_PRIVATE_PREFIX + USER_PREFIX;

const routes = {
    USER_LIST: PUBLIC_USER + "list",
    USER_LOGIN: PUBLIC_USER + "login",
    USER_REGISTER: PUBLIC_USER + "register",
    USER_UPDATE: PRIVATE_USER + "update",
    USER_PROFILE: PRIVATE_USER + "me",
    USER_BY_ID: PUBLIC_USER,
    USER_LOGOUT: PRIVATE_USER + "logout",
    USER_AVATAR_UPLOAD: PRIVATE_USER + "avatar/upload",
    USER_AVATAR_PREVIEW: PRIVATE_USER + "avatar/getByName",

    ACCESS_CSRF_TOKEN: API_PUBLIC_PREFIX + "/access/csrf",

    GAME_SOCKET: API_PRIVATE_PREFIX + "/game",
};

export const STATUS_OK = "ok";

const CSRF_TOKEN_HEADER = "X-CSRF-Token";

interface Body {
    name: string;
    email: string;
    password: string;
}

class PostHeader extends Headers {
    "X-CSRF-Token": string | null | undefined;
}

class API {
    private csrfToken: string | null | undefined;

    constructor() {
        this.csrfToken = null;
    }

    registerUser = (email: string, name: string, password: string): Promise<Response> => {
        return this._post<Partial<Body>>(routes.USER_REGISTER, { email, name, password });
    };

    loginUser = async (email: string, password: string): Promise<Response> => {
        const body: Partial<Body> = { email, password };
        const response = await this._post<Partial<Body>>(routes.USER_LOGIN, body);
        return response as Response;
    };

    logoutUser = (): Promise<Response> => this._post(routes.USER_LOGOUT);

    updateUser = async (name: string, password: string): Promise<Response> => {
        const body: Partial<Body> = { name, password };
        return await this._post<Partial<Body>>(routes.USER_UPDATE, body);
    };

    updateAvatar = (formData: FormData): Promise<Response> => this._post<FormData>(routes.USER_AVATAR_UPLOAD, formData);

    currentUserProfile = async (): Promise<ResponseUser> => {
        return await this._get(routes.USER_PROFILE).then((response: Response) => response.json())
            .then((response: StandartJSONResponse<MyResponse>) => {
                return response.body && response.body.user as ResponseUser;
            });
    };

    getAvatarPreviewUrl = (name: string): Promise<unknown> =>
        this._get(routes.USER_AVATAR_PREVIEW + "?name=" + name).then((response: Response) => response.json())
            .then((response: StandartJSONResponse<MyResponse>) => {
                return response.body;
            });

    getUserInfoById = (id: number): Promise<ResponseUser> =>
        this._get(routes.USER_BY_ID + id)
            .then((response: Response) => response.json())
            .then((response: StandartJSONResponse<MyResponse>): ResponseUser => response.body.user as ResponseUser);

    listUsers = (): Promise<unknown> =>
        this._get(routes.USER_LIST).then((response: Response) => response.json())
            .then((response: StandartJSONResponse<MyResponse>) => response.body.users);

    openGameWebSocket = (): WebSocket =>
        new WebSocket(this._getUrlByRoute(routes.GAME_SOCKET, "ws"));

    _getCSRFToken = (): Promise<string | null | undefined> =>
        this._get(routes.ACCESS_CSRF_TOKEN).then((response: Response) => response.json())
            .then((response: StandartJSONResponse<MyResponse>) => response.body.token
        );

    _get = (route: string): Promise<Response> => httpNetwork.get(this._getUrlByRoute(route));

    _post = async <Body> (route: string, body?: Body): Promise<Response> => {
        const headers = new PostHeader();

        if (this._isPrivateRoute(route)) {
            if (this.csrfToken === null) {
                this.csrfToken = await this._getCSRFToken();
            }
            if (this.csrfToken) {
                headers.set(CSRF_TOKEN_HEADER, this.csrfToken);
            }
        }

        return await httpNetwork.post<Body>(
            this._getUrlByRoute(route),
            body,
            headers
        );
    };

    _getUrlByRoute = (route: string, protocol = "http"): string =>
        protocol + "://" + [BACKEND_URL, API_V1_PREFIX, route].join("/");

    _isPrivateRoute = (route: string): boolean => route.startsWith(API_PRIVATE_PREFIX);
}

export default new API();
