import "./plate.css";

class PlatesWrapper {
    constructor(){

    }
    render()
    {
        const platesWrapper = document.createElement("div");
        platesWrapper.className = "plates__wrapper";
        return platesWrapper;
    }
}
export default PlatesWrapper;
