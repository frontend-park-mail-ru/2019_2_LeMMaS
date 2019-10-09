import BaseView from "./BaseView";
import Plate from "../components/plate/plate";
import Leaderboard from "../components/leaderboard/leaderboard";
import Button from "../components/buttons/button";
import Text from "../components/text/text";
import UserPicName from "../components/userPicName/userPicName";
import UserAchievement from "../components/userAchievement/userAchievement";

export default class Index extends BaseView {
    render() {
        const plate = new Plate();
        const leaderboard = new Leaderboard();
        const text = new Text();
        const button = new Button();
        const userPicName = new UserPicName();
        const userAchievement = new UserAchievement();

        const plateLeaderboard = plate.render(
            "",
            text.render("text__align-center", "h2", "Leaderboard"),
            leaderboard.render()
        );

        const platePlay = plate.render(
            "plate__size-big",
            text.render("text__align-center text__size-big", "h2", "Play"),
            button.render(
                "",
                "Singleplayer",
                "button__size-big button__transparency-transparent"
            ),
            button.render(
                "",
                "Multiplayer",
                "button__size-big button__color-yellow"
            ),
            button.render(
                "",
                "Experimental",
                "button__size-big button__color-red"
            )
        );

        const plateAboutMe = plate.render(
            "",
            userPicName.render(),
            userAchievement.render("XP", "100"),
            userAchievement.render("Coins", "130"),
            button.render(
                "shop",
                "Shop",
                "button__size-big button__color-violet"
            )
        );

        const platesWrapper = document.querySelector(".plates__wrapper");
        platesWrapper.appendChild(plateLeaderboard);
        platesWrapper.appendChild(platePlay);
        platesWrapper.appendChild(plateAboutMe);
    }
}
