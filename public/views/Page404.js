import BaseView from "./BaseView";

export default class Page404 extends BaseView {
    beforeRender() {
        document.querySelector("head").innerHTML =
            '<meta charset="UTF-8">\n' +
            "    <title>404 Not Found | LeMMaS</title>\n" +
            '    <link rel="icon" type="image/png" href="../favicon.png">\n' +
            '    <script src="../bundle.js"></script>' +
            '<link rel="stylesheet" href="static/assets/css/reset.css">\n' +
            '    <link rel="stylesheet" href="static/assets/css/buttons/button.css">\n' +
            '    <link rel="stylesheet" href="static/assets/css/buttons/button__color-gold.css">\n' +
            '    <link rel="stylesheet" href="static/assets/css/buttons/button__transparency-transparent.css">\n' +
            '    <link rel="stylesheet" href="static/assets/css/header/header.css">\n' +
            '    <link rel="stylesheet" href="static/assets/css/logo/logo.css">\n' +
            '    <link rel="stylesheet" href="static/assets/css/menu/menu.css">\n' +
            '    <link rel="stylesheet" href="static/assets/css/logo/__image/logo__img.css">\n' +
            '    <link rel="stylesheet" href="static/assets/css/plate/plate.css">\n' +
            '    <link rel="stylesheet" href="static/assets/css/plate/plate__size-big.css">\n' +
            '    <link rel="stylesheet" href="static/assets/css/buttons/button__size-big.css">\n' +
            '    <link rel="stylesheet" href="static/assets/css/text/text__size-big.css">\n' +
            '    <link rel="stylesheet" href="static/assets/css/userPicName/userPicName.css">\n' +
            '    <link rel="stylesheet" href="static/assets/css/userPicName/__name/userPicName__name.css">\n' +
            '    <link rel="stylesheet" href="static/assets/css/userPicName/__img/userPicName__img.css">\n' +
            '    <link rel="stylesheet" href="static/assets/css/buttons/button__color-red.css">\n' +
            '    <link rel="stylesheet" href="static/assets/css/buttons/button__color-yellow.css">\n' +
            '    <link rel="stylesheet" href="static/assets/css/userAchievement/userAchievement.css">\n' +
            '    <link rel="stylesheet" href="static/assets/css/buttons/button__color-violet.css">\n' +
            '    <link rel="stylesheet" href="static/assets/css/leaderboard/leaderboard.css">\n' +
            '    <link rel="stylesheet" href="static/assets/css/leaderboard/__player/leaderboard__player-me.css">\n' +
            '    <link rel="stylesheet" href="static/assets/css/anchorImg/anchorImg__position-absolute.css">\n' +
            '    <link rel="stylesheet" href="static/assets/css/anchorImg/anchorImg__wrapper.css">\n' +
            '    <link rel="stylesheet" href="static/assets/css/text/text__align-center.css">';
        if (!document.querySelector(".plates__wrapper")) {
            document.querySelector(".body").innerHTML =
                "\n" +
                '<header class="header">\n' +
                '    <div class="logo anchorImg__wrapper">\n' +
                '        <img class="logo__image" src="static/assets/img/lemmaslogo.png" alt="logo">' +
                '        <a class="anchorImg__position-absolute" href="/"></a>\n' +
                "    </div>\n" +
                '    <div class="menu">\n' +
                '        <a class="button button__transparency-transparent" href="login">LOGIN</a>\n' +
                '        <a class="button" href="register">REGISTER</a>\n' +
                "    </div>\n" +
                "</header>\n" +
                '<div class="plates__wrapper">\n ' +
                "</div>";
        }
    }

    render() {
        if (!document.querySelector(".plates__wrapper")) {
            document.querySelector(".body").innerHTML =
                "\n" +
                '<header class="header">\n' +
                '    <div class="logo">\n' +
                '        <a href="/"><img class="logo__image" src="static/assets/img/lemmaslogo.png" alt="logo"></a>\n' +
                "    </div>\n" +
                '    <div class="menu">\n' +
                '        <a class="button button__transparency-transparent" href="login">LOGIN</a>\n' +
                '        <a class="button" href="register">REGISTER</a>\n' +
                "    </div>\n" +
                "</header>\n" +
                '<div class="plates__wrapper">\n ' +
                "</div>";
        }
        document.querySelector(".plates__wrapper").innerHTML =
            '<div class="plate plate__size-big">\n' +
            '        <h2 class="text__size-big text__align-center">404</h2>\n' +
            "        <p>NOT FOUND :(</p>\n" +
            "    </div>\n";
    }
}
