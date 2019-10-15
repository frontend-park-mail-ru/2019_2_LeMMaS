import { html } from "common-tags";

import { routes } from "../../router";
import "./style.css";
import Button from "../buttons";

class Menu {
    renderString() {
        return html`
            <div class="menu">
                ${new Button({
                    text: "LOGIN",
                    href: routes.USER_LOGIN_PAGE_ROUTE,
                    extraClass: "button__transparency-transparent",
                }).renderString()}
                ${new Button({
                    text: "REGISTER",
                    href: routes.USER_REGISTER_PAGE_ROUTE,
                }).renderString()}
            </div>
        `;
    }
}
export default Menu;
