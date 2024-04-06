import { GlobalData } from "../../scene/data/GlobalData";
import { UnionManage } from "../UnionManage";
import { IUnion } from "./IUnion";


/**
 * 字节(抖音)平台对接类
 */
export class Union_TTGame implements IUnion {
    spid = "696";
    /**游戏圈*/
    gameButton: any;
    private market: any;
    /**渠道标识*/
    private tt: any;
    static isShare: number;
    static castTime: number = 2000;
    /*** 实名认证状态*/
    realNameAuthentication: boolean;
    /**获取用户信息状态*/
    isGetUserInfo: boolean;
    /**微信的按钮 */
    wxBtn: any;
    constructor() {
        this.tt = Laya.Browser.window.tt;
        this.tt.onShow((res) => {
            Laya.stage.event(Laya.Event.RESIZE)
        });
        this.tt.onHide((res) => {
            Laya.stage.event(Laya.Event.RESIZE)
        });
    }
    getUserInfo(callback?: Function): void {
        throw new Error("Method not implemented.");
    }

    createVideo(adUnitId: string, callback?: Laya.Handler): void {
        this.tt.showToast({ title: "广告拉取中", icon: "loading" })
        var video: any = this.tt.createRewardedVideoAd({ adUnitId: adUnitId });
        video.load().then(() => {
            video.show();
        }).catch((err) => { console.log("load error,", err) });
        video.onError(() => {
            try {
                video = null;
            } catch (e) { }
        });
        video.onClose((status: any) => {
            if (status && status.isEnded || status == undefined) {
                callback.runWith(true);
            } else {
                callback.runWith(false);
            }
            video = null;
        });
    }



    /**
     * 充值
     * @param data 
     * @param callback 
     */
    pay(data: any, callback: Laya.Handler) {
        this.tt.requestGamePayment && this.tt.requestGamePayment({
            "mode": "game",//支付的类型，不同的支付类型有各自额外要传的附加参数。game :购买游戏币
            "env": 0, //环境配置
            "currencyType": "CNY",//币种 CNY:人民币
            "platform": "android",//申请接入时的平台，platform 与应用id有关 android
            "buyQuantity": data.buyQuantity,//购买数量。mode=game 时必填。购买数量。详见 buyQuantity 限制说明。
            "zoneId": "1",//分区 ID
            "customId": data.order_id,
            "extraInfo": data.order_id,
            success: (res) => {
                // 支付成功后的回调函数
                console.log("充值成功");
                console.log(JSON.stringify(res));
                callback != null && callback.runWith({ success: true });
            },
            fail: (res) => {
                var msg: string = "";
                switch (res.errCode) {
                    case -1:
                        msg = "支付失败，请稍后重试";
                        break;
                    case -1:
                        msg = "支付取消";
                        break;
                    case -15001:
                        msg = "缺少参数，请联系游戏官方客服.";
                        break;
                    case -15002:
                        msg = "请求参数不合法，请联系游戏官方客服.";
                        break;
                    case -15003:
                        msg = "app 不支持小游戏支付.";
                        break;
                    case -15006:
                        msg = "app 没有支付权限.";
                        break;
                    case -15009:
                        msg = "内部错误，支付失败，请稍后重试.";
                        break;
                    case -15098:
                        msg = "当前用户未通过实名认证，请认证后再充值.";
                        break;
                    case -15099:
                        msg = "当前用户累计支付金额超过限制.";
                        break;
                    case -15101:
                        msg = "customId 为空或者不唯一，请稍后重试.";
                        break;
                    case -16000:
                        msg = "用户未登录，请登录成功后再充值.";
                        break;
                    case 2:
                        msg = "正在支付一起订单时，又发起了一笔支付请求";
                        break;
                    case 3:
                        msg = "调起收银台失败，请稍后重试.";
                        break;
                    case 4:
                        msg = "网络异常，请稍后重试.";
                        break;
                    case 5:
                        msg = "IOS 平台错误，当前平台不支持支付，请更换安卓手机充值";
                        break;
                    case 6:
                        msg = "其他错误，请稍后重试.";
                        break;
                    default:
                        msg = "支付失败，请稍后重试.";
                        break;
                }
                console.log(msg);
                console.log(JSON.stringify(res));
                callback != null && callback.runWith({ success: false });
            }
        });
    }

    /**
     * 客服会话
     * @param data 
     * @param callback 
     */
    openCustomerServiceConversation(data: any, callback: Laya.Handler) {

    }
    _param: any = {};
    login(callback: Function, _market: any = null): void {
        this.market = _market;
        this.marketLogin({ result: 0 }, callback);
    }


