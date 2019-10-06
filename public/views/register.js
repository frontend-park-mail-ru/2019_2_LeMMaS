import DefaultView from "./view";

class Register extends DefaultView{
    constructor() {
        super();
    }

    beforeRender()
    {
        document.querySelector("head").innerHTML=""+
            "<meta charset=\"UTF-8\">\n" +
            "    <title>Register | LeMMaS</title>\n" +
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

        document.querySelector(".plates__wrapper").innerHTML="<div class=\"plate plate__size-big\">\n" +
            "        <h2 class=\"text__size-big text__align-center\">Register</h2>\n" +
            "        <form class=\"form\">\n" +
            "            <input class=\"form__field form__field__size-big\" placeholder=\"Login\">\n" +
            "            <span class=\"form__error\">Error</span>\n" +
            "            <input class=\"form__field form__field__size-big\"  placeholder=\"Password\">\n" +
            "            <span class=\"form__error\">Error</span>\n" +
            "            <input class=\"form__field form__field__size-big\"  placeholder=\"Repeat password\">\n" +
            "            <span class=\"form__error\">Error</span>\n" +
            "            <input class=\"button button__size-big button__color-lavender\" type=\"submit\" value=\"Register\">\n" +
            "            <span class=\"form__error\">Error</span>\n" +
            "        </form>\n" +
            "    </div>";
    }
}

export default Register;