import { html } from "common-tags";
import BasePage from "./basePage";

export default class Page404 extends BasePage {
    renderContent() {
        return html`
            <div class="plate plate__size-big">
                <h2 class="text__size-big text__align-center">404</h2>
                <p>NOT FOUND :(</p>
            </div>
        `;
    }
}
