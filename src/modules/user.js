import API from "./api";

let getCurrentUserPromise = null;

class User {
    constructor() {
        this.updateCurrentUser()
            .then(returnedUser => {
                this.currentUser = returnedUser !== undefined ? returnedUser : null;
                this.loggedIn = !!this.currentUser;
            });
    }

    updateCurrentUser = () => {
        if (getCurrentUserPromise !== null) {
            return getCurrentUserPromise;
        }
        return API.currentUserProfile()
            .then(user => {
                getCurrentUserPromise = null;
                this.currentUser = user;
                if (this.currentUser) {
                    this.setLogin(true);
                }
                return user;
            });
    };

    getAvatarUrl = async () => {
        if(!this.currentUser) {
            await this.updateCurrentUser();
        }
        if (!this.currentUser.avatar_path) {
            return "/assets/img/userpic.png";
        }
        return this.currentUser.avatar_path;
    };

    reset = () =>
        this.currentUser = null;


    setLogin = (loggedIn) => {
        this.loggedIn = loggedIn;
        this.updateCurrentUser();
    };

    isLoggedIn = () =>
        this.loggedIn;

    getCurrentUser = () =>
        this.currentUser;
}

export default new User();
