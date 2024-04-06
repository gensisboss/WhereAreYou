/**
* @brief: 列表选择界面
* @ author: gongganghao
* @ data: 2023-11-24 19:10
*/
export type ListChooseData = {
    arr:string[],
    colors?:string[],
    callback:Laya.Handler;
}
import { ListChooseViewBase } from "./ListChooseView.generated";
import Event = Laya.Event;
import { PageManager } from "../../page/PageManager";
import { DragDialog } from "../../core/logic/DragDialog";
import { PagePath } from "../../page/data/PageData";
const { regClass } = Laya;
@regClass()
export  class ListChooseView  extends ListChooseViewBase{

    private _data:ListChooseData;
    private _dragDialog:DragDialog;
    onEnable(): void {
        this._dragDialog = this.getComponent(DragDialog);
        this._dragDialog.closeHandler = new Laya.Handler(this,this.onCloseClick);
        this.cancelBtn.on(Event.CLICK,this,this.onCloseClick);
        this.chooseList.selectEnable = true;
        this.chooseList.renderHandler = new Laya.Handler(this,this.renderChooseItem)
        this.chooseList.selectHandler = new Laya.Handler(this,this.selectChooseItem)

    }

    renderChooseItem(item:Laya.Box,index:number){
        let tip = item.getChildByName("tip") as Laya.Label;
        tip.text = this._data.arr[index];
        if(this._data.colors){
            tip.color = this._data.colors[index];
        }
    }

    selectChooseItem(index:number){
        PageManager.instance.close(PagePath.ListChoosePage);
        this._data.callback && this._data.callback.runWith(this._data.arr[index]);
    }
    
    onOpened(data:ListChooseData): void {
        this._data = data;
        this.dragBox.height = data.arr.length*100+164;
        this._dragDialog.openHandeler();
        this.chooseList.repeatY =  data.arr.length;
        this.chooseList.array = data.arr;
        this.chooseList.refresh();
    }


    onCloseClick(){
        PageManager.instance.close(PagePath.ListChoosePage);
    }
    
    onClosed(): void {
    }
    
    onDisable(): void {
        this._dragDialog =  null;
        this.cancelBtn.off(Event.CLICK,this,this.onCloseClick);
    }
}