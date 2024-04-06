import { DBUtils } from "./DBUtils";
import { FileUtils } from "./FileUtils";
import { WXUtils } from "./WXUtils";

/**
* @brief: 图片处理功能
* @ author: gongganghao
* @ data: 2023-11-27 14:15
*/
export enum EFileType {
    Image = 'image',//图片
    Video = 'video',//视频
    PPt = 'ppt',//PPT
    PPtAndVideo = "pptAndVidep",
    Audio = "audio"//音频
}

type FileCfg = {
    /**
     * app文件限制列表 eg: jpg,png
     */
    appAccept: string,
    /**
     * 文件限制列表 eg: .jpg,.png
     */
    accept: string,
    /**
     * 文件限制数组  eg: ['jpg','png']
     */
    accepts: string[]
}

/**
 * ...
 * @author zyh
 */
export class ImageUtils {

    constructor() {

    }
    static LIMITSIZE: number = 30;//M
    /**视频最大宽度 超过需压缩 */
    static videoWidth: number = 640;
    /** 视频最大高度 超过需压缩 */
    static videoHeight: number = 360;

    static _fileCfg: any = {
    }

    static __init__() {
        const images = ['jpg', 'png', 'jpeg'];
        const videos = ['mp4', "mov"];
        const ppts = ['ppt', 'pptx'];
        const pptAndVideo = ['ppt', 'pptx', 'mp4', "mov", "pdf"];
        const audios = ["mp3"]
        const cfg = [
            [EFileType.Image, images],
            [EFileType.Video, videos],
            [EFileType.PPt, ppts],
            [EFileType.PPtAndVideo, pptAndVideo],
            [EFileType.Audio, audios]
        ]
        for (let i = 0; i < cfg.length; i++) {
            let type: any = cfg[i][0];
            let accepts: string[] = cfg[i][1] as string[];
            let appAccept = "";
            let accept = "";
            for (let j = 0; j < accepts.length; j++) {
                accept += ("." + accepts[j]);
                appAccept += accepts[j]
                if (j != accepts.length - 1) {
                    accept += ",";
                    appAccept += ",";
                }
            }
            this._fileCfg[type] = {
                appAccept: appAccept,
                accept: accept,
                accepts: accepts
            }
        }
    }


    /**
     * 文件大小超了
     * @param limitSize 
     */
    private static _onSizeError(limitSize: number, callBack: Laya.Handler) {
        let size = Math.floor(limitSize / (1024 * 1024));
        if (size < 1) {
            size = limitSize / 1024;
            console.log("此文件已超过" + size + "KB,请修改后上传");
        } else {
            console.log("此文件已超过" + size + "MB,请修改后上传");
        }
        if (callBack && callBack.once) {
            callBack.recover();
        }
    }

    /**
     * 文件格式错误
     * @param cfg 
     * @param callBack 
     */
    private static _onExtensionError(cfg: FileCfg, callBack: Laya.Handler) {
        if (callBack && callBack.once) {
            callBack.recover();
        }
    }

    private static _onLoaded(cfg: FileCfg, callBack: Laya.Handler, limitSize: number, ab: ArrayBuffer, base64: string, fileName: string): void {
        if (limitSize != -1 && (!ab || ab.byteLength > limitSize)) {
            this._onSizeError(limitSize, callBack);
            return;
        }
        else {
            let extension = Laya.Utils.getFileExtension(fileName);
            if (cfg.accepts.indexOf(extension) == -1) {
                this._onExtensionError(cfg, callBack);
                return;
            }
            callBack && callBack.runWith([ab, base64, fileName]);
        }
    }

    static chooseFile(filetype: EFileType, callback: Laya.Handler, type: string, limitSize: number) {
        let cfg: FileCfg = this._fileCfg[filetype];
        if (filetype == EFileType.Image && WXUtils.isMiniGame()) {
            WXUtils.chooseImageToArrayBuffer(type, Laya.Handler.create(this, this._onLoaded, [cfg, callback, limitSize]), cfg.appAccept);
        } else {
            FileUtils.createFile(Laya.Handler.create(this, this._onLoaded, [cfg, callback, limitSize]), cfg.accept, false, false, limitSize);
            FileUtils.alertFileDialog();
        }
    }

    static getImageType(url:string){
        let startIndex = url.indexOf(":");
        let endindex = url.indexOf(";");
        let imgType=endindex>=0?(url.slice(startIndex+1,endindex)):"image/png";
        return imgType.split("/")[1];
    }

