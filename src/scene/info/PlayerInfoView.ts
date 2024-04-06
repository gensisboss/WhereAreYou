/**
* @brief: 玩家信息界面
* @ author: gongganghao
* @ data: 2023-11-01 14:01
*/

import { PlayerInfoViewBase } from "./PlayerInfoView.generated";
import Event = Laya.Event;
import { SwitchTab } from "../../core/logic/SwitchTab";
import { IMultiListRefresh, MultiListRefresh, TTabListData } from "../../core/logic/MultiListRefresh";
import { TweenType, PagePath } from "../../page/data/PageData";
import { PageManager } from "../../page/PageManager";
import { HeadData } from "../../item/Head";
import { PreviewIconData } from "./PreviewIconView";
import { NestList } from "../../core/logic/NestList";
import { SocailType, SocialData } from "./SocailView";
import { PraiseData } from "../home/PraiseView";
import { GlobalData, UserDataKey } from "../data/GlobalData";
import { ServerManager } from "../../server/ServerManager";
import { GameItem } from "../../item/GameItem";
import { ChatViewData } from "../message/ChatView";
import { ListChooseData } from "../home/ListChooseView";
import { MessageData } from "../message/MessageView";


const { regClass } = Laya;

export enum PlayerListType {
    create = "create",
    history = "history",
    like = "like",
    collect = "collect",
}




@regClass()
export class PlayerInfoView extends PlayerInfoViewBase implements IMultiListRefresh {

    private _userId: string;
    private _userData: any;
    private _isSelf: boolean = true;
    private _switchTab: SwitchTab;
    private _listDataRefresh: MultiListRefresh;
    private _listKeyArr: string[] = []
    private _curType: string = PlayerListType.create;
    //用户是否关注当前玩家
    private _isFollowOther: boolean;
    private _messageData: any;

    onEnable(): void {
        this.backBtn.on(Event.CLICK, this, this.onBackBtnClick)
        // this.playerBg.on(Event.CLICK, this, this.onChangeBgClick)
        // this.infoBox.on(Event.CLICK, this, this.onChangeBgClick)
        this.editInfo.on(Event.CLICK, this, this.onEditInfoClick)
        this.nickName.on(Event.CLICK, this, this.onEditInfoClick)
        this.slogan.on(Event.CLICK, this, this.onEditInfoClick)
        this.message.on(Event.CLICK, this, this.onMessageClick)
        this.setting.on(Event.CLICK, this, this.onSettingClick)
        this.followBtn.on(Event.CLICK, this, this.onFollowClick)
        this.chatBtn.on(Event.CLICK, this, this.onChatClick)
        this.praise.on(Event.CLICK, this, this.onPraiseClick)
        this.follow.on(Event.CLICK, this, this.onSocialClick, [SocailType.follow])
        this.fan.on(Event.CLICK, this, this.onSocialClick, [SocailType.fan])

        this._listDataRefresh = this.gameList.getComponent(MultiListRefresh);
        this._listDataRefresh.listRenderCompleteCallBack = new Laya.Handler(this, this.onListRenderCb)
        this.gameList.renderHandler = new Laya.Handler(this, this.renderGameItem)
        this.Panel.getComponent(NestList).limitHandler = new Laya.Handler(this, (isLimit: boolean) => {
            this.topBox.visible = isLimit;
        })
       

    }

    onOpened(uid: string): void {
        this._userId = uid;
        this._isSelf = this._userId == GlobalData.developer_uid;
        this.myBtnBox.visible = this._isSelf;
        this.otherBtnBox.visible = !this._isSelf;
        this.backBox.visible = this.parent.name != "pageBox";
        this.refreshTab();
        this.getInformationCount();
        this.refreshPlayerInfo();
    }

