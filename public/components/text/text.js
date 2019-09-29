import "./text__align-center.css";
import "./text__size-big.css";
import "./text__size-normal.css";

class Text {
    constructor(){

    }
    render(textExtraClass, tag, content)
    {
        const text = document.createElement(tag);
        text.className = textExtraClass;
        text.innerText = content;
        return text;
    }
}
export default Text;
