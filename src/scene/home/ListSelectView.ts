/**
* @brief: 二次确认弹窗
* @ author: gongganghao
* @ data: 2023-11-23 15:10
*/
import Event = Laya.Event;
import { PageManager } from "../../page/PageManager";
import { PagePath } from "../../page/data/PageData";
import { ListSelectViewBase } from "./ListSelectView.generated";
import { FloatWindow } from "../../core/logic/FloatWindow";

const { regClass } = Laya;
export type ListSelectData = {
    title?:string;
    ignoreLang?:boolean,
    pos:Laya.Vector2,
    data:string[],
    callBack:Laya.Handler;
}

@regClass()
export class ListSelectView extends ListSelectViewBase {


    private _data: ListSelectData;
    private _floatWidow:FloatWindow;


    onEnable(): void {
        this._floatWidow = this.getComponent(FloatWindow);
        this._floatWidow.closeHandler = new Laya.Handler(this,this.onCloseClick)
        this.menuList.selectEnable = true;
        this.menuList.selectHandler = new Laya.Handler(this,this.selectItem)
        this.menuList.renderHandler = new Laya.Handler(this,this.renderItem)
    }

    onOpened(param: ListSelectData): void {
        this._data = param;
        this.title.text = param.title || "菜单";
        this.dragBox.height = (param.data.length+1)*72
        this._floatWidow.setPostion(param.pos)
        this.menuList.array = param.data;
        this.menuList.repeatY = param.data.length;
        this.menuList.refresh();
    }

    renderItem(item:Laya.Box,index:number){
        let bg = item.getChildByName("bg") as Laya.Image;
        let desc = item.getChildByName("desc") as Laya.Label;
        bg.skin = index < this.menuList.array.length-1  ? "resources/images/page/sckgengduo4.png" : "resources/images/page/sckgengduo1.png";
        desc.text = this.menuList.array[index];
        if(this._data.ignoreLang == true){
            desc.ignoreLang = true;
        }else{
            desc.ignoreLang = false;
        }
    }

    selectItem(index:number){
        this._data.callBack && this._data.callBack.runWith(index)
        PageManager.instance.close(PagePath.ListSelectPage);
    }


    onCloseClick(){
        PageManager.instance.close(PagePath.ListSelectPage);
    }

 

    onDisable(): void {
       

    }

  
}