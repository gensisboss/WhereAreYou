/**
* @brief: 文件工具
* @ author: gongganghao
* @ data: 2023-11-27 14:36
*/

import { SystemDragOverManager } from "./SystemDragOverManager";
import Handler = Laya.Handler;
import Browser = Laya.Browser;
import { DBUtils } from "./DBUtils";

export class FileUtils {
    private static _callback: Handler;
    private static _file: any;

    static getFileNameHandler: Handler;
    constructor() {

    }

    /**
     * 
     * @param callback 
     * @param accept 文件类型
     * @param multiple 是否是多选
     * @param webkitdirectory  是否可以选取文件夹
     * @param limitSize 文件上传大小限制
     */
    static createFile(callback: Handler, accept: string = '', multiple: boolean = false, webkitdirectory: boolean = false, limitSize: number = -1): void {
        FileUtils._callback = callback;
        if (Browser.window.isWXMiMi) {
            //纯微信小程序
            var fileType: any = FileUtils.onHandleType(accept);
            if (fileType) {
                if (fileType == "image" || fileType == "video") {
                    var selectFileCount: number = 1;//最多可以选择的文件个数，基础库2.25.0前，最多可支持9个文件，2.25.0及以后最多可支持20个文件
                    var mediaType: number = fileType;//文件类型 mix 可同时选择图片和视频
                    var sourceType: string = "album"; //camera 使用相机拍摄; album 从相册选择
                    var maxDuration: number = 60;//拍摄视频最长拍摄时间，单位秒。时间范围为 3s 至 60s 之间。不限制相册。
                    var sizeType: any = ['original', 'compressed'];//是否压缩所选文件，基础库2.25.0前仅对 mediaType 为 image 时有效，2.25.0及以后对全量 mediaType 有效
                    var camera: string = "back";//仅在 sourceType 为 camera 时生效，使用前置或后置摄像头  front 使用后置摄像头 ;front 使用前置摄像头
                    Browser.window.wx.chooseMedia({
                        count: selectFileCount,
                        mediaType: mediaType,
                        sourceType: sourceType,
                        maxDuration: maxDuration,
                        success: (res: any) => {
                            var tempFiles: any = res.tempFiles[0];//本地临时文件列表
                            var tempFilePath: string = tempFiles.tempFilePath;//本地临时文件路径 (本地路径)
                            var size: number = tempFiles.size;//本地临时文件大小，单位 B
                            var duration: number = tempFiles.duration;//视频的时间长度
                            var height: number = tempFiles.height;//视频的高度
                            var width: number = tempFiles.width;//视频的宽度
                            var thumbTempFilePath: string = tempFiles.thumbTempFilePath;//视频缩略图临时文件路径
                            var dfileType: string = tempFiles.fileType;//文件类型 image 图片；video 视频
                            var type: string = res.type;//文件类型，有效值有 image 、video、mix

                            var getFileNameHandler = FileUtils.getFileNameHandler;
                            if (limitSize != -1 && size > limitSize) {
                                FileUtils._callback.runWith([null, null, ""]);
                                return;
                            }
                            var file: any = Browser.window.wx.getFileSystemManager();
                            var encode: string = "";
                            if (fileType == "image") encode = "base64";
                            var fileData: any = file.readFileSync(tempFilePath, encode);
                            if (fileType == "image") {
                                var arr: any[] = fileData.split(',');
                                var ab: ArrayBuffer = DBUtils.decodeArrayBuffer(arr[1]);
                                getFileNameHandler && getFileNameHandler.runWith("");
                                getFileNameHandler = null;
                                FileUtils._callback.runWith([ab, fileData, tempFilePath]);
                            } else {
                                Browser.window.videoObj = tempFiles;//用于处理视频规格判断用
                                FileUtils._callback.runWith([fileData, null, tempFilePath]);
                            }
                        },
                        fail: (res: any) => {
                            console.error("1 选择文件失败！ error:" + JSON.stringify(res));
                            FileUtils._callback.runWith([null, null, ""]);
                        }
                    });
                } else {
                    var count: number = 1;//最多可以选择的文件个数，可以 0～100
                    var extension: string = "";//根据文件拓展名过滤，仅 type==file 时有效。每一项都不能是空字符串。默认不过滤。
                    Browser.window.wx.chooseMessageFile({
                        count: count,
                        type: "all",
                        success: (res: any) => {
                            var tempFiles: any = res.tempFiles[0];//本地临时文件列表
                            var tempFilePath: string = tempFiles.path;//本地临时文件路径 (本地路径)
                            var size: number = tempFiles.size;//本地临时文件大小，单位 B
                            var name: number = tempFiles.name;//选择的文件名称
                            var type: string = res.type;//选择的文件类型，有效值有 image 、video、file(选择了除图片和视频的文件)

                            if (limitSize != -1 && size > limitSize) {
                                FileUtils._callback.runWith([null, null, ""]);
                                return;
                            }
                            var file: any = Browser.window.wx.getFileSystemManager();
                            var encode: string = "";
                            var fileData: any = file.readFileSync(tempFilePath, encode);
                            FileUtils._callback.runWith([fileData, null, tempFilePath]);
                        },
                        fail: (res: any) => {
                            console.error("2 选择文件失败！ error:" + JSON.stringify(res));
                            FileUtils._callback.runWith([null, null, ""]);
                        }
                    });
                }
            }
        } else if (Browser.onMiniGame) {
            //微信小游戏

        } else {
            FileUtils._file = Browser.document.getElementsByName('uploadfile')[0];
            if (!FileUtils._file) {
                FileUtils._file = Browser.document.createElement('input');
                FileUtils._file.name = 'uploadfile';
                FileUtils._file.type = 'file';
                FileUtils._file.style.display='none';
                Browser.document.body.append(FileUtils._file)
                FileUtils._file.addEventListener("change", FileUtils.fileChange);
                //暂时注释监听焦点事件
                // window.addEventListener('focus', FileUtils.handleFocusCallBack);
            }
            FileUtils._file.accept = accept;
            FileUtils._file.multiple = multiple;
            FileUtils._file.webkitdirectory = webkitdirectory;
            FileUtils._file.limitSize = limitSize;
        }
    }

