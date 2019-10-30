import API, { BACKEND_URL } from "./api";

export default class User {
    static getCurrentUser() {
        return API.currentUserProfile()
            .then(response => response.json())
            .then(response => response["body"]["user"]);
    }

    static getAvatarUrl() {
        return User.getCurrentUser().then(user => {
            if (!user.avatar_path) {
                return "/static/assets/img/userpic.png";
            }
            return user.avatar_path.indexOf("http") === 0
                ? user.avatar_path
                : BACKEND_URL + "/" + user.avatar_path;
        });
    }
}
