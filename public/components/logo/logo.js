import "./logo.css";
import "./__image/logo__img.css";
import "../anchorImg/anchorImg__position-absolute.css";
import "../anchorImg/anchorImg__wrapper.css";

class Logo {
    constructor() {}

    render() {
        const logoWrapper = document.createElement("div");
        logoWrapper.className = "logo anchorImg__wrapper";
        const logoImg = document.createElement("img");
        logoImg.className = "logo__image";
        logoImg.alt = "Lemmas logo";
        logoImg.src = "static/assets/img/lemmaslogo.png";
        const logoA = document.createElement("a");
        logoA.className = "anchorImg__position-absolute";
        logoA.href = "/";
        logoWrapper.appendChild(logoImg);
        logoWrapper.appendChild(logoA);
        return logoWrapper;
    }
}
export default Logo;