    refreshTab() {
        let arr = []
        let space = 0;
        let width = 0;
        this._switchTab = new SwitchTab();
        if (this._isSelf) {
            width = 150;
            this.historySort.visible = true;
            arr = [this.createSort, this.likeSort, this.collectSort,this.historySort,]
            this._listKeyArr = [PlayerListType.create, PlayerListType.like, PlayerListType.collect, PlayerListType.history];
        } else {
            width = 200;
            this.historySort.visible = false;
            arr = [this.createSort, this.likeSort, this.collectSort]
            this._listKeyArr = [PlayerListType.create, PlayerListType.like, PlayerListType.collect];
        }
        space  = (Laya.stage.width-width*arr.length)/(arr.length+1);
        for (let i = 0; i < arr.length; i++) {
           let btn = arr[i] as Laya.Label;
           btn.width = width;
           btn.x = i*width+space*(i+1);
        }
        this._listDataRefresh.initListsData(this.gameList, this._listKeyArr, this);
        this._switchTab.initItems(arr, this.selectTab, new Laya.Handler(this, this.getListData))
        this._switchTab.onTabClick(0);
    }


    getInformationCount() {
        var data: any = {
            isRead: false,
        };
        ServerManager.instance.httpSendPost('msg/groupCount', data, new Laya.Handler(this, this.onGetInformationCB));
    }

    onGetInformationCB(data: any) {
        let redNumber = 0;
        if (data.data) {
            let _data = data.data;
            if (_data['official']) redNumber += Number(_data['official']);
            if (_data['sms']) redNumber += Number(_data['sms']);
            if (_data['interact']) redNumber += Number(_data['interact']);
            if (_data['follow']) redNumber += Number(_data['follow']);
            this.messageTip.visible = redNumber > 0
            this._messageData = _data;
        }
    }


    async getUserInfo() {
        return new Promise((resolve, reject) => {
            if (this._isSelf) {
                resolve(GlobalData.userData);
            } else {
                var data: any = {
                    developer_uid: this._userId,
                };
                let callBack = new Laya.Handler(this, (obj: any) => {
                    if (obj.success || obj.ret == 0) {
                        resolve(obj.data)
                    } else {
                        reject(obj.msg)
                    }
                })
                ServerManager.instance.httpSendPost('developer/getUserInfo', data, callBack);
            }
        })
    }

    refreshSocialInfo(data: any) {
        (this.follow.getChildByName("num") as Laya.Label).text = data.follow;
        (this.fan.getChildByName("num") as Laya.Label).text = data.fans;
        (this.praise.getChildByName("num") as Laya.Label).text = data.likenum;
    }

    updateTaFollow() {
        if (this._isFollowOther && this._userData.isFans) {
            this.updateFollowState('好友', "#999999", "resources/images/common/sousuoyiguanzhu.png", true)
        } else if (this._isFollowOther) {
            this.updateFollowState('已关注', "#999999", "resources/images/common/sousuoyiguanzhu.png", false)
        } else if (this._userData.isFans) {
            this.updateFollowState('回关', "#FFFFFF", "resources/images/common/guanzhuicon.png", false)
        } else {
            this.updateFollowState('关注', "#FFFFFF", "resources/images/common/guanzhuicon.png", true)
        }
    }

    updateFollowState(name: string, nameColor: string, skinPath: string, isWidth: boolean) {
        this.followBtn.label = name;
        this.followBtn.labelColors = nameColor;
        this.followBtn.skin = skinPath;
        this.followBtn.width = isWidth ? 300 : 340;
        this.chatBtn.width = isWidth ? 300 : 260;
    }

    async refreshPlayerInfo() {
        this._userData = await this.getUserInfo() as any;
        let headHandle = new Laya.Handler(this, () => {
            if (!this._isSelf) {
                return;
            }
            let previewData: PreviewIconData = {
                isPure: false,
                url: this._userData.avatar,
                isHead: true,
                callback: Laya.Handler.create(this, this.changeIconCallBack, [true])
            }
            PageManager.instance.open(PagePath.PreviewIconPage, previewData, null, true, "", { type: TweenType.Right })
        })

        if (!this._isSelf) {
            this._isFollowOther = this._userData.isFollow;
            this.updateTaFollow();
        }
        let headData: HeadData = {
            uid: this._userData.developer_uid,
            url: this._userData.avatar,
            callback: headHandle,
        }
        this.head.refreshUI(headData);
        this.nickName.text = this.otherName.text = this._userData.nickname;
        this.slogan.text = this._userData.slogan || "这个人很懒，还没有写介绍";
        this.refreshSocialInfo(this._userData);
        this.updateLockShow();
    }

