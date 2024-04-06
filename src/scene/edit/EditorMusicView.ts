/**
* @brief: 音乐试听界面
* @ author: gongganghao
* @ data: 2023-12-22 15:50
*/
import { EditorMusicViewBase } from "./EditorMusicView.generated";
import Event = Laya.Event;
import { DragDialog } from "../../core/logic/DragDialog";
import { PageManager } from "../../page/PageManager";
import { PagePath } from "../../page/data/PageData";
import { UnionManage } from "../../utils/UnionManage";
import SoundUtil from "../../utils/SoundUtils";

export type EditorMusicData = {
    name:string,
    desc:string,
    url:string,
    callback:Laya.Handler
}

const { regClass } = Laya;
@regClass()
export  class EditorMusicView extends EditorMusicViewBase {

    private _data:EditorMusicData;
    onEnable(): void {
        this.getComponent(DragDialog).closeHandler = new Laya.Handler(this,this.onCancelBtnClick)
        this.sureBtn.on(Event.CLICK,this,this.onSureBtnClick)
        this.cancelBtn.on(Event.CLICK,this,this.onCancelBtnClick)
    }
    
    onOpened(param:EditorMusicData): void {
        this._data = param;
        this.musicName.text = param.name;
        this.musicDesc.text = param.desc;
        SoundUtil.instance.play(param.url,0);
    }

    onSureBtnClick(){
        this._data.callback && this._data.callback.runWith([true,this._data])
        PageManager.instance.close(PagePath.EditMusicPage);
    }

    onCancelBtnClick(){
        this._data.callback && this._data.callback.runWith(false)
        PageManager.instance.close(PagePath.EditMusicPage);
    }
    
    
    
    onDisable(): void {
        this.sureBtn.off(Event.CLICK,this,this.onSureBtnClick)
        this.cancelBtn.off(Event.CLICK,this,this.onCancelBtnClick)
    }
}