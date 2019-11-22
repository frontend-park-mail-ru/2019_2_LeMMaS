export default class Ball {
    constructor(id, x, y, color, canvas) {
        this.id = id;
        this.alive = true;

        this.x = 0;
        this.y = 0;
        this.easingTargetX = 0;
        this.easingTargetY = 0;
        this.easing = 0.01;

        this.radius = 20;
        this.strokeStyle = "rgba(0; 0; 255; 0.5)";
        this.color = color ? color : "green";
        this.backgroundImage = undefined;

        this.canvas = canvas;
    }
}
