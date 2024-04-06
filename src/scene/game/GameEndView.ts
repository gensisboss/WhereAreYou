/**
* @brief: 游戏结算界面
* @ author: gongganghao
* @ data: 2023-12-11 19:55
*/
import { GameEndViewBase } from "./GameEndView.generated";
import Event = Laya.Event;
import { PageManager } from "../../page/PageManager";
import { PagePath } from "../../page/data/PageData";
import SoundUtil from "../../utils/SoundUtils";
import { ServerManager } from "../../server/ServerManager";
import { GlobalData } from "../data/GlobalData";

export type GameEndData = {
    id:number,
    time:number,
    num: number,
    backCallBack: Laya.Handler;
    restartCallBack: Laya.Handler;
}

const { regClass } = Laya;
@regClass()
export class GameEndView extends GameEndViewBase {

    private _data: GameEndData;
    onEnable(): void {
        this.backBtn.on(Event.CLICK, this, this.onBackBtnClick)
        this.restartBtn.on(Event.CLICK, this, this.onRestartBtnClick)
    }

    onOpened(parma: GameEndData): void {
        this._data = parma;
        GlobalData.tempGameData && (GlobalData.tempGameData.star_num = Math.max(GlobalData.tempGameData.star_num,parma.num));
        this.refreshStarEffect(parma.num)
        this.resultBg.selected = this.result.selected = parma.num > 0;
        if (parma.num > 0) {
            SoundUtil.instance.play("resources/music/success.mp3", 1)
        } else {
            SoundUtil.instance.play("resources/music/fail.mp3", 1)
        }

        //上报游戏时长分析
        ServerManager.instance.httpSendPost("/vincent/game/gameAnalysis", {
            game_id: this._data.id,
            duration: this._data.time,
        })
    }



    refreshStarEffect(num: number) {
        Laya.timer.clearAll(this);
        for (let i = 0; i < num; i++) {
            Laya.timer.once(i * 500, this, () => {
                const star = this.starBox.getChildAt(i) as Laya.Animation;
                if ((i + 1) <= num) {
                    star.play(0, false)
                } else {
                    star.stop();
                }
            })
        }
    }

    onBackBtnClick() {
        PageManager.instance.close(PagePath.GameEndPage)
        this._data.backCallBack && this._data.backCallBack.run();
    }

    onRestartBtnClick() {
        PageManager.instance.close(PagePath.GameEndPage)
        this._data.restartCallBack && this._data.restartCallBack.run();
    }


    onDisable(): void {
        this.backBtn.off(Event.CLICK, this, this.onBackBtnClick)
        this.restartBtn.off(Event.CLICK, this, this.onRestartBtnClick)
    }
}