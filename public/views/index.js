import DefaultView from "./view.js";

class Index extends DefaultView{
    constructor() {
        super();
    }

    beforeRender()
    {
        document.querySelector("head").innerHTML="<meta charset=\"UTF-8\">\n" +
            "    <title>LeMMaS</title>\n" +
            "    <link rel=\"icon\" type=\"image/png\" href=\"../favicon.png\">\n" +
            "    <script src=\"../bundle.js\"></script>" +
            "    <link rel=\"stylesheet\" href=\"static/assets/css/reset.css\">\n" +
            "    <link rel=\"stylesheet\" href=\"static/assets/css/buttons/button.css\">\n" +
            "    <link rel=\"stylesheet\" href=\"static/assets/css/buttons/button__color-gold.css\">\n" +
            "    <link rel=\"stylesheet\" href=\"static/assets/css/buttons/button__transparency-transparent.css\">\n" +
            "    <link rel=\"stylesheet\" href=\"static/assets/css/header/header.css\">\n" +
            "    <link rel=\"stylesheet\" href=\"static/assets/css/logo/logo.css\">\n" +
            "    <link rel=\"stylesheet\" href=\"static/assets/css/menu/menu.css\">\n" +
            "    <link rel=\"stylesheet\" href=\"static/assets/css/logo/__image/logo__img.css\">\n" +
            "    <link rel=\"stylesheet\" href=\"static/assets/css/plate/plate.css\">\n" +
            "    <link rel=\"stylesheet\" href=\"static/assets/css/plate/plate__size-big.css\">\n" +
            "    <link rel=\"stylesheet\" href=\"static/assets/css/buttons/button__size-big.css\">\n" +
            "    <link rel=\"stylesheet\" href=\"static/assets/css/text/text__size-big.css\">\n" +
            "    <link rel=\"stylesheet\" href=\"static/assets/css/userPicName/userPicName.css\">\n" +
            "    <link rel=\"stylesheet\" href=\"static/assets/css/userPicName/__name/userPicName__name.css\">\n" +
            "    <link rel=\"stylesheet\" href=\"static/assets/css/userPicName/__img/userPicName__img.css\">\n" +
            "    <link rel=\"stylesheet\" href=\"static/assets/css/buttons/button__color-red.css\">\n" +
            "    <link rel=\"stylesheet\" href=\"static/assets/css/buttons/button__color-yellow.css\">\n" +
            "    <link rel=\"stylesheet\" href=\"static/assets/css/userAchievement/userAchievement.css\">\n" +
            "    <link rel=\"stylesheet\" href=\"static/assets/css/buttons/button__color-violet.css\">\n" +
            "    <link rel=\"stylesheet\" href=\"static/assets/css/leaderboard/leaderboard.css\">\n" +
            "    <link rel=\"stylesheet\" href=\"static/assets/css/leaderboard/__player/leaderboard__player-me.css\">\n" +
            "    <link rel=\"stylesheet\" href=\"static/assets/css/anchorImg/anchorImg__position-absolute.css\">\n" +
            "    <link rel=\"stylesheet\" href=\"static/assets/css/anchorImg/anchorImg__wrapper.css\">\n" +
            "    <link rel=\"stylesheet\" href=\"static/assets/css/text/text__align-center.css\">";
    }

    render()
    {
        if(!document.querySelector(".plates__wrapper")) {
            document.querySelector(".body").innerHTML="\n" +
                "<header class=\"header\">\n" +
                "    <div class=\"logo anchorImg__wrapper\">\n" +
                "        <img class=\"logo__image\" src=\"static/assets/img/lemmaslogo.png\" alt=\"logo\">" +
                "        <a class=\"anchorImg__position-absolute\" href=\"/\"></a>\n" +
                "    </div>\n" +
                "    <div class=\"menu\">\n" +
                "        <a class=\"button button__transparency-transparent\" href=\"login\">LOGIN</a>\n" +
                "        <a class=\"button\" href=\"register\">REGISTER</a>\n" +
                "    </div>\n" +
                "</header>\n" +
                "<div class=\"plates__wrapper\">\n " +
                "</div>";
        }
        document.querySelector(".plates__wrapper").innerHTML= "    <div class=\"plate\">\n" +
            "        <h2 class=\"text__align-center\">Leaderboard</h2>\n" +
            "        <div class=\"leaderboard\">\n" +
            "            <p class=\"leaderboard__player\">1. Best of the best</p>\n" +
            "            <p class=\"leaderboard__player\">2. Best of the best</p>\n" +
            "            <p class=\"leaderboard__player\">3. Best of the best</p>\n" +
            "            <p class=\"leaderboard__player\">4. Best of the best</p>\n" +
            "            <p class=\"leaderboard__player\">5. Best of the best</p>\n" +
            "            <p class=\"leaderboard__player\">6. Best of the best</p>\n" +
            "            <p class=\"leaderboard__player\">7. Best of the best</p>\n" +
            "            <p class=\"leaderboard__player\">8. Best of the best</p>\n" +
            "            <p class=\"leaderboard__player leaderboard__player-me\">9. me</p>\n" +
            "            <p class=\"leaderboard__player\">10. Best of the best</p>\n" +
            "            <p class=\"leaderboard__player\">11. Best of the best</p>\n" +
            "            <p class=\"leaderboard__player\">12. Best of the best</p>\n" +
            "            <p class=\"leaderboard__player\">13. Best of the best</p>\n" +
            "            <p class=\"leaderboard__player\">14. Best of the best</p>\n" +
            "            <p class=\"leaderboard__player\">15. Best of the best</p>\n" +
            "\n" +
            "        </div>\n" +
            "    </div>\n" +
            "    <div class=\"plate plate__size-big\">\n" +
            "        <h2 class=\"text__size-big text__align-center\">Play</h2>\n" +
            "        <a class=\"button button__size-big button__transparency-transparent\">Singleplayer</a>\n" +
            "        <a class=\"button button__size-big button__color-yellow\">Multiplayer</a>\n" +
            "        <a class=\"button button__size-big button__color-red\">Experimental</a>\n" +
            "    </div>\n" +
            "    <div class=\"plate\">\n" +
            "        <div class=\"userPicName\">\n" +
            "            <div class=\"anchorImg__wrapper\"> " +
            "                <img class=\"userPicName__img\" src=\"static/assets/img/userpic.png\" alt=\"userpic\">" +
            "                <a class=\"anchorImg__position-absolute\"  href=\"settings\"></a>\n" +
            "            </div>" +
            "            <a class=\"userPicName__name\" href=\"settings\">UserName</a>\n" +
            "        </div>\n" +
            "        <div class=\"userAchievement\">\n" +
            "            <p>XP</p>\n" +
            "            <p>100</p>\n" +
            "        </div>\n" +
            "        <div class=\"userAchievement\">\n" +
            "            <p>Coins</p>\n" +
            "            <p>124</p>\n" +
            "        </div>\n" +
            "        <a class=\"button button__size-big button__color-violet\" href=\"/shop\">Shop</a>\n" +
            "    </div>\n";

    }
}

export default Index;