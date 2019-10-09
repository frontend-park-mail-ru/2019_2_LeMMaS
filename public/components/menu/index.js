import { html } from "common-tags";
import "./style.css";
import Button from "../buttons";

class Menu {
    render() {
        return html`
            <div class="menu">
                ${new Button(
                    "login",
                    "LOGIN",
                    "button__transparency-transparent"
                ).render()}
                ${new Button("register", "REGISTER").render()}
            </div>
        `;
    }
}
export default Menu;
