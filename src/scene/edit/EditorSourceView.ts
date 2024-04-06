/**
* @brief: 生成编辑资源界面
* @ author: gongganghao
* @ data: 2023-11-21 10:14
*/
import Event = Laya.Event;
import { DragDialog } from "../../core/logic/DragDialog";
import { PageManager } from "../../page/PageManager";
import { PagePath } from "../../page/data/PageData";
import { ServerManager } from "../../server/ServerManager";
import { PreviewIconData } from "../info/PreviewIconView";
import { EditorSourceViewBase } from "./EditorSourceView.generated";

export type EditorSourceData = {
    url:string,
    callback:Laya.Handler
}

const { regClass } = Laya;

@regClass()
export  class EditorSourceView extends EditorSourceViewBase{
    private _callBack:Laya.Handler;
   

    onEnable(): void {
        this.getComponent(DragDialog).closeHandler = new Laya.Handler(this,this.onCloseClick)
        this.icon.on(Event.CLICK,this,this.onIconClick)
        this.sureBtn.on(Event.CLICK,this,this.onSureBtnClick)
    }

    onOpened(param: EditorSourceData): void {
        this._callBack = param.callback;
        this.icon.skin = ServerManager.instance.AIBaseUrl+param.url;
    }

  

    onIconClick(){
         let previewData: PreviewIconData = {
            url: this.icon.skin,
            isPure:true,
        }
        PageManager.instance.open(PagePath.PreviewIconPage, previewData)
    }




    onSureBtnClick(){
        this._callBack && this._callBack.runWith(this.icon.skin)
        PageManager.instance.close(PagePath.EditSourcePage);
    }
    

    onCloseClick(){
        PageManager.instance.close(PagePath.EditSourcePage);
    }
   

    onDisable(): void {
        this.icon.off(Event.CLICK,this,this.onIconClick)
        this.sureBtn.off(Event.CLICK,this,this.onSureBtnClick)
    }
    
 
}