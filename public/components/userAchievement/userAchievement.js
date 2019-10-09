import "./userAchievement.css";

class UserAchievement {
    constructor() {}

    render(achievementName, achievementValue) {
        const userAchievement = document.createElement("div");
        userAchievement.className = "userAchievement";
        const name = document.createElement("p");
        name.innerText = achievementName;
        const value = document.createElement("p");
        value.innerText = achievementValue;

        userAchievement.appendChild(name);
        userAchievement.appendChild(value);

        return userAchievement;
    }
}

export default UserAchievement;
