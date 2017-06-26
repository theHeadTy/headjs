import { clamp } from './../util.js'

export class Camera {

    constructor(map, tile, width, height) {
        this.x = 0;
        this.y = 0;
        this.width = width;
        this.height = height;
        this.maxX = map.width * tile.width - width;
        this.maxY = map.height * tile.height - height;
    }

    follow(player) {
        this.follow = player;
        player.viewX = 0;
        player.viewY = 0;
    }

    update() {

        this.follow.viewX = this.width / 2;
        this.follow.viewY = this.height / 2;

        this.x = this.follow.x - this.width / 2;
        this.y = this.follow.y - this.height / 2;

        this.x = clamp(this.x, 0, this.maxX);
        this.y = clamp(this.y, 0, this.maxY);

        // left and right (x)
        if (this.follow.x < this.width / 2 ||
            this.follow.x > this.maxX + this.width / 2) {
                this.follow.viewX = this.follow.x - this.x;
        }
        // top and bottom (y)
        if (this.follow.y < this.height / 2 ||
            this.follow.y > this.maxY + this.height / 2) {
                this.follow.viewY = this.follow.y - this.y;
        }
    }
}
