import { IUnion } from "./IUnion";
import { UnionManage } from "../UnionManage";
import { GlobalData } from "../../scene/data/GlobalData";
import { ServerManager } from "../../server/ServerManager";


/**
     * ...
     * @author laoxie
     */
export class Union_App implements IUnion {

    spid = "432";
    layaApp: any;
    private static _instance: Union_App;
    //private static var apiRoot:String = 'https://openapi.layabox.com/';
    private market: any;
    private supports: any[];
    private shareCallback: Function;

    constructor() {
        Union_App._instance = this;
        this.layaApp = null;
        if (Laya.Browser.window.PlatformClass) {
            if (this.onIOS()) {
                //iOS wkwebview
                this.layaApp = Laya.Browser.window.PlatformClass.createClass('LayaApp');
            }
            else {
                //Android Native
                this.layaApp = Laya.Browser.window.PlatformClass.createClass('demo.LayaApp');
                ;
            }
        }

    
    }
    onIOS(): boolean {
        return Laya.Browser.window.wkbridge || Laya.Browser.onIOS;
    }
    checkIsAppInstalled(appType: any = null, callback: Function = null): void {
        if (this.layaApp) {
            if (this.onIOS()) {
                this.layaApp.callWithBack(callback, 'checkIsAppInstalled:', appType);
            }
            else {
                this.layaApp.callWithBack(callback, 'checkIsAppInstalled', appType);
            }
        }
    }

    private checkAutoLogin() {
        var that = this;
        var _param: any = {};
        //console.log("user_openid " + user_openid + "device_id" + device_id);
        _param.params = {
            //code: code,
            game_id: "laya_0012",//UnionManage.openId,
            sp_id: 2,//UnionManage.spId,
            //user_openid: user_openid,
            //device_id: device_id,
        }
        UnionManage.instance.isAuth = 1;
        UnionManage.instance.secondTimeLogin(_param, function (ret: any): void {
            console.log('二次登录回调结果:', ret);
            that.hideLoginPage();
            //WaitLoading.hide();
            //Laya.LocalStorage.setItem('LayaAppUserOpenID', user_openid);
            //Laya.LocalStorage.setItem('LayaAppToken', token);
            //Laya.LocalStorage.setItem('LayaAppSPId', UnionManage.spId);
        },
            function (ret: any): void {
                that.clearToken();
                that.showLoginPage();
            });
    }

    clearToken(): void {
        //Laya.LocalStorage.removeItem('LayaAppUserOpenID');
        //Laya.LocalStorage.removeItem('LayaAppToken');
        //Laya.LocalStorage.removeItem('LayaAppSPId');
        //Laya.LocalStorage.removeItem('LayaDeviceId');
    }

    showLoginPage(): void {
        //打开手机登录界面
        // Global['_$showLoginPage'] = true;
        // MLoginChoosePage.instance.open()
    }

    hideLoginPage(): void {
        //关闭手机登录界面
        // MLoginPage.instance.close();
    }

    login(data: any = null, _market: any = null): void {
        if (GlobalData.isAppTest) {
            this.showLoginPage();
            return;
        }
        (window as any).conch.app_start_load_sum = Date.now() - (window as any).conchConfig.getAppLaunchStartTime();
        this.market = _market;
        this.market.login(null, null);
        this.checkAutoLogin();
    }
   
