/**
* @brief: 游戏框自适应
* @ author: gongganghao
* @ data: 2023-11-15 15:11
*/

import { ServerManager } from "../server/ServerManager";
import Event = Laya.Event;
import { GameBase } from "./Game.generated";
import { PageManager } from "../page/PageManager";
import { PagePath, TweenType } from "../page/data/PageData";

export type GameData = {
    /**
     * 游戏完整数据
     */
    info: any
    callback?: Laya.Handler;
}

const { regClass } = Laya;

@regClass()
export class Game extends GameBase {

    private _data: GameData;
    private _owner: Laya.Box;

    onEnable(): void {
        this._owner = this as Laya.Box;
        this.on(Event.CLICK, this, this.onGameClick)
        this.gameMask.size(this._owner.width - 4, this._owner.height - 4)
        this.gameMask.pos(2, 2)
    }

    refreshUI(data: GameData) {
        this._data = data;
        this._owner = this as Laya.Box;
        if (data.info.audit_status != 2) {
            let src = ServerManager.instance.formatUrl(data.info.game_img);
            Laya.loader.load(src, Laya.Handler.create(this, (res: any) => {
                this.gameIcon.skin = src;
                if (res.sourceWidth < res.sourceHeight) {
                    this.gameIcon.width = this._owner.width;
                    this.gameIcon.height = res.sourceHeight * (this._owner.width / res.sourceWidth);
                } else {
                    this.gameIcon.width = res.sourceWidth * (this._owner.height / res.sourceHeight);
                    this.gameIcon.height = this._owner.height;
                }
            }))
        } else {
            this.gameIcon.skin = ServerManager.instance.formatUrl(data.info.game_logo);
            this.gameIcon.width = this._owner.width;
            this.gameIcon.height = this._owner.height;
        }
    }

    onGameClick() {
        if(this._data.callback){
            this._data.callback.run()
        }else{
            if(this._data.info.audit_status == 2){
                PageManager.instance.open(PagePath.SubjectPage, { list: [this._data.info], curSelect: 0 }, null, true, "", { type: TweenType.Right })
            }else{
                PageManager.instance.showTip("游戏不存在")
            }
            
        }
    }

    onDisable(): void {
        this._data = null;
        this._owner = null;
        this.off(Event.CLICK, this, this.onGameClick)
    }

}