    setBgSkin() {
        if (this._userData.bg.length > 0) {
            Laya.loader.load(this._userData.bg, Laya.Handler.create(this, (res: any) => {
                this.playerBg.skin = this._userData.bg;
                let scaleRatio = 620 / res.sourceHeight;
                this.playerBg.height = 620;
                this.playerBg.width = scaleRatio * res.sourceWidth;
            }))
        }

    }

    onBackBtnClick() {
        PageManager.instance.back();
    }

    onSocialClick(curtype: SocailType, e: Event) {
        e.stopPropagation();
        let data: SocialData = {
            uid: this._userId,
            type: curtype
        }
        PageManager.instance.open(PagePath.SocailPage, data, null, true, "", { type: TweenType.Right })
    }

    onFollowClick() {
        this.followBtn.mouseEnabled = false;
        if (this._isFollowOther) {
            GlobalData.followSomeOne(this._userId, false, Laya.Handler.create(this, this.onFollowCallBack, [false]))
        } else {
            GlobalData.followSomeOne(this._userId, true, Laya.Handler.create(this, this.onFollowCallBack, [true]))
        }

    }

    onFollowCallBack(isFollow: boolean, data: any) {
        this.followBtn.mouseEnabled = true;
        if (data.success) {
            this._isFollowOther = !this._isFollowOther;
            this.updateTaFollow();
            if (isFollow) {
                this._userData.fans = Number.parseInt(this._userData.fans) + 1;
            } else {
                this._userData.fans = Number.parseInt(this._userData.fans) - 1;
            }
            this.refreshSocialInfo(this._userData);
        }
        else {
            if (isFollow) {
                PageManager.instance.showTip("关注失败！请稍后再试！");
            } else {
                PageManager.instance.showTip("取消关注失败！请稍后再试！");
            }
        }
    }

    onChatClick() {
        if (GlobalData.getClosure(this._userData)) {
            PageManager.instance.showTip("由于该账号封禁，无法发私信");
        } else {
            //检测会否设置了私信
            if (this.checkSmstype()) {
                //可以发送
                let data: ChatViewData = {
                    uid: this._userData.developer_uid,
                    title: this._userData.nickname,
                }
                PageManager.instance.open(PagePath.ChatPage, data, null, true, "", { type: TweenType.Right })
            } else {
                PageManager.instance.showTip("该用户设置了私信权限");
            }
        }

    }

    onSettingClick() {
        PageManager.instance.open(PagePath.SettingPage, null, null, true, "", { type: TweenType.Right })
    }

    //检测会否设置了私信
    checkSmstype() {
        let isSms_type = false;
        let sms_type = Number(this._userData.sms_type);
        let isFollow = this._userData.isFollow;
        let isFans = this._userData.isFans;
        if (sms_type == 0) {
            isSms_type = false;
        } else if (sms_type == 3) {
            isSms_type = true;
        } else if (sms_type == 1 && isFollow && isFans) {
            isSms_type = true;
        } else if (sms_type == 2 && isFollow) {
            isSms_type = true;
        }
        return isSms_type;
    }

    onMessageClick() {
        let data: MessageData = {
            selectIndex: 0,
            newMessages: this._messageData
        }
        PageManager.instance.open(PagePath.MessagePage, data, null, true, "", { type: TweenType.Right })
    }

    onChangeBgClick() {
        if (!this._isSelf) {
            return;
        }
        let previewData: PreviewIconData = {
            isPure: false,
            url: this._userData.bg,
            isHead: false,
            callback: Laya.Handler.create(this, this.changeIconCallBack, [false])
        }
        PageManager.instance.open(PagePath.PreviewIconPage, previewData, null, true, "", { type: TweenType.Right })
    }

    onPraiseClick(e: Event) {
        e.stopPropagation();
        let data: PraiseData = {
            user: this._userData.nickname,
            num: this._userData.likenum,
        }
        PageManager.instance.open(PagePath.PraisePage, data)
    }