    quickLogin(mobile: string, smsCode: string, cb: Function = null, cbFailed: Function = null) {
        var $tempThis = this;
        var _: Function = function (data: any): void {
            if (data.errCode == 0) {
                console.log("quickLogin ok");

                var _param: any = {};
                //console.log("user_openid " + user_openid + "device_id" + device_id);
                _param.params = {
                    //code: code,
                    game_id: "laya_0012",//UnionManage.openId,
                    sp_id: 2,//UnionManage.spId,
                    //user_openid: user_openid,
                    //device_id: device_id,
                }
                UnionManage.instance.isAuth = 1;
                UnionManage.instance.secondTimeLogin(_param, cb, cbFailed);
            }
            else {
                cbFailed(data);
                console.log("quickLogin error");
            }
        };
        if(GlobalData.isAppTest){
            _&&_({errCode:0});
            return;
        }
        if (this.onIOS()) {
            this.layaApp.callWithBack(_, 'quickLogin:smsCode:', mobile, smsCode);
        }
        else {
            this.layaApp.callWithBack(_, 'quickLogin', mobile, smsCode);
        }
    }
    sendCodeForLogin(mobile: string, callback: Function = null) {
        if(GlobalData.isAppTest){
            GlobalData.appTestLogin(Laya.Handler.create(this,(data:any)=>{
                callback&&callback({errCode:0,game_id:"laya_0012",sp_id:2,data:data})
            }))
            return;
        }
        if (this.onIOS()) {
            this.layaApp&&this.layaApp.callWithBack(callback, 'sendCodeForLogin:', mobile);
        }
        else {
            this.layaApp&&this.layaApp.callWithBack(callback, 'sendCodeForLogin', mobile);
        }
    }
    secondTimeLoginForGameCreator(callback: Function = null, birthday: string = null) {
        console.log(">>>>>>>>>>>>>>>>>secondTimeLoginForGameCreator >" + birthday);
        if (GlobalData.isAppTest) {
            GlobalData.appTestLogin(Laya.Handler.create(this, (data:any) => {
                callback && callback({ errCode: 0, game_id: "laya_0012", sp_id: 2, data: data })
            }))
            return;
        }
        if (this.onIOS()) {
            this.layaApp.callWithBack(callback, 'secondTimeLogin:birthday:', ServerManager.instance.rootPath, birthday);
        }
        else {
            this.layaApp.callWithBack(callback, 'secondTimeLogin', ServerManager.instance.rootPath, birthday);
        }
    }

    /*secondTimeLogin(code: string, user_openid: string, device_id: string, callback: Function = null, cbFailed: Function = null): void {
        var _param: any = {};
        console.log("user_openid " + user_openid + "device_id" + device_id);
        _param.params = {
            code: code,
            game_id: UnionManage.openId,
            sp_id: UnionManage.spId,
            user_openid: user_openid,
            device_id: device_id,
        }


        UnionManage.instance.isAuth = 1;
        UnionManage.instance.secondTimeLogin(_param, callback, cbFailed);
    }*/

    initShare(param: any = null, callback: Function = null): void {

    }
    /*var params = {
        title: "分享应用测试标题",
        link: "https://www.layabox.com/",
        imgsrc: "https://lv.layabox.com/test/lvdebug/logo.png",
    };*/
    share(params: any = null, callback: Function = null): void {

        if (this.onIOS()) {
            this.layaApp.callWithBack(callback, 'share:data:', 'gamecreator', JSON.stringify(params));
        }
        else {
            this.layaApp.callWithBack(callback, 'share', 'gamecreator', JSON.stringify(params));
        }
    }

    getopenId(): string {
        return '';
    }

    showBanner(adUnitId: string = null, style: any = null, callback: Laya.Handler = null, offsetY: number = 0, isTop: boolean = false): void {//return;

    }

    hideBanner(): void {

    }

    createVideo(adUnitId: string, callBack: Laya.Handler = null): void {

    }

    recorderStart(callback: Laya.Handler = null): void {

    }

    recorderStop(): void {

    }

    shareVideo(videoPath: string, callback: Laya.Handler = null): void {

    }

    static get I(): Union_App {
        if (!Union_App._instance) {
            new Union_App();
        }
        return Union_App._instance;
    }

    /*_checkParamApp(obj: any): void {
        obj.login_sp = obj.sp_id;
        if (this.onIOS()) {
            obj.sp_id = 622;//iOS 大陆 放在哪 todo
        }
        else {
            obj.sp_id = Laya.Browser.window._qudao_id;
        }
        console.log("login_sp " + obj.login_sp + " sp_id " + obj.sp_id);
        obj.client_type = "app";
        obj.laya_appid = UnionManage.motherOpenid;
    }*/

