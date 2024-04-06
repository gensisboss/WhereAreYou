import { UnionManage } from "../UnionManage";
import { IUnion } from "./IUnion";


export class Union_MiniGame implements IUnion {
    // private static var instance:union_MiniGame;
    spid = "514";
    private market: any;
    private wx: any;
    /**微信的按钮 */
    wxBtn: any;
    constructor() {
        this.wx = Laya.Browser.window.wx;
    }

    // public static function get I():union_MiniGame{
    //     return instance||= new union_MiniGame();
    // }
    /**
     * userId:layauid（必填）
        username:用户名（必填）
        mobile:手机号
        email:邮箱
        avatar_url：头像地址
        gender：性别
        birthday:生日
        slogan：个性签名
     */
    _param: any = {};
    login(data: any = null, _market: any = null): void {
        this.market = _market;
        if (data.data) {
            this._param.userId = data.data.userId;
            this._param.mobile = data.data.mobile ? data.data.mobile : "";
            this._param.email = data.data.email ? data.data.email : "";
        }

        //    getUserInfo();
    }
    private static shareCallBack: Function;
    /**
     ** @param {JSONString || Object} param 
    *      "title" : 分享的标题,
            "link" : 分享后点击的页面url,
            // "icon" : 分享的icon 的url,
            "desc" : 分享界面的描述,
            "imgsrc" : 分享内容插图url,
            // "imgtitle" : 分享内容插图的标题,
            "ext" : 分享透传参数
            {
                senceid : "abc",
                senceid2:"bcd",
            }
            "canvas" : 微信可用，  传入canvas图片
     * @param {Function} callback 
     */
    share(param: any = null, callback: Function = null): void {
        Union_MiniGame.shareCallBack = callback;
        if (!param) {
            param = {};
            param.title = "test2";
            param.imgsrc = "my/bg.png";
            param.desc = "test2";
        }
        if (param.ext && param.ext.source) {
            param['ald_desc'] = param.ext.source;
        } else {
            param['ald_desc'] = 'none';
        }
        if (!Laya.Browser.onBLMiniGame) {
            this.wx.onHide(Union_MiniGame.wxOnHide);
            this.wx.onShow(Union_MiniGame.wxOnShow);
        }
        this.market.share(param, callback);
    }
    /**
     * 微信onshow
     */
    private static wxOnShow(data: any): void {
        // trace("另一个onshow逻辑");
        if (!UnionManage.instance.isShare) {
            // trace("已经回调过了  移除onshow onhide事件");
            this.wx.offShow(Union_MiniGame.wxOnShow);
            this.wx.offHide(Union_MiniGame.wxOnHide);
            Union_MiniGame.shareCallBack = null;
        } else {
            // trace("--------没有回调  延迟开始------------");
            Laya.timer.once(500, null, Union_MiniGame.delayCheckShare);
        }
    }

    private static delayCheckShare(): void {
        if (!UnionManage.instance.isShare) {
            console.log("已经回调过了  移除onshow onhide事件");
        } else {
            console.log("-----------自己回调----------------");
            var res: any = {};
            var spTime: number = Laya.Browser.now() - UnionManage.instance.isShare - 500;
            if (UnionManage.castTime && (spTime >= UnionManage.castTime)) {//分享成功
                res.result = 0;
            } else {
                res.result = -2;
            }
            UnionManage.instance.isShare = 0;
            res.isFake = 1;
            res.data = {};
            res.data.shareTickets = "我自己回调的";
            Union_MiniGame.shareCallBack && Union_MiniGame.shareCallBack(JSON.stringify(res));
        }
        Union_MiniGame.shareCallBack = null;
        this.wx.offShow(Union_MiniGame.wxOnShow);
        this.wx.offHide(Union_MiniGame.wxOnHide);
    }
    /**
     * 微信onHide
     */
    private static wxOnHide(): void {
        UnionManage.instance.isShare = Laya.Browser.now();
    }
    /**
     * 微信右上角转发
     */
    initShare(param: any = null, callback: Function = null): void {
        //if (!param){
        //param = {};
        //param.title = "share";//标题
        //param.imgsrc = "http://pubrescloud-1251285021.file.myqcloud.com/scenes/share/share1.jpg";//图片地址
        //}
        this.market.initShareInfo(param, callback)
        //			wx.onShareAppMessage(function (){
        //				return {
        //					imageUrlId: "KLqBS7uDTey64Q9Fsvf+VA==",
        //					imageUrl: "https://mmocgame.qpic.cn/wechatgame/icxj2ybpev0mHxVoXsRkJlTPme7WUdliaN7s6QhUADb3OFgKzEImDrz5tc4tbVDy0s/0"
        //				}
        //			})
    }
    private _callback: Function;




