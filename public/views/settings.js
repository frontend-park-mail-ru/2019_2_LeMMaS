import DefaultView from "./view";

class Settings extends DefaultView{
    constructor() {
        super();
    }

    beforeRender()
    {
        document.querySelector("head").innerHTML="<meta charset=\"UTF-8\">\n" +
            "    <title>Account settings | LeMMaS</title>\n" +
            "    <script src=\"../bundle.js\"></script>" +
            "    <link rel=\"stylesheet\" href=\"static/assets/css/reset.css\">\n" +
            "    <link rel=\"stylesheet\" href=\"static/assets/css/header/header.css\">\n" +
            "    <link rel=\"stylesheet\" href=\"static/assets/css/logo/logo.css\">\n" +
            "    <link rel=\"stylesheet\" href=\"static/assets/css/logo/__image/logo__img.css\">\n" +
            "    <link rel=\"stylesheet\" href=\"static/assets/css/buttons/button.css\">\n" +
            "    <link rel=\"stylesheet\" href=\"static/assets/css/buttons/button__transparency-transparent.css\">\n" +
            "    <link rel=\"stylesheet\" href=\"static/assets/css/plate/plate.css\">\n" +
            "    <link rel=\"stylesheet\" href=\"static/assets/css/menu/menu.css\">\n" +
            "    <link rel=\"stylesheet\" href=\"static/assets/css/form/form.css\">\n" +
            "    <link rel=\"stylesheet\" href=\"static/assets/css/form/__field/form__field.css\">\n" +
            "    <link rel=\"stylesheet\" href=\"static/assets/css/form/__error/form__error.css\">\n" +
            "    <link rel=\"stylesheet\" href=\"static/assets/css/plate/plate__size-big.css\">\n" +
            "    <link rel=\"stylesheet\" href=\"static/assets/css/buttons/button__size-big.css\">\n" +
            "    <link rel=\"stylesheet\" href=\"static/assets/css/form/__field/form__field__size-big.css\">\n" +
            "    <link rel=\"stylesheet\" href=\"static/assets/css/buttons/button__color-lavender.css\">\n" +
            "    <link rel=\"stylesheet\" href=\"static/assets/css/text/text__size-big.css\">\n" +
            "    <link rel=\"stylesheet\" href=\"static/assets/css/text/text__align-center.css\">\n" +
            "    <link rel=\"stylesheet\" href=\"static/assets/css/text/text__size-normal.css\">\n" +
            "    <link rel=\"stylesheet\" href=\"static/assets/css/userPicName/userPicName.css\">\n" +
            "    <link rel=\"stylesheet\" href=\"static/assets/css/userPicName/__name/userPicName__name.css\">\n" +
            "    <link rel=\"stylesheet\" href=\"static/assets/css/userPicName/__img/userPicName__img.css\">\n" +
            "    <link rel=\"stylesheet\" href=\"static/assets/css/anchorImg/anchorImg__position-absolute.css\">\n" +
            "    <link rel=\"stylesheet\" href=\"static/assets/css/anchorImg/anchorImg__wrapper.css\">\n" +
            "    <link rel=\"stylesheet\" href=\"static/assets/css/plate/plate__type-horizontal.css\">";
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
        document.querySelector(".plates__wrapper").innerHTML="<div class=\"plate plate__type-horizontal plate__size-big\">\n" +
            "        <div class=\"userPicName\">\n" +
            "            <a class=\"userPicName__img\"  href=\"settings\"><img class=\"userPicName__img\" src=\"static/assets/img/userpic.png\" alt=\"userpic\"></a>\n" +
            "            <a class=\"userPicName__name\" href=\"settings\"><p >UserName</p></a>\n" +
            "        </div>\n" +
            "        <h2 class=\"text__size-normal text__align-center\">Account settings</h2>\n" +
            "        <form class=\"form\">\n" +
            "            <input class=\"form__field \" placeholder=\"Change login\">\n" +
            "            <span class=\"form__error\">Error</span>\n" +
            "            <input class=\"form__field \"  placeholder=\"Change password\">\n" +
            "            <span class=\"form__error\">Error</span>\n" +
            "            <input class=\"form__field \"  placeholder=\"Repeat password\">\n" +
            "            <span class=\"form__error\">Error</span>\n" +
            "            <label>Change UserPic</label><input class=\"form__field \"  placeholder=\"Repeat password\" type=\"file\">\n" +
            "            <span class=\"form__error\">Error</span>\n" +
            "            <input class=\"button  button__color-lavender\" type=\"submit\" value=\"Save\">\n" +
            "            <span class=\"form__error\">Error</span>\n" +
            "        </form>\n" +
            "    </div>";
    }
}

export default Settings;