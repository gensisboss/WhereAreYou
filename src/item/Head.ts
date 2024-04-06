/**
* @brief: 头像框自适应
* @ author: gongganghao
* @ data: 2023-11-15 15:11
*/

export type HeadData = {
    uid?:string,
    url?: string;
    callback?: Laya.Handler;
}

import { HeadBase } from "./Head.generated";
import Event = Laya.Event;
import { GlobalData } from "../scene/data/GlobalData";
import { PageManager } from "../page/PageManager";
import { PagePath, TweenType } from "../page/data/PageData";
import { ServerManager } from "../server/ServerManager";
const { regClass } = Laya;

@regClass()
export class Head extends HeadBase {

    private _data: HeadData;

    onEnable(): void {
        this.headIcon.on(Event.CLICK, this, this.onHeadClick)
        this.headMask.size(this.headIcon.width, this.headIcon.height)
    }

    refreshUI(data: HeadData) {
        this._data = data;
        this.headIcon.skin = ServerManager.instance.formatUrl(data.url || GlobalData.avatar);
    }

    onHeadClick(e:Event) {
        e.stopPropagation();
        if (this._data.callback) {
            this._data.callback.run()
        } else {
            PageManager.instance.open(PagePath.InfoPage, this._data.uid,null,true,"",{type:TweenType.Right})
        }
    }

    onDisable(): void {
        this._data = null;
        this.headIcon.off(Event.CLICK, this, this.onHeadClick)
    }

}