import { html } from "common-tags";

import { routes } from "../../modules/router";
import BaseStringComponent from "../baseStringComponent";
import HomeButton from "../buttons";

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
                </a>
            </div>
        `;
    }
}
