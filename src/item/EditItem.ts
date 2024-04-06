/**
* @brief: 编辑素材自适应
* @ author: gongganghao
* @ data: 2023-11-15 15:11
*/

export type EditItemData = {
    url: string;
    info:string,
    callback?: Laya.Handler;
}

import Event = Laya.Event;
import { EditItemBase } from "./EditItem.generated";
const { regClass } = Laya;

@regClass()
export class EditItem extends EditItemBase {

    private _data: EditItemData;
    //长按时间
    private _delayTime:number = 1;
    private _delayFun:any;

    onEnable(): void {
        this.delete.visible = false;
        this.delete.on(Event.CLICK, this, this.onDeleteItemClick)
        this.icon.on(Event.MOUSE_DOWN,this,this.onMouseDown)
        this.icon.on(Event.MOUSE_UP,this,this.onMouseUp)
        this.icon.on(Event.MOUSE_OUT,this,this.onMouseUp)
    }

    onMouseDown(){
        Laya.timer.clear(this,this.delayShowDelete)
        Laya.timer.once(this._delayTime*1000,this,this.delayShowDelete)
    }

    onMouseUp(){
        Laya.timer.clear(this,this.delayShowDelete)
    }

    delayShowDelete(){
        this.delete.visible = true;
    }



    refreshUI(data: EditItemData) {
        this._data = data;
        this.icon.skin = data.url;
        this.index.text = data.info;
    }

    onDeleteItemClick() {
        this._data.callback && this._data.callback.run()
       
    }

    onDisable(): void {
        this._data = null;
        this.delete.off(Event.CLICK, this, this.onDeleteItemClick)
    }

}