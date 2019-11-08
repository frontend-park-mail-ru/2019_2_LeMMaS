import { html } from "common-tags";

import BasePage from "./basePage";
import HomeButton from "../components/buttons/index";

export default class Page404 extends BasePage {
    renderContent(parent) {
        parent.innerHTML = html`
            ${HomeButton.renderString()}
            <div class="plate plate__size-big">
                <p class="text__size-big text__align-center">404</p>
                <p class="text__size-big text__align-center">
                    Такой страницы не существует
                </p>
            </div>
        `;
    }
}