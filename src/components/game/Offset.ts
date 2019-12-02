import { koeff } from "./resolution";

class OffSet {
    public x: number;
    public y: number;

    constructor(x, y) {
        this.x = this.countWithKoeff(x);
        this.y = this.countWithKoeff(y);
    }

    public setX = (x): void => {
        this.x = this.countWithKoeff(x);
    };

    public setY= (y): void => {
        this.y = this.countWithKoeff(y);
    };

    private countWithKoeff = (toCount): number => toCount / koeff;
}

export default new OffSet(window.innerWidth * koeff/4, window.innerWidth * koeff/4);
