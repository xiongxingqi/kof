import { GameMap } from "./game_map/base.js";
import { Player } from "./player/player.js";
class KOF {
    constructor(id) {
        this.$kof = $('#' + id);
        // console.log(this.$kof);
        this.gameMap = new GameMap(this);
        this.players = [
            new Player(this, {
                id: 0,
                x: 200,
                y: 0,
                width: 120,
                height: 200,
                color: "red"
            }),
            new Player(this, {
                id: 1,
                x: 1000,
                y: 0,
                width: 120,
                height: 200,
                color: "blue"
            })
        ]
    }
}
export {
    KOF
}