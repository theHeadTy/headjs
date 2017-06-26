<script>

import { Tileset } from './../classes/Tileset.js'
import { Map } from './../classes/Map.js'
import { Player } from './../classes/Player.js'
import { Camera } from './../classes/Camera.js'

export default {
    created() {
        addEventListener('keyup', this.updatePlayer)
        addEventListener('keydown', this.updatePlayer)
    },
    methods: {
        updatePlayer(e) {
            let mx, my
            mx = this.map.width * this.tile.width
            my = this.map.height * this.tile.height
            this.player.update(e, this.delta, mx, my)

            this.x = Math.floor(this.player.x)
            this.y = Math.floor(this.player.y)
        },
        renderMap(ctx, layer) {
            var image;
            image = new Image();
            image.onload = () => {
                this.map.render(ctx, image, this.tile, this.camera, layer)
            }
            image.src = this.tile.src;
        },

        renderPlayer(ctx) {
            this.player.render(ctx, this.camera)
        },

        loop(timestamp) {
            let ctx = this.ctx;
            this.now = timestamp;
            this.delta = (timestamp - this.then) / 1000.0;
            this.then = this.now;

            this.camera.update();

            ctx.clearRect(0, 0, this.width, this.height);
            this.renderMap(ctx, 0);
            this.renderMap(ctx, 1);
            this.renderPlayer(ctx);

            requestAnimationFrame(this.loop);
        },

        init() {
            let startX, startY;
            this.tile = new Tileset(32, 32, 'http://i.imgur.com/zf8Z7k7.png');
            this.map = new Map(16, 16);
            this.camera = new Camera(this.map, this.tile, this.width, this.height);

            startX = this.map.width * this.tile.width / 2;
            startY = this.map.height * this.tile.height / 2;
            this.x = startX;
            this.y = startY;

            this.player = new Player(startX, startY, 32, 32, 'http://i67.tinypic.com/15gblgz.gif');
            this.camera.follow(this.player);
            requestAnimationFrame(this.loop);
        }
    },
    data() {
        return {
            // canvas
            ctx: null,
            width: 312,
            height: 312,

            // classes
            tile: null,
            map: null,
            player: null,
            camera: null,

            // delta
            now: 0,
            delta: 0,
            then: 0,

            x: 160,
            y: 160,

        }
    },
    mounted() {
        // Canvas
        const canvas = this.$refs.mapCanvas
        const context = canvas.getContext('2d')
        this.ctx = context
        this.init()
    },

    render(createElement) {
        return createElement('div',
            [
                createElement('canvas', {
                    ref: 'mapCanvas',
                    attrs: {
                        id: 'mapCanvas',
                        width: 312,
                        height: 312
                    },
                }),
                createElement('span', this.x),
                createElement('span', this.y)
            ]
        )
    },
}
</script>

<style>

canvas {
    z-index: 0;
}

</style>
