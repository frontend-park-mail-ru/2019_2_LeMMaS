import { html } from "common-tags";
import "./style.css";
import "../../static/css/common.css";
import { Button } from "../../components/buttons/index";

export default class ModalWindow {
    constructor(parent) {
        this.parent = parent;
    }

    start = (info, clickYes, clickNo) => {
        this.info = info;
        this.clickYes = clickYes;
        this.clickNo = clickNo;

        this.render();
    };

    render = () => {
        const modalWindowWrapper = document.createElement("div");
        modalWindowWrapper.className = "modalWindow__wrapper";
        this.parent.appendChild(modalWindowWrapper);

        modalWindowWrapper.innerHTML = html`
            <div class="modalWindow plate">
                <p>${this.info}</p>
            </div>
        `;

        const modalWindow = modalWindowWrapper.querySelector(".modalWindow");

        const yesButton = new Button(modalWindow, {
            text: "Yes",
            onClick: this.clickYes,
            extraClass: "",
        });
        const noButton = new Button(modalWindow, {
            text: "No",
            onClick: this.clickNo,
            extraClass: "button__transparency-transparent",
        });

        yesButton.render();
        noButton.render();
    };

    close = () => {
        this.parent.removeChild(
            document.body.querySelector(".modalWindow__wrapper")
        );
    };
}
