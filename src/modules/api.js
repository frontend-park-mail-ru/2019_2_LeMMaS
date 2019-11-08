import httpNetwork from "./http";
import User from "../modules/user";

const BACKEND_URL = "http://95.163.212.121";
const API_V1_PATH_PREFIX = "api/v1";

const routes = {
    USER_LIST_PATH: "user/list",
    USER_SETTINGS_PATH: "user/update",
    CURRENT_USER_PROFILE_PATH: "user/me",
    USER_LOGIN_PATH: "user/login",
    USER_LOGOUT_PATH: "user/logout",
    USER_REGISTER_PATH: "user/register",
    USER_AVATAR_UPLOAD_PATH: "user/avatar/upload",
    USER_AVATAR_PREVIEW_PATH: "user/avatar/getByName",
};

export default class API {
    static registerUser(email, name, password) {
        return httpNetwork.post(
            [BACKEND_URL, API_V1_PATH_PREFIX, routes.USER_REGISTER_PATH].join(
                "/"
            ),
            {
                email,
                name,
                password,
            }
        );
    }

    static loginUser(email, password) {
        return httpNetwork
            .post(
                [BACKEND_URL, API_V1_PATH_PREFIX, routes.USER_LOGIN_PATH].join(
                    "/"
                ),
                {
                    email,
                    password,
                }
            )
            .then(response => {
                if (response.status === 200) {
                    User.setLogin(true);
                    return response;
                }
            });
    }

    static logoutUser() {
        return httpNetwork
            .post(
                [BACKEND_URL, API_V1_PATH_PREFIX, routes.USER_LOGOUT_PATH].join(
                    "/"
                )
            )
            .then(response => {
                if (response.status === 200) {
                    User.setLogin(false);
                    return response;
                }
            });
    }

    static changeUserData(name, password) {
        return httpNetwork.post(
            [BACKEND_URL, API_V1_PATH_PREFIX, routes.USER_SETTINGS_PATH].join(
                "/"
            ),
            {
                name,
                password,
            }
        );
    }

    static changeAvatar(formData) {
        return httpNetwork.post(
            [
                BACKEND_URL,
                API_V1_PATH_PREFIX,
                routes.USER_AVATAR_UPLOAD_PATH,
            ].join("/"),
            formData
        );
    }

    static getAvatarPreviewUrl(name) {
        const path =
            [
                BACKEND_URL,
                API_V1_PATH_PREFIX,
                routes.USER_AVATAR_PREVIEW_PATH,
            ].join("/") +
            "?name=" +
            name;
        return httpNetwork
            .get(path)
            .then(response => response.json())
            .then(response => response.body.avatar_url);
    }

    static currentUserProfile() {
        return httpNetwork
            .get(
                [
                    BACKEND_URL,
                    API_V1_PATH_PREFIX,
                    routes.CURRENT_USER_PROFILE_PATH,
                ].join("/")
            )
            .then(response => response.json())
            .then(response => response.body.user);
    }

    static listUsers() {
        return httpNetwork
            .get(
                [BACKEND_URL, API_V1_PATH_PREFIX, routes.USER_LIST_PATH].join(
                    "/"
                )
            )
            .then(response => response.json())
            .then(response => response.body.users);
    }
}
