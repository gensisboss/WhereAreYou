/**
* @brief: 生成图片界面
* @ author: gongganghao
* @ data: 2023-12-08 11:50
*/
import { DescViewBase } from "./DescView.generated";
import Event = Laya.Event;
import { ImageUtils } from "../../utils/ImageUtile";
import { PageManager } from "../../page/PageManager";
import { PagePath, TweenType } from "../../page/data/PageData";
import { DragDialog } from "../../core/logic/DragDialog";
import { ServerManager } from "../../server/ServerManager";
import { GameType } from "../data/GameData";
import { GlobalData, UserDataKey } from "../data/GlobalData";
import { PreviewIconData } from "../info/PreviewIconView";
import { UnionManage } from "../../utils/UnionManage";

export type DescData = {
    prompt: string;
    addition: string;
}


const { regClass } = Laya;
@regClass()
export class DescView extends DescViewBase {

    private _data: DescData;
    private _dragDialog: DragDialog;
    private _curIconBytes: any;
    onEnable(): void {
        this._dragDialog = this.getComponent(DragDialog);
        this._dragDialog.closeHandler = new Laya.Handler(this, this.onBackClick)
        this.uploadBtn.on(Event.CLICK, this, this.onUploadClick)
        this.useBtn.on(Event.CLICK, this, this.onUseClick)
        this.reloadBtn.on(Event.CLICK, this, this.onUploadClick)
        this.loadIcon.on(Event.CLICK, this, this.onIconClick)
        this.deleteBtn.on(Event.CLICK, this, this.onDeleteClick)
        this.generateBtn.on(Event.CLICK, this, this.onGenerateClick)
        this.descnput.on(Event.INPUT, this, this.onDescInput)
        this.onDeleteClick();
    }


    onIconClick(e: Event) {
        let previewData: PreviewIconData = {
            url: this.loadIcon.skin,
            isPure: true,
        }
        PageManager.instance.open(PagePath.PreviewIconPage, previewData)
    }

    onUploadClick() {
        ImageUtils.chooseImage(Laya.Handler.create(this, this.onUploadCallBack))
    }

    onUploadCallBack(data: any, src: string) {
        this._curIconBytes = src;
        PageManager.instance.showLoading("上传中")
        ServerManager.instance.uploadPictureToServer(data, ImageUtils.getImageType(src), Laya.Handler.create(this, (dataO: any) => {
            if (dataO.success) {
                this.uploadBtn.visible = false;
                this.loadIcon.skin = ServerManager.instance.formatUrl(dataO.data.filepath);
                this.loadIcon.visible = true;
                this.iconBox.visible = true;
                this.deleteBtn.visible = true;
                this.bg.bottom = 20;
                this.slider.initSlider(0.5, 0, 1, 0.1)
                this.onDescInput();
            } else {
                PageManager.instance.showTip(dataO.msg)
            }
            PageManager.instance.hideTipOrLoading()
        }))
    }

    createGame(url: string) {
        let data = { from_game_id: 0, game_img: url };
        ServerManager.instance.httpSendPost('vincent/game/create', data, Laya.Handler.create(this, (data: any) => {
            if (data.ret == 0) {
                let editGameData = data.data;
                editGameData.game_mode = GameType.plot;
                PageManager.instance.close(PagePath.DescPage);
                PageManager.instance.open(PagePath.EditPage, editGameData, null, true)
            } else {
                PageManager.instance.showTip("创建游戏失败！")
            }

        }))
    }

    onUseClick() {
        this.createGame(this.loadIcon.skin)
    }

    onDeleteClick() {
        this.deleteBtn.visible = false;
        this.loadIcon.visible = false;
        this.uploadBtn.visible = true;
        this.iconBox.visible = false;
        this.bg.bottom = 300;
        this.generateBtn.selected = this.descnput.text.length > 0;
    }

    updateGenerateNum(free_count: number, card_num: number) {
        this.free.visible = free_count > 0 || free_count <= 0 && card_num <= 0;
        this.freeNum.text = free_count > 0 ? "免费（" + free_count + "）" : "免费     ";
        this.video.visible = free_count <= 0 && card_num <= 0;
        this.generateBtn.bottom = card_num > 0 ? 150 : 100;
        this.stimulateBg.visible = card_num > 0;
        this.stimulateNum.text = card_num + ""
    }

