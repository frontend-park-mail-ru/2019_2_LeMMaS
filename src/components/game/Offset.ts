class OffSet {
    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public setX = (x: number): void => {
        this.x += x;
    };

    public setY = (y: number): void => {
        this.y += y;
    };

    public reset = () => {
        this.x = -6000 + window.innerWidth;
        this.y = -6000 + window.innerHeight;
    };
}

export default new OffSet(
    -6000 + window.innerWidth,
    -6000 + window.innerHeight
);
