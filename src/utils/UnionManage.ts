/**
* @brief: 登录功能
* @ author: gongganghao
* @ data: 2023-12-04 11:44
*/
import { IUnion } from "./union/IUnion";
import { Union_LayaBox } from "./union/Union_LayaBox";
import { Union_MiniGame } from "./union/Union_MiniGame";
import Event = Laya.Event;
import { ServerManager } from "../server/ServerManager";
import { GlobalData } from "../scene/data/GlobalData";
import { Union_TTGame } from "./union/Union_TTGame";
import { Union_App } from "./union/Union_App";

export class UnionManage {

    private static _instance: UnionManage;
    public static get instance(): UnionManage {
        return this._instance || (this._instance = new UnionManage);
    }

    private _union: IUnion;
    private market: any;
    static inviter: string;
    static motherOpenid: string = "laya_0012";
    static openId: string = "laya_0012";
    static statId: string = "laya0012";
    isShare: number = 0;
    static castTime: number = 2000;
    static isShowStart: boolean;
    static baseToken: string;

    updateBanner: boolean;
    isShowBanner: boolean;
    bannerHeight: number;
    bannerError: boolean;
    private cacheBannerData: any = {};
    //***登录需求数据 */
    private loginData: any;

    static spId: string;
    /**授权按钮信息 */
    btnObj: any = {};
    /**是否已经授权 */
    isAuth: number = -1;
    islogin: boolean;
    deltaTime: number;
    constructor() {
        this.init();
    }



    private init(): void {
        this.market = Laya.Browser.window.LayaBoxMarketH5.getInstance({ openId: UnionManage.openId, timeout: 10 });
        if (Laya.Browser.onMiniGame) {
            this._union = new Union_MiniGame();
        } else if (Laya.Browser.onTTMiniGame) {
            this._union = new Union_TTGame();
        } else if (Laya.Browser.window.wkbridge || this.checkIsConchApp()) {
            this._union = Union_App.I;
        } else {
            this._union = new Union_LayaBox();
        }
    }
    /**登录完成回调 */
    private _callback: Function;

    /**
     * market登录
     * @param callbcak 登录完成回调
     */
    login(callback: Function, isrelogin: boolean = false): void {
        this.islogin = false;
        if (isrelogin) {
            this.isAuth = 0;
        }
        this.market && this.market.loginResult && (this.market.loginResult = null);
        this._callback = callback;

        this._union.login(this.secondTimeLogin.bind(this), this.market);
    }


    req: Laya.HttpRequest;
    url: string;
    /**
     * 调起平台二次登录
     * @param 登录时需要的数据，默认会有
     * @param 登录完成回调
     */
    secondTimeLogin(_param: any = null, cb: Function = null, cbFailed: Function = null): void {
        if (_param)
            this.loginData = _param;

        if (!_param && this.loginData)
            _param = this.loginData;

        if (!_param) {
            _param = {}
            _param.userId = ((<any>this._union))._param.userId;
            _param.mobile = ((<any>this._union))._param.mobile;
            _param.email = ((<any>this._union))._param.mobile;
            _param.username = ((<any>this._union))._param.nickName || "";
            _param.country = "";
            _param.province = "";
            _param.city = "";
            _param.avatar_url = ((<any>this._union))._param.avatarUrl || "https://img.layabox.com/avatar/avatar-mid-img.png";
            _param.gender = ((<any>this._union))._param.gender || "0";
            _param.inviter = "";

            this.loginData = _param;
        }
        var str: string = "";
        if (this.loginData) {
            this.loginData.sp = UnionManage.spId;
            this.loginData.gameid = UnionManage.openId;
            this.loginData.laya_appid = UnionManage.motherOpenid;
            this.loginData.client_type = Laya.Browser.onPC ? 1 : 0;

        }
        this.req = new Laya.HttpRequest();
        this.url = ServerManager.instance.loginPath;

        let params: any = _param.params;

        let o: any = {};
        o.encryptedData = params.encryptedData;
        o.iv = params.iv;
        o.anonymousCode = params.anonymousCode;
        o.code = params.code;
        o.game_id = params.game_id;
        o.sp_id = params.sp_id;
        o.language = "1";
        if (!this.checkIsConchApp()) {
            this.req.on(Laya.Event.COMPLETE, this, this.dengLu, [_param, cb, cbFailed]);
            this.req.on(Laya.Event.ERROR, this, (res: any) => {
                this._callback && this._callback(res);
            });
            this.req.send(this.url, JSON.stringify(o), "post", "text", ["Content-Type", "application/json"]);
        }
        else {
            var $tempThis = this;
            Union_App.I.secondTimeLoginForGameCreator(function (data: any): void {
                if (data.errCode == 0) {
                    if (data.sp_id && data.game_id) {
                        var _p: any = {};
                        _p.params = {
                            game_id: data.game_id,
                            sp_id: data.sp_id,
                            birthday: GlobalData.ageGate
                        }
                        $tempThis.dengLu(_p, cb, cbFailed, data.data);
                    }
                    else {
                        $tempThis.dengLu(_param, cb, cbFailed, data.data);
                    }
                }
                else {
                    cbFailed(data);
                }
            }, GlobalData.ageGate);
        }
    }

