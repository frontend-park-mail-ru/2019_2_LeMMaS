import Header from "../components/header/header";
import PlatesWrapper from "../components/plate/platesWrapper";

class DefaultView {
    constructor() {}

    beforeRender(title) {
        if (title === "") {
            title = "Play";
        }
        document.querySelector("title").innerText = title + " | Lemmas";
        if (document.querySelector(".plates__wrapper")) {
            document.querySelector(".plates__wrapper").innerHTML = "";
        }
        const body = document.querySelector(".body");
        if (body.querySelector("header") === null) {
            const header = new Header();
            body.appendChild(header.render());
        }

        if (!document.querySelector(".plates__wrapper")) {
            const platesWrapper = new PlatesWrapper();
            body.appendChild(platesWrapper.render());
        }
    }

    render() {}

    afterRender() {}
}

export default DefaultView;
