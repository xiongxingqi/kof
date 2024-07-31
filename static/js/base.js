import { GameMap } from "./game_map/base.js";

class KOF {
    constructor(id) {
        this.$kof = $('#' + id);
        // console.log(this.$kof);
        this.gameMap = new GameMap(this);
    }
}
export {
    KOF
}