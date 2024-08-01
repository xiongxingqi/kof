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

        this.seepdx = 500;//水平速度
        this.seepdy = 2000;//垂直速度

        this.ctx = this.root.gameMap.ctx;

        this.pressed_keys = this.root.gameMap.controller.pressed_keys;

        this.status = 3 //0: idle 1:向前 2: 向后  3: 跳跃 4: 攻击  5: 被打 6: 死亡 

        this.animations = new Map();

        this.frame_current_cnt = 0;

        this.hp = 100;
        this.$hp = this.root.$kof.find(`.kof-hp-${this.id}-div`);
    }
    start() {

    }

    is_contain(r1, r2) {

        if (Math.max(r1.x1, r2.x1) <= Math.min(r1.x2, r2.x2)) {

            if (Math.max(r1.y1, r2.y1) <= Math.min(r1.y2, r2.y2)) {
                return true;
            }
        }
        return false;
    }
    is_attack() {
        if (this.status === 6) return;
        this.status = 5;
        this.frame_current_cnt = 0;
        this.vx = 0;
        this.vy = 0;
        this.hp = Math.max(0, this.hp - 10);

        // this.$hp.width(this.$hp.parent().width() * this.hp / 100);

        this.$hp.animate({
            width: this.$hp.parent().width() * this.hp / 100
        }, 1000);

        if (this.hp === 0) {
            this.status = 6;
            this.frame_current_cnt = 0;
        }
    }
    update_attack() {


        if (this.status === 4 && this.frame_current_cnt === 35) {
            let me = this, you = this.root.players[1 - this.id];
            let r1;
            if (this.difrection > 0) {

                r1 = {
                    x1: this.x + 120,
                    x2: this.x + 120 + 110,
                    y1: this.y + 35,
                    y2: this.y + 35 + 30
                }
            } else {
                r1 = {
                    x1: this.x - 110,
                    x2: this.x,
                    y1: this.y + 35,
                    y2: this.y + 35 + 30
                }
            }

            let r2 = {
                x1: you.x,
                x2: you.x + you.width,
                y1: you.y,
                y2: you.y + you.height,
            }

            // console.log(r1, r2);

            if (this.is_contain(r1, r2)) {
                you.is_attack();
            }

        }
    }

    update() {
        this.update_controller();
        this.update_difrection()
        this.update_move();
        this.update_attack();

        this.update_render();
    }

    update_controller() {
        if (this.root.gameMap.game_status === 7) {
            this.status = 0;
            this.vx = 0;
            // this.vy = 0;
            return;
        }
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
            if (space) {
                this.status = 4;
                this.vx = 0;
                this.frame_current_cnt = 0;
            } else if (w) {
                if (d) {
                    this.vx = this.seepdx;
                } else if (a) {
                    this.vx = -this.seepdx;
                } else {
                    this.vx = 0;
                }
                this.vy = -this.seepdy;
                this.status = 3;
                this.frame_current_cnt = 0;
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

    update_difrection() {

        if (this.status === 6) return;

        let players = this.root.players;
        if (players[0] && players[1]) {
            let me = this, you = players[1 - this.id];
            if (me.x > you.x) {
                this.difrection = -1;
            } else {
                this.difrection = 1;
            }
        }
    }

    update_move() {
        // if (this.root.gameMap.game_status === 7) return;
        this.vy += this.gravity;

        console.log(this.vy)

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

        // this.ctx.fillStyle = this.color; //渲染玩家模型
        // this.ctx.fillRect(this.x, this.y, this.width, this.height);
        // console.log(this.color);

        // this.ctx.fillStyle = "red";
        // if (this.difrection > 0) {
        //     this.ctx.fillRect(this.x + 120, this.y + 35, 110, 30);
        // } else {
        //     this.ctx.fillRect(this.x - 110, this.y + 35, 110, 30);
        // }

        // this.ctx.fillRect(this.x + 120, this.y + 35, 60, 30);

        let status = this.status;
        if (status === 1 && this.vx * this.difrection < 0) {
            status = 2;
        }

        let animation = this.animations.get(status);
        if (animation && animation.is_loaded) {

            let current = parseInt(this.frame_current_cnt / animation.frame_rate) % animation.frame_cnt;
            if (this.difrection > 0) {
                this.ctx.drawImage(animation.gif.frames[current].image, this.x, this.y + animation.offset_y, animation.gif.width * animation.scale, animation.gif.height * animation.scale);
            } else {
                this.ctx.save();
                this.ctx.scale(-1, 1);
                this.ctx.translate(-this.root.gameMap.$canvas.width(), 0);
                this.ctx.drawImage(animation.gif.frames[current].image, this.root.gameMap.$canvas.width() - this.x - this.width, this.y + animation.offset_y, animation.gif.width * animation.scale, animation.gif.height * animation.scale);
                this.ctx.restore();
            }

            // this.ctx.drawImage(animation.gif.frames[current].image, this.x, this.y + animation.offset_y, animation.gif.width * animation.scale, animation.gif.height * animation.scale);
        }

        if (this.status === 4 || this.status === 5 || this.status === 6) {
            if (this.frame_current_cnt === animation.frame_rate * animation.frame_cnt - 1) {
                if (this.status === 6) {
                    this.frame_current_cnt--;
                } else {
                    this.status = 0;

                }

            }
        }

        this.frame_current_cnt++;
    }
}