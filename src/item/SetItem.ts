/**
* @brief: 设置组件
* @ author: gongganghao
* @ data: 2023-11-30 18:07
*/

import { SetItemBase } from "./SetItem.generated";
import Event = Laya.Event;

export type SetItemListData = {
    name:string,
    skin:string,
    desc:string,
    alias?:any,
    value?:string,
    showEdit:boolean,
    hideTxt:boolean,
    callBack:Laya.Handler;
}

export type SetItemData = {
    title?:string
    config:SetItemListData[]
}
const { regClass } = Laya;
@regClass()
export  class SetItem  extends SetItemBase{
   

    onEnable(): void {
        this.contentList.selectEnable = true;
        this.contentList.selectHandler = new Laya.Handler(this,this.selectItem)
        this.contentList.renderHandler = new Laya.Handler(this,this.renderItem)
    }

    renderItem(item:Laya.Box,index:number){
        const data = this.contentList.array[index] as SetItemListData;
        let icon = item.getChildByName("icon") as Laya.Image;
        let desc = item.getChildByName("desc") as Laya.Label;
        let value = item.getChildByName("value") as Laya.Label;
        let edit = item.getChildByName("edit") as Laya.Image;
        edit.visible = data.showEdit;
        value.visible = !data.hideTxt;
        value.right = data.showEdit ? 80  : 32;
        icon.skin = data.skin;
        desc.text = data.desc;
        value.text = data.alias ? data.alias[data.value] : data.value;
     }

    selectItem(index:number){
        const data = this.contentList.array[index] as SetItemListData;
        data.callBack && data.callBack.run();
        this.contentList["_selectedIndex"] = -1;

    }
    
    refreshUI(data:SetItemData){
        if(data.title){
            this.title.visible = true;
            this.title.text = data.title;
            this.contentList.top = this.title.height;
            this.height = data.config.length*80+this.title.height;
        }else{
            this.title.visible = false;
            this.contentList.top = 0;
            this.height = data.config.length*80;
        }
        this.contentList.array = data.config;
        this.contentList.repeatY = data.config.length;
    }
    
    onDisable(): void {
    }
}