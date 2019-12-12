import API from "./api";
import { ResponseUser } from "./responseBody";
import { DEFAULT_AVATAR } from "./consts";

class User {
    private currentUser: ResponseUser | undefined | null;
    private loggedIn: boolean | undefined;

    constructor() {
        this._updateCurrentUser();
    }

    login = async (email: string, password: string): Promise<Response> => {
        const response = await API.loginUser(email, password);
        if (response.ok) {
            this._updateCurrentUser();
        }
        return response;
    };

    register = (
        email: string,
        name: string,
        password: string
    ): Promise<Response> => API.registerUser(email, name, password);

    logout = async (): Promise<Response> => {
        const response = await API.logoutUser();

        if (response.ok) {
            this._setLogin(false);
            this.currentUser = null;
        }
        return response;
    };

    update = async (name: string, password: string): Promise<Response> => {
        const response = await API.updateUser(name, password);
        if (response.ok) {
            this._updateCurrentUser();
        }
        return response;
    };

    updateAvatar = async (formData: FormData): Promise<Response> => {
        const response = await API.updateAvatar(formData);
        if (response.ok) {
            this._updateCurrentUser();
        }
        return response;
    };

    getAvatarUrl = (): string =>
        this.currentUser && this.currentUser.avatar_path
            ? this.currentUser.avatar_path
            : DEFAULT_AVATAR;

    _setLogin = (loggedIn: boolean | undefined): boolean | undefined =>
        (this.loggedIn = loggedIn);

    isLoggedIn = (): boolean | undefined => this.loggedIn;

    getCurrentUser = (): ResponseUser | undefined => this.currentUser;

    _updateCurrentUser = async (): Promise<void> => {
        const user = await API.currentUserProfile();
        this.currentUser = user;
        if (user) {
            this._setLogin(true);
        }
    };
}

export default new User();
