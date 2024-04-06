/**
* @brief: 单条信息渲染
* @ author: gongganghao
* @ data: 2023-11-16 16:17
*/
import { MessageItemBase } from "./MessageItem.generated";
import Event = Laya.Event;
import { PageManager } from "../page/PageManager";
import { PagePath, TweenType } from "../page/data/PageData";
import { GlobalData } from "../scene/data/GlobalData";

const { regClass, property } = Laya;




@regClass()
export class MessageItem extends MessageItemBase {


    private _data: any;
    private _otherData: any;
    get otherInfoData(): any {
        if (this._otherData == undefined || this._otherData == null) {
            return GlobalData.userData;
        }
        return this._otherData;
    }

    onEnable(): void {
        this.chatBtn.on(Event.CLICK, this, this.onChatClick)
        this.stateBtn.on(Event.CLICK, this, this.onFollowClick)
        this.on(Event.CLICK, this, this.onItemClick);
    }


    onChatClick() {
        PageManager.instance.open(PagePath.ChatPage, null, null, true, "", { type: TweenType.Right })
    }


    onFollowClick() {

    }

    onItemClick() {
        switch (this.dataSource.msgType) {
            case "sms":
                if (this.otherInfoData.isBlack) {
                    PageManager.instance.showTip("你已拉黑该用户，请解除拉黑后在操作！");
                } else if (this.otherInfoData.isBlacked) {
                    PageManager.instance.showTip("打开失败，对方设置了访问权限！");
                } else {
                    // this._callback && this._callback.runWith(["sms", null, this._data]);
                }
                break;
            case "follow":
                if (this.otherInfoData.isBlacked) {
                    PageManager.instance.showTip("打开失败，对方设置了访问权限！");
                    return;
                }
                // this._callback && this._callback.runWith(["home", null, this.otherInfoData.developer_uid]);
                break;
            case "visitHome":
                if (this.otherInfoData.isBlacked) {
                    PageManager.instance.showTip("打开失败，对方设置了访问权限！");
                    return;
                }
                // this._callback && this._callback.runWith(["home", null, this.otherInfoData.developer_uid]);
                break;
            case "auditresult":
                if (this.dataSource.ext.type == "scenes_game" && this.dataSource.ext.result == "2") {
                    // this._callback && this._callback.runWith(["auditresult"]);
                }
                break;
            case "gameAudit":
                if (this._data.ext.isBlack) {
                    PageManager.instance.showTip("你已拉黑该游戏，请解除拉黑后在操作！");
                }
                else if (this._data.ext.audit_status < 0) {
                    PageManager.instance.showTip("游戏已被删除,无法查看");
                }
                else {
                    // this._callback && this._callback.runWith(["game", null, this._data.ext.game_id]);
                }
                break;
        }
    }



