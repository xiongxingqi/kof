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

        this.difrection = 1;

        this.gravity = 50;

        this.seepdx = 600;//水平速度
        this.seepdy = 2000;//垂直速度

        this.ctx = this.root.gameMap.ctx;

        this.pressed_keys = this.root.gameMap.controller.pressed_keys;

        this.status = 3 //0: idle 1:向前 2: 向后  3: 跳跃 4: 攻击  5: 被打 6: 死亡 
    }
    start() {

    }

    update() {
        this.update_controller();
        this.update_move();
        this.update_render();
    }

    update_controller() {
        let w, d, a, space;
        // console.log(this.pressed_keys);
        if (this.id === 0) {
            w = this.pressed_keys.has('w');
            d = this.pressed_keys.has('d');
            a = this.pressed_keys.has('a');
            space = this.pressed_keys.has(' ');

        } else {
            w = this.pressed_keys.has('ArrowUp');
            d = this.pressed_keys.has('ArrowRight');
            a = this.pressed_keys.has('ArrowLeft');
            space = this.pressed_keys.has('Enter');
        }


        if (this.status === 1 || this.status === 0) {
            if (w) {
                if (d) {
                    this.vx = this.seepdx;
                } else if (a) {
                    this.vx = -this.seepdx;
                } else {
                    this.vx = 0;
                }
                this.vy = -this.seepdy;
                this.status = 3;
            } else if (d) {
                this.vx = this.seepdx;
                this.status = 1;
            } else if (a) {
                this.vx = -this.seepdx;
                this.status = 1;
            } else {
                this.vx = 0;
                this.status = 0;
            }
            // console.log(this.vx, this.vy);
        }

    }

    update_move() {
        this.vy += this.gravity;

        this.x += this.vx * this.timedeldt / 1000;
        this.y += this.vy * this.timedeldt / 1000;
        // console.log(this.vy * this.timedeldt / 1000);
        // console.log(this.vy)
        if (this.y > 450) {
            this.y = 450;
            this.vy = 0;
            if (this.status === 3) {
                this.status = 0;
            }
        }

        if (this.x < 0) {
            this.x = 0;
        }
        if (this.x + this.width > this.root.gameMap.$canvas.width()) {
            this.x = this.root.gameMap.$canvas.width() - this.width;
        }

    }
    update_render() {

        this.ctx.fillStyle = this.color;//渲染玩家模型

        this.ctx.fillRect(this.x, this.y, this.width, this.height);
        // console.log(this.color);
    }
}