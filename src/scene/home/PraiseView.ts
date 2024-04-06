/**
* @brief: 点赞确认弹窗
* @ author: gongganghao
* @ data: 2023-11-23 15:10
*/
import Event = Laya.Event;
import { DragDialog } from "../../core/logic/DragDialog";
import { PageManager } from "../../page/PageManager";
import { PagePath } from "../../page/data/PageData";
import { PraiseViewBase } from "./PraiseView.generated";

export type PraiseData = {
    user:string,
    num:string;
}


const { regClass } = Laya;



@regClass()
export class PraiseView extends PraiseViewBase {




    onEnable(): void {
        this.sureBtn.on(Event.CLICK,this,this.onCloseClick)
        this.getComponent(DragDialog).closeHandler = new Laya.Handler(this,this.onCloseClick)
    }

    onOpened(param: PraiseData): void {
        this.confirmTip.text = param.user + "获得了" + param.num + "个点赞";
    }

   

    onCloseClick(){
        PageManager.instance.close(PagePath.PraisePage);
    }

  

    onDisable(): void {
        this.sureBtn.off(Event.CLICK,this,this.onCloseClick)

    }

  
}