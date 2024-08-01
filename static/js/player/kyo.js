import { Player } from "./player.js";
import { GIF } from "../utils/gif.js";
export class Kyo extends Player {
    constructor(root, info) {
        super(root, info);

        this.init_animations();

    }

    init_animations() {

        for (let i = 0; i < 7; i++) {
            let gif = GIF();

            gif.load(`/static/images/player/kyo/${i}.gif`);
            this.animations.set(i, {
                gif: gif,
                frame_cnt: 0,
                frame_rate: 5,
                offset_y: 0,
            });

            let outer = this;
            gif.onload = () => {
                let obj = outer.animations.get(i);
                obj.frame_cnt = gif.frames.lenght;
            }
        }
    }
}