    wxLogin(callback: Function): void {
        var $tempThis = this;
        this._callback = callback;
        this.wx.getSetting({
            success: function (dta: any): void {
                $tempThis.wx.getUserInfo({
                    lang: "zh_CN",
                    withCredentials: false,
                    success: function (res: any): void {
                        //Global.authorize = true;
                        $tempThis.dealWithMsg(res);
                    },
                    fail: function (): void {
                        if (!UnionManage.instance.isAuth) {
                            $tempThis.dealWithMsg({ userInfo: {} });
                        }
                        else {
                            UnionManage.instance.isAuth = 0;
                            $tempThis._callback && $tempThis._callback(1);
                            $tempThis._callback = null;
                        }
                    }
                });
            },
            fail: function (): void {
                if (!UnionManage.instance.isAuth) {
                    $tempThis.dealWithMsg({ userInfo: {} });
                }
                else {
                    UnionManage.instance.isAuth = 0;
                    $tempThis._callback && $tempThis._callback(1);
                    $tempThis._callback = null;
                }
            }
        });
    }

    getUserInfo(callback: Function = null): void {
        var $tempThis = this;
        this._callback = callback;
        this.wx.getSetting({
            success: function (dta: any): void {
                //xiaosong edit
                if ((!Laya.Browser.onTTMiniGame && dta.authSetting["scope.userInfo"]) || (Laya.Browser.onTTMiniGame && dta.errMsg == "getSetting:ok")) {
                    console.log("---------------已经获取授权-------------");
                    $tempThis.wx.getUserInfo({
                        lang: "zh_CN",
                        success: function (res: any): void {
                            //Global.authorize = true;
                            $tempThis.dealWithMsg(res);
                        },
                        fail: function (): void {
                            if (!UnionManage.instance.isAuth)
                                //xiaosong edit
                                if (Laya.Browser.onBLMiniGame || Laya.Browser.onTTMiniGame) {
                                    $tempThis.wx.login({
                                        success: function (data1:any): void {
                                            console.log("=====bl or tt login success====");
                                            console.log(data1);
                                            $tempThis.createWXbtn();
                                        }.bind($tempThis),
                                        fail: function (data1:any): void {
                                            console.log("=====bl or tt login fail====");
                                            console.log(data1);
                                            UnionManage.instance.isAuth = 0;
                                            $tempThis._callback && $tempThis._callback(1);
                                            $tempThis._callback = null;
                                        }.bind($tempThis)
                                    });
                                } else {
                                    $tempThis.createWXbtn();
                                }
                            else {
                                UnionManage.instance.isAuth = 0;
                                $tempThis._callback && $tempThis._callback(1);
                                $tempThis._callback = null;
                            }
                        }
                    });
                } else {
                    console.log("----------------没有授权-------------");
                    if (!UnionManage.instance.isAuth)
                        //xiaosong edit
                        if (Laya.Browser.onBLMiniGame || Laya.Browser.onTTMiniGame) {
                            $tempThis.wx.login({
                                success: function (data1:any): void {
                                    console.log("=====bl or tt login success====");
                                    console.log(data1);
                                    $tempThis.createWXbtn();
                                }.bind($tempThis),
                                fail: function (data1:any): void {
                                    console.log("=====bl or tt login fail====");
                                    console.log(data1);
                                    UnionManage.instance.isAuth = 0;
                                    $tempThis._callback && $tempThis._callback(1);
                                    $tempThis._callback = null;
                                }.bind($tempThis)
                            });
                        } else {
                            $tempThis.createWXbtn();
                        }
                    else {
                        UnionManage.instance.isAuth = 0;
                        $tempThis._callback && $tempThis._callback(1);
                        $tempThis._callback = null;
                    }
                }
            },
            fail: function (): void {
                console.log("---------------获取授权状态失败-------------");
                if (!UnionManage.instance.isAuth)
                    $tempThis.createWXbtn();
                else {
                    UnionManage.instance.isAuth = 0;
                    $tempThis._callback && $tempThis._callback(1);
                    $tempThis._callback = null;
                }
            }
        });
    }

