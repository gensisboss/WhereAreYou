/**
* @brief: 预览图片
* @ author: gongganghao
* @ data: 2023-11-24 15:58
*/
export type PreviewIconData = {
    url:string,
    //是否是纯净模式
    isPure:boolean,
    isHead?:boolean;
    title?:string,
    audit?:any
    callback?:Laya.Handler
}

import { PreviewIconViewBase } from "./PreviewIconView.generated";
import Event = Laya.Event;
import { PageManager } from "../../page/PageManager";
import { PagePath, TweenType } from "../../page/data/PageData";
import { ServerManager } from "../../server/ServerManager";
import { ImageUtils } from "../../utils/ImageUtile";
import { EditIconData } from "./EditIconView";
const { regClass } = Laya;
@regClass()
export  class PreviewIconView extends PreviewIconViewBase{

    private _data:PreviewIconData;
    onEnable(): void {
        this.backBtn.on(Event.CLICK,this,this.onBackClick)
        this.on(Event.CLICK,this,this.onCloseClick)
        this.changeBtn.on(Event.CLICK,this,this.onChangeClick)
    }
    
    onOpened(param:PreviewIconData): void {
        this._data = param;
        this.topBox.visible = !param.isPure;
        this.btnBox.visible = !param.isPure;
        this.title.text =  param.isHead ? "预览头像" : "预览背景";
        if(param.audit){
            this.auditInfo.visible = true;
            this.changeBtn.visible = false;
            this.auditInfo.text = param.audit;
        }else{
            this.auditInfo.visible = false;
            this.changeBtn.visible = true;
            this.changeBtn.label = param.isHead ? "更换头像" : "更换背景";
        }
        
        this.setSkin(param.url)
    
    }

    async setSkin(url: string) {
        url = ServerManager.instance.formatUrl(url);
        Laya.loader.load(url, Laya.Handler.create(this, (res: any) => {
            if(res){
                this.previewIcon.skin = url;
                let scaleRatio = Laya.stage.width / res.sourceWidth;
                this.previewBox.width = this.previewIcon.width = Laya.stage.width;
                this.previewBox.height = this.previewIcon.height = scaleRatio * res.sourceHeight;
                this.previewBox.x = (Laya.stage.width- this.previewIcon.width)/2;
                this.previewBox.y = (Laya.stage.height- this.previewIcon.height)/2;
                this.previewIcon.pos(0,0)
            }
        }), null, Laya.Loader.IMAGE);
      
    }

  

    onChangeClick(){
        let callback = Laya.Handler.create(this, (data: any, src: string) => {
            let editData: EditIconData = {
                ab:data,
                url: src,
                isHead: this._data.isHead,
                callBack:this._data.callback,
            }
            PageManager.instance.open(PagePath.EditIconPage, editData, null, true, "", { type: TweenType.Right })
        })
        ImageUtils.chooseImage(callback)
    }

   

    onBackClick(){
        PageManager.instance.back();
    }

    onCloseClick(){
        if(this._data.isPure){
            PageManager.instance.close(PagePath.PreviewIconPage);
        }
    }
    
 
    
    onDisable(): void {
        this.off(Event.CLICK,this,this.onCloseClick)
        this.backBtn.off(Event.CLICK,this,this.onBackClick)
        this.changeBtn.off(Event.CLICK,this,this.onChangeClick)
    }
}