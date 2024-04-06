/**
* @brief: 嵌套列表
* @ author: gongganghao
* @ data: 2023-11-28 17:42
*/
import { TweenType } from "../../page/data/PageData";
import Event = Laya.Event;
const { property, regClass } = Laya;
@regClass()
export class NestList extends Laya.Script {

    @property({ type: [Laya.List], tips: "子列表" })
    public nestLists: Laya.List[] = [];
    @property({ type: TweenType, tips: "滚动方向", options: { "向上": TweenType.Top, "向下": TweenType.Bottom, "向左": TweenType.Left, "向右": TweenType.Right } })
    public direction: TweenType = TweenType.Top;

    limitHandler:Laya.Handler;
    private _panel: Laya.Panel;


    onEnable(): void {
        this._panel = this.owner as Laya.Panel;
        for (let i = 0; i < this.nestLists.length; i++) {
            const list = this.nestLists[i];
            list.scrollBar.on(Event.CHANGE, this, this.onNestListScroll)
        }
    }



    onNestListScroll() {
        let limitScrollValue = 10;
        let curValue = 0;
        switch (this.direction) {
            case TweenType.Top:
            case TweenType.Left:
                for (let i = 0; i < this.nestLists.length; i++) {
                    const list = this.nestLists[i];
                    curValue += list.scrollBar.value;
                }
                if(this._panel.scrollType == Laya.ScrollType.Vertical){
                    this._panel.vScrollBar.value = (curValue >= limitScrollValue) ? this._panel.vScrollBar.max : this._panel.vScrollBar.value;
                }
                if(this._panel.scrollType == Laya.ScrollType.Horizontal){
                    this._panel.hScrollBar.value = (curValue >= limitScrollValue) ? this._panel.hScrollBar.max : this._panel.hScrollBar.value;
                }
                break;
            case TweenType.Bottom:
            case TweenType.Right:
                for (let i = 0; i < this.nestLists.length; i++) {
                    const list = this.nestLists[i];
                    curValue += list.scrollBar.value;
                    limitScrollValue += list.scrollBar.max;
                }
                if(this._panel.scrollType == Laya.ScrollType.Vertical){
                    this._panel.vScrollBar.value = (curValue < limitScrollValue) ? 0 : this._panel.vScrollBar.value;
                }
                if(this._panel.scrollType == Laya.ScrollType.Horizontal){
                    this._panel.hScrollBar.value = (curValue < limitScrollValue) ? 0 : this._panel.hScrollBar.value;
                }
                break;

            default:
                break;
        }
        if(this._panel.scrollType == Laya.ScrollType.Vertical){
            this.limitHandler && this.limitHandler.runWith(this._panel.vScrollBar.value+100 >= this._panel.vScrollBar.max)
        }
        if(this._panel.scrollType == Laya.ScrollType.Horizontal){
            this.limitHandler && this.limitHandler.runWith(this._panel.hScrollBar.value+100 >=  this._panel.hScrollBar.max)
        }
    }



    onDisable(): void {
        for (let i = 0; i < this.nestLists.length; i++) {
            const list = this.nestLists[i];
            list.scrollBar.off(Event.CHANGE, this, this.onNestListScroll)
        }
       
    }
}