    /**
     * 
     * @param accept 文件上传接收类型
     * @param type 0图片；1 视频
     */
    static onHandleType(accept: string) {
        var temp: any = accept.split(",");
        for (var i: number = 0; i < temp.length; i++) {
            if (temp[i] == ".jpg" || temp[i] == ".png" || temp[i] == ".jpeg") {
                return "image";
            } else if (temp[i] == ".mp4" || temp[i] == ".mov") {
                return "video";
            }
        }
        return null;
    }

    handleFocusCallBack() {
        Laya.timer.loop(500, this, () => {
            let selectedFile = Browser.document.getElementsByName('uploadfile')[0];
            if (selectedFile.files.length > 0) {
                Laya.timer.clear(this, this.handleFocusCallBack)
            } else {
                FileUtils._callback.run();
                Laya.timer.clear(this, this.handleFocusCallBack)
            }
            window.removeEventListener('focus', this.handleFocusCallBack);
        });

    }

    static alertFileDialog(): void {
        FileUtils._file && (FileUtils._file.value = '');
        FileUtils._file && FileUtils._file.click();
    }

    private static async fileChange(e: any) {
        if (FileUtils._callback) {
            if (!FileUtils._file.multiple && !FileUtils._file.webkitdirectory) {
                var file: any = e.target.files[0];
                if (file) {
                    var fileName: string;
                    fileName = file.name;
                    var extension: string;
                    extension = Laya.Utils.getFileExtension(fileName);
                    var getFileNameHandler = FileUtils.getFileNameHandler;
                    let limitSize = FileUtils._file.limitSize;
                    if (limitSize != -1 && file.size > limitSize) {
                        FileUtils._callback.runWith([null, null, fileName]);
                        return;
                    }

                    if (extension == "png" || extension == "jpg" || extension == "jpeg") {
                        SystemDragOverManager.readAsDataURL(file, Handler.create(FileUtils, function (base64: string): void {
                            var arr: any[] = base64.split(',');
                            var ab: ArrayBuffer = DBUtils.decodeArrayBuffer(arr[1]);
                            getFileNameHandler && getFileNameHandler.runWith(fileName);
                            getFileNameHandler = null;
                            FileUtils._callback.runWith([ab, base64, fileName]);
                        }));
                    // } else if (extension == "mp4" || extension == "mov") {
                    //     let videoInfo = await FileUtils.checkVideoSize(file)
                    //     if (videoInfo.videoScale == '16:9') {
                    //         SystemDragOverManager.readAsArrayBuffer(file, FileUtils._callback, fileName);
                    //         getFileNameHandler && getFileNameHandler.runWith(fileName);
                    //         getFileNameHandler = null;
                    //     } else {
                    //         console.log("该文件比例不是16:9,可能导致画面变形");
                    //         FileUtils._callback.runWith([null, null, fileName]);
                    //         return;
                    //     }
                    } else {
                        SystemDragOverManager.readAsArrayBuffer(file, FileUtils._callback, fileName);
                        getFileNameHandler && getFileNameHandler.runWith(fileName);
                        getFileNameHandler = null;
                    }
                }
            }
        }
    }
    static async checkVideoSize(file:any) {
        const checktimevideo = document.getElementById('checktimevideo')
        if (checktimevideo) {
            document.body.removeChild(checktimevideo)
        }
        let doms = document.createElement('video')
        const url = URL.createObjectURL(file)
        console.log(url)
        doms.src = url
        doms.id = 'checktimevideo'
        doms.style.display = 'none'
        document.body.appendChild(doms)
        let videoInfo = await FileUtils.getVideoInfo(doms);
        return videoInfo;
    }

