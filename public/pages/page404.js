import { html } from "common-tags";

import BasePage from "./basePage";

export default class Page404 extends BasePage {
    renderContent(parent) {
        parent.innerHTML = html`
            <div class="plate plate__size-big">
                <p class="text__size-big text__align-center">404</p>
                <p class="text__size-big text__align-center">_NOTHING HERE</p>
            </div>
        `;
    }
}