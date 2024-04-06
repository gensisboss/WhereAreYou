/**
* @brief: 数据通信
* @ author: gongganghao
* @ data: 2023-11-08 18:02
*/

import { PageManager } from "../page/PageManager";
import { GlobalData } from "../scene/data/GlobalData";

enum QueryStatus {
    TaskStatusInit = 0,//任务已完成初始化
    TaskStatusRunning = 1,//任务运行中
    TaskStatusPending = 2,//任务状态待定
    TaskStatusWaiting = 3,//任务在排队中
    TaskStatusCccupied = 4, //任务需要的服务被用户的其他任务占用了，这个任务正在等待占用的任务完成
    TaskStatusDone = 5,//任务完成
    TaskStatusParamError = 6,//参数错误
    TaskStatusIsFull = 7,//个人任务队列已满，不能再提交新任务
    TaskStatusEncodeFail = 8,//任务请求编码失败
    TaskStatusDeliveryFail = 9,//投递任务请求失败
    TaskStatusQueryResultFail = 10,//服务进度查询失败
    TaskStatusUnmarshalFail = 11,//服务回馈解码失败
    TaskStatusTooLong = 12,//任务请求内容过长
}

export class ServerManager {
    private static _instance: ServerManager;
    public static get instance(): ServerManager {
        return this._instance || (this._instance = new ServerManager);
    }

    public rootPath: string = "https://develop-ohayou-maker.layabox.com/";
    // public rootPath: string = "http://10.10.20.22:8098/";
    private url_file: string = "https://oss-layabox1.layabox.com/";

    public AIBaseUrl = "https://layame-temporary-1251285021.cos.ap-shanghai.myqcloud.com/";



    get loginPath() {
        return this.rootPath + "auth/login";
    }

    private _jsVersion: number = 1;



    private isBase64(url: string) {
        if (
            url.indexOf('data:image/png;base64') != -1 ||
            url.indexOf('data:image/jpeg;base64') != -1 ||
            url.indexOf('data:image/jpg;base64') != -1
        )
            return true;
        return false;
    }


    public formatUrl(url: string): string {
        if (!url) return null;
        //if (url.indexOf("wxfile://") != -1)
        if (url.includes('://'))
            return url;//预览图片临时路径,不做任何处理直接返回
        if (!(typeof (url) == 'string')) return null;
        if (url.charAt(0) == '@') {
            return url.substring(1);
        }
        if (this.isBase64(url)
            || url.indexOf('http') == 0
            || url.indexOf(this.url_file) == 0) {
            return url;
        }
        if (url.charAt(0) == '/') {
            url = url.substr(1, url.length);
        }
        //TODO 角色相关资源先放本地
        if (url.indexOf('upload/svn/resource/character/ohayoo_avatar/') == 0 ||
            url.indexOf('upload/svn/resource/character/man/ske/') == 0)
            return url;
        return this.url_file + url;
    }

    /**
     * 检查文本敏感词
     */
    checkSensitiveWord(txt: string, callback?: Laya.Handler): any {
        let obj = {
            keyword: txt
        }
        this.httpSend(this.rootPath + '/platform/check/text', obj, callback, "post");
    }


    private getAIGCRootPath(url: string) {
        return "https://layaproject-1.layabox.com/" + url;
    }


    createAIImageWithText(isFree: boolean, prompt: string, callback: Laya.Handler, errorHandler?: Laya.Handler) {
        const imageData = {
            "token": GlobalData.token,
            "user_id": GlobalData.developer_uid,
            "prompt": prompt,
            "template": 1,
            "trans": true,
            "width": 384,    // 生成的图片宽
            "height": 512,    // 生成的图片高
            "batch_size": 1,    // 要求生成的图片数量
            "mode": 1,
            // 降噪(超清) 高分辨率修复
            "enable_hr": true,  // 是否开启高清修复
            "Denoising_strength": 0.7,  // 去噪强度 要求enable_hr = True
            // // firstphase_width 和firstphase_height 定义了图像的初始分辨率。在图像生成的第一阶段，这些值决定了图像的大小。
            // //如果这些值设置为0，系统可能会使用默认或预设的分辨率。
            "firstphase_width": 0,
            "firstphase_height": 0,
            "hr_scale": 2,  // 放大倍数 对应webui Upscale by
            "hr_upscaler": "SwinIR_4x",  // 对应webui 的 Upscaler
            "hr_second_pass_steps": 20,  // 迭代步数 对应webui 的 Hires steps。
        }
        const data = {
            "spend": 1,
            "ad": isFree ? 1 : 0,
            "action": "game_txt2img",
            "data": JSON.stringify(imageData)
        }
        this.httpSendPost('vincent/game/picCount', data, callback, errorHandler)
    }

    replaceSpecial(str: string) {
        return str.replace(/[+=/]/g, (match) => {
            switch (match) {
                case '+': return '.';
                case '=': return '-';
                case '/': return '_';
                default: return match;
            }
        });
    }

