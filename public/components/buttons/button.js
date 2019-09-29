import "./button.css";
import "./button__color-gold.css";
import "./button__color-lavender.css";
import "./button__color-red.css";
import "./button__color-violet.css";
import "./button__color-yellow.css";
import "./button__size-big.css";
import "./button__transparency-transparent.css";
import "./button__position-absolute.css";

class Button {
    constructor(){

    }

    render(href, buttonText, buttonExtraClass = "")
    {
        const button = document.createElement("a");
        button.className = "button " + buttonExtraClass;
        button.innerText = buttonText;
        if(href !== "") {
            button.href = href;
        }
        return button;
    }
}
export default Button;
