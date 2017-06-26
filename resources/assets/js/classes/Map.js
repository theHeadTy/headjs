export class Map {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.layers = this.layers();
    }

    render(ctx, image, tile, camera, layer) {
        var w, h,
            startX, startY, endX, endY, offsetX, offsetY,
            stile, xpos, ypos, x, y, sx, sy;
        // start/end & offset x/y
        startX = Math.floor(camera.x / tile.width);
        endX = Math.round(startX + (camera.width / tile.width));
        startY = Math.floor(camera.y / tile.height);
        endY = Math.round(startY + (camera.height / tile.height));
        offsetX = -camera.x + startX * tile.width;
        offsetY = -camera.y + startY * tile.height;

        // Draw the world - only drawing the tiles
        // inside the camera viewport instead of
        // rendering the entire map which gets expensive.
        for (w = startX; w <= endX; ++w) {
            for (h = startY; h <= endY; ++h) {
                stile = this.layers[layer][w][h]

                xpos = (w - startX) * tile.width + offsetX
                ypos = (h - startY) * tile.height + offsetY

                x = (stile - 1) % 32;
                y = Math.floor(stile / 32);
                sx = x * 32;
                sy = y * 32;

                if (stile !== 0) {
                    ctx.drawImage(image,
                        sx, sy,
                        tile.width, tile.height,
                        Math.round(xpos), Math.round(ypos),
                        tile.width, tile.height
                    )
                }
            }
        }

    }

    grid(ctx, camera, tile) {
        var width = this.width * tile.width,
            height = this.height * tile.height,
            x, y,
            w, h;

        for (h = 0; h < this.height; ++h) {
            x = -camera.x;
            y = h * tile.height - camera.y;
            ctx.beginPath()
            ctx.moveTo(x, y)
            ctx.lineTo(width, y)
            ctx.stroke()
        }

        for (w = 0; w < this.width; ++w) {
            x = w * tile.width - camera.x;
            y = - camera.y;
            ctx.beginPath()
            ctx.moveTo(x, y)
            ctx.lineTo(x, height)
            ctx.stroke()
        }
    }


    // @todo - this will be stored in a db
    layers() {
        return [[
            [365, 365, 365, 365, 365, 365, 365, 365, 365, 365, 365, 365, 365, 365, 365, 365],
            [365, 365, 365, 365, 365, 365, 365, 365, 365, 365, 365, 365, 365, 365, 365, 365],
            [365, 365, 365, 365, 365, 365, 365, 365, 365, 365, 365, 365, 365, 365, 365, 365],
            [365, 365, 365, 365, 365, 365, 365, 365, 365, 365, 365, 365, 365, 365, 365, 365],
            [365, 365, 365, 365, 365, 365, 365, 365, 365, 365, 365, 365, 365, 365, 365, 365],
            [365, 365, 365, 365, 365, 365, 365, 365, 365, 365, 365, 365, 365, 365, 365, 365],
            [365, 365, 365, 365, 365, 365, 365, 365, 365, 365, 365, 365, 365, 365, 365, 365],
            [365, 365, 365, 365, 365, 365, 365, 365, 365, 365, 365, 365, 365, 365, 365, 365],
            [365, 365, 365, 365, 365, 365, 365, 365, 365, 365, 365, 365, 365, 365, 365, 365],
            [365, 365, 365, 365, 365, 365, 365, 365, 365, 365, 365, 365, 365, 365, 365, 365],
            [365, 365, 365, 365, 365, 365, 365, 365, 365, 365, 365, 365, 365, 365, 365, 365],
            [365, 365, 365, 365, 365, 365, 365, 365, 365, 365, 365, 365, 365, 365, 365, 365],
            [365, 365, 365, 365, 365, 365, 365, 365, 365, 365, 365, 365, 365, 365, 365, 365],
            [365, 365, 365, 365, 365, 365, 365, 365, 365, 365, 365, 365, 365, 365, 365, 365],
            [365, 365, 365, 365, 365, 365, 365, 365, 365, 365, 365, 365, 365, 365, 365, 365],
            [365, 365, 365, 365, 365, 365, 365, 365, 365, 365, 365, 365, 365, 365, 365, 365],
        ],[
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 97, 98, 98, 98, 98],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 97, 98, 98, 98, 98],
            [0, 0, 0, 0, 0, 0, 65, 66, 66, 66, 66, 35, 98, 98, 98, 98],
            [0, 0, 0, 0, 0, 0, 97, 98, 98, 98, 98, 98, 98, 98, 98, 98],
            [0, 0, 0, 0, 0, 0, 97, 98, 98, 98, 98, 98, 2, 130, 130, 130],
            [0, 0, 0, 0, 0, 0, 97, 98, 98, 98, 98, 98, 99, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 97, 98, 98, 98, 2, 130, 131, 0, 0, 0],
            [0, 0, 0, 65, 66, 66, 35, 98, 98, 98, 99, 0, 0, 0, 0, 0],
            [0, 0, 0, 97, 98, 98, 98, 98, 98, 98, 99, 0, 0, 0, 0, 0],
            [0, 0, 0, 97, 98, 98, 98, 98, 98, 98, 99, 0, 0, 0, 0, 0],
            [0, 65, 66, 35, 98, 98, 98, 98, 98, 98, 99, 0, 0, 0, 0, 0],
            [0, 97, 98, 98, 98, 98, 2, 130, 130, 130, 131, 0, 0, 0, 0, 0],
            [66, 35, 98, 98, 98, 98, 99, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [98, 98, 98, 98, 98, 98, 99, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [98, 98, 2, 130, 130, 130, 131, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [98, 98, 99, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ]];
    }
}