    private marketLogin(rs: any, callback?: Function): void {
        if (rs.result != 0) {
            return;
        }
        this.market.login((data: any) => {
            data = JSON.parse(data);

            if (data.result || data.code) {
                console.log("-------------------market登录失败-----------------");
                callback && callback(data);
                return;
            }

            console.log("-------------------market登录成功-----------------");
            //扩展信息
            this.spid = data.spId;
            data.data && (this._param.userId = data.data.userId);

            //实名认证检测处理：官方接口里需要从获取用户信息接口里获取实名认证状态
            this.tt.getUserInfo && this.tt.getUserInfo({
                withCredentials: true,
                withRealNameAuthenticationInfo: true,
                success: (res: any) => {
                    this.isGetUserInfo = true;
                    data.params.encryptedData = res.encryptedData;
                    data.params.iv = res.iv;
                    if (res.withRealNameAuthenticationInfo) {
                        if (res.withRealNameAuthenticationInfo == "uncertified") {
                            //如果未实名
                            this.tt.authenticateRealName && this.tt.authenticateRealName({
                                success: (res2) => {
                                    console.log("用户实名认证成功");
                                    callback != null && callback(data);
                                },
                                fail: (res2) => {
                                    console.log("用户实名认证失败", res2.errMsg);
                                }
                            });
                        } else {
                            //已经实名认证
                            callback != null && callback(data);
                        }
                    } else {
                        //pc开发者工具端
                        callback != null && callback(data);
                    }
                    callback = null;
                },
                fail: (res: any) => {
                    this.isGetUserInfo = true;
                    console.log(`getUserInfo 调用失败`, res.errMsg);
                    callback != null && callback(data);
                    callback = null;
                }
            });
            //实名认证完成回调
            this.tt.onRealNameAuthenticationComplete && this.tt.onRealNameAuthenticationComplete((obj: any) => {
                console.log("实名认证完成回调 ", obj.state);
                this.realNameAuthentication = true;
                // if(this.isGetUserInfo){
                //     callback != null && callback(data);
                // }
            });
        }, rs);
        //右上角转发按钮触发事件监听
        this.onShareAppMessage();
    }
    /**
     * 监听右上角转发按钮事件
     */
    private onShareAppMessage() {
        this.tt.onShareAppMessage && this.tt.onShareAppMessage((res) => {
            //当监听到用户点击了分享或者拍抖音等按钮后，会执行该函数
            return {
                //执行函数后，这里是需要该函数返回的对象
                title: "分享标题",//标题
                imageUrl: "分享图片",//图片地址
                query: "分享参数", //分享进入游戏携带的参数
                success: () => {
                    console.log("分享成功");
                },
                fail: (e) => {
                    console.log("分享失败", e);
                },
            }; //返回的对象会传入tt.shareAppMessage进行最终分享
        });
    }

    private static shareCallBack: Function;
    /**
     * 主动分享调用
     ** @param {JSONString || Object} param 
        "title" : 分享的标题,
        "link" : 分享后点击的页面url,
        "desc" : 分享界面的描述,
        "imgsrc" : 分享内容插图url,
        "imgtitle" : 分享内容插图的标题,
        "ext" : 分享透传参数{
            senceid : "abc",
            senceid2:"bcd",
        }
        "canvas" : 微信可用，  传入canvas图片
    * @param {Function} callback 
    */
    share(data: any = null, callback: Function = null): void {
        this.tt.shareAppMessage && this.tt.shareAppMessage({
            title: data.title,//标题
            imageUrl: data.imgsrc,//图片地址
            desc: data.desc,
            query: "",
            extra: data.ext,
            success: () => {
                console.log("分享成功 share");
                callback != null && callback();
            },
            fail: (e) => {
                console.log("分享失败 share", e);
            }
        });
    }
    /**
     * 微信右上角转发
     * @param data
     */
    initShare(data: any = null, callback: Function = null): void {
        this.market.initShareInfo(data, callback)
        this.tt.showShareMenu && this.tt.showShareMenu({
            success(res) {
                console.log("已成功显示转发按钮");
            },
            fail(err) {
                console.log("showShareMenu 调用失败", err.errMsg);
            },
            complete(res) {
                console.log("showShareMenu 调用完成");
            }
        });
    }
    /**
     * 获取openid
     */
    getopenId(): string {
        return this.market.getUserOpenId();
    }
    /**展示banner */
    showBanner(adUnitId: string = null, style: any = null, callback: Laya.Handler = null, offsetY: number = 0, isTop: boolean = false): void {
    }

    /**隐藏banner */
    hideBanner(): void {
    }

    /**
     * 创建游戏圈子
     * @param style
     * @param openlink 设置后可以跳到对应的活动页面，具体进入mp设置-游戏设置-开始管理-游戏圈管理-由帖子的"游戏内跳转ID"生成（仅微信小游戏用）
     */
    createGameClubButton(style: any, openlink?: string) {
        if (this.gameButton) {
            this.gameButton.show();
            return;
        }
        this.gameButton = this.tt.createContactButton({
            style: {
                left: style.left,
                top: style.top,
                width: style.width,
                height: style.height,
                borderWidth: 0
            },
            type: "image",
            image: "common/img_wx.png",
            success: (res) => {
                console.log("create success", res);
            },
            fail: (res) => {
                console.log("create fail", res);
            },
            complete: (res) => {
                console.log("create complete", res);
            },
        })
        this.gameButton.onTap(this.handleClick.bind(this)); // 监听点击事件
        this.gameButton.onError(this.handleError.bind(this)); // 监听错误
        this.gameButton.show();
    }

    private handleError(res) {
        console.log(res.errMsg);
    }

    private handleClick() {
        console.log("点击客服按钮");
    }

    hideGameClubButton() {
        if (this.gameButton) {
            this.gameButton.offTap(this.handleClick.bind(this)); // 取消监听点击事件
            this.gameButton.offError(this.handleError.bind(this)); //取消监听错误
            this.gameButton.hide();
            this.gameButton.destroy();
            this.gameButton = null;
        }
    }


}