    logout(callback: Function = null): void {
        if (this.onIOS()) {
            this.layaApp.callWithBack(callback, 'logout:', 'gamecreator');
        }
        else {
            this.layaApp.callWithBack(callback, 'logout', 'gamecreator');
        }
    }
    isLogin(callback: Function = null): void {
        //TODO 目前没有游客登录
        if (this.layaApp) {
            if (this.onIOS()) {
                this.layaApp.callWithBack(callback, 'isLogin:', 'gamecreator');
            }
            else {
                this.layaApp.callWithBack(callback, 'isLogin', 'gamecreator');
            }
        } else {
            callback({ isLogin: false });
        }
    }
    destroyWxBtn() {

    }
    restart(): void {
        if (this.onIOS()) {

        }
        else {
            this.layaApp.call('restartApp');
        }
    }
    checkUnion(str: string) {
        return str == 'app';
    }

    getLanguage(): string {
        return Laya.Browser.window.conchConfig.getLanguage();
    }

    setLanguage(value: string) {
        Laya.Browser.window.conchConfig.setLanguage(value);
    }
    /**
     * 获取邮箱注册时验证码
     * @param email 
     * @param pwd 
     * @param callback 
     */
    getEmailCodeForRegister(email: string, pwd: string, callback: Function = null) {
        if (this.onIOS()) {
            this.layaApp.callWithBack(callback, 'getEmailCode:email:pwd:', 'gamecreator', email, pwd);
        }
        else {
            this.layaApp.callWithBack(callback, 'getEmailCode', 'gamecreator', email, pwd);
        }
    }


    mySecondLogin(cb: Function, cbFailed: Function) {
        var _param: any = {};
        //console.log("user_openid " + user_openid + "device_id" + device_id);
        _param.params = {
            //code: code,
            game_id: "laya_0012",//UnionManage.openId,
            sp_id: 2,//UnionManage.spId,
            //user_openid: user_openid,
            //device_id: device_id,
        }
        UnionManage.instance.isAuth = 1;
        UnionManage.instance.secondTimeLogin(_param, cb, cbFailed);
    }