    interpretDesc(desc: string,callback:Laya.Handler) {
        let data = {
            "action": "translation",
            "data": {
                "token": GlobalData.token,
                "user_id": GlobalData.developer_uid,
                "prompt": desc
            }
        }
        this.httpSend(this.getAIGCRootPath("layame/aigc/request_sync"), data, callback, "post", null, true, 'text', ["Content-Type", "application/json"]);
    }


    createAIImageWithImage(isFree: boolean, imageData: { url: string, cfg: number, repiant: number, prompt: string }, callback: Laya.Handler, errorHandler?: Laya.Handler) {
        const imageDatas = {
            "token": GlobalData.token,
            "user_id": GlobalData.developer_uid,
            "template": 1,
            "trans": true,
            "width": 384,    // 生成的图片宽
            "height": 512,    // 生成的图片高
            "batch_size": 1,    // 要求生成的图片数量
            "mode": 1,
            "prompt": imageData.prompt,
            "cfg_scale": imageData.cfg,
            "init_images": [this.replaceSpecial(imageData.url)],
            "denoising_strength": imageData.repiant,
            // 降噪(超清) 高分辨率修复
            "enable_hr": true,  // 是否开启高清修复
            // // firstphase_width 和firstphase_height 定义了图像的初始分辨率。在图像生成的第一阶段，这些值决定了图像的大小。
            // //如果这些值设置为0，系统可能会使用默认或预设的分辨率。
            "firstphase_width": 0,
            "firstphase_height": 0,
            "hr_scale": 2,  // 放大倍数 对应webui Upscale by
            "hr_upscaler": "SwinIR_4x",  // 对应webui 的 Upscaler
            "hr_second_pass_steps": 20,  // 迭代步数 对应webui 的 Hires steps。
        }
        const data = {
            "spend": 1,
            "ad": isFree ? 1 : 0,
            "action": "game_img2img",
            "data": JSON.stringify(imageDatas)
        }
        this.httpSendPost('vincent/game/picCount', data, callback, errorHandler)
        // this.httpAISend(this.getAIGCRootPath('layame/aigc/request'), data, Laya.Handler.create(this, this.nextServerRequest, [callback]), "post", errorHandler, "json", ["Content-Type", "application/json"]);
    }

    createAIMusic(prompt: string, callback: Laya.Handler, errorHandler?: Laya.Handler) {
        const musicDatas = {
            "token": GlobalData.token,
            "user_id": GlobalData.developer_uid,
            "prompt": prompt,
            "template": 1,
            "trans": true,
            "mode": 1,
        }
        const data = {
            "action": "game_music",
            "data": JSON.stringify(musicDatas)
        }
        this.httpSendPost('/vincent/game/generateAudio', data, callback, errorHandler)
    }


    httpSendDirectPost(url: string = null, data: any = null, callback: Laya.Handler = null, errHandler: Laya.Handler = null): void {
        if (!data) data = {};
        this.httpSend(url, data, callback, "post", errHandler, 0, 'text', ["Content-Type", "application/x-www-form-urlencoded; charset=UTF-8"]);
    }


    httpSendPost(url: string = null, data: any = null, callback: Laya.Handler = null, errHandler: Laya.Handler = null): void {
        if (!data) data = {};
        url = this.rootPath + url;
        this.httpSend(url, data, callback, "post", errHandler, 0, 'text', ["Content-Type", "application/x-www-form-urlencoded; charset=UTF-8"]);
    }

    httpPostJsonSend(path: string, data: any, c?: Laya.Handler, e?: Laya.Handler) {
        if (!data) data = {};
        path = this.rootPath + path;
        this.httpSend(path, data, c, "post", e, true, 'text', ["Content-Type", "application/json"]);
    }

