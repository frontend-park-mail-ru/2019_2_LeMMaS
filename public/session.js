import API from "./api";

let user = null;

export default class Session {
    static getUserData() {
        user = API.currentUserProfile()
            .then(response => response.json())
            .then(
                currentUser =>  {
                    return currentUser["body"]["user"];
                }
            );
        return user;
    }
}
