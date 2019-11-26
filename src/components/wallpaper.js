export default class Wallpaper {
    render () {
        this.veg = document.querySelectorAll('.veg');

        this.speed = 2 ;
        this.position = [];

        for (let i = 0; i < this.veg.length; i++){
            let height = Math.floor(Math.random() * window.innerHeight);
            let width = Math.random() * window.innerWidth;

            this.veg[i].style.top = `${height}px`;
            this.veg[i].style.left = `${width}px`;

            this.position.push(height);
        }

        this._makeItRain();
    }

    _makeItRain = () => {
        for(let i = 0; i < this.veg.length; i++) {
            this.position[i] += this.speed;
            this.veg[i].style.top = `${this.position[i]}px`;

            if(this.position[i] > (window.innerHeight+50)){

                this.position[i] = -75;
                this.veg[i].style.left = `${Math.random()*window.innerWidth}px`;
            }
        }
        requestAnimationFrame(this._makeItRain);
    };
}