    static chooseImage(callback: Laya.Handler, type: string = "album", limitSize: number = -1) {
        this.chooseFile(EFileType.Image, callback, type, limitSize);
    }
    static chooseVideo(callback: Laya.Handler, type: string = "album", limitSize: number = -1) {
        this.chooseFile(EFileType.Video, callback, type, limitSize);
    }
    static choosePPT(callback: Laya.Handler, type: string = "album", limitSize: number = -1) {
        this.chooseFile(EFileType.PPt, callback, type, limitSize);
    }
    static choosePPTOrVideo(callback: Laya.Handler, type: string = "album", limitSize: number = -1) {
        this.chooseFile(EFileType.PPtAndVideo, callback, type, limitSize);
    }
    static chooseAudio(callback: Laya.Handler, type: string = "album", limitSize: number = -1) {
        this.chooseFile(EFileType.Audio, callback, type, limitSize);
    }

    /**
    * 获取剪裁后的图片
    * @param sourceImg 原图
    * @param captureWidth 截取原图的宽
    * @param captureHeight 截取原图的高
    * @param captureOffsetX 截图在舞台的位置x
    * @param captureOffsetY 截取在舞台的位置y
    * @param imgType 原图的图片类型
    * @return [Laya.Texture,ArrayBuffer];
    */
    static getCaptureByImage(sourceImg: Laya.Image, captureWidth: number = 500, captureHeight: number = 280, captureOffsetX: number = 0, captureOffsetY = 0, imgType: string = "image/png"): any[] {
        let offsetX = sourceImg.x - (captureOffsetX - sourceImg.x);
        let offsetY = sourceImg.y - (captureOffsetY - sourceImg.y);
        let txture: Laya.HTMLCanvas = sourceImg.drawToCanvas(captureWidth, captureHeight, offsetX, offsetY);
        let base64 = txture.toBase64(imgType, 0.9);
        var arr: any[] = base64.split(',');
        return [txture.getTexture(), DBUtils.decodeArrayBuffer(arr[1]), base64];
    }

    static checkTransparency(imageSrc, x, y) {
        return new Promise((resolve,reject)=>{
            Laya.loader.load(imageSrc, Laya.Handler.create(this, ()=>{
                var texture = Laya.loader.getRes(imageSrc);

                // 获取单个像素点的数据
                var pixels = texture.getPixels(x, y, 5, 5);
                if(pixels){
                    var alpha = pixels[3]; // 获取alpha值
            
                    if (alpha === 0) {
                        resolve(true)
                    } else {
                        resolve(false)
                    }
                }else{
                    resolve(true)
                }
                
            }));
        })
      }

    /**
     * 
     * @param path 图片路径
     * @param url 图片名字
     * @param starPos 图片开始的序号
     * @param length 有几个图片
     * @param maxLen 总共有几个数字
     * @returns 图片集合
     */
    static createAniUrls(path: string, name: string, starPos: number, length: number, maxLen: number): string[] {
        let urls = [];
        for (let i = 0; i < length; i++) {
            urls.push(this.getURL(path, name, maxLen, (starPos + i)));
        }
        console.log(urls);
        return urls;
    }
    private static getURL(path: string, name: string, maxLen: number, curValue: number): string {
        let imgLen = curValue + "";
        let tempStr: string = "";
        for (var i: number = imgLen.length; i < maxLen; i++) {
            tempStr += "0";
        }
        tempStr += imgLen;
        return path + name + tempStr + ".png";
    }
    static downloadImage(sp: Laya.Image, callback: Laya.Handler) {
        if (Laya.Browser.onPC) {
            let htmlCanvas = sp.drawToCanvas(sp.width, sp.height, sp.x, sp.y);
            const base64Info = htmlCanvas.toBase64("image/png", 1);
            FileUtils.saveToLcal_base64(base64Info, "tempQrCode.png");
            callback.runWith(true)
        }
        else {
            //TODO 别的平台待处理
            // if (Laya.Browser.onWeiXin) {
            //     const [ab, ext] = MetaX.ImageUtils.toArrayBuffer(sp);
            //     LogicGlobal.logicServer.uploadPictureToServer(ab, ext, Laya.Handler.create(this, (dataO) => {
            //         if (dataO.success && dataO.data) {
            //             let url = dataO.data.filepath;
            //             if (url && url.length) {
            //                 var value = LogicGlobal.logicServer.formatUrl(dataO.data.filepath);
            //                 MetaX.DeviceUtils.previewImage(value, null, null, () => {
            //                     callback.runWith(true)
            //                 });
            //                 return;
            //             }
            //         }
            //         callback.runWith(false)
            //     }));
            // }
            // else {
            //     let texture = sp.texture;
            //     if (sp instanceof Laya.Image) {
            //         texture = sp.source;
            //     }
            //     MetaX.DeviceUtils.saveImageToPhotosAlbum(texture, Laya.Handler.create(null, function () {
            //         console.log("保存到相册成功!!");
            //         callback.runWith(true)
            //     }));
            // }
        }
    }
}
ImageUtils.__init__();
