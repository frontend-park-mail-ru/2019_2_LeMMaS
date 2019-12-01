import { html } from "common-tags";

import { routes } from "modules/router";
import BaseStringComponent from "components/baseStringComponent";

import "./style.css";

export default class Logo extends BaseStringComponent {
    renderString = () => {
        return html`
            <a class="home-button" href="${routes.INDEX}">
                <i class="fas fa-arrow-left"></i>
            </a>
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
    };
}
