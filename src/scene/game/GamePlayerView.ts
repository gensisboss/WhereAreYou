import { GamePlayerViewBase } from "./GamePlayerView.generated";

/**
* @brief: 游戏逻辑
* @ author: gongganghao
* @ data: 2023-10-30 14:01
*/

import Event = Laya.Event;
import TransformIcon from "../../core/logic/TransformIcon";
import { PageManager } from "../../page/PageManager";
import { GameType } from "../data/GameData";
import { MarkUtils } from "../../utils/MarkUtils";
import { PagePath } from "../../page/data/PageData";
import { GlobalData } from "../data/GlobalData";
import { TxtUtils } from "../../utils/TxtUtils";
import { GameEndData } from "./GameEndView";
import { ServerManager } from "../../server/ServerManager";
import { UnionManage } from "../../utils/UnionManage";
import { ImageUtils } from "../../utils/ImageUtile";
import SoundUtil from "../../utils/SoundUtils";

export type PlayGameData = {
    id: number
    url: string,
    list: any[];
    duration: number;
    type: GameType,
    target?: string,
}

const { regClass } = Laya;

@regClass()
export class GamePlayerView extends GamePlayerViewBase {

    private _transformIcon: TransformIcon;
    private _tempPoint = new Laya.Point();
    private _tempTarget = new Laya.Vector2();
    private _tipIndex: number;
    private _data: PlayGameData;
    //存储已经找到的物体
    private _hadFinds: number[];
    private _lastTime: number;
    public get lastTime(): number {
        return this._lastTime;
    }
    public set lastTime(value: number) {
        if (value < 0) {
            value = 0;
        }
        this.timeDown.text = TxtUtils.formattingTimer(value * 1000, false)
        this._lastTime = value;
    }

    private _isTestPlay: boolean;
    private _spendTime:number = 0;


    onEnable(): void {
        this.gameIcon.on(Event.CLICK, this, this.onGameIconClick)
        this.gameTip.on(Event.CLICK, this, this.onAnswerClick)
        this.backBtn.on(Event.CLICK, this, this.onBackClick)
        this.helpBox.on(Event.CLICK, this, this.onHelpClick)
        this.timeBox.on(Event.CLICK, this, this.onMoreTimeClick)
        this.starList.selectEnable = false;
        this.starList.renderHandler = new Laya.Handler(this, this.renderStarItem);
        this.starList.array = [0, 0, 0]

        this._transformIcon = this.gameIcon.getComponent(TransformIcon);
        this._transformIcon.transformMoveHandler = new Laya.Handler(this, this.onIconPosChange)
        this._transformIcon.transformScaleHandler = new Laya.Handler(this, this.onIconScaleChange)

        this.gameBox.width = Laya.stage.width;
        this.gameBox.height = Laya.stage.height;

    }

    onIconPosChange(posX: number, posY: number) {
        if (posX != null) {
            this.chooseBox.pos(posX, posY)
            // this.topBox.visible = false;
            // this.toolBox.visible = false;
        } else {
            // this.toolBox.visible = true;
            // this.topBox.visible = true;
        }
    }

    onIconScaleChange(scale: number) {
        if (scale != null) {
            this.chooseBox.scale(scale, scale)
            // this.topBox.visible = false;
            // this.toolBox.visible = false;
        } else {
            // this.toolBox.visible = true;
            // this.topBox.visible = true;
        }
    }

    onOpened(param: PlayGameData): void {
        this._data = param;
        this._hadFinds = new Array(this._data.list.length).fill(0)
        this.starList.refresh();
        Laya.timer.clear(this, this.countDown)
        this.lastTime = this._data.duration;
        Laya.timer.loop(1000, this, this.countDown)
        if (param.type == GameType.plot) {
            this.gameTarget.visible = true;
            this.gameTarget.text = param.target;
        } else {
            this.gameTarget.visible = false;
        }
        this.resizeGameIcon();
        this._isTestPlay = param.id <= 0
        this.toolBox.visible = !this._isTestPlay;

    }

    restartGame() {
        Laya.timer.clear(this, this.countDown)
        this.lastTime = this._data.duration;
        this._hadFinds.fill(0);
        this.chooseBox.destroyChildren();
        this.starList.refresh();
        Laya.timer.loop(1000, this, this.countDown)
    }

    openEndPage() {
        Laya.timer.clear(this, this.countDown)
        this.updateGameData();
        let stars = this.caculateStar(this._hadFinds.reduce((acc, cur) => acc + cur, 0) / this._data.list.length);
        let endData: GameEndData = {
            id:this._data.id,
            time:this._spendTime,
            num: stars,
            restartCallBack: Laya.Handler.create(this, () => {
                this.restartGame();
            }),
            backCallBack: Laya.Handler.create(this, () => {
                PageManager.instance.back()
            }),
        }
        PageManager.instance.open(PagePath.GameEndPage, endData)
    }

