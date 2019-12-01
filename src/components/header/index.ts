import { html } from "common-tags";
import classNames from "classnames";

import BaseComponent from "components/baseComponent";
import Logo from "components/logo";
import Menu from "components/menu";

import "./style.css";

export default class Header extends BaseComponent{
    public render = () => {
        const headerClass = classNames("header", {
            "header_show-home-button": this._isShowHomeButton(),
        });
        this.parent.innerHTML = html`
            <header class="${headerClass}">
                ${new Logo().renderString()}
                <div class="menu"></div>
            </header>
        `;
        new Menu(this.parent.querySelector(".menu")).start();
    };

    private _isShowHomeButton(): boolean {
        return location.pathname !== "/";
    }
}
