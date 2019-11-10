import API from "./api";

class User {
    constructor() {
        this.updateCurrentUser();
    }

    updateCurrentUser = () =>
        API.currentUserProfile().then(user => {
            this.currentUser = user;
            if (this.currentUser) {
                this.setLogin(true);
            }
        });

    getAvatarUrl = async () =>
        !this.currentUser.avatar_path
            ? "/assets/img/userpic.png"
            : this.currentUser.avatar_path;

    reset = () => {
        this.currentUser = null;
        this.setLogin(false);
    };

    setLogin = loggedIn => (this.loggedIn = loggedIn);

    isLoggedIn = () => this.loggedIn;

    getCurrentUser = () => this.currentUser;
}

export default new User();