    changeIconCallBack(isHead: boolean, url: string) {
        if (isHead) {
            GlobalData.updateUserData(UserDataKey.avatar, url)
            var data: any = {
                avatar: url,
                device: GlobalData.getPlatform(), // 必填 客户端系统 android|ios
            };
            ServerManager.instance.httpSendPost('developer/updateUserInfo', data);
        } else {
            GlobalData.updateUserData(UserDataKey.bg, ServerManager.instance.formatUrl(url))
            var data: any = {
                bg: ServerManager.instance.formatUrl(url),
                device: GlobalData.getPlatform(), // 必填 客户端系统 android|ios
            };
            ServerManager.instance.httpSendPost('developer/updateBgInfo', data);
        }
    }



    renderGameItem(item: Laya.Box, index: number) {
        let gameItem = item as GameItem;
        let data = this.gameList.array[index];
        data.showHead = this._curType != PlayerListType.create;
        data.callback = new Laya.Handler(this, () => {
            if (this._curType == PlayerListType.create && this._isSelf) {
                let listdata: ListChooseData = {
                    arr: ["试玩", "删除"],
                    colors: ["#FFFFFF", "#FF0000"],
                    callback: new Laya.Handler(this, this.chooseViewCB, [data.game_id, index])
                }
                PageManager.instance.open(PagePath.ListChoosePage, listdata)
            } else {
                PageManager.instance.open(PagePath.SubjectPage, { list: this.gameList.array, curSelect: index }, null, true, "", { type: TweenType.Right })
            }
        })

        gameItem.refreshUI(data);
    }


    chooseViewCB(gameId: string, index: number, choose: string) {
        let gamedata: any = {
            game_id: gameId,
            from_game_id: 0
        };
        switch (choose) {
            case "试玩":
                PageManager.instance.open(PagePath.SubjectPage, { list: this.gameList.array, curSelect: index }, null, true, "", { type: TweenType.Right })
                break;
            case "删除":
                PageManager.instance.showConfirm("删除后将不可恢复，确定删除吗？", null, null, Laya.Handler.create(this, (isSure: boolean) => {
                    if (isSure) {
                        ServerManager.instance.httpSendPost('editor/gameDelete', gamedata, Laya.Handler.create(this, () => {
                            this.gameList.array.splice(index, 1);
                            this.gameList.refresh();
                        }));
                    }
                }));
                break;
            default:
                break;
        }
    }

    updateLockShow() {
        this.likeLock.visible = this.getShowState(this._userData["look_like"]);
        this.collectLock.visible = this.getShowState(this._userData["look_favorite"]);
    }

    getShowState(state: any): boolean {
        // 0 公开 1 好友 2 粉丝 3 私密
        switch (state) {
            case "0":
                return true;
            case "1":
                return !(this._userData.isFans && this._userData.isFollow);
            case "2":
                return !this._userData.isFollow;
            case "3":
                return false;
        }
    }



    //#region 列表数据相关

    onListRenderCb(data: TTabListData) {
        if (this._isSelf) {
            if (data.array && data.array.length) {
                this.changeTipsState(5);
                this.gameList.visible = true;
                this.Panel.scrollType = Laya.ScrollType.Vertical;
            }
            else {
                this.changeTipsState(4);
                this.gameList.visible = false;
                this.topBox.visible = false;
                this.Panel.scrollType = Laya.ScrollType.None;
            }
        }
        else {
            this.refreshListShowByData(data.array);
        }
    }
    refreshListShowByData(arr: any[]) {
        if (!this._userData) {
            return;
        }
        if (GlobalData.getClosure(this._userData)) {
            this.changeTipsState(0);
            this.gameList.visible = false;
        }
        else if (this._userData.isBlack) {
            this.changeTipsState(1);
            this.gameList.visible = false;
        }
        else if (this.likeLock.visible && this._curType == PlayerListType.like) {
            this.changeTipsState(2);
            this.gameList.visible = false;
        }
        else if (this.collectLock.visible && this._curType == PlayerListType.collect) {
            this.changeTipsState(3);
            this.gameList.visible = false;
        }
        else if (!arr || !arr.length) {
            this.changeTipsState(4);
            this.gameList.visible = false;
        }
        else {
            this.changeTipsState(5);
            this.gameList.visible = true;
        }
    }

