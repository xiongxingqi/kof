import { GameObject } from "../game_object/base.js";
import { Controller } from "../controller/base.js";
export class GameMap extends GameObject {
    constructor(root) {
        super();
        this.root = root;
        this.$canvas = $(`<canvas  width="1280" height="720" tabindex=0></canvas>`);//创建canvas
        this.ctx = this.$canvas[0].getContext("2d");//获取canvas2d上下文供画图使用
        this.root.$kof.append(this.$canvas);//将canvas加入根元素
        this.$canvas.focus();//默认聚焦

        this.controller = new Controller(this.$canvas);
        this.root.$kof.append($(`<div class="kof-head">
        <div class="kof-hp-0"><div></div></div>
        <div class="kof-timer"></div>
        <div class="kof-hp-1"><div></div></div>
    </div>`));
    }
    start() {

    }

    update() {
        this.render();//渲染函数
    }

    render() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);//清空画布内容
        // this.ctx.fillStyle = "black"//test 矩形填充颜色
        // this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);//绘制矩形
        // console.log(this.$canvas.width());
        // console.log();
    }
}