    updateGameData() {
        if (this._data.id > -1) {
            let num = this._hadFinds.reduce((acc, cur) => acc + cur, 0)
            let stars = this.caculateStar(num / this._data.list.length);
            let _data = {
                "game_id": this._data.id,
                "star_num": stars
            }
            ServerManager.instance.httpSendPost("/vincent/game/settleGameStar", _data)
        }
    }

    countDown() {
        this._spendTime ++;
        this.lastTime -= 1;
        if (this.lastTime <= 0) {
            if (this._isTestPlay) {
                this.openEndPage();
            } else {
                PageManager.instance.open(PagePath.ResurgencePage, Laya.Handler.create(this, (time: number) => {
                    this.lastTime += time;
                    if (time <= 0) {
                        this.openEndPage();
                    } else {
                        Laya.timer.loop(1000, this, this.countDown)
                    }
                }))
                Laya.timer.clear(this, this.countDown)
            }
        }
        this.timeCircle.rotation += 10;
    }

    resizeGameIcon() {
        Laya.loader.load(this._data.url, Laya.Handler.create(this, (res: any) => {
            this.gameIcon.skin = this._data.url;
            this.gameTip.skin = this._data.url;
            this.gameIcon.width = res.sourceWidth;
            this.gameIcon.height = res.sourceHeight;
            let scale = 1;
            if (this.gameIcon.height >= this.gameBox.height && this.gameIcon.width >= this.gameBox.width) {
                scale = 1
            } else if (this.gameIcon.height <= this.gameBox.height) {
                scale = this.gameBox.height / this.gameIcon.height;
            } else if (this.gameIcon.width <= this.gameBox.width) {
                scale = this.gameBox.width / this.gameIcon.width;
            }
            this._transformIcon.minScale = scale;
            this._transformIcon.setScale(scale)
            this._transformIcon.setPosition((this.gameBox.width - this.gameIcon.displayWidth) / 2, 0)
            this.chooseBox.width = this.gameIcon.displayWidth;
            this.chooseBox.height = this.gameIcon.displayHeight;
        }))
    }



    private renderStarItem(item: Laya.Box, index: number) {
        let star = item.getChildByName("star") as Laya.Button;
        let num = this._hadFinds.reduce((acc, cur) => acc + cur, 0)
        star.selected = index + 1 <= this.caculateStar(num / this._data.list.length);
        this.findNum.text = num + "/" + this._data.list.length;
    }


    private caculteTipData() {
        for (let i = 0; i < this._data.list.length; i++) {
            if (this._hadFinds[i] == 0) {
                this._tipIndex = i;
                return this._data.list[i].data;
            }
        }
        return null;
    }

    private async caculteFindItem(pos: Laya.Vector2) {
        for (let i = 0; i < this._data.list.length; i++) {
            const data = this._data.list[i].data;
            let posX = data.pos[0];
            let posY = data.pos[1];
            let width = data.size[0];
            let height = data.size[1];

            let url = ServerManager.instance.formatUrl(this._data.list[i].url);
            if (pos.x >= posX && pos.x <= posX + width
                && pos.y >= posY && pos.y <= posY + height) {
                if (this._hadFinds[i] == 1 || await ImageUtils.checkTransparency(url, (pos.x - posX), (pos.y - posY) )) {
                    return -1;
                } else {
                    return i;
                }
            }
        }
        return -1;
    }

    caculateStar(percent: number) {
        for (let i = GlobalData.starConfig.length - 1; i >= 0; i--) {
            if (percent >= GlobalData.starConfig[i]) {
                return i + 1;
            }
        }
    }


    deductTimeEffect() {
        let label = new Laya.Label("-10s")
        label.fontSize = 50;
        label.color = GlobalData.themeColor;
        label.pos(this.clickBox.x, this.clickBox.y)
        let targetPoint = new Laya.Point(this.timeBg.x, this.timeBg.y);
        this.middleBox.globalToLocal(this.timeBg.localToGlobal(targetPoint));
        Laya.Tween.to(label, { x: targetPoint.x, y: targetPoint.y, scaleX: 0, scaleY: 0, alpha: 0 }, 1000, null, Laya.Handler.create(this, () => {
            this.lastTime -= 10;
            this.middleBox.removeChild(label);
            label.destroy();
        }))
        this.middleBox.addChild(label);
    }