    /**
    * 提示窗口
    * @param type 0为封号,1为拉黑,2为喜欢私密,3为收藏私密,4为列表提示,5为不显示,
    */
    changeTipsState(type: number) {
        if (GlobalData.getClosure(this._userData)) {
            type = 0;
        } else if (this._userData.isBlack) {
            type = 1;
        }
        this.tips.visible = true;
        switch (type) {
            case 0://0为封号
                this.tipsIcon.skin = "resources/images/info/laheiyonghu.png";
                this.tipsTxt.text = "账号已被封禁";
                break;
            case 1://1为拉黑
                this.tipsIcon.skin = "resources/images/info/laheiyonghu.png";
                this.tipsTxt.text = "该用户已被你拉黑";
                break;
            case 2://2为喜欢私密
                this.tipsIcon.skin = "resources/images/info/zanwuyouxi.png";
                this.gameList.visible = false;
                this.tipsTxt.text = "该用户将喜欢内容设为私密";
                break;
            case 3://3为收藏私密
                this.tipsIcon.skin = "resources/images/info/zanwuyouxi.png";
                this.gameList.visible = false;
                this.tipsTxt.text = "该用户将收藏内容设为私密";
                break;
            case 4://4为列表提示
                this.gameList.visible = false;
                this.tipsIcon.skin = "resources/images/info/zanwuziliao.png";
                this.tipsTxt.text = "暂无数据";
                break;
            case 5://5为不显示
                this.tips.visible = false;
                break;
        }
    }


    getListData(index: number) {
        this._curType = this._listKeyArr[index]
        this._listDataRefresh.changeTabWithKey(this._curType)
    }


    refreshData(callback: Laya.Handler, data?: TTabListData): void {
        let _data = {
            developer_uid: parseInt(this._userId),
            offset: data.offset ? data.offset : 0,
            pagesize: 18,
        };
        switch (this._curType) {
            case PlayerListType.create:
                ServerManager.instance.httpSendPost('vincent/game/personGameList', _data, callback);
                break;
            case PlayerListType.like:
                ServerManager.instance.httpSendPost('vincent/game/likeList', _data, callback);
                break;
            case PlayerListType.collect:
                ServerManager.instance.httpSendPost('vincent/game/collectList', _data, callback);
                break;
            case PlayerListType.history:
                ServerManager.instance.httpSendPost('vincent/game/playedList', _data, callback);
                break;
        }
    }
    //#endregion


    onEditInfoClick(e: Event) {
        if (!this._isSelf) {
            return;
        }
        e.stopPropagation();
        PageManager.instance.open(PagePath.EditInfoPage, null, null, true, "", { type: TweenType.Right })
    }



    onDisable(): void {
        this._switchTab = null;
        this._listDataRefresh = null;
        this.backBtn.off(Event.CLICK, this, this.onBackBtnClick)
        // this.infoBox.off(Event.CLICK, this, this.onChangeBgClick)
        this.editInfo.off(Event.CLICK, this, this.onEditInfoClick)
        this.nickName.off(Event.CLICK, this, this.onEditInfoClick)
        this.slogan.off(Event.CLICK, this, this.onEditInfoClick)
        // this.playerBg.off(Event.CLICK, this, this.onChangeBgClick)
        this.message.on(Event.CLICK, this, this.onMessageClick)
        this.setting.on(Event.CLICK, this, this.onSettingClick)
        this.followBtn.on(Event.CLICK, this, this.onFollowClick)
        this.chatBtn.on(Event.CLICK, this, this.onChatClick)
        this.follow.on(Event.CLICK, this, this.onSocialClick)
        this.fan.on(Event.CLICK, this, this.onSocialClick)
        this.praise.on(Event.CLICK, this, this.onPraiseClick)
    }

}