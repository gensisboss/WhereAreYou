/**
* @brief: 音乐item
* @ author: gongganghao
* @ data: 2023-12-22 16:25
*/
import { MusicItemBase } from "./MusicItem.generated";
import Event = Laya.Event;
import { GlobalData } from "../scene/data/GlobalData";
import { PageManager } from "../page/PageManager";
import { PagePath } from "../page/data/PageData";
import { ListSelectData } from "../scene/home/ListSelectView";
import { ServerManager } from "../server/ServerManager";

export type MusicData = {
    preform_id: number,
    preform_name: string,
    preform_desc: string,
    preform_file: string
    developer_uid: string,
    deleteCallBack?:Laya.Handler
}

const { regClass } = Laya;
@regClass()
export  class MusicItem  extends MusicItemBase{

    private _data:MusicData;
    onEnable(): void {
        this.moreBtn.on(Event.CLICK,this,this.onMoreBtnClick)
    }
    
    refreshUI(data:any){
        this._data = data;
        this.moreBtn.visible = this._data.developer_uid == GlobalData.developer_uid;
        this.names.text = this._data.preform_name;
        this.desc.text = this._data.preform_desc;
    }

    onMoreBtnClick(e:Event){
        e.stopPropagation();
        let selectData: ListSelectData = {
            title: "选项",
            data: ["删除","取消"],
            callBack: Laya.Handler.create(this, this.onMoreBtnCallBack),
            pos: new Laya.Vector2(Laya.stage.mouseX, Laya.stage.mouseY)
        }
        PageManager.instance.open(PagePath.ListSelectPage, selectData)
    }

    onMoreBtnCallBack(type:number){
        if(type == 0){
            let data = {
                preform_id: this._data.preform_id,
            }
            ServerManager.instance.httpSendPost("/vincent/audio/del",data)
            this._data.deleteCallBack && this._data.deleteCallBack.run();
        }
    }
    
    onDisable(): void {
        this.moreBtn.off(Event.CLICK,this,this.onMoreBtnClick)
    }
}