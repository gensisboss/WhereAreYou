/**
* @brief: 列表选择界面
* @ author: gongganghao
* @ data: 2023-11-24 19:10
*/
export type TagChooseData = {
    arr:string[],
    selectIndexs:number[],
    callback:Laya.Handler;
}
import Event = Laya.Event;
import { PageManager } from "../../page/PageManager";
import { DragDialog } from "../../core/logic/DragDialog";
import { PagePath } from "../../page/data/PageData";
import { TagChooseViewBase } from "./TagChooseView.generated";
const { regClass } = Laya;
@regClass()
export  class TagChooseView  extends TagChooseViewBase{

    private _data:TagChooseData;
    private _dragDialog:DragDialog;
    onEnable(): void {
        this._dragDialog = this.getComponent(DragDialog);
        this._dragDialog.closeHandler = new Laya.Handler(this,this.onCloseClick);
        this.tagList.selectEnable = true;
        this.tagList.renderHandler = new Laya.Handler(this,this.renderTagItem)
        this.tagList.selectHandler = new Laya.Handler(this,this.selectTagItem)
        this.sureBtn.on(Event.CLICK,this,this.onSureBtnClick)

    }

    renderTagItem(item:Laya.Box,index:number){
        let desc = item.getChildByName("desc") as Laya.Button;
        desc.label = this._data.arr[index];
        desc.selected = !this._data.selectIndexs.includes(index);
    }

    selectTagItem(index:number){
        if(this._data.selectIndexs.includes(index)){
            this._data.selectIndexs.splice(this._data.selectIndexs.indexOf(index),1);
        }else{
            this._data.selectIndexs.push(index);
        }
        this.tagList.refresh();
    }
    
    onOpened(data:TagChooseData): void {
        this._data = data;
        this.tagList.repeatY = Math.ceil(data.arr.length/5);
        this.tagList.array = data.arr;
        this.tagList.refresh();
    }

    onSureBtnClick(){
        this._dragDialog.onCloseClick();
        this._data.callback.runWith([this._data.selectIndexs])
    }


    onCloseClick(){
        PageManager.instance.close(PagePath.TagChoosePage);
    }
    
    
    onDisable(): void {
        this._dragDialog =  null;
        this.sureBtn.off(Event.CLICK,this,this.onSureBtnClick)
    }
}