    emailRegisterVerifyLogin(email: string, code: string, pwd: string, cb: Function = null, cbFailed: Function = null) {
        var $tempThis = this;
        var _: Function = function (data: any): void {
            if (data.errCode == 0) {
                console.log("emailRegisterVerifyLogin ok");

                var _param: any = {};
                //console.log("user_openid " + user_openid + "device_id" + device_id);
                _param.params = {
                    //code: code,
                    game_id: "laya_0012",//UnionManage.openId,
                    sp_id: 2,//UnionManage.spId,
                    //user_openid: user_openid,
                    //device_id: device_id,
                }
                UnionManage.instance.isAuth = 1;
                UnionManage.instance.secondTimeLogin(_param, cb, cbFailed);
            }
            else {
                cbFailed(data);
                console.log("emailRegisterVerifyLogin error");
            }
        };
        if(GlobalData.isAppTest){
            _&&_({errCode:0});
            return;
        }
        if (this.onIOS()) {
            this.layaApp.callWithBack(_, 'emailRegisterVerifyLogin:email:code:pwd:', 'gamecreator', email, code, pwd);
        }
        else {
            this.layaApp.callWithBack(_, 'emailRegisterVerifyLogin', 'gamecreator', email, code, pwd);
        }
    }
    /**
     * 邮箱密码登录
     * @param email 
     * @param pwd 
     * @param cb 
     * @param cbFailed 
     */
    loginWithEmailPwd(email: string, pwd: string, cb: Function = null, cbFailed: Function = null) {
        var $tempThis = this;
        var _: Function = function (data: any): void {
            if (data.errCode == 0) {
                console.log("loginWithEmailPwd ok");

                var _param: any = {};
                //console.log("user_openid " + user_openid + "device_id" + device_id);
                _param.params = {
                    //code: code,
                    game_id: "laya_0012",//UnionManage.openId,
                    sp_id: 2,//UnionManage.spId,
                    //user_openid: user_openid,
                    //device_id: device_id,
                }
                UnionManage.instance.isAuth = 1;
                UnionManage.instance.secondTimeLogin(_param, cb, cbFailed);
            }
            else {
                cbFailed(data);
                console.log("loginWithEmailPwd error");
            }
        };
        if(GlobalData.isAppTest){
            _&&_({errCode:0});
            return;
        }
        if (this.onIOS()) {
            this.layaApp.callWithBack(_, 'loginWithEmailPwd:email:pwd:', 'gamecreator', email, pwd);
        }
        else {
            this.layaApp.callWithBack(_, 'loginWithEmailPwd', 'gamecreator', email, pwd);
        }
    }
    /**
     * 手机密码登录
     * @param mobile 
     * @param pwd 
     * @param cb 
     * @param cbFailed 
     */
    loginWithMobilePwd(mobile: string, pwd: string, cb: Function = null, cbFailed: Function = null) {
        var $tempThis = this;
        var _: Function = function (data: any): void {
            if (data.errCode == 0) {
                console.log("loginWithMobilePwd ok");

                var _param: any = {};
                //console.log("user_openid " + user_openid + "device_id" + device_id);
                _param.params = {
                    //code: code,
                    game_id: "laya_0012",//UnionManage.openId,
                    sp_id: 2,//UnionManage.spId,
                    //user_openid: user_openid,
                    //device_id: device_id,
                }
                UnionManage.instance.isAuth = 1;
                UnionManage.instance.secondTimeLogin(_param, cb, cbFailed);
            }
            else {
                cbFailed(data);
                console.log("loginWithMobilePwd error");
            }
        };
        if(GlobalData.isAppTest){
            _&&_({errCode:0});
            return;
        }
        if (this.onIOS()) {
            this.layaApp.callWithBack(_, 'loginWithMobilePwd:mobile:pwd:', 'gamecreator', mobile, pwd);
        }
        else {
            this.layaApp.callWithBack(_, 'loginWithMobilePwd', 'gamecreator', mobile, pwd);
        }
    }
    sendCodeForLoginWithMobileCode(mobile: string, callback: Function = null) {
        if (this.onIOS()) {
            this.layaApp.callWithBack(callback, 'sendCodeForLoginWithMobileCode:mobile:', 'gamecreator', mobile);
        }
        else {
            this.layaApp.callWithBack(callback, 'sendCodeForLoginWithMobileCode', 'gamecreator', mobile);
        }
    }
    /**
     * 手机验证码仅登录
     * @param mobile 
     * @param pwd 
     * @param cb 
     * @param cbFailed 
     * // 手机号/验证码登录失败
        if (data.errCodeSDK == 1011) {
           // 用户未注册
        } 
     */
    loginWithMobileCode(mobile: string, code: string, cb: Function = null, cbFailed: Function = null) {
        var $tempThis = this;
        var _: Function = function (data: any): void {
            if (data.errCode == 0) {
                console.log("loginWithMobileCode ok");

                var _param: any = {};
                //console.log("user_openid " + user_openid + "device_id" + device_id);
                _param.params = {
                    //code: code,
                    game_id: "laya_0012",//UnionManage.openId,
                    sp_id: 2,//UnionManage.spId,
                    //user_openid: user_openid,
                    //device_id: device_id,
                }
                UnionManage.instance.isAuth = 1;
                UnionManage.instance.secondTimeLogin(_param, cb, cbFailed);
            }
            else {
                cbFailed(data);
                console.log("loginWithMobileCode error");
            }
        };
        if(GlobalData.isAppTest){
            _&&_({errCode:0});
            return;
        }
        if (this.onIOS()) {
            this.layaApp.callWithBack(_, 'loginWithMobileCode:mobile:code:', 'gamecreator', mobile, code);
        }
        else {
            this.layaApp.callWithBack(_, 'loginWithMobileCode', 'gamecreator', mobile, code);
        }
    }
    isHasSetedPassword(callback: Function = null) {
        if (this.onIOS()) {
            this.layaApp.callWithBack(callback, 'isHasSetedPassword:', 'gamecreator');
        }
        else {
            this.layaApp.callWithBack(callback, 'isHasSetedPassword', 'gamecreator');
        }
    }
    checkPassword(pwd: string, callback: Function = null) {
        if (this.onIOS()) {
            this.layaApp.callWithBack(callback, 'checkPassword:pwd:', 'gamecreator', pwd);
        }
        else {
            this.layaApp.callWithBack(callback, 'checkPassword', 'gamecreator', pwd);
        }
    }
    getUserInfo(callback: Function = null): void {
        if (GlobalData.isAppTest) {
            callback && callback({ errCode: 0 });
            return;
        }
        if (this.onIOS()) {
            this.layaApp.callWithBack(callback, 'getUserInfo:', 'gamecreator');
        }
        else {
            this.layaApp.callWithBack(callback, 'getUserInfo', 'gamecreator');
        }
    }

