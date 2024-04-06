/**
* @brief: 信息界面游戏item
* @ author: gongganghao
* @ data: 2023-12-05 17:48
*/
import { GameItemBase } from "./GameItem.generated";
import Event = Laya.Event;
import { PageManager } from "../page/PageManager";
import { PagePath } from "../page/data/PageData";
import { ServerManager } from "../server/ServerManager";

export type GameItemData = {
    showHead: boolean,
    game_id: string,
    game_logo: string,
    game_img: string,
    game_name: string,
    owner?: any
    playnum?: number,
    callback?: Laya.Handler;
    audit_status?: number,
}

const { regClass } = Laya;
@regClass()
export class GameItem extends GameItemBase {
    
    private _data: GameItemData;
    private _owner: Laya.Box;
    onEnable(): void {
        this._owner = this as Laya.Box;
        this.gameMask.size(this._owner.width - 4, this._owner.height - 4)
        this.gameMask.pos(2, 2)
        this.on(Event.CLICK, this, this.onGameClick)

    }


    refreshUI(data: GameItemData) {
        this._data = data;
        if (data?.audit_status > 0) {
            this.edit.visible = false;
            this.head.visible = true;
            this.play.visible = true;
            this.playerNum.text = data.playnum + "";
            if (data.showHead) {
                this.play.left = 60;
                this.head.visible = true;
                this.head.refreshUI({ uid: data.owner.developer_uid, url: data.owner.avatar, callback: Laya.Handler.create(this, null) })
            } else {
                this.play.left = 10;
                this.head.visible = false;
            }
        } else {
            this.head.visible = false;
            this.play.visible = false;
            this.edit.visible = true;
        }
        this.gameIcon.skin = ServerManager.instance.formatUrl(data.game_logo)
        this.gameName.text = data.game_name;
    }

    private onGameClick() {
      
        if (this._data?.audit_status > 0) {
            this._data.callback && this._data.callback.run()
        } else {
            //编辑游戏
            PageManager.instance.open(PagePath.EditPage, this._data, null, true)
        }
    }

  

  
  

 


    onDisable(): void {
        this._data = null;
        this.off(Event.CLICK, this, this.onGameClick)


    }

}