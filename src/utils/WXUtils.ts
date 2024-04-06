import { PageManager } from "../page/PageManager";

/**
     * ...
     * @author ww
     */
export class WXUtils {
    static isIphone14Pro(): number {
        if (window["isAppTest"]) {
            return 0;
        }
        if (Laya.Browser.onMiniGame || Laya.Browser.window.isWXMiMi) {
            const sysInfo = Laya.Browser.window.wx.getSystemInfoSync();
            return sysInfo.safeArea.top + 4;
        }else if( !Laya.Browser.onPC && WXUtils.isQMP()){
            return WXUtils.TopOffset;
        }
        return 0;
    }
    static LeftOffset: number = 64;
    static TopOffset: number = 64;
    static BottomOffset: number = 35;

    static getAdptBottomOffset(): number {
        if (WXUtils.isIphoneX()) return WXUtils.BottomOffset;
        return 0;
    }

    static getAdptTopOffset(): number {
        if (WXUtils.isQMP()) return WXUtils.TopOffset;
        return 0;
    }
    static getAdptLeftOffset(): number {
        if (Laya.Browser.onAndroid) {
            if (WXUtils.isQMP()) return WXUtils.LeftOffset;
            return 0;
        }
        if (Laya.Browser.onIOS) {
            return this.isIphone14Pro();
        }
        if (Laya.Browser.onPC) {
            return 0;
        }
        return 0;
    }
    static showStageInfo(): void {
        //DebugTxt.init();
        //DebugTxt.dTrace("info:", Laya.Browser.width, Laya.Browser.height);
    }

    /**
     * 返回微信工具条的顶部
     * @return
     */
    static getTopBtnsOffset(defaultValue: number = 20): number {

        if (Laya.Browser.window.wkbridge) {
            var value: number = Laya.Browser.window.wkbridge.safeAreaInsetsTop / Laya.Browser.window.wkbridge.screenHeight * Laya.stage.height;
            if (value == 0) {
                return defaultValue;
            }
            return value;
        }
        if (Laya.Browser.onLayaRuntime && Laya.Browser.window.conch.safeInsetTop) {
            var value: number = Laya.Browser.window.conch.safeInsetTop;
            value = (value + 0.618 * (1 - 0.618) * Laya.Browser.height * 0.05) / Laya.Browser.height * Laya.stage.height;
            if (value == 0) {
                return defaultValue;
            }
            return value;
        }
        //return 40;
        if (!WXUtils.isMiniGame()) return defaultValue;

        try {
            var sysInfo: any;
            sysInfo = Laya.Browser.window.wx.getSystemInfoSync();

            var menuinfo: any = Laya.Browser.window.wx.getMenuButtonBoundingClientRect();
            var lv: number = menuinfo.top / sysInfo.screenHeight;
            var offset: number;
            offset = lv * Laya.stage.height;
            //trace("statBarHeight:", offset);
            //offset = offset / Laya.stage.clientScaleY;
            //trace("statBarHeight adpt:", offset);
            return offset;
        }
        catch (e) {

        }
        return defaultValue;
    }




    static getLeft(): number {
        if (!WXUtils.isMiniGame()) return 620;

        try {
            var sysInfo: any;
            sysInfo = Laya.Browser.window.wx.getSystemInfoSync();

            var menuinfo: any = Laya.Browser.window.wx.getMenuButtonBoundingClientRect();
            var lv: number = (menuinfo.left + 50) / sysInfo.screenWidth;
            var offset: number;
            offset = lv * Laya.stage.width;
            //trace("statBarWidth:", offset);
            //offset = offset / Laya.stage.clientScaleY;
            //trace("statBarWidth adpt:", offset);
            return offset;
        }
        catch (e) {
        }
        return 620;

    }

    static getLeftOffSet(): number {
        if (!WXUtils.isMiniGame()) return 1;

        try {
            var sysInfo: any;
            sysInfo = Laya.Browser.window.wx.getSystemInfoSync();

            var menuinfo: any = Laya.Browser.window.wx.getMenuButtonBoundingClientRect();
            var lv: number = menuinfo.left / sysInfo.screenWidth;
            return lv;
        }
        catch (e) {
        }
        return 0.7;

    }

