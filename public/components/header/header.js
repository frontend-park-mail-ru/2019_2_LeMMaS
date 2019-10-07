import "./header.css";
import Logo from "../logo/logo";
import Menu from "../menu/menu";

class Header{
    constructor(){

    }

    render(){
        const header = document.createElement("header");
        header.className = "header";
        const logo = new Logo();
        const menu = new Menu();
        header.appendChild(logo.render());
        header.appendChild(menu.render());
        return header;
    }

}

export default Header;
