import { html } from "common-tags";
import "./style.css";
import "../../static/assets/css/common.css";
import { Button } from "../../components/buttons/index";

export default class ModalWindow {
    constructor(parent) {
        this.parent = parent;
    }

    start = (info) => {
        this.render(info);
    };

    render = (info, clickYes, clickNo) => {
        this.parent.innerHTML += html`
                <div class="modalWindow__wrapper">
                <div class="modalWindow plate">
                <p>${info}</p>
                ${new Button({
            text: "Yes",
            onClick: clickYes,
            extraClass:
                "",
        }).renderString()}
                ${new Button({
            text: "No",
            onClick: clickNo !== undefined ? clickNo : this.close,
            extraClass:
                "button__transparency-transparent",
        }).renderString()}
              </div>
            </div>
            `;

    };

    close = () => {
        this.parent.removeChild(document.body.querySelector("modalWindow__wrapper"));
    };
}
