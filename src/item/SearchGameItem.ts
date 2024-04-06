/**
* @brief: 搜索的游戏item
* @ author: gongganghao
* @ data: 2023-12-01 15:28
*/
import { SearchGameItemBase } from "./SearchGameItem.generated";
import Event = Laya.Event;
export type SearchGameItemData = {
    user:string,
    uid:string
    avator?:string,
    playNum:number,
    gameIcon?:string,
    gameId:number,
    gameName:string,
    gameDesc:string,
}
const { regClass } = Laya;
@regClass()
export  class SearchGameItem extends SearchGameItemBase {

    private _data:SearchGameItemData;
    onEnable(): void {
        this.icon.on(Event.CLICK,this,this.onGameClick)
    }
    
    refreshUI(data:SearchGameItemData){
        this._data = data;
        this.head.refreshUI({uid:data.uid});
        data.gameIcon && (this.icon.skin = data.gameIcon);
        this.playerNum.text = data.playNum + "";
        this.gameDesc.text = data.gameDesc;
        this.gameName.text = data.gameName;
        this.authorName.text = "@"+data.user;
    }


    onGameClick(){
        //TODO:跳转游戏
    }

    
   
    onDisable(): void {
        this._data = null;
        this.icon.off(Event.CLICK,this,this.onGameClick)
    }
}