export default class Food {

    private status: boolean;
    private id: number;
    private x: number;
    private y: number;
    private color: string;
    private foodCanvas: HTMLCanvasElement;

    constructor(id: number, x: number, y: number, canvas: HTMLCanvasElement) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.status = true;
        this.color = "#" + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);
        this.foodCanvas = canvas;
    }

    public draw = () => {
        const ctx: CanvasRenderingContext2D = this.foodCanvas.getContext("2d");
        ctx.clearRect(0, 0, this.foodCanvas.width, this.foodCanvas.height);
        if (this.status === true) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, 5, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.closePath();
        }
    };

    public getId = () => this.id;

    public delete = () => {
        this.status = false;
    };
}
