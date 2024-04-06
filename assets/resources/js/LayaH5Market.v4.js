(function (_g, factory) {

    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(_g) :
        typeof define === 'function' && define.amd ? define(factory) : (_g.LayaBoxMarketH5 = factory(_g));
})(this, function (_g) {
    _g = window || _g;
    var LayaCommon = _g.LayaCommon = (function () {

        var navigator = _g.navigator;
        var location = _g.location;
        var LayaCommon = function () { }

        LayaCommon.isConchApp = (function () {
            return _g.conchConfig != null;
        })()
        /**
         * 判断是否是微信浏览器环境
         */
        LayaCommon.isWx = (function () {
            var ua = navigator && navigator.userAgent.toLowerCase();
            return Boolean(ua && ua.match && (ua.match(/MicroMessenger/i) === "micromessenger"));
        })()

        /**
         * 判断是否是PC浏览器
         */
        LayaCommon.isPC = (function () {

            if (navigator && navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)) {
                return false;
            } else {
                return true;
            }
        })()

        /**
         * 判断是否是iOS环境
         */
        LayaCommon.isIOS = (function () {
            if ((navigator && navigator.userAgent.match && navigator.userAgent.match(/(iPhone|iPod|ios|iPad)/i)) || (_g.GameStatusInfo && GameStatusInfo.platform === "ios")) {
                return true;
            } else {
                return false;
            }
        })();

        /**
         * 判断是否是微信小游戏环境
         */
        LayaCommon.isWxGame = (function () {
            if (navigator && navigator.userAgent && navigator.userAgent.indexOf('MiniGame') > -1 && _g.wx && !_g.tt && !_g.bl) {
                return true;
            } else {
                return false;
            }
        })()

        /**
         * 判断是否是百度小游戏环境
         */
        LayaCommon.isBaiduGame = (function () {
            if (_g.swan && navigator && navigator.userAgent && navigator.userAgent.indexOf('SwanGame') > -1) {
                return true;
            } else {
                return false;
            }
        })()

        /**
         * 判断是否是字节跳动
         */
        LayaCommon.isTT = (function () {
            if (_g.tt) {
                return true;
            } else {
                return false;
            }
        })()

        // 是否是哔哩哔哩
        LayaCommon.isBili = (function () {
            if (_g.bl && _g.wx) {
                console.log("is Bili");
                return true;
            } else {
                console.log("is not Bili");
                return false;
            }
        })()

        LayaCommon.init = function () {


            this.HOST_URL = "https://openapi.layabox.com/";

            this.API_URL = this.HOST_URL + "developers/marketapi/";
            this.PAY_URL = this.HOST_URL + "paycenter/";
            // this.UCENTER_URL = this.HOST_URL + "ucenter/";
            // this.PAY_URL = this.HOST_URL + "developers/api/errorLog/"
            // this.API_URL = this.protocol + '//developers.devopen.layabox.com/marketapi/';
            // this.ErrorLogUrl = this.protocol + '//developers.masteropen.layabox.com/api/errorLog';
            // this.PAY_URL = this.protocol + '//paycenter.layabox.com/';
            // this.UCENTER_URL = this.protocol + '//ucenter.layabox.com/';

            return this;
        }

        /**
         * 加载文件
         */
        LayaCommon.loadScript = (function () {
            //  如果是小游戏环境，加载文件使用require
            if (LayaCommon.isWxGame || LayaCommon.isBaiduGame || LayaCommon.isTT || LayaCommon.isBili) {
                return function (url, onload) {
                    var scp = require(url);
                    onload && onload({ result: 0, module: scp });
                }
            } else {
                return function (url, onload, onerror, errNum) {
                    errNum = errNum || 3;
                    var scp = document.createElement("script");
                    scp.onload = function () {
                        onload && onload({ "result": 0 });
                    };
                    scp.onerror = function () {
                        if (--errNum > 0) {
                            LayaCommon.loadScript(url, onload, onerror, errNum);
                        } else {
                            onerror && onerror({ "result": -100, "desc": "脚本下载失败" });
                        }

                    };
                    document.head.appendChild(scp);
                    scp.src = url;
                }
            }

        })();

        LayaCommon.getUniqueID = function (splitChar) {
            var uniqueID = "";
            for (var i = 1; i <= 32; i++) {
                uniqueID += Math.floor(Math.random() * 16.0).toString(16);
                if ((i == 8) || (i == 12) || (i == 16) || (i == 20))
                    uniqueID += (splitChar ? splitChar : "");
            }
            return uniqueID;
        };

        LayaCommon.createCallback = function (callback, callbackName) {
            if (!callbackName)
                callbackName = "callback" + LayaCommon.getUniqueID("_");
            window[callbackName] = (function (name) {
                function CallbackHandler(param) {
                    if (window[CallbackHandler.funcName]) {
                        window[CallbackHandler.funcName] = null;
                        delete window[CallbackHandler.funcName];
                    }
                    if (document && document.head) {
                        var scp = document.getElementById(CallbackHandler.funcName)
                        scp && document.head.removeChild(scp);
                    }
                    callback && callback(param);
                }

                CallbackHandler.funcName = name;
                return CallbackHandler;
            })(callbackName);
            return callbackName;
        };

        /**
         * 请求数据
         */
        LayaCommon.getJson = (function () {

            var pre = null;

            if (LayaCommon.isWxGame) {
                pre = wx;
            } else if (LayaCommon.isTT) {
                pre = tt;//add xiaosong
            } else if (LayaCommon.isBaiduGame) {
                pre = swan;
            } else if (LayaCommon.isBili) {
                pre = bl;
            }

            if (LayaCommon.isWxGame || LayaCommon.isTT || LayaCommon.isBaiduGame || LayaCommon.isBili) {
                return function (url, callback, errorCallback, requestNum) {
                    requestNum = requestNum || 3;
                    var timer = null;
                    var isCallback = false;
                    pre.request({
                        url: url,
                        success: function (param) {
                            isCallback = true;
                            timer && clearTimeout(timer);
                            callback && callback(param.data);
                        },
                        fail: failCallback
                    })
                    // if (LBMH5.option.timeout !== void 0 && LBMH5.option.timeout !== 0) {
                    //     timer = setTimeout(failCallback, LBMH5.option.timeout * 1000);
                    // }
                    function failCallback() {
                        timer && clearTimeout(timer);
                        if (!isCallback) {
                            isCallback = true;
                            if (--requestNum > 0) {
                                LayaCommon.getJson(url, callback, errorCallback, requestNum);
                            } else {
                                if (errorCallback) {
                                    errorCallback({ ret: -2, msg: "Request Fail" });
                                    return false;
                                }
                                callback && callback({ ret: -2, msg: "Request Fail" });
                            }
                        }
                    }

                }
            } else {
                return function (url, callback, errorCallback, requestNum) {
                    requestNum = requestNum || 3;
                    var timer = null;
                    var isCallback = false;
                    var callbackName = LayaCommon.createCallback(function (param) {
                        isCallback = true;
                        timer && clearTimeout(timer);
                        callback && callback(param);
                    });
                    var scp = document.createElement("script");
                    document.head.appendChild(scp);
                    scp.id = callbackName;
                    scp.onerror = failCallback;
                    scp.src = (url.indexOf("?") > -1) ? (url + "&callback=" + callbackName) : (url + "?callback=" + callbackName);


                    // if (LBMH5.option.timeout !== void 0 && LBMH5.option.timeout !== 0) {
                    //     timer = setTimeout(failCallback, LBMH5.option.timeout * 1000);
                    // }

                    function failCallback() {
                        if (!isCallback) {
                            isCallback = true;
                            timer && clearTimeout(timer);
                            if (--requestNum > 0) {
                                LayaCommon.getJson(url, callback, errorCallback, requestNum);
                            } else {
                                if (errorCallback) {
                                    errorCallback({ ret: -2, msg: "Request Fail" });
                                    return false;
                                }
                                callback && callback({ ret: -2, msg: "Request Fail" });
                            }
                        }
                    }
                }
            }

        })();

        LayaCommon.getPostJson = function (targetUrl, params, method, accessToken, callback) {
            var url = this.API_URL + "marketapi/urlRequest?url=" + targetUrl + "&params=" + params + "&act=" + method;
            this.getJson(url, function (param) {
                callback && callback(param);
            }, function (param) {
                callback && callback(param);
            });
        };

        LayaCommon.errorLog = function (param) {

            var str = [];
            for (var prop in param) {
                str.push(prop + "=" + encodeURIComponent(param[prop]));
            }
            str.push('errResourceUrl=' + encodeURIComponent(window.location.href));
            this.getJson(this.ErrorLogUrl + "?" + str.join("&"))
        };

        return LayaCommon.init();
    })();

    var LayaUserInfo = {
        avatarUrl: "",
        avatarBase64: "",
        country: "",
        province: "",
        city: "",
        nickName: "",
        gender: "",
        language: "zh_CN"
    }

    var LayaBoxMarketH5 = function () {
        this.loginResult = null;
        this.instance = null;
        this.loginType = -1;
        this.loginResult = null;
        this.spSdk = null;
        this.basicInfo = {};
        this.queryParams = {};
        this.gameInfo = {};
        this.option = {}
    }

    /**
     * 获取实例
     * @param {Object} option  : {openId, spId, spName, debug, timeout}
     */
    LayaBoxMarketH5.getInstance = function (option) {
        let ins = new LayaBoxMarketH5();
        if (option.openId) {
            ins.option = option;
        } else {
            ins.loginResult = { result: -5, desc: "openId not exist" };
        }

        return ins;
    }

    var __proto = LayaBoxMarketH5.prototype;
    /**
     * 登录
     * @param {String} [param] 参数选填
     * @param {Function} callback 
     */
    __proto.login = function (param, callback) {
        if (typeof param === "function") {
            callback = param;
            param = "";
        }
        let that = this;
        if (!this.spSdk) {
            this.myInit(param);
            res();
            var timer = null;
            function res() {
                timer = setTimeout(function () {
                    clearTimeout(timer);
                    if (that.loginResult) {
                        callback && callback(JSON.stringify(that.loginResult));
                        that.loginResult = ""
                    } else {
                        res();
                    }
                }, 16)
            }
        } else {
            this.innerLogin(param, function (data) {
                callback && callback(JSON.stringify(data));
            })
        }
    }

    /**
     * 登录之后，检测其他方法是否可用
     * @param {String} name 
     * @return {Boolean}
     */
    __proto.canUse = function (name) {
        if (name === "recharge") {
            name = "pay";
        }
        var canName = "can" + name.substring(0, 1).toUpperCase() + name.substring(1);
        if (this.spSdk && this.spSdk[canName]) {
            return Boolean(this.spSdk[canName]());
        } else {
            return Boolean(this.spSdk && this.spSdk[name]);
        }
    }

    /**
     * 分享
     * @param {JSONString || Object} param 
     *  "title" : 分享的标题,
        "link" : 分享后点击的页面url,
        // "icon" : 分享的icon 的url,
        "desc" : 分享界面的描述,
        "imgsrc" : 分享内容插图url,
        // "imgtitle" : 分享内容插图的标题,
        "ext" : 点开分享透传参数
     * @param {Function} callback 
     */
    __proto.share = function (param, callback) {
        this.checkApi("share", callback, function () {
            param = getParam(param);
            if (!param) {
                return false;
            }
            param.imgUrl = "";
            param.content = "";

            if (!param.imgUrl && param.imgsrc)
                param.imgUrl = param.imgsrc;

            if (!param.content && param.desc)
                param.content = param.desc;

            param.link = param.link || "";
            this.spSdk.share(param, function (result) {
                callback && callback(JSON.stringify(result));
            });
        });
    }

    /**
     * @param {JSONString || Object} param 
     *  "title" : 分享的标题,
        "link" : 分享后点击的页面url,
        // "icon" : 分享的icon 的url,
        "desc" : 分享界面的描述,
        "imgsrc" : 分享内容插图url,
        // "imgtitle" : 分享内容插图的标题,
        "ext" : 分享透传参数
        "canvas" : 微信可用，  传入canvas图片
     * @param {Function} callback 
     */
    __proto.initShareInfo = function (param, callback) {
        param = getParam(param);
        if (!param) {
            return false;
        }

        this.configData = param;

        if (this.configData) {
            param.imgUrl = this.configData.imgsrc;
            param.content = this.configData.desc;
            param.title = this.configData.title;
        }
        if (!param.imgUrl && param.imgsrc)
            param.imgUrl = param.imgsrc;

        if (!param.content && param.desc)
            param.content = param.desc;
        this.checkApi("initShareInfo", function () {
            callback && callback(JSON.stringify({ result: 0 }));
        }, function () {
            this.spSdk.initShareInfo(param, function (result) {
                callback && callback(JSON.stringify(result));
            });
        })
    };
    /**
     * 自定义接口，此接口主要用于特殊渠道需求的使用
     * @param {String} name 自定义的方法名
     * @param {Array} array 参数值:[
            data:自定义函数需要的值(object),
            ……
            callback:自定义参数回调
        ]
     */
    __proto.customize = function (name, array) {
        this.checkApi(name, null,  () => {
            this.spSdk[name].apply(this.spSdk, array);
        })
    }

    /**
     * 奖励广告
     * @param {String} placementID 广告Id
     * @param {Function} callback  1 开始视频 0 播放结束 -1 关闭视频 -2 错误 -3 关闭游戏
     */
    __proto.showRewardVideo = function (placementID, callback) {
        this.checkApi("showRewardVideo", callback, () => {
            this.spSdk.showRewardVideo(placementID, function (result) {
                callback && callback(JSON.stringify(result));
            })
        })
    }

    // 获取微信openId
    __proto.getUserOpenId = function () {
        return this.canUse("getUserOpenId") ? this.spSdk.getUserOpenId() : "";
    }

    /**
     * @param {String} adUnitId 广告Id
     * @param {String} style    广告样式
     * @param {Boolean} destroy 是否摧毁
     * @param {Function} callback 回调函数
     */
    __proto.showADBanner = function (adUnitId, style, destroy, callback) {
        this.checkApi("showADBanner", callback,  () => {
            this.spSdk.showADBanner(adUnitId, style, destroy, function (result) {
                callback && callback(JSON.stringify(result));
            })
        })
    }

    __proto.hideADBanner = function (adUnitId, callback) {
        this.checkApi("hideADBanner", callback,  () => {
            this.spSdk.hideADBanner(adUnitId, function (result) {
                callback && callback(JSON.stringify(result));
            })
        })
    }

    __proto.getUserInfo = function (callback) {
        this.checkApi("getUserInfo", callback, () =>  {
            this.spSdk.getUserInfo(function (result) {
                // LayaUserInfo
                if (result.data) {
                    for (var key in LayaUserInfo) {
                        LayaUserInfo[key] = result.data[key] || (this.loginResult.data && this.loginResult.data[key]) || LayaUserInfo[key];
                    }
                    result.data = LayaUserInfo;
                }
                callback && callback(JSON.stringify(result));
            })
        });
    }

    // 
    function getParam(param, callback) {
        if (typeof param === "string") {
            try {
                param = JSON.parse(param);
            } catch (e) {
                callback && callback(JSON.stringify({ "result": -1, "desc": "json parse error" }));
                return false;
            }
        } else if (!param) {

            return {};
        } else {
            return param;
        }
    }

    // 检测API是否支持
    __proto.checkApi = function(name, callback, success) {
        if (this.canUse(name)) {
            success()
        } else {
            callback && callback(JSON.stringify({ result: -2, desc: "not support " + name }))
        }
    }

    __proto.innerLogin = function (param, callback) {
        if (this.loginType === 0) {
            this.loginResult = {
                result: -100,
                desc: "error",
            }
            return false;
        }
        let that = this;
        this.spSdk.login(param, (param) => {
            param.spId = this.option.spId || getSpId;
            param.gameId = this.option.openId;
            if (param.params) {
                param.params.sp_id = param.spId
                param.params.game_id = param.gameId;
            }
            this.loginResult = param;
            callback && callback(this.loginResult);
        }, this);
    }

    __proto.myInit = function (loginParam) {
        var location = _g.location;

        if (!LayaCommon.isConchApp && !LayaCommon.isWxGame && !LayaCommon.isBili && !LayaCommon.isTT && !LayaCommon.isBaiduGame && location && (location.search != "" || location.hash.indexOf('?') > -1)) {//获取游戏启动地址的参数
            console.log("game start:" + location.href);
            var search = location.search || location.hash.substring(location.hash.indexOf("?"));
            var queryParameters = search.substring(1).replace(/\?/g, "&").split("&");
            for (var i = 0; i < queryParameters.length; i++) {
                if (queryParameters[i].toLowerCase().indexOf("spid=") == 0) {
                    this.basicInfo["spId"] = queryParameters[i].replace(/spId=/i, "");
                } else {
                    var pos = queryParameters[i].indexOf("=");
                    if (pos === -1)
                        this.queryParams[queryParameters[i]] = "";
                    else
                        this.queryParams[queryParameters[i].substring(0, pos)] = decodeURIComponent(queryParameters[i].substring(pos + 1).replace(/\+/gi, " "));
                }
            }

        } else if (this.option.spId) {
            this.basicInfo["spId"] = this.option.spId;
        } else {
            this.basicInfo["spId"] = '';
        }

        let that = this;
        var loadSPJS = function (names) {
            var url = "";
            if (LayaCommon.isWxGame) {
                names = that.option.spName || "wxGame";
                url = "./" + names + ".js";
            } else if (LayaCommon.isTT) {
                names = that.option.spName || "tt_me";//"tt";//add xiaosong
                url = "./" + names + ".js";
            } else if (LayaCommon.isBaiduGame) {
                names = that.option.spName || "baidu_game";
                url = "./" + names + ".js";
            } else if (LayaCommon.isBili) {
                names = that.option.spName || "blGame";
                url = "./" + names + ".js";
            } else if (LayaCommon.isConchApp || window.wkbridge) {
                names = that.option.spName || "app_common";
                if (window._qudao_id == 10000 || window._qudao_id == 10001) {//测试渠道
                    url = "app/app_test.js";
                }
                else if (window._qudao != "4399_app") {
                    url = "app/app_common.js";
                }
                else {
                    url = "app/" + window._qudao + ".js";
                }
            } else if (LayaCommon.isPC) {
                names = names || "layabox_me";
                // if (that.queryParams.logintype !== void 0 && that.queryParams.browserpc !== "true") {
                //     names = "layabox_me";
                // }

                // if (window.browser == "旧" || window.browser == "B站") {
                //     names = "layabox_me";
                // }

                if (window.browser == "新") {
                    names = "layabox_me_embedded_me";
                }
                // var date = new Date();
                // var time = date.getFullYear()+""+date.getMonth()+""+date.getDay();
                // var url = "https://layamarket.layabox.com/sp/" + names + ".js?rand=" + time;

                url = "https://layamarket.layabox.com/sp/" + names + ".js";
            } else {
                names = names || "layabox_me";
                if (window.browser == "新") {
                    names = "layabox_me_embedded_me";
                }
                url = "https://layamarket.layabox.com/sp/" + names + ".js";
            }

            LayaCommon.loadScript(url, function (spJs) {
                if (LayaCommon.isWxGame || LayaCommon.isBaiduGame || LayaCommon.isTT || LayaCommon.isBili) {
                    that.spSdk = spJs.module;
                } else {
                    that.spSdk = new SPSdk();
                }

                that.gameInfo["spId"] = that.option.spId || getSpId;

                var prot = that.spSdk.__proto__;

                for (var key in prot) {
                    if (!that.__proto__[key] && key !== "init") {
                        that[key] = that.spSdk[key].bind(that.spSdk)
                    }
                }

                that.gameInfo["logonKeyInfo"] = that.logonKey;
                that.gameInfo["access_token"] = that.basicInfo["access_token"];
                that.gameInfo = Object.assign({}, that.gameInfo, that.option)

                that.spSdk.init(that.gameInfo, function (param) {

                    if (param.result == 0) {
                        that.innerLogin(loginParam);
                    } else {
                        that.loginResult = { result: -105, desc: "sp init failed[" + param.result + "]" };
                    }
                });
            }, function () {
                that.loginResult = { result: -105, desc: "sp load file failed" };
            });
        };
        loadSPJS(that.option.spName);
    }

    /**
     * 获取渠道Id
     */
    var getSpId = (function () {
        if (LayaCommon.isWxGame) {
            // 微信小游戏
            return 514;
        } else if (LayaCommon.isBaiduGame) {
            return 606;
        } else if (LayaCommon.isTT) {
            return 696;
        } else if (LayaCommon.isBili) {
            return 611;
        } else if (window._qudao == '4399_app') {
            return 616;
        } else if (window._qudao_id == 10000 || window._qudao_id == 10001) {// 测试渠道
            return 629;// 游客登录
        } else {
            return 432;
        }
    })();
    /**
     * 获取游戏openId
     */
    __proto.getOpenId = function() {
        return this.option.openId;
    }


    _g.LayaBoxMarketH5 = LayaBoxMarketH5;
    return LayaBoxMarketH5;
});
