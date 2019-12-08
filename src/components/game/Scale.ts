class Scale {
    private scale: number;

    constructor(scale: number) {
        this.scale = scale;
    }

    countWithScale = (toCount: number): number => toCount * this.scale;
}

export default new Scale(4);
