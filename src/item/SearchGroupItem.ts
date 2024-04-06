/**
* @brief: 总和搜索item
* @ author: gongganghao
* @ data: 2023-12-01 15:57
*/
import { SearchGroupItemBase } from "./SearchGroupItem.generated";
import Event = Laya.Event;
import { SearchGameItem } from "./SearchGameItem";
import { UserItem } from "./UserItem";

export type SearchGroupItemData = {
    title:string,
    moreCallBack:Laya.Handler,
    isUser:boolean,
    listData:any[]
}
const { regClass } = Laya;
@regClass()
export  class SearchGroupItem  extends SearchGroupItemBase{

    private _data:SearchGroupItemData;

    onEnable(): void {
        this.more.on(Event.CLICK,this,this.onMoreBtnClick)
        this.gameList.renderHandler = new Laya.Handler(this,this.renderGameItem)
        this.userList.renderHandler = new Laya.Handler(this,this.renderUserItem)
    }

    renderGameItem(item:Laya.Box,index:number){
        let searchGameItem = item as SearchGameItem;
        searchGameItem.refreshUI(this.gameList.array[index])
    }

    renderUserItem(item:Laya.Box,index:number){
        let userItem = item as UserItem;
        userItem.refreshUI(this.userList.array[index])
    }
    
    refreshUI(data:SearchGroupItemData){
        this._data = data;
        this.title.text = data.title;
        this.gameList.visible = !data.isUser;
        this.userList.visible = !data.isUser;
        let len = data.listData.length;
        if(data.isUser){
            this.userList.repeatX = 1;
            this.userList.array = data.listData;
            this.userList.repeatY = len;
            this.height = 60 + len*108 + (len-1)*this.userList.spaceY;
        }else{
            this.gameList.repeatX = 2;
            this.gameList.array = data.listData;
            this.gameList.repeatY = Math.ceil(len/2)
            this.height = 60 + this.gameList.repeatY*108 + (this.gameList.repeatY-1)*this.gameList.spaceY;
        }
    }
    
    onMoreBtnClick(){
        this._data.moreCallBack.run()
    }

    onDisable(): void {
        this._data = null;
        this.more.off(Event.CLICK,this,this.onMoreBtnClick)
    }
}