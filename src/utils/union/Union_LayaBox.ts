import { IUnion } from "./IUnion";
import { UnionManage } from "../UnionManage";


export class Union_LayaBox implements IUnion {
    spid = "432"

    private market: any;
    private _param: any = {};
    /**记录登录渠道*/
    private static _channel: string;
    constructor() {

    }

    /**登录方法 */
    login(callback?: Function, _market?: any): void {
        _market && (this.market = _market);
        this.marketLogin({ result: 0 }, callback);
    }
    /**初始化分享 */
    initShare(param: any = null, callback: Function = null): void {

    }
    /**分享方法 */
    share(param: any = null, callback: Function = null): void {
        if (!param) {
            param = {};
            param.title = "test2";
            param.imgsrc = "my/bg.png";
            param.desc = "test2";
        }
        this.market.share(param, callback);
    }
    /**获取用户授权方法 */
    getUserInfo(callback: Function = null): void {
        var $tempThis = this;
        this.market.getUserInfo(function (data: any): void {
            data = JSON.parse(data);
            if (data.result)
                return
            $tempThis._param.mobile = data.channelExt.mobile ? data.channelExt.mobile : "";
            $tempThis._param.email = data.channelExt.email ? data.channelExt.email : "";
            $tempThis._param.username = data.channelExt.nickname ? data.channelExt.nickname : "";
            $tempThis._param.country = data.channelExt.country ? data.channelExt.country : "";
            $tempThis._param.province = data.channelExt.province ? data.channelExt.province : "";
            $tempThis._param.city = data.channelExt.city ? data.channelExt.city : "";
            $tempThis._param.inviter = UnionManage.inviter ? UnionManage.inviter : "";
            Union_LayaBox._channel = data.channel;
            if (data.channel == "wx") {
                $tempThis._param.avatar_url = data.channelExt.headimgurl ? data.channelExt.headimgurl : "";
                $tempThis._param.gender = data.channelExt.sex ? data.channelExt.sex : "";
            } else if (data.channel == "qq") {
                $tempThis._param.avatar_url = data.channelExt.figureurl_2 ? data.channelExt.figureurl_2 : "";
                $tempThis._param.birthday = data.channelExt.year ? data.channelExt.year : "";
                $tempThis._param.gender = data.channelExt.gender ? (data.channelExt.gender == "男" ? 1 : 2) : "";
            } else if (data.channel == "pp") {
                //手机登录
                $tempThis._param.avatar_url = data.channelExt.avatar_url ? data.channelExt.avatar_url : "";
                $tempThis._param.birthday = data.channelExt.birthday ? data.channelExt.birthday : "";
                $tempThis._param.username = data.channelExt.username ? data.channelExt.username : "";
                if (!$tempThis._param.username && data.channelExt.nick_name)
                    $tempThis._param.username = data.channelExt.nick_name;
                if (!$tempThis._param.username)
                    $tempThis._param.username = "用户" + Math.floor(Laya.Browser.now() / 1000);
            }
            callback && callback($tempThis._param);
        })
    }


    /* INTERFACE utils.union.IUnion */
    private marketLogin(rs: any, callback?: Function): void {
        if (rs.result != 0) {
            return;
        }
        // ILayaMe.ArtUtils.startCalTime('开始登陆');
        this.market.login((data: any) => {
            // ILayaMe.ArtUtils.startCalTime('获取到登录数据');
            console.log("-------------获取到登录数据:" + data);
            data = JSON.parse(data);
            if (data.result || data.code) {
                console.log("-------------------market登录失败-----------------");
                // Dialogs.alert_white('', "网络状态异常， 请检查网络设置后重试", Laya.Handler.create($tempThis, function () {
                //     $tempThis.marketLogin(true, rs);
                // }));
                callback && callback(data);
                return;
            }
            console.log("-------------------market登录成功-----------------");
            UnionManage.spId = data.spId;
            UnionManage.baseToken = data.other ? data.other.code : "";
            data.data && (this._param.userId = data.data.userId);
           
            callback && callback(data);
        }, rs);
    }

    checkUnion(str: string) {
        return str == 'layabox';
    }

    isLogin(callback: Function = null) {
        let token = Laya.LocalStorage.getJSON('laya_sdk_token');
        callback({ isLogin: Boolean(token) });
    }
}