    sceneP: any = null;
    _callbackS: any = null;
    // fcm_status:any;//防沉迷状态
    RefreshNum: number = 0;
    cacheParams: any = {};
    dengLu(_param: any = null, cb: Function = null, cbFailed: Function = null, dat2: any): void {
        this.cacheParams = {};
        // ILayaMe.ArtUtils.startCalTime('二次登录完成');
        // var dat2S:any = dat2;
        dat2 = JSON.parse(dat2);

        if (!dat2.ret || dat2.ret == 216) {
            dat2 = dat2.data;
            if (dat2.server_time) {
                this.deltaTime = (dat2.server_time * 1000 - Date.now());
                if ((Math.abs(this.deltaTime) < 10000)) {
                    this.deltaTime = 0;
                }
            }

            GlobalData.userData = dat2;
            console.log("玩家数据为", dat2)


            Laya.LocalStorage.setJSON("artUserData", GlobalData.userData);
            let next = () => {
                this.islogin = true;
                /* ArtEventCenter.instance.event(ArtEventCenter.LOGIN_STATE_CHANGE); */
                cb && cb();
                this._callback && this._callback();
                this._callback = null;
                this.req.offAll();
            }

            let status = Number(GlobalData.userData.update_info_status);
            switch (status) {
                case 0://需要选择性别
                case 3://审核未通过
                    /* MCreateRolePage.instance.open(next); */
                    break;
                case 1://审核中
                // break;
                default://审核通过
                    next()
                    break;

            }

        } else {
            // this.fcm_status = dat2.data.fcm_status;
            if (this.paramData && dat2.data.visitor_time != null) {
                this.paramData.visitor_time = dat2.data.visitor_time;
            }
            console.log(JSON.stringify(dat2));
            if (dat2.ret == 206)//必须被邀请
            {
                // Dialogs.alert_white("", dat2.msg, Laya.Handler.create(null, function (): void { /* ILayaMe.ArtUtils.tryExit(); */ }));
            } else
                if (dat2.ret == 3) {
                    this.req.send(this.url, "today", "post");
                }
                else if (dat2.ret == 328 || dat2.ret == 260 || dat2.ret == 379) {
                    if (!GlobalData.userData) {
                        GlobalData.userData = dat2.data;
                    }
                    this.RefreshNum = 0;
                    Laya.timer.clear(this, this.refreshClick);
                    // this.wallowOpen([0, _param, cb, cbFailed, dat2]);
                    this.cacheParams.param = _param;
                    this.cacheParams.cb = cb;
                    this.cacheParams.cbFailed = cbFailed;
                    /* MVerifiedPage.instance.open(); */
                    return;
                }
                else if (dat2.ret == 375) {
                    console.log("正在身份校验中！");
                    /* ArtUtils.startCalTime('认证中'); */
                    var data: any = [2, _param, cb, cbFailed, dat2];
                    Laya.timer.once(500, this, this.refreshClick, [data]);
                    return;
                }
                else if (dat2.ret == 330) {
                    console.log("22点-次日8点不允许未成年登录！");
                    this.wallowOpen([2], cbFailed);
                    return;
                }

            cbFailed && cbFailed(null, dat2);
        }
    }

    updateUserData() {



    }

    refreshClick(_param: any) {
        if (this.RefreshNum == 20) {
            Laya.timer.clear(this, this.refreshClick);
            this.wallowOpen(_param);
        }
        else {
            var strData: any = JSON.stringify({ params: JSON.stringify(_param[1].params) });
            this.req.send(this.url, strData, "post", "text", ["Content-Type", "application/json"]);
            // this.req.send(this.url,str, "post", "text", ["Content-Type", "application/json"]);
            this.RefreshNum++;
        }
    }
    private paramData: any;
    paramS: any;
    wallowOpen(param: any, cbFailed: Function = null) {
        // MetaX.TipMessage.hideTip();
        if (param[4]) {
            if (!this.paramData) {
                this.paramData = param[4].data;
            }
            param[4].data = this.paramData;
            this.paramS = param;
        }
        /* ArtUtils.checksubByType(ILayaMe.Global.RESLOADED, Laya.Handler.create(this, function (): void {
            Scene.open("scene/my/WallowTestIng.scene", false, param);
            cbFailed && cbFailed();
        })); */
    }

    /**
     * 获取微信的openid
     */
    getOpenid(): any {
        return (this._union).getopenId();
    }


    /**
     *服务器时间 
     * @return 
     * 
     */
    get serverTime(): number {
        var time: number = Laya.Browser.now();
        //@ts-ignore
        return time + Laya.ErrorLog.deltaTime;
    }
    /**
     *相对于0点的时间戳 
     * @return 
     * 
     */
    get dayTime(): number {
        var time: number = this.serverTime;
        time = time % 86400000;
        time = time / 3600000;
        time = (time + UnionManage.timeZone) % 24;
        return time * 3600000;
    }

    static timeZone: number = 8;

    async checkLogin() {
        return new Promise((resolve, reject) => {
            this._union.isLogin((data: any) => {
                resolve(data.isLogin);
            })
        })
    }

    checkLoginCB(callback: Laya.Handler) {
        //return new Promise((resolve, reject) => {
        this._union.isLogin((data: any) => {
            callback.runWith(data.isLogin)
        })
        //})
    }

    checkIsConchApp(): boolean {
        //@ts-ignore
        if (window["isAppTest"])
            return true;
        return Laya.LayaEnv.isConch;
    }



    /**
     * 看视频
     * @param callBack 
     */
    watchVideo(callBack: Laya.Handler, videoId?: string) {
        if (this._union.createVideo) {
            this._union.createVideo(videoId, callBack)
        } else {
            callBack.runWith(true)
        }
    }

    /**
     * 分享游戏
     * @param data 
     * @param callBack 
     */
    share(data:any,callBack:Function = null){
        if (this._union.share) {
            this._union.share(data, callBack)
        } else {
            callBack()
        }
    }


   


}