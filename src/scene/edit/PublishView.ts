/**
* @brief: 发布界面
* @ author: gongganghao
* @ data: 2023-12-07 19:15
*/
import { PublishViewBase } from "./PublishView.generated";
import Event = Laya.Event;
import { DragDialog } from "../../core/logic/DragDialog";
import { PageManager } from "../../page/PageManager";
import { PagePath } from "../../page/data/PageData";
import { ServerManager } from "../../server/ServerManager";
import { ImageUtils } from "../../utils/ImageUtile";


const { regClass } = Laya;
@regClass()
export class PublishView extends PublishViewBase {

    private _data: any;

    private _cutWidth: number = 218

    onEnable(): void {
        this.getComponent(DragDialog).closeHandler = new Laya.Handler(this, this.onCloseClick)
        this.publishSuccessBtn.on(Event.CLICK, this, this.onPublishSuccess)
        this.publishBtn.on(Event.CLICK, this, this.onPublishClick)
        this.nameInput.on(Event.INPUT, this, this.onInputChange)
        this.descInput.on(Event.INPUT, this, this.onInputChange)
        this.publishEffect.loop = false;

        this.minuteList.array = new Array(20).fill(0).map((value, index) => { return { time: index%10} })
        this.minuteList.renderHandler = new Laya.Handler(this, this.renderTimeItem, [true])
        this.minuteList.scrollBar.rollRatio = 0.95;
        this.minuteList.scrollBar.on(Laya.Event.CHANGE, this, this.updateListEffect, [this.minuteList]);
        this.minuteList.scrollBar.on(Laya.Event.END, this, this.tweenListEffect, [this.minuteList]);


        this.secondList.array = new Array(120).fill(0).map((value, index) => { return { time: index % 60 } })
        this.secondList.renderHandler = new Laya.Handler(this, this.renderTimeItem, [false])
        this.secondList.scrollBar.rollRatio = 0.95;
        this.secondList.scrollBar.on(Laya.Event.CHANGE, this, this.updateListEffect, [this.secondList]);
        this.secondList.scrollBar.on(Laya.Event.END, this, this.tweenListEffect, [this.secondList]);
    }

    onOpened(param: any): void {
        this._data = param;
        this.setGameLogo(param.game_data.url)
        this.onInputChange();
        this.autoScrollToTarget(120);
    }

    setGameLogo(url: string) {
        Laya.loader.load(url, Laya.Handler.create(this, (res: any) => {
            this.logoIcon.skin = url;
            this.logoIcon.width = this._cutWidth;
            let scaleRatio = this._cutWidth / res.sourceWidth;
            this.logoIcon.height = scaleRatio * res.sourceHeight;
            this.logoIcon.pos(0, 0)
        }))
    }

    autoScrollToTarget(seconds: number) {

        let curMin = Math.floor(seconds / 60);
        let curSecond = seconds % 60;


        let minuteIndex = 0;
        let secondIndex = 0;


        for (let i = this.minuteList.array.length - 1; i >= 0; i--) {
            if (this.minuteList.array[i].time == curMin && i > 2) {
                minuteIndex = i - 2;
                break;
            }
        }

        for (let i = this.secondList.array.length - 1; i >= 0; i--) {
            if (this.secondList.array[i].time == curSecond && i > 2) {
                secondIndex = i - 2;
                break;
            }
        }
     
       this.minuteList.scrollTo(minuteIndex)
       this.secondList.scrollTo(secondIndex)
       this.minuteList.selectedIndex = minuteIndex+2;
       this.secondList.selectedIndex = secondIndex+2;

    }


    renderTimeItem(isMinute: boolean, item: Laya.Box, index: number) {
        let time = item.getChildByName("time") as Laya.Label;
        let data = (isMinute ? this.minuteList.array[index].time : this.secondList.array[index].time)
        time.text = data < 10 ? "0" + data : + "" + data;
    }

    tweenListEffect(list: Laya.List) {
        let curValue = list.scrollBar.value;
        let roundValue = Math.ceil(curValue / 50);
        list.scrollBar.value = roundValue * 50;
        list.selectedIndex = roundValue + 2;
    }

    updateListEffect(list: Laya.List) {
        let len = list.cells.length;
        let curValue = list.scrollBar.value;
        let centerPos = curValue + list.height / 2;
        let offset = 0;

        //循环效果
        if (curValue > list.scrollBar.max - offset) {
            list.scrollBar.value = 0;
        }
        if (curValue < 0) {
            list.scrollBar.value = list.scrollBar.max / 2 + offset;
        }


        //字体效果
        for (let i = 0; i < len; i++) {
            let item = list.cells[i] as Laya.Box;
            if (item.y > centerPos + 10 || item.y < centerPos - 10) {
                let aCe = (Math.abs(item.y - centerPos) ) / list.height;
                item.scaleX = Math.min(1 - aCe, 1);
                item.scaleY = Math.min(1 - aCe, 1);
            }
            else {
                item.scale(1,1)
            }
            item.x = (item.width - item.displayWidth) / 2;
        }
    }



    onInputChange() {
        this.nameNum.text = this.nameInput.text.length + "/" + this.nameInput.maxChars;
        this.descNum.text = this.descInput.text.length + "/" + this.descInput.maxChars;
    }

    onCloseClick() {
        PageManager.instance.close(PagePath.PublishPage);
    }

    onPublishSuccess() {
        PageManager.instance.close(PagePath.PublishPage);
        PageManager.instance.back();
    }

    checkPublishInfo() {
        if (this.nameInput.text.length <= 0) {
            PageManager.instance.showTip("请输入作品名称")
            return false;
        }
        return true;
    }

    cutoutLogo() {
        return new Promise((resolve, reject) => {
            let data: any[] = ImageUtils.getCaptureByImage(this.logoIcon, this._cutWidth, this._cutWidth, 0, 0);
            ServerManager.instance.uploadPictureToServer(data[1], "png", Laya.Handler.create(this, (dataO: any) => {
                if (dataO.success) {
                    resolve(dataO.data.filepath)
                } else {
                    reject();
                }
            }))
        })


    }

    async onPublishClick() {
        if (!this.checkPublishInfo()) {
            return;
        }
        this.publishBtn.mouseEnabled = false;
        let gameLogo = await this.cutoutLogo();
        let time = this.minuteList.array[this.minuteList.selectedIndex].time*60 + this.secondList.array[this.secondList.selectedIndex].time;
        this._data.game_data.duration = time;
        let publishData = {
            game_logo: gameLogo,
            game_id: this._data.game_id,
            game_data: JSON.stringify(this._data.game_data),
            game_name: this.nameInput.text,
            game_desc: this.descInput.text.length > 0 ? this.descInput.text : this._data.game_data.target,
            game_img: this._data.game_data.url,
            game_mod: this._data.game_data.type,
            game_bgm: this._data.game_bgm,
        }

        ServerManager.instance.httpSendPost("vincent/game/publishGame", publishData, Laya.Handler.create(this, (data: any) => {
            if (data.ret == 0) {
                this.effectBox.visible = true;
                this.publishEffect.play(0, false);
            } else {
                PageManager.instance.showTip(data.msg)
            }
            this.publishBtn.mouseEnabled = true;
        }))
    }




    onDisable(): void {
        this.publishSuccessBtn.off(Event.CLICK, this, this.onPublishSuccess)
        this.publishBtn.off(Event.CLICK, this, this.onPublishClick)
        this.nameInput.off(Event.INPUT, this, this.onInputChange)
        this.descInput.off(Event.INPUT, this, this.onInputChange)
    }
}