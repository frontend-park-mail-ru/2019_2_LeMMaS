import { html } from "common-tags";

import { Button } from "components/buttons/index";

import "./style.css";

export default class ModalWindow {
    constructor(parent) {
        this.parent = parent;
    }

    start = (info, clickYes, clickNo, inside, onclose) => {
        this.info = info;
        this.clickYes = clickYes;
        this.clickNo = clickNo;
        this.inside = inside;
        this.onclose = onclose;

        !this.inside ? this._renderYesNo() : this._renderInside();

        document.addEventListener("keydown", this._keyDownHandler);
    };

    _renderYesNo = () => {
        const modalWindowWrapper = document.createElement("div");
        modalWindowWrapper.className = "modalWindow__wrapper";
        this.parent.appendChild(modalWindowWrapper);

        modalWindowWrapper.innerHTML = html`
            <div class="modalWindow plate plate__size-auto">
                <a class="modalWindow__button-close"
                    ><i class="fas fa-times"></i
                ></a>
                <div class="modalWindow__text">${this.info}</div>
                <div class="modalWindow__buttons-wrapper"></div>
            </div>
        `;

        const buttonsWrapper = modalWindowWrapper.querySelector(
            ".modalWindow__buttons-wrapper"
        );

        const yesButton = new Button(buttonsWrapper, {
            text: "Да",
            onClick: this.clickYes,
            extraClass: "button__type-primary",
        });

        const noButton = new Button(buttonsWrapper, {
            text: "Нет",
            onClick: this.clickNo,
            extraClass: "button__transparency-transparent",
        });

        yesButton.render();
        noButton.render();
        document
            .querySelector(".modalWindow__button-close")
            .addEventListener("click", this.closeWithX);
    };

    _renderInside = () => {
        const modalWindowWrapper = document.createElement("div");
        modalWindowWrapper.className = "modalWindow__wrapper";
        this.parent.appendChild(modalWindowWrapper);

        modalWindowWrapper.innerHTML = html`
            <div class="modalWindow plate plate__size-auto">
                <a class="modalWindow__button-close"
                    ><i class="fas fa-times"></i
                ></a>
                <div class="modalWindow__text">${this.info}</div>
                <div class="modalWindow__buttons-wrapper"></div>
                <div class="modalWindow__inside"></div>
            </div>
        `;
        document
            .querySelector(".modalWindow__button-close")
            .addEventListener("click", this.closeWithX);
        this.inside.renderContent(document.querySelector(".modalWindow__inside"));
    };

    _keyDownHandler = event => {
        if (event.key === "Escape" || event.keyCode === 27) {
            this.closeWithX();
        }
    };

    closeWithX = () => {
        if (this.onclose) {
            document
                .querySelector(".modalWindow__button-close")
                .removeEventListener("click", this.close);
            document.removeEventListener("keydown", this._keyDownHandler);
            this.parent.removeChild(
                document.body.querySelector(".modalWindow__wrapper")
            );
            this.onclose();
        } else if (this.clickNo) {
            this.clickNo();
        } else {
            this.close();
        }
    };

    close = () => {
        document
            .querySelector(".modalWindow__button-close")
            .removeEventListener("click", this.close);
        document.removeEventListener("keydown", this._keyDownHandler);
        this.parent.removeChild(
            document.body.querySelector(".modalWindow__wrapper")
        );
    };
}
