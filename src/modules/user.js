import API from "./api";

class User {
    constructor() {
        this._updateCurrentUser();
    }

    login(email, password) {
        return API.loginUser(email, password).then(response => {
            if (response.ok) {
                this._updateCurrentUser();
            }
            return response;
        });
    }

    register = (email, name, password) =>
        API.registerUser(email, name, password);

    logout() {
        return API.logoutUser().then(response => {
            if (response.ok) {
                this._setLogin(false);
                this.currentUser = null;
            }
            return response;
        });
    }

    update(name, password) {
        return API.updateUser(name, password).then(response => {
            if (response.ok) {
                this._updateCurrentUser();
            }
            return response;
        });
    }

    updateAvatar(formData) {
        return API.updateAvatar(formData).then(response => {
            if (response.ok) {
                this._updateCurrentUser();
            }
            return response;
        });
    }

    getAvatarUrl = async () =>
        !this.currentUser.avatar_path
            ? "/assets/img/userpic.png"
            : this.currentUser.avatar_path;

    _setLogin = loggedIn => (this.loggedIn = loggedIn);

    isLoggedIn = () => this.loggedIn;

    getCurrentUser = () => this.currentUser;

    _updateCurrentUser = () =>
        API.currentUserProfile().then(user => {
            this.currentUser = user;
            if (this.currentUser) {
                this._setLogin(true);
            }
        });
}

export default new User();
