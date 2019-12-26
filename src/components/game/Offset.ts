import { GAME_FIELD_SIZE } from "./const";

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
        this.x = -(GAME_FIELD_SIZE * 2) + window.innerWidth;
        this.y = -(GAME_FIELD_SIZE * 2) + window.innerHeight;
    };
}

export default new OffSet(
    -(GAME_FIELD_SIZE * 2) + window.innerWidth,
    -(GAME_FIELD_SIZE * 2) + window.innerHeight
);