    sendCodeForMobileBind(mobile: string, callback: Function = null) {
        if (this.onIOS()) {
            this.layaApp.callWithBack(callback, 'sendCodeForMobileBind:mobile:', 'gamecreator', mobile);
        }
        else {
            this.layaApp.callWithBack(callback, 'sendCodeForMobileBind', 'gamecreator', mobile);
        }
    }
    bindMobile(mobile: string, code: string, callback: Function = null): void {
        if (this.onIOS()) {
            this.layaApp.callWithBack(callback, 'bindMobile:mobile:code:', 'gamecreator', mobile, code);
        }
        else {
            this.layaApp.callWithBack(callback, 'bindMobile', 'gamecreator', mobile, code);
        }
    }
    sendCodeForVerifyCurMobile(mobile: string, callback: Function = null) {
        if (this.onIOS()) {
            this.layaApp.callWithBack(callback, 'sendCodeForVerifyCurMobile:mobile:', 'gamecreator', mobile);
        }
        else {
            this.layaApp.callWithBack(callback, 'sendCodeForVerifyCurMobile', 'gamecreator', mobile);
        }
    }
    validateSMSCodeForVerifyCurMobile(code: string, callback: Function = null) {
        if (this.onIOS()) {
            this.layaApp.callWithBack(callback, 'validateSMSCodeForVerifyCurMobile:code:', 'gamecreator', code);
        }
        else {
            this.layaApp.callWithBack(callback, 'validateSMSCodeForVerifyCurMobile', 'gamecreator', code);
        }
    }
    sendCodeForChangeMobileNum(mobile: string, callback: Function = null) {
        if (this.onIOS()) {
            this.layaApp.callWithBack(callback, 'sendCodeForChangeMobileNum:mobile:', 'gamecreator', mobile);
        }
        else {
            this.layaApp.callWithBack(callback, 'sendCodeForChangeMobileNum', 'gamecreator', mobile);
        }
    }
    changeMobileNum(mobile: string, code: string, callback: Function = null): void {
        if (this.onIOS()) {
            this.layaApp.callWithBack(callback, 'changeMobileNum:mobile:code:', 'gamecreator', mobile, code);
        }
        else {
            this.layaApp.callWithBack(callback, 'changeMobileNum', 'gamecreator', mobile, code);
        }
    }
    setPassword(pwd: string, callback: Function = null) {
        if (this.onIOS()) {
            this.layaApp.callWithBack(callback, 'setPassword:pwd:', 'gamecreator', pwd);
        }
        else {
            this.layaApp.callWithBack(callback, 'setPassword', 'gamecreator', pwd);
        }
    }
    modifyPasswordByCurrentPassword(curPwd: string, newPwd: string, callback: Function = null) {
        if (this.onIOS()) {
            this.layaApp.callWithBack(callback, 'modifyPasswordByCurrentPassword:curPwd:newPwd:', 'gamecreator', curPwd, newPwd);
        }
        else {
            this.layaApp.callWithBack(callback, 'modifyPasswordByCurrentPassword', 'gamecreator', curPwd, newPwd);
        }
    }
    /**
     * 获取手机修改密码验证码
     * @param mobile 
     * @param callback 
     */
    sendCodeForModifyPassword(mobile: string, callback: Function = null) {
        if (this.onIOS()) {
            this.layaApp.callWithBack(callback, 'sendCodeForModifyPassword:mobile:', 'gamecreator', mobile);
        }
        else {
            this.layaApp.callWithBack(callback, 'sendCodeForModifyPassword', 'gamecreator', mobile);
        }
    }
    modifyPasswordByMobileCode(code: string, newPwd: string, callback: Function = null) {
        if (this.onIOS()) {
            this.layaApp.callWithBack(callback, 'modifyPasswordByMobileCode:code:newPwd:', 'gamecreator', code, newPwd);
        }
        else {
            this.layaApp.callWithBack(callback, 'modifyPasswordByMobileCode', 'gamecreator', code, newPwd);
        }
    }
    /**
     * 获取邮箱修改密码时验证码
     * @param email 
     * @param callback 
     */
    getEmailCodeForModifyPassword(email: string, callback: Function = null) {
        if (this.onIOS()) {
            this.layaApp.callWithBack(callback, 'getEmailCodeForModifyPassword:email:', 'gamecreator', email);
        }
        else {
            this.layaApp.callWithBack(callback, 'getEmailCodeForModifyPassword', 'gamecreator', email);
        }
    }
    modifyPasswordByEmailCode(code: string, newPwd: string, callback: Function = null) {
        if (this.onIOS()) {
            this.layaApp.callWithBack(callback, 'modifyPasswordByEmailCode:code:newPwd:', 'gamecreator', code, newPwd);
        }
        else {
            this.layaApp.callWithBack(callback, 'modifyPasswordByEmailCode', 'gamecreator', code, newPwd);
        }
    }
    /**
     * 获取手机忘记密码验证码
     * @param mobile 
     * @param callback 
     */
    sendCodeForResetPassword(mobile: string, callback: Function = null) {
        if (this.onIOS()) {
            this.layaApp.callWithBack(callback, 'sendCodeForResetPassword:mobile:', 'gamecreator', mobile);
        }
        else {
            this.layaApp.callWithBack(callback, 'sendCodeForResetPassword', 'gamecreator', mobile);
        }
    }
    resetPasswordByMobileCode(mobile: string, code: string, newPwd: string, callback: Function = null) {
        if (this.onIOS()) {
            this.layaApp.callWithBack(callback, 'resetPasswordByMobileCode:mobile:code:newPwd:', 'gamecreator', mobile, code, newPwd);
        }
        else {
            this.layaApp.callWithBack(callback, 'resetPasswordByMobileCode', 'gamecreator', mobile, code, newPwd);
        }
    }
    /**
     * 获取邮箱忘记密码时验证码
     * @param email 
     * @param callback 
     */
    getEmailCodeForResetPassword(email: string, callback: Function = null) {
        if (this.onIOS()) {
            this.layaApp.callWithBack(callback, 'getEmailCodeForResetPassword:email:', 'gamecreator', email);
        }
        else {
            this.layaApp.callWithBack(callback, 'getEmailCodeForResetPassword', 'gamecreator', email);
        }
    }
    resetPasswordByEmailCode(email: string, code: string, newPwd: string, callback: Function = null) {
        if (this.onIOS()) {
            this.layaApp.callWithBack(callback, 'resetPasswordByEmailCode:email:code:newPwd:', 'gamecreator', email, code, newPwd);
        }
        else {
            this.layaApp.callWithBack(callback, 'resetPasswordByEmailCode', 'gamecreator', email, code, newPwd);
        }
    }

