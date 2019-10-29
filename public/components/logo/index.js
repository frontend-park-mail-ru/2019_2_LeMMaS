import { html } from "common-tags";

import { routes } from "../../router";
import "./style.css";
import "../anchorImg/anchorImg__position-absolute.css";
import "../anchorImg/anchorImg__wrapper.css";

class Logo {
    renderString() {
        return html`
            <div class="logo anchorImg__wrapper">
                <img
                    class="logo__image"
                    alt="Lemmas logo"
                    src="/static/assets/img/lemmaslogo.png"
                />
                <a
                    href="${routes.INDEX_PAGE_ROUTE}"
                    class="anchorImg__position-absolute"
                >
                </a>
            </div>
        `;
    }
}
export default Logo;
