import { html } from "common-tags";

import { routes } from "../../modules/router";
import BaseStringComponent from "../baseStringComponent";

import "./style.css";

export default class Logo extends BaseStringComponent {
    renderString() {
        return html`
            <div class="logo anchorImg__wrapper">
                <img
                    class="logo__image"
                    alt="Lemmas logo"
                    src="/assets/img/lemmaslogo.png"
                />
                <a href="${routes.INDEX}" class="anchorImg__position-absolute">
                </a>
            </div>
        `;
    }
}
