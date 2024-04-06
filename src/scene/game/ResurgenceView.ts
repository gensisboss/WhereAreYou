/**
* @brief: 复活界面
* @ author: gongganghao
* @ data: 2023-12-11 20:18
*/
import { ResurgenceViewBase } from "./ResurgenceView.generated";
import Event = Laya.Event;
import { PageManager } from "../../page/PageManager";
import { PagePath } from "../../page/data/PageData";
import { GlobalData } from "../data/GlobalData";
import { UnionManage } from "../../utils/UnionManage";
const { regClass } = Laya;
@regClass()
export  class ResurgenceView extends ResurgenceViewBase {
    
    private _callBack:Laya.Handler;
    onEnable(): void {
        this.cancelBtn.on(Event.CLICK,this,this.onCancelBtnClick)
        this.sureBtn.on(Event.CLICK,this,this.onSureBtnClick)
        this.toolTip.text = "好可惜，还差一点，是否使用沙漏增加 " + "[color=#FEE130]"+ GlobalData.addSandLock +  " 秒[/color]"
    }
    
    onOpened(param:Laya.Handler): void {
        this._callBack = param;
    }
    
    onSureBtnClick(){
        let callBack = Laya.Handler.create(this,(isReward:boolean)=>{
            if(isReward){
                this._callBack.runWith(GlobalData.addSandLock);
            }else{
                this._callBack.runWith(0);
            }
            PageManager.instance.close(PagePath.ResurgencePage);
        })
        UnionManage.instance.watchVideo(callBack,"185i9ekdo3c1iopki4")
    }

    onCancelBtnClick(){
        this._callBack.runWith(0);
        PageManager.instance.close(PagePath.ResurgencePage);
    }
    
    onDisable(): void {
        this.cancelBtn.off(Event.CLICK,this,this.onCancelBtnClick)
        this.sureBtn.off(Event.CLICK,this,this.onSureBtnClick)
    }
}