/**
* @brief: 二次确认弹窗
* @ author: gongganghao
* @ data: 2023-11-23 15:10
*/
import { ConfirmViewBase } from "./ConfirmView.generated";
import Event = Laya.Event;
import { DragDialog } from "../../core/logic/DragDialog";
import { PageManager } from "../../page/PageManager";
import { PagePath } from "../../page/data/PageData";

const { regClass } = Laya;
export type ConfirmData = {
    tip:string;
    cancelStr?:string,
    sureStr?:string,
    callBack?:Laya.Handler;
}

@regClass()
export class ConfirmView extends ConfirmViewBase {


    private _data: ConfirmData;


    onEnable(): void {
        this.cancelBtn.on(Event.CLICK,this,this.onCancelClick)
        this.sureBtn.on(Event.CLICK,this,this.onSureClick)
        this.closeBtn.on(Event.CLICK,this,this.onCloseClick)
        this.getComponent(DragDialog).closeHandler = new Laya.Handler(this,this.onCloseClick)
    }

    onOpened(param: ConfirmData): void {
        this._data = param;
        this.confirmTip.text = param.tip;
        (this.cancelBtn.getChildAt(0) as Laya.Label).text = param.cancelStr || "取消";
        (this.sureBtn.getChildAt(0) as Laya.Label).text = param.sureStr || "确定";
    }

    onCancelClick() {
        this._data.callBack && this._data.callBack.runWith(false)
        PageManager.instance.close(PagePath.ConfirmPage);
    }

    onCloseClick(){
        this._data.callBack && this._data.callBack.run()
        PageManager.instance.close(PagePath.ConfirmPage);
    }

    onSureClick() {
        this._data.callBack && this._data.callBack.runWith(true)
        PageManager.instance.close(PagePath.ConfirmPage);
    }

    onDisable(): void {
        this.cancelBtn.off(Event.CLICK,this,this.onCancelClick)
        this.sureBtn.off(Event.CLICK,this,this.onSureClick)
        this.closeBtn.off(Event.CLICK,this,this.onCloseClick)

    }

  
}