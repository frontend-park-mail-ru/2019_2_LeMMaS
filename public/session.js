import API from "./api";

let user = null;

export default class Session {
    static async user() {
        user = await API.currentUserProfile();
        return user;
    }
}
