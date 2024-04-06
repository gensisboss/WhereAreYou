var SPSdk = (function () {

    function SPSdk() {
        this.rewardedVideoAd = null;
        this.ADObj = {};
        this.reportedGameDataCache = {};
        this.version = "1.0.1";
    }

    var __proto = SPSdk.prototype;
    __proto.init = function (param, callback) {
        console.log("模版初始化：" + JSON.stringify(param));
        
        callback && callback({ "result": 0, "desc": "OK" });
    }

    __proto.login = function (param, callback) {
        this.loginCallback = callback;
        tt && tt.login({
            success: (res) => {
                console.log("登录抖音成功", res);
                callback && callback({ "result": 0, "params": res });
            },
            fail: (err) => {
                callback && callback({ result: -2, desc: "get code fail" });
            },
        });
    }
    __proto.getUserOpenId = function () {
        return this.userOpenId || '';
    }
    //显示奖励式视频广告
    __proto.showRewardVideo = function (adUnitId, callback) {
        var m_this = this;
        var adobj = m_this.ADObj[adUnitId];
        var _callback = callback;
        if (!adobj) {
            //创建广告
            adobj = createVideoAD(adUnitId);
        }
        //监听广告关闭
        adobj.onClose(function (status) {
            if ((status && status.isEnded) || status == undefined) {
                console.log("观看完成发送奖励");
                _callback && _callback({ result: 0, desc: "ok" });
            } else {
                console.log("取消");
                _callback && _callback({ result: -1, desc: "cancel" });
            }

            adobj.offClose();
            adobj.offError();
            adobj.offLoad();
        });
        //加载广告
        adobj.load()
            .then(function () {
                //广告加载成功显示广告
                adobj.show();
            })
        adobj.onError(function (err) {
            adobj.destory && adobj.destory();
            _callback && _callback({ result: -2, desc: err });
        });

        //创建视频广告
        function createVideoAD(adUnitId) {
            m_this.ADObj[adUnitId] = tt.createRewardedVideoAd({
                adUnitId: adUnitId
            });
            return m_this.ADObj[adUnitId];
        };
    };


    //显示横幅广告
    __proto.showADBanner = function (adUnitId, style, destroy, callback) {
        var m_this = this;
        destroy === void 0 && (destroy = false);
        var _callback = callback;
        var adobj = m_this.ADObj[adUnitId];
        if (!adobj) {
            adobj = m_this.createBannerAD(adUnitId, style);
        }
        if (destroy) {
            adobj.destory();
            adobj = m_this.createBannerAD(adUnitId, style);
        }

        adobj.onError(function (err) {
            console.log(err);
            _callback && _callback({ result: -2 });
        });
        adobj.onLoad(function () {
            console.log("banner 广告加载成功");
            adobj.show();
            _callback && _callback({ result: 0,  adobj: m_this.ADObj[adUnitId]});
        });

    };

    //创建横幅广告
    __proto.createBannerAD = function (adUnitId, style) {

        this.ADObj[adUnitId] = tt.createBannerAd({
            adUnitId: adUnitId,
            style: style
        });
        return this.ADObj[adUnitId];

    };

    //隐藏横幅广告
    __proto.hideADBanner = function (adUnitId, callback) {
        var adobj = this.ADObj[adUnitId];
        if (adobj) {
            adobj.offError();
            adobj.offLoad();
            adobj.hide();
            callback && callback({ result: 0 });
        } else {
            callback && callback({ result: -2 });
        }
    };


    //获取微信上报数据
    __proto.getGameData = function (_keyList, callback) {
        var _callback = callback;
        tt.getFriendCloudStorage({
            keyList: _keyList,
            success: function (res) {
                console.log(
                    "----------------getFriendUserGameData-------------ok-----------"
                );
                if (res.data) {
                    console.log(res.data);
                    _callback && _callback({ result: 0, data: res.data });
                }
            },
            fail: function (data) {
                console.log(
                    "------------getFriendUserGameData--------------fail-------"
                );
                console.log(data);
                _callback && _callback({ result: -2 });
            }
        });
    };

    // 获取自己的用户信息
    __proto.getUserInfo = function (callback) {
        var _callback = callback;
        var m_this  = this;

        tt.getUserInfo({
            success: function (userInfo) {
                verify(userInfo, function(data){
                    _callback && _callback(data);
                })
            },
            fail: function (userInfo) {
                console.log("getUserInfo fail:", userInfo);
                _callback && _callback({ result: -2, desc: userInfo });
            }
        })

        function verify(userInfo, callback,num) {
            num = num || 3
            tt.request({
                url: m_this.API_URL + "/oauth/hooks/verifyUserinfo",
                data: {
                    game_id: m_this.gameId,
                    sp_id: m_this.spId,
                    rawData: userInfo.rawData,
                    market_token: m_this.market_token,
                    signature: userInfo.signature
                },
                method: "POST",
                success: function (res) {
                    if (verifyNum--) {
                        if (res.data.ret) {
                            callback && callback({ result: -2, desc: JSON.stringify(res.data) });
                        } else {
                            var data = res.data.data;
                            m_this.userOpenId = data.spuid;
                            data.sex = userInfo.userInfo.gender;
                            data.result = 0;
                            data.desc = "ok";
                            callback && callback(data);
                        }
                    } else {
                        callback && callback({ result: -2, desc: "verifyUserinfo fail" })
                    }

                },
                fail: function () {
                    if (--num > 0) {
                        verify(userInfo, --num);
                    } else {
                        m_this.loginCallback && m_this.loginCallback({ result: -2, desc: "verifyUserInfo Request Fail" });
                    }

                }
            });
        }
    };

    //获取当前用户微信上报数据
    __proto.getSelfGameData = function (_keyList, callback) {
        var _callback = callback;
        tt.getUserCloudStorage({
            keyList: _keyList,
            success: function (res) {
                console.log(
                    "----------------getUserCloudStorage--------------ok----------"
                );
                var kvDataList = res.KVDataList;
                if (kvDataList.length) {
                    var obj = JSON.parse(kvDataList[0].value);
                    _callback && _callback({ result: 0, data: (obj.ttgame.value1) });
                } else {
                    _callback && _callback({ result: 0, data: -1 });
                }
            },
            fail: function (data) {
                console.log(
                    "------------getUserCloudStorage--------------fail-------"
                );
                console.log(data);
                _callback && _callback({ result: -2, desc: data });
            }
        });
    };

    //微信数据上报
    __proto.reportedGameData = function (key, value, callback) {
        var _callback = callback;
        var kvDataList = [];
        var _key = key + "";
        var _value = value;
        var singleData = this.reportedGameDataCache[key];
        if (!singleData) {
            singleData = {};
            singleData.ttgame = {};
            singleData.ttgame.value1 = value;
            singleData.ttgame.layaUserId = this.spuid;
            singleData.ttgame.update_time = Math.floor(Date.now() / 1000);
            this.reportedGameDataCache[key] = singleData;
        } else {
            singleData.ttgame.value1 = value;
            singleData.ttgame.update_time = Math.floor(Date.now() / 1000);
            singleData.ttgame.layaUserId = this.spuid;
            this.reportedGameDataCache[key] = singleData;
        }
        kvDataList.push({ key: key, value: JSON.stringify(singleData) });

        tt.setUserCloudStorage({
            KVDataList: kvDataList,
            success: function (e) {
                console.log("-----success:" + JSON.stringify(e));
                _callback && _callback({ result: 0 });
            },
            fail: function (e) {
                console.log("-----fail:" + JSON.stringify(e));
                _callback && _callback({ result: -2 });
            }
        });
    };

    //微信 主域向子域发消息
    __proto.postMessage = function (data) {
        tt.postMessage(data);
    };

    //微信 子域监听主域发消息
    __proto.onMessage = function (callback) {
        var _callback = callback;
        tt.onMessage(function (data) {
            _callback && _callback(data);
        });
    };

    // 分享
    __proto.share = function (param, callback) {
        var _callback = callback;

        param.share_param = [];
        for (var key in param.ext) {
            param.share_param.push(key + "=" + param.ext[key]);
        }
        param.share_param = param.share_param.join("&");
        param.image_url = param.imgUrl;
        if (param.canvas) {

            param.canvas.toTempFilePath({
                success: function (res) {
                    param.image_url = res.tempFilePath;
                    ttShare(param, _callback);
                }
            });
        } else {
            ttShare(param, _callback);
        }

    };

    //微信转发 调起
    function ttShare(cfg, callback) {
        var _callback = callback;
        var _cfg = cfg;
        tt.showShareMenu();
        tt.updateShareMenu({
            withShareTicket: true,
            success: function (data) {
                console.log("--Share----updateShareMenu------success----------");
                console.log("-----cfg:" + JSON.stringify(cfg));
                tt.shareAppMessage({
                    getGroupMsgTicket: true,
                    title: _cfg.title,
                    imageUrl: _cfg.image_url,
                    query: _cfg.share_param,
                    success: function (res) {
                        console.log("调起分享", res);
                        _callback && _callback({ result: 0 });
                    },
                    fail: function (res) {
                        console.log("分享失败", res);
                        _callback && _callback({ result: -2 });
                    }
                });
            },
            fail: function (data) {
                console.log(
                    "--Share----updateShareMenu------fail----------"
                );
                console.log(data);
                _callback && _callback({ result: -2 })
            }
        });
    };

    //微信默认转发配置
    __proto.initShareInfo = function (param, callback) {
        var _callback = callback;
        var _param = param;
        if (!param.imgUrl && param.imgsrc)
            param.imgUrl = param.imgsrc;

        if (!param.content && param.desc)
            param.content = param.desc;
        param.share_param = [];
        for (var key in param.ext) {
            param.share_param.push(key + "=" + param.ext[key]);
        }
        param.share_param = param.share_param.join("&");
        param.image_url = param.imgUrl;
        if (param.canvas) {

            param.canvas.toTempFilePath({
                success: function (res) {
                    param.image_url = res.tempFilePath;
                    initShare(_param, _callback);
                }
            });
        } else {
            initShare(_param, _callback);
        }
    };

    function initShare(cfg, callback) {
        var _cfg = cfg;
        var _callback = callback;
        tt.showShareMenu();
        tt.updateShareMenu({
            withShareTicket: true,
            success: function (data) {
                console.log("------updateShareMenu------success----------");
                console.log(data);
                tt.onShareAppMessage(function (obj) {
                    console.log("onShareAppMessage");
                    return {
                        getGroupMsgTicket: true,
                        title: _cfg.title,
                        imageUrl: _cfg.image_url,
                        query: _cfg.share_param,
                        success: function (res) {
                            console.log(res);
                            _callback && _callback({ result: 0 });
                        },
                        fail: function () {
                            _callback && _callback({ result: -2 });
                        }
                    };
                });
            },
            fail: function (data) {
                console.log("------updateShareMenu------fail----------");
                console.log(data);
                _callback && _callback({ result: -2, desc: data })
            }
        });
    }


    __proto.showGameClubButton = function (style) {
        this.GameClubButton = tt.createGameClubButton(style)
        this.GameClubButton.show();
    }

    __proto.hideGameClubButton = function () {
        this.GameClubButton.destory();
    }
    return SPSdk;
})();

module && (module.exports = new SPSdk());