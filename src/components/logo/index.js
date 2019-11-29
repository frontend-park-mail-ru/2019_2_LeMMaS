import { html } from "common-tags";

import { routes } from "modules/router";
import BaseStringComponent from "components/baseStringComponent";
import HomeButton from "components/buttons";

import "./style.css";

export default class Logo extends BaseStringComponent {
    renderString() {
        return html`
            ${HomeButton.renderString()}
            <div class="logo">
                <a href="${routes.INDEX}">
                    <img
                        class="logo__image"
                        alt="Lemmas logo"
                        src="/assets/img/lemmaslogo.png"
                    />
                    <img
                        class="logo__image logo__image_mobile"
                        alt="Lemmas logo"
                        src="/assets/img/lemmaslogo_mobile.png"
                    />
                </a>
            </div>
        `;
    }
}
