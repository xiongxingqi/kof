let GAME_OBJECTS = [];
export class GameObject {
    constructor() {
        GAME_OBJECTS.push(this);
        this.timedeldt = 0;
        this.has_call_start = false;
    }

    start() { //图像初始化一次

    }
    update() {//每帧图像更新一次(不包含第一帧)

    }
    destroyed() {//删除当前对象
        for (let i in GAME_OBJECTS) {
            if (GAME_OBJECTS[i] === this) {
                GAME_OBJECTS.splice(i, 1);
                break;
            }
        }
    }

}

let last_timestamp;

let GAME_OBJECTS_FRAME = (timestamp) => {
    for (let obj of GAME_OBJECTS) {
        if (!obj.has_call_start) {
            obj.has_call_start = true;
            obj.start();
        } else {
            obj.timedeldt = timestamp - last_timestamp;
            obj.update();
        }
    }
    last_timestamp = timestamp;
    requestAnimationFrame(GAME_OBJECTS_FRAME);
}


requestAnimationFrame(GAME_OBJECTS_FRAME);