    sendEventWithJSON(eventName: string, json: string) {
        if (this.onIOS()) {
            this.layaApp && this.layaApp.call('sendEvent:eventName:jsonStr:platform:', 'gamecreator', eventName, json, '0');
        } else {
            this.layaApp && this.layaApp.call('sendEventWithJSON', 'gamecreator', eventName, json, '0');
        }
    }
    sendEventToFirebaseWithJSON(eventName: string, json: string) {
        if (this.onIOS()) {
            this.layaApp.call('sendEvent:eventName:jsonStr:platform:', 'gamecreator', eventName, json, '1');
        } else {
            this.layaApp.call('sendEventWithJSON', 'gamecreator', eventName, json, '1');
        }
    }
    sendEventToFacebookWithJSON(eventName: string, json: string) {
        if (this.onIOS()) {
            this.layaApp.call('sendEvent:eventName:jsonStr:platform:', 'gamecreator', eventName, json, '2');
        } else {
            this.layaApp.call('sendEventWithJSON', 'gamecreator', eventName, json, '2');
        }
    }
    sendEventToAppFlyerWithJSON(eventName: string, json: string) {
        if (this.onIOS()) {
            this.layaApp.call('sendEvent:eventName:jsonStr:platform:', 'gamecreator', eventName, json, '3');
        } else {
            this.layaApp.call('sendEventWithJSON', 'gamecreator', eventName, json, '3');
        }
    }
    //android 没有回调 res.success
    openNotificationSettings(callback: Function = null): void {
        if (this.onIOS()) {
            this.layaApp.callWithBack(callback, 'openNotificationSettings');
        }
        else {
            this.layaApp.callWithBack(callback, 'openNotificationSettings');
        }
    }
    //res.isNotificationsEnabled
    isNotificationsEnabled(callback: Function = null): void {
        if (this.onIOS()) {
            this.layaApp.callWithBack(callback, 'isNotificationsEnabled');
        }
        else {
            this.layaApp.callWithBack(callback, 'isNotificationsEnabled');
        }
    }
    /**
    * 无网络链接返回空字符串
    */
    getIP(): string {
        return Laya.Browser.window.conchConfig.getIPAddress();
    }

