import "./menu.css";
import Button from "../buttons/button";

class Menu {
    constructor(){

    }

    render()
    {
        const menu = document.createElement("div");
        menu.className = "menu";
        const button = new Button();
        menu.appendChild(button.render("login", "LOGIN", "button__transparency-transparent"));
        menu.appendChild(button.render("register", "REGISTER"));

        return menu;
    }
}
export default Menu;
