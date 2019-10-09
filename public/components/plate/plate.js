import "./plate.css";
import "./plate__size-big.css";
import "./plate__type-horizontal.css";
import "../text/text__align-center.css";

class Plate {
    constructor() {}
    render(plateExtraClass, ...elements) {
        const plate = document.createElement("div");
        plate.className += "plate " + plateExtraClass;
        elements.forEach(function(element) {
            plate.appendChild(element);
        });

        return plate;
    }
}
export default Plate;