    static async getVideoInfo(doms:any): Promise<{
        videoWidth: any;
        videoHeight: any;
        duration: any;
        videoScale: string;
    }> {
        return new Promise(resolve => {
            doms.addEventListener('loadedmetadata', (e:any) => {
                const gcd = this.getGcd(e.target.videoWidth, e.target.videoHeight);
                console.log(gcd)
                let obj = {
                    videoWidth: doms.videoWidth, // 尺寸宽 --- 分辨率
                    videoHeight: doms.videoHeight, // 尺寸高
                    duration: e.target.duration, // 视频时长 1表示一秒
                    videoScale: `${e.target.videoWidth / gcd}:${e.target.videoHeight / gcd}`
                }
                resolve(obj)
            })
        })
    }
    /**
     * 获取最大公约数
     * @param a 
     * @param b 
     * @returns 
     */
    static getGcd(a: number, b: number):number {
        let n1: number, n2: number;
        if (a > b) {
            n1 = a;
            n2 = b;
        } else {
            n1 = b;
            n2 = a;
        }
        let remainder = n1 % n2;
        if (remainder === 0) {
            return n2;
        } else {
            return this.getGcd(n2, remainder)
        }
    }


    static saveToLcal(arr: ArrayBuffer | string, filename: string): void {
        var Blob = window.Blob;
        var binFileAsBlob = new Blob([arr], { type: 'application/octet-stream' });
        var downloadLink = Browser.document.createElement("a");
        downloadLink.download = filename;
        downloadLink.href = window.URL.createObjectURL(binFileAsBlob);
        downloadLink.click();
    }

    /**
     * 将base64格式字符串保存为本地图片
     * @param base64Info 
     * @param filename 
     */
    static saveToLcal_base64(base64Info: string, filename: string): void {
        var downloadLink = Browser.document.createElement("a");
        downloadLink.download = filename;
        downloadLink.href = base64Info;
        downloadLink.click();
    }
}