    private creatGlow(index: number) {
        this._hadFinds[index] = 1;
        let num = this._hadFinds.reduce((acc, cur) => acc + cur, 0)
        if (num >= this._data.list.length) {
            this.openEndPage();
        }
        this.starList.refresh();
        let info = this._data.list[index];
        MarkUtils.createGlow(new Laya.Vector2(info.data.pos[0], info.data.pos[1]), ServerManager.instance.formatUrl(info.url), this.chooseBox)
    }

    private onAnswerClick() {
        SoundUtil.instance.play("resources/music/right.mp3",1)
        this.maskBox.visible = false;
        this.creatGlow(this._tipIndex);
    }

    private onMoreTimeClick() {
        Laya.timer.clear(this, this.countDown)
        let watchCall = Laya.Handler.create(this, (isReward: boolean) => {
            if (isReward) {
                this.lastTime += GlobalData.addSandLock;
                Laya.timer.loop(1000, this, this.countDown)
            }
        })
        UnionManage.instance.watchVideo(watchCall, "185i9ekdo3c1iopki4")
    }

    private moveGameIcon(offset: number) {
        let offsetX = this._tempTarget.x * this.gameIcon.scaleX;
        let offsetY = this._tempTarget.y * this.gameIcon.scaleY;
        let posX = this.gameIcon.x;
        let posY = this.gameIcon.y;
        if (posX + offsetX > this.gameBox.width) {
            posX -= (offsetX - this.gameBox.width + offset)
        }
        if (posX + offsetX < 0) {
            posX += (-posX - offsetX + offset)
        }
        if (posY + offsetY > this.gameBox.height) {
            posY -= (posY + offsetY - this.gameBox.height + offset)
        }
        if (posY + offsetY < 0) {
            posY += (- posY - offsetY + offset)
        }
        this._transformIcon.setPosition(posX, posY)
    }


    private onHelpClick() {
        Laya.InputManager.mouseEventsEnabled = false;
        let watchCall = Laya.Handler.create(this, (isReward: boolean) => {
            if (isReward) {
                let data = this.caculteTipData();
                if (data) {
                    this.maskBox.visible = true;
                    let radius = Math.max(data.size[0], data.size[1])
                    this._tempTarget.setValue((data.pos[0] + data.size[0] / 2), (data.pos[1] + data.size[1] / 2))
                    this.moveGameIcon(radius);
                    this.maskBox.pos(this.gameIcon.x, this.gameIcon.y);
                    this.maskBox.width = this.gameIcon.width;
                    this.maskBox.height = this.gameIcon.height;
                    this.maskBox.scale(this.gameIcon.scaleX, this.gameIcon.scaleY);
                    this.tipMask.pos(this._tempTarget.x, this._tempTarget.y)
                    this.tipMask.width = this.tipMask.height = 1000;
                    Laya.Tween.to(this.tipMask, { width: radius, height: radius }, 500, null, Laya.Handler.create(this, () => {
                        Laya.InputManager.mouseEventsEnabled = true;
                    }))
                }
            } else {
                Laya.InputManager.mouseEventsEnabled = true;
            }
        })
        UnionManage.instance.watchVideo(watchCall, "2i14k3a4ff071sf28q")

    }

    private onBackClick() {
        PageManager.instance.back()
    }


    private updateClickFeedBack(isRight: boolean) {
        this.clickBox.visible = true;
        this.clickBox.pos(this._tempPoint.x, this._tempPoint.y)
        let right = this.clickBox.getChildByName("right") as Laya.Image;
        let wrong = this.clickBox.getChildByName("wrong") as Laya.Image;
        right.visible = isRight;
        wrong.visible = !isRight;
        Laya.timer.once(1000, this, () => {
            this.clickBox.visible = false;
        })
        if (isRight) {
            SoundUtil.instance.play("resources/music/right.mp3",1)
        } else {
            this.deductTimeEffect();
            SoundUtil.instance.play("resources/music/wrong.mp3",1)
        }
    }


    private async onGameIconClick(e: Event) {
        this._tempPoint = this.middleBox.globalToLocal(new Laya.Point(e.stageX, e.stageY))
        let findIndex = await this.caculteFindItem(new Laya.Vector2(this.gameIcon.mouseX, this.gameIcon.mouseY));
        if (findIndex >= 0) {
            this.creatGlow(findIndex);
        }
        this.updateClickFeedBack(findIndex >= 0)
    }


    onDisable(): void {
        this._data = null;
        this._transformIcon = null;
        this._tempPoint = null;
        this._tempTarget = null;
        this.gameIcon.off(Event.CLICK, this, this.onGameIconClick)
        this.gameTip.off(Event.CLICK, this, this.onAnswerClick)
        this.backBtn.off(Event.CLICK, this, this.onBackClick)
        this.helpBox.off(Event.CLICK, this, this.onHelpClick)
        this.timeBox.off(Event.CLICK, this, this.onMoreTimeClick)
    }

}