    private createWXbtn(): void {
        var $tempThis = this;
        this._callback && this._callback(-88);
        if (this.wx.createUserInfoButton) {
            UnionManage.isShowStart = true;
            //创建微信授权按钮
            if (this.wxBtn) {
                this.wxBtn.hide();
                this.wxBtn.offTap();
                this.wxBtn.destroy();
            }
            if (Laya.Browser.onBLMiniGame) {
                this.wxBtn = this.wx.createUserInfoButton({
                    type: 'text',
                    text: "登录",
                    image: UnionManage.instance.btnObj.skin,
                    style: {
                        left: UnionManage.instance.btnObj.left,
                        top: UnionManage.instance.btnObj.top,
                        width: UnionManage.instance.btnObj.width,
                        height: UnionManage.instance.btnObj.height,
                        color: '#0000ff',
                        borderWidth: 1,
                        borderRadius: 4,
                        textAlign: 'center',
                        fontSize: 16,
                        lineHeight: 40
                    },
                    withCredentials: true,
                    lang: "zh_CN"
                });
            } else {
                this.wxBtn = this.wx.createUserInfoButton({
                    type: 'image',
                    image: UnionManage.instance.btnObj.skin,
                    style: {
                        left: UnionManage.instance.btnObj.left,
                        top: UnionManage.instance.btnObj.top,
                        width: UnionManage.instance.btnObj.width,
                        height: UnionManage.instance.btnObj.height
                    },
                    lang: "zh_CN"
                });
            }

            // debugger
            this.wxBtn.onTap(function (data: any): void {
                if (!data.userInfo) {
                    // _callback&&_callback(0);
                    // _callback = null;
                    //没有授权，或者授权失败
                    // wxBtn.hide();
                    // wxBtn.offTap();
                    // wxBtn.destroy();
                    // MonkeyStat.INSTANCE.send(MonkeyStat.CLICKWXBTNFILE);
                    return
                }
                // MonkeyStat.INSTANCE.send(MonkeyStat.CLICKWXBTN);
                //Global.authorize = true;
                $tempThis.dealWithMsg(data);
            });
        } else {
            this.wx.getUserInfo({
                lang: "zh_CN",
                success: function (res: any): void {
                    //Global.authorize = true;
                    $tempThis.dealWithMsg(res);
                },
                fail: function (): void {
                    // createWXbtn();
                    console.log("获取用户信息出错!");
                }
            });
        }
    }
    /**
     * 处理从微信获取到的数据
     * @param data 从微信获取的用户数据
     */
    private dealWithMsg(data: any): void {
        this._param.username = data.userInfo.nickName ? data.userInfo.nickName : "";
        this._param.country = data.userInfo.country ? data.userInfo.country : "";
        this._param.province = data.userInfo.province ? data.userInfo.province : "";
        this._param.city = data.userInfo.city ? data.userInfo.city : "";
        this._param.avatar_url = data.userInfo.avatarUrl ? data.userInfo.avatarUrl : "";
        this._param.gender = data.userInfo.gender ? data.userInfo.gender : "";
        this._param.inviter = UnionManage.inviter ? UnionManage.inviter : "";
        this._param.data = data;
        UnionManage.instance.isAuth = 1;
        this._callback && this._callback(this._param);
        this._callback = null;
        if (!this.wxBtn)
            return
        this.wxBtn.hide();
        this.wxBtn.offTap();
        this.wxBtn.destroy();
    }
    /*
    *销毁获取授权按钮
    */
    destroyWxBtn(): void {
        if (this.wxBtn/*&&UnionManage.instance.isAuth!=1*/) {
            //没有授权，或者授权失败
            try {
                this.wxBtn.hide();
                this.wxBtn.offTap();
                this.wxBtn.destroy();
            }
            catch (e) {
                console.log("destroyWxBtn error");
            }

            this._callback = null;
        }
    }
    /**
     * 获取openid
     */
    getopenId(): string {
        return this.market.getUserOpenId();
    }
    /**banner */
    private bannerAdvs: any;
    /**默认 style */
    private bannerStyle: any = {
        left: 0,
        top: 0,
        width: 9999
    }