    /**
     * 返回微信工具条的底部
     * @return
     */
    static getTop(defaultValue: number = 85): number {

        if (Laya.Browser.window.wkbridge) {
            var value: number = (Laya.Browser.window.wkbridge.safeAreaInsetsTop + Laya.Browser.window.wkbridge.safeAreaInsetsTop) / Laya.Browser.window.wkbridge.screenHeight * Laya.stage.height;
            if (value == 0) {
                return defaultValue;
            }
            return value;
        }
        if (Laya.Browser.onLayaRuntime && Laya.Browser.window.conch.safeInsetTop) {
            var value: number = Laya.Browser.window.conch.safeInsetTop;
            value = (value + 0.618 * (1 - 0.618) * Laya.Browser.height * 0.05 + (1 - 0.618) * Laya.Browser.height * 0.05) / Laya.Browser.height * Laya.stage.height;
            if (value == 0) {
                return defaultValue;
            }
            return value;
        }
        if (!WXUtils.isMiniGame()) return defaultValue;
        try {
            var sysInfo: any;
            sysInfo = Laya.Browser.window.wx.getSystemInfoSync();

            var menuinfo: any = Laya.Browser.window.wx.getMenuButtonBoundingClientRect();
            var lv: number = (menuinfo.top + menuinfo.height) / sysInfo.screenHeight;
            var offset: number;
            offset = lv * Laya.stage.height;
            //trace("statBarHeight:", offset);
            //offset = offset / Laya.stage.clientScaleY;
            //trace("statBarHeight adpt:", offset);
            return offset;
        }
        catch (e) {
        }
        return defaultValue;

    }

    static getAutoY(defaultValue: number = 120, height: number = 84): number {
        if (WXUtils.isMiniGame()) {
            try {
                var sysInfo: any = Laya.Browser.window.wx.getSystemInfoSync();
                var menuinfo: any = Laya.Browser.window.wx.getMenuButtonBoundingClientRect();
                var lv: number;
                if (Laya.Browser.onIPad) {
                    lv = (menuinfo.top) / sysInfo.screenHeight;
                }
                else {
                    lv = (menuinfo.top + menuinfo.height * 0.5) / sysInfo.screenHeight;
                }
                defaultValue = lv * Laya.stage.height;
            }
            catch (e) {
            }
        }

        if (!Laya.Browser.onIPad) {
            defaultValue -= height * 0.5;
        }
        return defaultValue;

    }

    /**
     * 是否是全面屏 包括 安卓跟苹果
     * @return
     */
    static isQMP(): boolean {
        let isH = false;
        let widthKey = isH ? 'height' : 'width';
        let heightKey = isH ? 'width' : 'height';
        let clientHeightKey = isH ? 'clientWidth' : 'clientHeight';

        var isBoo: boolean = false;
        var tempHeightBL: number = Math.floor(Laya.Browser[widthKey]) % 9;
        if (Laya.Browser.width == 1442)
            tempHeightBL = 0;//小米11特殊处理
        if( isH && [2481.25,2120.25].indexOf(Laya.Browser.window)){
            isBoo = true;//华为meta xs2、 小米 8刘海
        }
        var testHeight: number = 0;
        testHeight = Math.floor(Laya.Browser[heightKey]);
        var testWidth: number = 0;
        testWidth = Math.floor(Laya.Browser[widthKey]);
        if (Laya.Browser.onAndroid && tempHeightBL == 0) {
            //安卓全面屏判断
            if ([2280, 2160, 2244, 3120, 3040, 2248, 2340, 2340.9, 2281.5, 2281, 2249, 1560, 2400,  3202.5, 3200,2772].indexOf(testHeight) != -1 || ((testHeight / testWidth) > 2)) {
                isBoo = true;
            }
        }
        else {
            //if (Laya.Browser.onMiniGame) {
            if (WXUtils.isIphoneX()) {
                isBoo = true;
            }
            else if (Laya.Browser[clientHeightKey] == 812) {
                isBoo = true;
            }
            //}
        }
        return isBoo;
    }

