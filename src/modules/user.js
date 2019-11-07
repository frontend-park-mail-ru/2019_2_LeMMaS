import API from "./api";

let getCurrentUserPromise = null;

class User {
    constructor() {
        this.loggedIn = false;
        this.updateCurrentUser().then(returnedUser => {
            this.currentUser = returnedUser;
        });
        if(this.currentUser) {
            this.loggedIn = true;
        }
    }

    updateCurrentUser = () => {
        if(this.loggedIn && this.currentUser) {
            return Promise.resolve(this.currentUser);
        }
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
            this.currentUser = await this.updateCurrentUser();
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
