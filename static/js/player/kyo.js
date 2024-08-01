import { Player } from "./player.js";
import { GIF } from "../utils/gif.js";
export class Kyo extends Player {
    constructor(root, info) {
        super(root, info);

        this.init_animations();

    }

    init_animations() {

        let outer = this;
        let offsets = [0, -22, -22, -135, 0, 0, 0]
        let frame_rates = [12, 12, 12, 6, 11, 11, 8]
        for (let i = 0; i < 7; i++) {
            let gif = GIF();

            gif.load(`/static/images/player/kyo/${i}.gif`);

            this.animations.set(i, {
                gif: gif,
                frame_cnt: 0,
                frame_rate: frame_rates[i],
                offset_y: offsets[i],
                is_loaded: false,
                scale: 2
            });


            gif.onload = () => {
                let obj = outer.animations.get(i);
                obj.frame_cnt = gif.frames.length;
                obj.is_loaded = true;
            }
        }
    }
}