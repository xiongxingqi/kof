import { GameObject } from "../game_object/base.js";

export class Player extends GameObject {
    constructor(root, info) {
        super();
        this.root = root;
        this.id = info.id;
        this.x = info.x;
        this.y = info.y;
        this.width = info.width;
        this.height = info.height;
        this.color = info.color;

        this.vx = 0;
        this.vy = 0;


        this.seepdx = 400;//水平速度
        this.seepdy = 1000;//垂直速度

        this.ctx = this.root.gameMap.ctx;
    }
    start() {

    }

    update() {

        this.render();
    }

    render() {

        this.ctx.fillStyle = this.color;//渲染玩家模型
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
        // console.log(this.color);
    }
}