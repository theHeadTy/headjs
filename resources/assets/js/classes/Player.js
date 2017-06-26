import { clamp } from './../util.js'

export class Player {
    constructor(x, y, width, height, src) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.src = src;
        this.speed = 256;
        this.minX = (this.x - this.width / 2 < 0) ? this.x : this.width / 2;
        this.minY = (this.y - this.height / 2 < 0) ? this.y : this.height / 2;
    }

    // Draws the player onto canvas.
    render(ctx, camera) {
        var x, y,
            image;
        x = this.x - (this.width / 2) - camera.x
        y = this.y - (this.height / 2) - camera.y
        //x = this.viewX - (this.width / 2)
        //y = this.viewY - (this.height / 2)
        image = new Image();
        image.onload = () => {
            ctx.drawImage(image, x, y)
        }
        image.src = this.src
    }

    update(event, step, mx, my) {
        let dx = 0,
            dy = 0;
        if (event.keyCode === 37) { dx = -1; }
        else if (event.keyCode === 39) { dx = 1; }
        else if (event.keyCode === 38) { dy = -1; }
        else if (event.keyCode === 40) { dy = 1; }
        this.x += dx * this.speed * step
        this.y += dy * this.speed * step

        // clamp x & y's min/max 
        this.x = clamp(this.x, this.minX, mx)
        this.y = clamp(this.y, this.minY, my)


    }
}
