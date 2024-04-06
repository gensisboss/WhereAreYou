/**
* @brief: 文本提示界面
* @ author: gongganghao
* @ data: 2023-12-04 11:18
*/
import { TipViewBase } from "./TipView.generated";
import { PageManager } from "../../page/PageManager";
import { PagePath } from "../../page/data/PageData";
export enum TipType {
    txt = "txt",
    load = "load",
    generate = "generate"
}
export type TipData = {
    type: TipType,
    tip?: string,
    delay?: number
}
const { regClass } = Laya;
@regClass()
export class TipView extends TipViewBase {

    private _maxWidth: number = 540;
    private _pointNum: number = 0;
    private _maxPointNum: number = 3;

    onOpened(data: TipData): void {
        Laya.InputManager.mouseEventsEnabled = false;
        this.tipBox.visible = false;
        this.loadBox.visible = false;
        this.generateBox.visible = false;
        switch (data.type) {
            case TipType.txt:
                this.tipBox.visible = true;
                this.tip.text = data.tip;
                if (this.tip.textField.textWidth > this._maxWidth) {
                    this.tip.align = "left";
                    this.bg.height = this.tip.textField.textHeight + 40;
                } else {
                    this.tip.align = "center";
                }
                this.bg.width = this.tip.textField.textWidth + 60;
                let time = data.delay ? data.delay * 1000 : 1000;
                Laya.timer.once(time, this, () => {
                    PageManager.instance.close(PagePath.TipPage)
                })
                break;
            case TipType.load:
                Laya.timer.clear(this, this.loadTxtEffect)
                this.loadBox.visible = true;
                this.loading.play();
                this.loading.x = Laya.stage.width / 2;
                this.loading.y = Laya.stage.height / 2;
                Laya.timer.loop(500, this, this.loadTxtEffect, [data.tip || "加载中"])
                break;
            case TipType.generate:
                Laya.timer.clear(this, this.loadTxtEffect)
                this.generateBox.visible = true;
                this.generate.play();
                this.generate.x = Laya.stage.width / 2 - 100;
                this.generate.y = Laya.stage.height / 2 - 60;
                Laya.timer.loop(500, this, this.loadTxtEffect, ["正在生成中"])
                break;
            default:
                break;
        }
       
    }

    loadTxtEffect(str: string) {
        this._pointNum++;
        if (this._pointNum > this._maxPointNum) {
            this._pointNum = 1;
        }
        this.loadTip.text = str + '.'.repeat(this._pointNum);
        this.generateTip.text = str + '.'.repeat(this._pointNum);
    }

    onClosed(type?: string): void {
        Laya.InputManager.mouseEventsEnabled = true;
    }

}