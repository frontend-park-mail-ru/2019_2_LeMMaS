import API from "./api";

let getCurrentUserPromise = null;
let currentUser = null;

export default class User {
    static getCurrentUser() {
        if (currentUser !== null) {
            return Promise.resolve(currentUser);
        }
        if (getCurrentUserPromise !== null) {
            return getCurrentUserPromise;
        }
        getCurrentUserPromise = API.currentUserProfile();
        getCurrentUserPromise.then(user => {
            getCurrentUserPromise = null;
            currentUser = user;
        });
        return getCurrentUserPromise;
    }

    static async getAvatarUrl() {
        const user = await User.getCurrentUser();
        if (!user.avatar_path) {
            return "/assets/img/userpic.png";
        }
        return user.avatar_path;
    }

    static reset() {
        currentUser = null;
    }
}