    static isIphoneX(): boolean {
        var m: any;
        let clientHeightKey =  'clientHeight';
        if (Laya.Browser.onMiniGame || Laya.Browser.window.isWXMiMi) {
            m = (Laya.MiniAdpter || Laya.Browser.window.MiniAdpter).systemInfo;
            if (!m.safeArea) return false;
            var value = m.safeArea.top;
            //mini12 47  putong12 50  iphone11 44
            if (m.model.indexOf("iPhone X") != -1 || (value >= 44)) {
                return true;
            }
        }
        else if (Laya.Browser.onIOS || Laya.Browser.onIPhone) {
            //TODO xs 临时处理 iphone 14 ；iphone 14 pro ； iphone 14 pro max 灵动岛的问题
            if (Laya.Browser[clientHeightKey] >= 812 || ([2796, 2556, 2532].indexOf(Laya.Browser[clientHeightKey]) != -1))
                return true;
        }
        if (Laya.Browser.onLayaRuntime && (Laya.Browser.window.layabox.getDeviceInfo().phonemodel.indexOf("iPhone X") != -1 || Laya.Browser.window.conch.safeInsetTop >= 44)) {
            return true;
        }
        else if (Laya.Browser.window.wkbridge && Laya.Browser.userAgent.indexOf("QuanMianPing") != -1) {
            return true;
        }
        return false;
    }

    static isMiniGame(): boolean {
        return Laya.Browser.onMiniGame || Laya.Browser.window.isWXMiMi || Laya.Browser.onTTMiniGame;
    }


    static chooseImage(type: string, callback: Function): void {
        var imgParam: any;
        imgParam = {};
        imgParam.count = 1;
        imgParam.sizeType = ["compressed"];
        imgParam.sourceType = [type];
        imgParam.complete = callback;
        if (WXUtils.isMiniGame()) {
            if (Laya.Browser.window.wx && Laya.Browser.window.wx.chooseImage) {
                Laya.Browser.window.wx.chooseImage(imgParam);
                return;
            }
        }

    }

    static chooseImageToArrayBuffer(type: string = "album", callback: Laya.Handler = null, limitStr: string = ''): void {
        function onChooseImageBack(res: any): void {
            if ((typeof (res) == 'string') || (res && res.tempFilePaths && res.tempFilePaths.length)) {
                var src = ((typeof res == 'string')) ? res : res.tempFilePaths[0];
                var ab: ArrayBuffer;
                if (WXUtils.isMiniGame()) {
                    ab = Laya["MiniFileMgr"].fs.readFileSync(src, "");
                }
                else {
                    ab = Laya.Browser.window.fs.readFileSync(src);
                }
                //Laya.MiniFileMgr.readSync(src,null,Laya.Handler.create(WXUtils,function (d) {
                console.log(">>>>>>>>>>>>>>>>>>>img" + ab.byteLength / 1024 / 1024);
                //}));
                if (limitStr) {
                    var pathArr: any[] = src.split('.');
                    var arr: any[] = limitStr.split(',');
                    var b: boolean;
                    for (var i: number = 0, l: number = arr.length; (i < l); i++) {
                        if (pathArr.indexOf(arr[i]) != -1) {
                            b = true;
                            break;
                        }
                    }
                    if (!b) {
                        PageManager.instance.showTip('上传的图片格式非' + limitStr)
                        return
                    }
                }
                try {
                    var image: any = new Laya.Browser.window.Image();
                    image.onload = function (data: any) {
                        if ((image.width >= 2048) || (image.height >= 2048)) {
                            PageManager.instance.showTip('上传的图片宽高不能超过2048像素');
                            return;
                        }
                        else {
                            if (limitStr && pathArr) {
                                callback && callback.runWith([ab, src,src]);
                            } else {
                                callback && callback.runWith([ab, src,src]);
                            }
                        }
                    }.bind(this);
                    image.onerror = function (data: any) {
                        PageManager.instance.showTip('上传的图片宽高不能超过2048像素');
                        return;
                    }.bind(this);
                    image.src = src;
                }
                catch (e) {
                    PageManager.instance.showTip('上传的图片宽高不能超过2048像素')
                }

            }
        }
        WXUtils.chooseImage(type, onChooseImageBack.bind(this));
    }


 
   

}


