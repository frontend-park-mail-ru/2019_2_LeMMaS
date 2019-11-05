import { html } from "common-tags";

import BaseComponent from "../baseComponent";
import { Button } from "../buttons";

import "./style.css";

export default class ModalWindow extends BaseComponent {
    render = (info, onClickYes = null, onClickNo = null) => {
        this.parent.innerHTML += html`
            <div class="modalWindow__wrapper">
                <div class="modalWindow plate">
                    <p>${info}</p>
                    ${new Button({
                        text: "Да",
                        onClick: onClickYes !== null ? onClickYes : this.close,
                        extraClass: "",
                    }).renderString()}
                    ${new Button({
                        text: "Нет",
                        onClick: onClickNo !== null ? onClickNo : this.close,
                        extraClass: "button__transparency-transparent",
                    }).renderString()}
                </div>
            </div>
        `;
    };

    close = () => {
        this.parent.removeChild(
            document.body.querySelector("modalWindow__wrapper")
        );
    };
}