    checkCanGenerateFree(isSpend: boolean) {
        return new Promise((resolve, reject) => {
            ServerManager.instance.httpSendPost('vincent/game/picCount', { spend: isSpend ? 1 : 0 }, Laya.Handler.create(this, (data: any) => {
                if (data.ret == 0) {
                    this.updateGenerateNum(data.data.free_count, data.data.card_num)
                    resolve(true)
                } else {
                    resolve(false)
                }

            }))
        })
    }

    checkCanGenerateByCrystal() {
        return new Promise((resolve, reject) => {
            ServerManager.instance.httpSendPost('vincent/game/makeAiPic', {}, Laya.Handler.create(this, (data: any) => {
                if (data.ret == 0) {
                    let lastCrystal = parseInt(GlobalData.crystal) - GlobalData.spendCrystal;
                    GlobalData.updateUserData(UserDataKey.crystal, lastCrystal.toString())
                    resolve(true)
                } else {
                    resolve(false)
                }

            }))
        })
    }


    async onGenerateClick() {
        if (this.descnput.text.length <= 0 && !this.loadIcon.visible) {
            PageManager.instance.showTip(this.descnput.text.length <= 0 ? "请输入图片描述" : "请上传参考图片")
            return;
        }
        this.generateImage();
    }



    generateImageWithVideo() {
        UnionManage.instance.watchVideo(Laya.Handler.create(this, (isReward: boolean) => {
            if (isReward) {
                this.generateImage(true);
            }else{
                PageManager.instance.hideTipOrLoading()
            }
        }), "24rr4bfipss31i0eh7")
    }

    interpert(desc:string){
        return new Promise((resolve,reject)=>{
            ServerManager.instance.interpretDesc(desc,Laya.Handler.create(this,(data)=>{
                if(data.code == 0){
                    resolve(data.data.content)
                }else{
                    reject();
                }
            }))
        })
       
    }


    async generateImage(isFree: boolean = false) {
        PageManager.instance.showGenerate()
        let prompt = this._data.prompt + (await this.interpert(this.descnput.text)) + this._data.addition;
        if (this.loadIcon.visible) {
            let imageData = {
                url: this._curIconBytes,
                cfg: this.descnput.text.length / this.descnput.maxChars * 10,
                repiant: this.slider.getCurValue(),
                prompt: prompt
            }
            ServerManager.instance.createAIImageWithImage(isFree, imageData, Laya.Handler.create(this, (data: any) => {
                if (data.ret == 0) {
                    PageManager.instance.hideTipOrLoading()
                    this.updateGenerateNum(data.data.free_count, data.data.card_num)
                    PageManager.instance.open(PagePath.EditSourcePage, { url: data.data.images[0], callback: Laya.Handler.create(this, this.createGame) })
                } else {
                    !isFree && this.generateImageWithVideo();
                }
               
            }))
        } else {
            ServerManager.instance.createAIImageWithText(isFree, prompt, Laya.Handler.create(this, (data: any) => {
                if (data.ret == 0) {
                    PageManager.instance.hideTipOrLoading()
                    this.updateGenerateNum(data.data.free_count, data.data.card_num)
                    PageManager.instance.open(PagePath.EditSourcePage, { url: data.data.images[0], callback: Laya.Handler.create(this, this.createGame) })
                } else {
                    !isFree && this.generateImageWithVideo();
                }
               
            }))
        }

    }

    onDescInput() {
        let canGen = this.descnput.text.length > 0 || this.loadIcon.visible;
        this.generateBtn.selected = canGen;
        this.generateBtn.labelColors = canGen ? "#000000,#000000,#000000" : "#FFFFFF,#FFFFFF,#FFFFFF";
        this.descNum.text = this.descnput.text.length + "/" + this.descnput.maxChars;
    }


    onOpened(param: DescData): void {
        this._data = param;
        this.dragBox.height = Laya.stage.height;
        this._dragDialog.openHandeler();
        this.checkCanGenerateFree(false)

    }


    onBackClick(): void {
        PageManager.instance.close(PagePath.DescPage);
    }


    onDisable(): void {
        this._data = null;
        this._dragDialog = null;
        this.uploadBtn.off(Event.CLICK, this, this.onUploadClick)
        this.useBtn.off(Event.CLICK, this, this.onUseClick)
        this.reloadBtn.off(Event.CLICK, this, this.onUploadClick)
        this.generateBtn.off(Event.CLICK, this, this.onGenerateClick)
        this.descnput.off(Event.INPUT, this, this.onDescInput)
        this.loadIcon.off(Event.CLICK, this, this.onIconClick)

    }
}