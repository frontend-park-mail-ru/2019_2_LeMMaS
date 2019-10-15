import API from "./api";

let user = null;

export default class Session {
    static async user() {
        if (user === null) {
            user = API.currentUserProfile();
        }
        return user;
    }
}