    private isHideBanner: boolean = true;
    /**展示banner */
    showBanner(adUnitId: string = null, style: any = null, callback: Laya.Handler = null, offsetY: number = 0, isTop: boolean = false): void {
        var $tempThis = this;
        //if (UnionManage.instance.isShowBanner){
        //isHideBanner = false;
        //showAD();
        //return
        //}
        if (!style)
            style = this.bannerStyle;
        else
            this.bannerStyle = style;

        if (!this.wx || !this.wx.createBannerAd) {
            if (callback)
                callback.runWith(0);
            else
                // ArtEventCenter.instance.event('changePanel', [0]);
            return;
        }

        UnionManage.instance.isShowBanner = true;

      
        if (!this.bannerAdvs || UnionManage.instance.updateBanner) {
            this.bannerAdvs && this.bannerAdvs.destroy();
            this.bannerAdvs = this.wx.createBannerAd({ "adUnitId": adUnitId, "style": style });
            //}else{
            //if(UnionManage.instance.updateBanner)
            //{
            //bannerAdvs.destroy();
            //bannerAdvs = swan.createBannerAd({"adUnitId":adUnitId,"style":style});
            //UnionManage.instance.updateBanner = false;
            //}else{
            //showAD();
            //}
            this.bannerAdvs.onError(function (err: any): void {
                console.log(err);
                UnionManage.instance.bannerError = true;
                if (callback)
                    callback.runWith(0);
                else
                    // ArtEventCenter.instance.event('changePanel', [0]);
                $tempThis.hideBanner();
            });
            this.bannerAdvs.onResize(function (chgdata): void {
                var height: number = chgdata.height * Laya.stage.clientScaleY;
                // ArtEventCenter.instance.event(ArtEventCenter.BANNERHEIGHTCHANGE, height);
            });
            this.bannerAdvs.onLoad(showAD);
        } else {
            showAD();
        }


        function showAD(): void {
            //加载完成后可以根据需求再调整大小与位置
            // if(bannerAdvs.style.realHeight >90)
            // 	bannerAdvs.style.top = Laya.Browser.clientHeight - bannerAdvs.style.realHeight +20;
            // else	
            // 	bannerAdvs.style.top = Laya.Browser.clientWidth - bannerAdvs.style.realHeight;

            console.log('banner 广告加载成功');
            var d: Laya.Point = new Laya.Point();
            //var h:Number = 110;
            var h: number;
            if (!$tempThis.bannerAdvs.style)
                h = 0;
            h = $tempThis.bannerAdvs.style.realHeight || 0;
            d.y = h;
            var p:  Laya.Point = Laya.stage._canvasTransform.invertTransformPoint(d);
            if (callback)
                callback.runWith(p.y);
            else
                // ArtEventCenter.instance.event('changePanel', [p.y]);

            UnionManage.instance.bannerHeight = p.y;

            d.y = Laya.stage.height - offsetY;
            p = Laya.stage._canvasTransform.transformPoint(d);
            if (Config.useRetinalCanvas)
                p = Laya.stage.transform.transformPoint(d);
            //if (isHideBanner){
            if (isTop)
                $tempThis.bannerAdvs.style.top = p.y;
            else
                $tempThis.bannerAdvs.style.top = p.y - h;
            //}

            //手动计算居中
            //bannerAdvs.style.left = (Laya.Browser.clientWidth - bannerAdvs.style.realWidth) / 2;
            //if(UnionManage.instance.isShowBanner && isHideBanner)
            $tempThis.bannerAdvs.show();
        }

        //bannerAdvs.onLoad(showAD);
    }