    refreshUI(data: any) {
        this._data = data;
        this.stateBtn.visible = false;
        this.game.visible = false;
        this.chatBtn.visible = false;
        if (GlobalData.developer_uid == data.userId) {
            this._otherData = data.senderInfo;
        } else {
            this._otherData = data.userInfo;
        }
        this.head.refreshUI({ uid: this.otherInfoData.developer_uid, url: this.otherInfoData.avatar })
        switch (data.msgType) {
            case "sms"://私信
                var isSender = data.senderId == GlobalData.developer_uid;
                if (data.ext.chatType == 1) {
                    //文本消息
                    let msg = data.ext.chatContent;
                    this.desc.text = isSender ? '私信ta:' + msg : '私信你:' + msg;
                } else if (data.ext.chatType == 2) {
                    //游戏消息
                    let msg = data.ext.chatContent.game_name;
                    this.desc.text = isSender ? '私信ta：推荐游戏' + msg : '私信你：推荐游戏' + msg;
                }
                this.names.text = this.otherInfoData.nickname;
                break;
            case "gameAudit"://游戏审核
                this.game.visible = true;
                this.game.refreshUI({ info: data.ext })
                if (data.ext.audit_status == '2') {
                    this.desc.text = '恭喜,你的游戏' + data.ext.game_name + '通过了审核!';
                } else if (data.ext.audit_status == '3') {
                    this.desc.text = '很遗憾,你的游戏' + data.ext.game_name + '未通过审核!';
                }
                this.names.text = "官方";
                break;
            case "bgAudit"://背景审核
                if (data.ext.audit_status == '2') {
                    this.desc.text = '恭喜,你的背景通过了审核!';
                } else if (data.ext.audit_status == '3') {
                    this.desc.text = '很遗憾,你的背景未通过审核!';
                }
                this.names.text = "官方";
                break;
            case "reward"://激励卡奖励
                this.desc.text = '恭喜你获得'+data.ext.reward+"张激励卡";
                this.names.text = "官方";
                break;
            case "userAudit"://个人信息审核
                if (data.ext.audit_status == '2') {
                    this.desc.text = '恭喜,你的个人信息通过了审核!';
                }
                else if (data.ext.audit_status == '3') {
                    this.desc.text = '很遗憾,你的个人信息未通过审核!';
                }
                this.names.text = "官方";
                break;
            case "closure"://账号封禁、解封、注销
                if (data.ext.clourse == '0') {//解封
                    this.desc.text = "你的账号已恢复正常使用!";
                    this.names.text = "官方";
                }
                else if (data.ext.clourse == '1') {//封禁
                    this.desc.text = '你的账号因' + data.ext.reason + '被暂停使用!';
                    this.names.text = "官方";
                }
                else if (data.ext.closure == '2') {//注销

                }
                break;
            case "gameDownline"://游戏下架
                this.names.text = "官方";
                this.desc.text = '你的游戏' + data.ext.game_name + '因' + data.ext.audit_msg + '违规,被平台下架了!';
                this.game.visible = true;
                this.game.refreshUI({ info: data.ext })
                break;
            case "comment"://评论/赞  评论/回复
                let msg = data.ext.comment_cnt;
                if (msg.length > 12) {
                    msg = msg.substr(0, 12) + "...";
                }
                this.desc.text = '评论了你:' + msg;
                this.names.text = this.otherInfoData.nickname;
                this.chatBtn.visible = true;
                this.game.visible = true;
                this.game.refreshUI({ info: data.ext })
                break;
            case "commentLike"://评论点赞
                this.names.text = this.otherInfoData.nickname;
                this.desc.text = "点赞了你的评论";
                this.game.visible = true;
                this.game.refreshUI({ info: data.ext })
                break;
            case "gameLike"://点赞游戏
                this.names.text = this.otherInfoData.nickname;
                this.desc.text = "点赞了你的游戏";
                this.game.visible = true;
                this.game.refreshUI({ info: data.ext })
                break;
            case "gameCollect"://游戏收藏
                this.names.text = this.otherInfoData.nickname;
                this.desc.text = "收藏了你的游戏";
                this.game.visible = true;
                this.game.refreshUI({ info: data.ext })
                break;
            case "playGame"://游玩游戏
                this.names.text = this.otherInfoData.nickname;
                this.desc.text = "游玩了你的游戏";
                this.game.visible = true;
                this.game.refreshUI({ info: data.ext })
                break;
            case "visitHome"://访问主页
                this.names.text = this.otherInfoData.nickname;
                this.desc.text = "访问了你的主页";
                break;
            case "follow"://关注
                let isfollow = true;
                if (isfollow && this.otherInfoData.isFans) {
                    this.stateBtn.label = '好友';
                    this.stateBtn.skin = "resources/images/common/sousuoyiguanzhu.png";
                    this.stateBtn.labelColors = "#999999";
                } else if (isfollow) {
                    this.stateBtn.label = '已关注';
                    this.stateBtn.skin = "resources/images/common/sousuoyiguanzhu.png";
                    this.stateBtn.labelColors = "#999999";
                } else if (this.otherInfoData.isFans) {
                    this.stateBtn.label = '回关';
                    this.stateBtn.skin = "resources/images/common/sousuoyiguanzhu.png";
                    this.stateBtn.labelColors = "#FFFFFF";
                } else {
                    this.stateBtn.label = '关注';
                    this.stateBtn.skin = "resources/images/common/sousuoyiguanzhu.png";
                    this.stateBtn.labelColors = "#FFFFFF";
                }
                this.stateBtn.visible = true;
                this.desc.text = "关注了你";
                this.names.text = this.otherInfoData.nickname;
                break;
            default:
                console.log("类型异常,请确认该类型:" + data.content);
                break;
        }
        this.chatBtn.visible = false;
    }




    onDisable(): void {
        this._data = null;
        this._otherData = null;
        this.off(Event.CLICK, this, this.onItemClick);
        this.chatBtn.off(Event.CLICK, this, this.onChatClick)
        this.stateBtn.off(Event.CLICK, this, this.onFollowClick)
    }


}