    private httpSend(url: string = null, data: any = null, callback: Laya.Handler = null, method: "get" | "post" | "head" = "post", errHandler: Laya.Handler = null, addToken: boolean | number = true, responseType: "text" | "json" | "xml" | "arraybuffer" = "text", header: any[] = []): void {
        if (!url) return;
        //let begintime=Date.now();
        if (url.indexOf("?") != -1) {
            if (url.lastIndexOf("&") == url.length - 1) {
                url += "client=" + this._jsVersion;
            }
            else {
                url += "&client=" + this._jsVersion;
            }
        } else {
            url += "?&client=" + this._jsVersion;
        }
        //Global.logToServer(url);
        var _http: Laya.HttpRequest = new Laya.HttpRequest();
        let that = this;
        _http.on('complete', that, (t: any) => {
            var obj: any;
            // console.log(">>> url:"+_http.url);
            // console.log(">>> data:"+t);
            //let ti=Date.now()-begintime;
            //if(ti>100)
            // {
            //     console.log(">>>>>>>>>>>>httpsend: timer:"+ti+", url:"+_http.url);
            // }
            try {
                obj = JSON.parse(t);
            }
            catch (e) {
                var rs: any = {};
                rs.errorSrc = _http.url;
                rs.msg = t;
                // StatManager.INSTANCE.send(rs, "serverError");
                obj = { ret: -100 };
            }

            let ret = obj.ret;
            if (ret == 3) {
                console.log("--------------$$need login$$-----------------");
                // if (Server.instance.waitingMsgs.length == 0) {
                //     if (obj.data === "0") {
                //         //在其他位置登录
                //         // StatManager.INSTANCE.send({}, "loginAgain");
                //         MetaX.Dialogs.confirm("", "你的账号已经在其他设备登录", function (sure): void {
                //             if (sure) {
                //                 Global.tryLogin();
                //             } else {
                //                 Global.tryExit();
                //             }
                //         }, null, "重新登录", "退出");
                //     } else {
                //         Global.tryLogin();
                //     }
                // }
                // Server.instance.waitingMsgs.push(sendMsg);
                return;
            }

            obj.success = !ret;
            if (obj.success) {
                //console.log("消息返回：",obj.data);
                //console.log("消息返回：",obj);
            } else {
                if (Laya.Browser.onMiniGame)
                    console.log("通讯错误：" + JSON.stringify(obj));
                else
                    console.log("通讯错误：", obj);
            }
            if (callback) {
                var caller: any = callback.caller;
                if ((caller instanceof Laya.Sprite)) {
                    if (caller.destroyed)
                        return

                }
                callback.runWith(obj);
            }
        });

        _http.on(Laya.Event.ERROR, that, function (msg: string): void {
            if (!errHandler) {
                console.log("server send fail url:" + url);
                // MetaX.Dialogs.alert_white("", "网络异常,请检查网络设置或稍后再试！", Laya.Handler.create(this, () => {
                //     Global.tryExit();
                // }), null, null, false);
            } else {
                errHandler.runWith(sendMsg);
            }
        });
        function sendMsg(): void {
            var fullUrl: string = url;
            let sData = data;
            if (addToken)
                fullUrl += "&access_token=" + GlobalData.token;
            else if (addToken === 0) {
                data.access_token = GlobalData.token;
                data.client = that._jsVersion;
                sData = that.getPostData(data);
            }

            _http.send(fullUrl, sData, method, responseType, header);
        }
        if (errHandler && !((errHandler instanceof Laya.Handler))) {
            errHandler = null;
        }

        sendMsg();
    }

    private getPostData(data: any): string {
        var str: string = "";
        if (data) {
            let i = 0;
            for (var name in data) {
                if (i > 0) {
                    str += "&";
                }
                str += name + "=" + data[name];
                i++;
            }
        }
        return str;
    }

    getData(data: any): string {
        var str: string = "?";
        if (data) {
            for (var name in data) {
                str += name + "=" + data[name] + "&";
            }
        }
        return str;
    }

    getDataWithFliter(data: any, filter?: string[]): string {
        let str: string = "?";
        for (let name in data) {
            if (filter && filter.length) {
                let index = filter.indexOf(name);
                if (index >= 0)
                    str += name + "=" + data[name] + "&";
            }
            else
                str += name + "=" + data[name] + "&";
        }
        return str;
    }

    async uploadPictureToServer(data: ArrayBuffer, extension: string, c?: Laya.Handler, e?: Laya.Handler, file_path?: string) {
        // var MaxUploadLimitDic: any = { "jpg": 4, "png": 4 };
        // if (MaxUploadLimitDic[extension]) {
        //     var limit: number = MaxUploadLimitDic[extension];
        //     if ((data.byteLength > limit * 2048 * 2048)) {
        //         PageManager.instance.showTip("文件超过大小限制，上传失败！");
        //         if (e) {
        //             e.run();
        //         }
        //         return;
        //     }
        // }
        // let b = await this.checkSizeByAB(data);
        // if (b) {
        //     if (e) {
        //         e.run();
        //     }
        //     return;
        // }

        //https://develop-ohayou-maker.layabox.com/developer/personFile?access_token=11995e05dcd55dbce1187ac1074eab9e808cd732&file_prefix=png&file_path=img
        var obj: any = {
            file_prefix: extension
        };
        if (file_path)
            obj.file_path = file_path;
        var url: string = this.getData(obj);
        this.httpSend(this.rootPath + "developer/personFile" + url, data, c, "post", e);
    }



    async checkSizeByAB(data: any) {
        let load: Laya.Loader = new Laya.Loader();
        let img = await load.fetch("tempurl", "image", null, { blob: data })
        if (img.width > 2048) {
            PageManager.instance.showTip('图片宽度超过2048！');
            return true;
        } else if (img.height > 2048) {
            PageManager.instance.showTip('图片高度超过2048！');
            return true;
        } else {
            return false;
        }
    }







}