    /**隐藏banner */
    hideBanner(): void {
        /*if (!isHideBanner)
        {
            isHideBanner = true;
            return
        }*/
        UnionManage.instance.isShowBanner = false;
        if (this.bannerAdvs) {
            //xiaosong edit
            if (Laya.Browser.onTTMiniGame) {
                this.bannerAdvs.destroy();
                this.bannerAdvs = null;
            } else {
                this.bannerAdvs.offError();
                this.bannerAdvs.offLoad();
                this.bannerAdvs.hide();
            }
        }
    }
    /**视频广告 */
    private videoADVS: any;
    /**视频默认的adunitid */
    private videoAdUnitID: string;
    /**激励式广告 */
    createVideo(adUnitId: string, callBack: Laya.Handler = null): void {
        var $tempThis = this;
        Laya.Scene.showLoadingPage(null, 0);
        var _callback: Laya.Handler = callBack;
        if (adUnitId)
            this.videoAdUnitID = adUnitId;
        else
            adUnitId = this.videoAdUnitID;

        if (!this.videoADVS) {
            try {
                //创建一个
                this.videoADVS = this.wx.createRewardedVideoAd({ "adUnitId": adUnitId });
            } catch (e) {
                Laya.Scene.hideLoadingPage(0);
                _callback && _callback.runWith({ result: -1 });
                return
            }
        }
        //加载广告
        this.videoADVS.load().then(function (): void {
            //广告加载成功显示广告
            $tempThis.videoADVS.show();
            Laya.Scene.hideLoadingPage(5000);
        });

        this.videoADVS.onError(function (err: any): void {
            console.log(err);
            _callback && _callback.runWith({ result: -1, errMsg: err, errorcode: err.errCode });
            $tempThis.videoADVS.offClose();
            $tempThis.videoADVS.offError(null);//xiaosong edit 兼容字节抖音
            $tempThis.videoADVS.offLoad();
            // videoADVS.destroy && videoADVS.destroy();
            Laya.Scene.hideLoadingPage(0);
        });

        //监听广告关闭
        this.videoADVS.onClose(function (status: any): void {
            if (status && status.isEnded || status == undefined) {
                console.log('观看完成发送奖励')
                _callback && _callback.runWith({ result: 0 });
            } else {
                console.log('取消')
                _callback && _callback.runWith({ result: 1 });
                Laya.Scene.hideLoadingPage(0);
            }

            $tempThis.videoADVS.offClose();
            $tempThis.videoADVS.offError(null);//xiaosong edit 兼容字节抖音
            $tempThis.videoADVS.offLoad();
            // videoADVS.destroy && videoADVS.destroy();
        });
    }
    recorderStart(callback: Laya.Handler = null): void {
        // TODO Auto Generated method stub

    }

    recorderStop(): void {
        // TODO Auto Generated method stub

    }

    shareVideo(videoPath: string, callback: Laya.Handler = null): void {
        // TODO Auto Generated method stub

    }


    checkUnion(str:string){
        return str == 'wx';
    }

}

