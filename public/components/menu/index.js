import { html } from "common-tags";
import { routes } from "../../router";
import "./style.css";
import Button from "../buttons";

class Menu {
    render() {
        return html`
            <div class="menu">
                ${new Button(
                    routes.USER_LOGIN_PAGE_ROUTE,
                    "LOGIN",
                    "button__transparency-transparent"
                ).render()}
                ${new Button(
                    routes.USER_REGISTER_PAGE_ROUTE,
                    "REGISTER"
                ).render()}
            </div>
        `;
    }
}
export default Menu;
