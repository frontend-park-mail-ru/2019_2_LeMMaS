export default class Wallpaper {
    render () {
        this.veg = document.querySelectorAll('.veg');

        this.speed = 1.5;

        this.veg.forEach(veg => {
            const height = Math.floor(Math.random() * window.innerHeight);
            const width = Math.random() * window.innerWidth;

            veg.style.top = `${height}px`;
            veg.style.left = `${width}px`;
        });

        this._moveAllVegs();
    }

    _moveAllVegs = () => {
        this.veg.forEach(veg => {
            let position = parseInt(veg.style.top.replace("px", ""));
            if(position > (window.innerHeight + 50)) {
                position = -75;
                veg.style.left = `${Math.random() * window.innerWidth}px`;
            }
            veg.style.top = `${position + this.speed}px`;
        });

        requestAnimationFrame(this._moveAllVegs);
    };
}