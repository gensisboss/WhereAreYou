/**
* @brief: 图片剪裁
* @ author: gongganghao
* @ data: 2023-11-24 11:53
*/
export type EditIconData = {
    ab: ArrayBuffer,
    url: string;
    isHead: boolean;
    callBack?: Laya.Handler;
}
import { EditIconViewBase } from "./EditIconView.generated";
import Event = Laya.Event;
import TransformIcon from "../../core/logic/TransformIcon";
import { PageManager } from "../../page/PageManager";
import { ServerManager } from "../../server/ServerManager";
import { PreviewIconData } from "./PreviewIconView";
import { ImageUtils } from "../../utils/ImageUtile";
const { regClass } = Laya;
@regClass()
export class EditIconView extends EditIconViewBase {

    private _transformIcon: TransformIcon;
    private _editData: EditIconData;
    private _maskArea: Laya.Sprite;
    private _imgType:string;
    onEnable(): void {
        this.backBtn.on(Event.CLICK, this, this.onCloseBtnClick)
        this.sureBtn.on(Event.CLICK, this, this.onSureBtnClick)
        this._transformIcon = this.headIcon.getComponent(TransformIcon);
        this._transformIcon.transformMoveHandler = new Laya.Handler(this, this.headTransform)
    }

    headTransform(posX:number,posY:number) {
        if (posX) {
            this._maskArea.alpha = 0.5;
            this.tip.alpha = 0.5;
        } else {
            this._maskArea.alpha = 1;
            this.tip.alpha = 1;
        }
    }

    drawMask() {
        this.maskBox.cacheAs = "bitmap";
        // 绘制遮罩区，含透明度，可见游戏背景
        this._maskArea = new Laya.Sprite();
        this.maskBox.addChild(this._maskArea);
        this._maskArea.alpha = 1;
        this._maskArea.graphics.drawRect(0, 0, this.maskBox.width, this.maskBox.height, "#171a1f");

        // 绘制一个圆角矩形区域，利用叠加模式，从遮罩区域抠出可交互区
        let interactionArea = new Laya.Sprite();
        let rectWdith = this._editData.isHead ? this.maskheadIcon.width - 10 : this.maskbgIcon.width;
        let rectHeight = this._editData.isHead ? this.maskheadIcon.height - 10 : this.maskbgIcon.height;
        let startPosX = 0;
        let startPosY = 0;
        let rotai = 190;
        if (this._editData.isHead) {
            let path = [
                ["moveTo", startPosX + rotai, startPosY], //画笔的起始点，
                ["arcTo", startPosX + rectWdith, startPosY, startPosX + rectWdith, rotai, rotai], //p1（500,0）为夹角B，（500,30）为端点p2
                ["arcTo", startPosX + rectWdith, startPosY + rectHeight, startPosX + rectWdith - rotai, startPosY + rectHeight, rotai],//p1（500,300）为夹角C，（470,300）为端点p2
                ["arcTo", startPosX, startPosY + rectHeight, startPosX, startPosY + rectHeight - rotai, rotai], //p1(0,300)为夹角D，（0,270）为端点p2
                ["arcTo", startPosX, startPosY, rotai, startPosY, rotai],//p1(0,0)为夹角A，（30,0）为端点p2
            ];
            interactionArea.graphics.drawPath(0, 0, path, { fillStyle: "#ff0000" }, { "strokeStyle": "#ffffff", "lineWidth": "10" });
        } else {
            interactionArea.graphics.drawRect(0, 0, rectWdith, rectHeight, "ff0000", "#ffffff", 10)
        }

        this.maskBox.addChild(interactionArea);
        // 设置叠加模式
        interactionArea.blendMode = "destination-out";
        interactionArea.x = this._editData.isHead ? this.maskheadIcon.x + 5 : this.maskbgIcon.x;
        interactionArea.y = this._editData.isHead ? this.maskheadIcon.y + 5 : this.maskbgIcon.y;
        interactionArea.width = rectWdith;
        interactionArea.height = rectHeight;
    }

    onOpened(param: EditIconData): void {
        this._editData = param;
    
        this.title.text = param.isHead ? "编辑头像" : "编辑背景";
        if (this._editData.isHead) {
            this.headBox.pos(this.maskheadIcon.x, this.maskheadIcon.y)
            this.headBox.size(this.maskheadIcon.width, this.maskheadIcon.height)
        } else {
            this.headBox.pos(this.maskbgIcon.x, this.maskbgIcon.y)
            this.headBox.size(this.maskbgIcon.width, this.maskbgIcon.height)
        }

        this.resizeHeadIcon();

       
        let startIndex=param.url.indexOf(":");
        let endindex=param.url.indexOf(";");
        this._imgType=endindex>=0?(param.url.slice(startIndex+1,endindex)):"image/png";
        this.maskheadIcon.visible = this._editData.isHead;
        this.maskbgIcon.visible = !this._editData.isHead;
        if (!this._maskArea) {
            this.drawMask();
        }

    }

    resizeHeadIcon(){
        let url =  ServerManager.instance.formatUrl(this._editData.url);
        Laya.loader.load(url, Laya.Handler.create(this, (res: any) => {
            this.headIcon.skin = url;
            this.headIcon.width = res.sourceWidth;
            this.headIcon.height = res.sourceHeight;
            let scale = 1;
            if (this.headIcon.height >= this.headBox.height && this.headIcon.width >= this.headBox.width) {
                scale = 1
            } else if (this.headIcon.height <= this.headBox.height) {
                scale = this.headBox.height / this.headIcon.height;
            } else if (this.headIcon.width <= this.headBox.width) {
                scale = this.headBox.width / this.headIcon.width;
            }
            this._transformIcon.minScale = scale;
            this._transformIcon.setScale(scale)
            this._transformIcon.setPosition((this.headBox.width-this.headIcon.displayWidth)/2,(this.headBox.height-this.headIcon.displayHeight)/2)
        }))

    }


    onCloseBtnClick() {
        PageManager.instance.back();
    }


    onSureBtnClick() {
        let mask = this._editData.isHead ? this.maskheadIcon : this.maskbgIcon;
        let data:any[]= ImageUtils.getCaptureByImage(this.headIcon,mask.width,mask.height,mask.x-this.headBox.x,mask.y-this.headBox.y,this._imgType);
        let extension: string =  this._imgType.split("/")[1];
        extension = extension ? extension : "png";
        ServerManager.instance.uploadPictureToServer(data[1], extension, Laya.Handler.create(this, (dataO: any) => {
            if (dataO.success) {
                this._editData.callBack && this._editData.callBack.runWith(dataO.data.filepath)
                let data: PreviewIconData = {
                    isPure:false,
                    url: dataO.data.filepath,
                    isHead: this._editData.isHead,
                    audit:"审核中......."
                }
                PageManager.instance.back(data);
            }else{
                PageManager.instance.showTip("保存失败！请重试")
            }
        }))

    }

   

    onDisable(): void {
        this._transformIcon = null;
        this._maskArea = null;
        this.backBtn.off(Event.CLICK, this, this.onCloseBtnClick)
        this.sureBtn.off(Event.CLICK, this, this.onSureBtnClick)
    }
}