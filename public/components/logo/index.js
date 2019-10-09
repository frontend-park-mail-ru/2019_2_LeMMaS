import { html } from "common-tags";
import "./style.css";
import "../anchorImg/anchorImg__position-absolute.css";
import "../anchorImg/anchorImg__wrapper.css";

class Logo {
    render() {
        return html`
            <div class="logo anchorImg__wrapper">
                <a href="/" class="anchorImg__position-absolute">
                    <img
                        class="logo__image"
                        alt="Lemmas logo"
                        src="static/assets/img/lemmaslogo.png"
                /></a>
            </div>
        `;
    }
}
export default Logo;