    /**
    * 校验出生日期是否合规
    *
    * @param birthDay 出生日期 格式：1990-01-03
    *    // 校验失败GCErrorCode.ERRNO_BIRTHDAY_ERROR
    *    if (data.errCodeSDK ==  1010202) {
    *        // 出生日期不满足当地合规要求
    *   }
    */
    getAgeGateDecision(birthDay: string, callback: Function = null) {
        if (this.onIOS()) {
            this.layaApp.callWithBack(callback, 'getAgeGateDecision:birthDay:', 'gamecreator', birthDay);
        }
        else {
            this.layaApp.callWithBack(callback, 'getAgeGateDecision', 'gamecreator', birthDay);
        }
    }
    /**
   * 设置出生日期
   * @param birthDay 出生日期 格式：1990-01-03
   */
    setAgeGate(birthDay: string, callback: Function = null) {
        if (this.onIOS()) {
            this.layaApp.callWithBack(callback, 'setAgeGate:birthDay:', 'gamecreator', birthDay);
        }
        else {
            this.layaApp.callWithBack(callback, 'setAgeGate', 'gamecreator', birthDay);
        }
    }

    twitterRegisterVerifyLoginNew(cb: Function = null, cbFailed: Function = null) {
        var $tempThis = this;
        var _: Function = function (data: any): void {
            if (data.errCode == 0) {
                console.log("quickLogin ok");
                cb && cb();
            }
            else {
                cbFailed(data);
                console.log("quickLogin error");
            }
        };
        if (GlobalData.isAppTest) {
            _({ errCode: 0 });
            return;
        }
        if (this.onIOS()) {
            this.layaApp.callWithBack(_, 'twitterRegisterVerifyLogin:', 'gamecreator');
        }
        else {
            this.layaApp.callWithBack(_, 'twitterRegisterVerifyLogin', 'gamecreator');
        }
    }
    /*
    *   twitter三方注册登录
    *
    */

    twitterRegisterVerifyLogin(cb: Function = null, cbFailed: Function = null) {
        var $tempThis = this;
        var _: Function = function (data: any): void {
            if (data.errCode == 0) {
                console.log("quickLogin ok");

                var _param: any = {};
                //console.log("user_openid " + user_openid + "device_id" + device_id);
                _param.params = {
                    //code: code,
                    game_id: "laya_0012",//UnionManage.openId,
                    sp_id: 2,//UnionManage.spId,
                    //user_openid: user_openid,
                    //device_id: device_id,
                }
                UnionManage.instance.isAuth = 1;
                UnionManage.instance.secondTimeLogin(_param, cb, cbFailed);
            }
            else {
                cbFailed(data);
                console.log("quickLogin error");
            }
        };
        if (GlobalData.isAppTest) {
            _({ errCode: 0 });
            return;
        }
        if (this.onIOS()) {
            this.layaApp.callWithBack(_, 'twitterRegisterVerifyLogin:', 'gamecreator');
        }
        else {
            this.layaApp.callWithBack(_, 'twitterRegisterVerifyLogin', 'gamecreator');
        }
    }

    /*
    *   twitter三方仅登录
    *
    */

    loginWithTwitter(cb: Function = null, cbFailed: Function = null) {
        var $tempThis = this;
        var _: Function = function (data: any): void {
            if (data.errCode == 0) {
                console.log("quickLogin ok");

                var _param: any = {};
                //console.log("user_openid " + user_openid + "device_id" + device_id);
                _param.params = {
                    //code: code,
                    game_id: "laya_0012",//UnionManage.openId,
                    sp_id: 2,//UnionManage.spId,
                    //user_openid: user_openid,
                    //device_id: device_id,
                }
                UnionManage.instance.isAuth = 1;
                UnionManage.instance.secondTimeLogin(_param, cb, cbFailed);
            }
            else {
                cbFailed(data);
                console.log("quickLogin error");
            }
        };
        if (GlobalData.isAppTest) {
            _({ errCode: 0 });
            return;
        }
        if (this.onIOS()) {
            this.layaApp.callWithBack(_, 'loginWithTwitter:', 'gamecreator');
        }
        else {
            this.layaApp.callWithBack(_, 'loginWithTwitter', 'gamecreator');
        }
    }

