/**
* @brief: 自定义滑动条
* @ author: gongganghao
* @ data: 2023-12-26 19:17
*/
import Event = Laya.Event;
import { FreeSliderBase } from "./FreeSlider.generated";
const { regClass } = Laya;
@regClass()
export class FreeSlider extends FreeSliderBase {

    onEnable(): void {
        this.slider.on(Event.MOUSE_MOVE, this, this.onSliderChange)
        this.slider.on(Event.MOUSE_DOWN, this, this.onSliderChange)
    }

    initSlider(cur: number, min: number, max: number, tick: number = 1) {
        this.slider.min = min;
        this.slider.max = max;
        this.slider.tick = tick;
        this.slider.value = cur;
        this.onSliderChange();
    }

    getCurValue() {
        return this.slider.value;
    }

    onSliderChange() {
        this.tipNum.text = this.slider.value.toString();
        this.tip.x = this.slider.bar.x;
    }

    onDisable(): void {
        this.slider.off(Event.MOUSE_MOVE, this, this.onSliderChange)
        this.slider.off(Event.MOUSE_DOWN, this, this.onSliderChange)

    }
}