    appleRegisterVerifyLoginNew(cb: Function = null, cbFailed: Function = null) {
        var $tempThis = this;
        var _: Function = function (data: any): void {
            if (data.errCode == 0) {
                console.log("appleRegisterVerifyLogin ok");
                cb && cb();
            }
            else {
                cbFailed(data);
                console.log("appleRegisterVerifyLogin error");
            }
        };
        if (GlobalData.isAppTest) {
            _({ errCode: 0 });
            return;
        }
        if (this.onIOS()) {
            this.layaApp.callWithBack(_, 'appleRegisterVerifyLogin:', 'gamecreator');
        }
    }
    /*
  *   apple id三方注册 errCode = 0 成功  errCode = -1 失败   errCode = 1系统小于iOS 13 不支持
  *
  */

    appleRegisterVerifyLogin(cb: Function = null, cbFailed: Function = null) {
        var $tempThis = this;
        var _: Function = function (data: any): void {
            if (data.errCode == 0) {
                console.log("appleRegisterVerifyLogin ok");

                var _param: any = {};
                //console.log("user_openid " + user_openid + "device_id" + device_id);
                _param.params = {
                    //code: code,
                    game_id: "laya_0012",//UnionManage.openId,
                    sp_id: 2,//UnionManage.spId,
                    //user_openid: user_openid,
                    //device_id: device_id,
                }
                UnionManage.instance.isAuth = 1;
                UnionManage.instance.secondTimeLogin(_param, cb, cbFailed);
            }
            else {
                cbFailed(data);
                console.log("appleRegisterVerifyLogin error");
            }
        };
        if (GlobalData.isAppTest) {
            _({ errCode: 0 });
            return;
        }
        if (this.onIOS()) {
            this.layaApp.callWithBack(_, 'appleRegisterVerifyLogin:', 'gamecreator');
        }
    }
    /*
    *   apple id 登录   errCode = 0 成功  errCode = -1 失败   errCode = 1系统小于iOS 13 不支持
    *
    */

    loginWithApple(cb: Function = null, cbFailed: Function = null) {
        var $tempThis = this;
        var _: Function = function (data: any): void {
            if (data.errCode == 0) {
                console.log("loginWithApple ok");

                var _param: any = {};
                //console.log("user_openid " + user_openid + "device_id" + device_id);
                _param.params = {
                    //code: code,
                    game_id: "laya_0012",//UnionManage.openId,
                    sp_id: 2,//UnionManage.spId,
                    //user_openid: user_openid,
                    //device_id: device_id,
                }
                UnionManage.instance.isAuth = 1;
                UnionManage.instance.secondTimeLogin(_param, cb, cbFailed);
            }
            else {
                cbFailed(data);
                console.log("loginWithApple error");
            }
        };
        if (GlobalData.isAppTest) {
            _({ errCode: 0 });
            return;
        }
        if (this.onIOS()) {
            this.layaApp.callWithBack(_, 'loginWithApple:', 'gamecreator');
        }
    }
    /*
    *   展示反馈弹窗
    *   from 展示来源，使用方自定义
    */
    showFeedbackDialog(from: string) {
        if (!this.layaApp) return;
        if (this.onIOS()) {
            this.layaApp.call('showFeedbackDialog:', from);
        } else {
            this.layaApp.call('showFeedbackDialog', from);
        }
    }
   
    //可能返回无效值 res.gaid == "00000000-0000-0000-0000-000000000000"
    getGAID(callback: Function = null) {
        if (this.onIOS()) {
            callback({ errCode: 0, gaid: "00000000-0000-0000-0000-000000000000" })
        }
        else {
            this.layaApp.callWithBack(callback, 'getGAID', 'gamecreator');
        }
    }
}

