/**
* @brief: 信息界面
* @ author: gongganghao
* @ data: 2023-11-15 17:42
*/
import { MessageViewBase } from "./MessageView.generated";
import Event = Laya.Event;
import { MessageItem } from "../../item/MessageItem";
import { PageManager } from "../../page/PageManager";
import { PagePath, TweenType } from "../../page/data/PageData";
import { SwitchTab } from "../../core/logic/SwitchTab";
import { IMultiListRefresh, MultiListRefresh } from "../../core/logic/MultiListRefresh";
import { ServerManager } from "../../server/ServerManager";

const { regClass } = Laya;

export enum MessageType {
    all = "",
    sms = "sms",
    official = "official",
    interact = "interact",
    follow = "follow"
}

export type MessageData = {
    selectIndex: number,
    newMessages: any
}

@regClass()
export class MessageView extends MessageViewBase implements IMultiListRefresh {


    private _data: MessageData;
    private _switchTab: SwitchTab;
    private _curType: string = MessageType.all;
    private _listDataRefresh: MultiListRefresh;
    private _listKeyArr: string[] = [MessageType.all, MessageType.sms, MessageType.official, MessageType.interact, MessageType.follow]

    onEnable(): void {
        this.backBtn.on(Event.CLICK, this, this.onBackClick)

        this._listDataRefresh = this.messageList.getComponent(MultiListRefresh);
        this._listDataRefresh.listRenderCompleteCallBack = new Laya.Handler(this, (data: any) => {
            this.tipNull.visible = data.array.length <= 0;
            this.messageList.visible = data.array.length > 0;
            if (this._curType != MessageType.all && data.array.length > 0) {
                this.sendMsgRead(this._curType);
            }
        })
        this._listDataRefresh.initListsData(this.messageList, this._listKeyArr, this);
        this.messageList.renderHandler = new Laya.Handler(this, this.renderMessageItem)
        this._switchTab = new SwitchTab();
        this._switchTab.initItems([this.allSort, this.privateSort, this.officialSort, this.commentSort, this.fanSort], this.selectTab, new Laya.Handler(this, this.getListData))

    }

    onOpened(param: MessageData): void {
        this._data = param;
        if (this._data.newMessages) {
            this.refreshUnReadPoint();
        }
        this._switchTab.onTabClick(this._data.selectIndex);
    }

    refreshUnReadPoint() {
        (this.allSort.getChildAt(1) as Laya.Image).visible = Number(this._data.newMessages['sms']) > 0 || Number(this._data.newMessages['official']) > 0 || Number(this._data.newMessages['interact']) > 0 || Number(this._data.newMessages['follow']) > 0;
        (this.privateSort.getChildAt(1) as Laya.Image).visible = Number(this._data.newMessages['sms']) > 0;
        (this.officialSort.getChildAt(1) as Laya.Image).visible = Number(this._data.newMessages['official']) > 0;
        (this.commentSort.getChildAt(1) as Laya.Image).visible = Number(this._data.newMessages['interact']) > 0;
        (this.fanSort.getChildAt(1) as Laya.Image).visible = Number(this._data.newMessages['follow']) > 0;
    }



    renderMessageItem(item: Laya.Box, index: number) {
        let messageItem = item as MessageItem;
        let data = this.messageList.array[index];
        messageItem.refreshUI(data);
    }



    onBackClick() {
        PageManager.instance.back();
    }


    getListData(index: number) {
        this._data.selectIndex = index;
        this._curType = this._listKeyArr[index];
        this._listDataRefresh.changeTabWithKey(this._curType);
    }

    //消息修改成已读
    sendMsgRead(type: string) {
        let msgIds = [];
        for (let i = 0; i < this.messageList.array.length; i++) {
            const data = this.messageList.array[i];
            if (!data.isRead) msgIds.push(data._id)
        }
        if (msgIds.length > 0) {
            let infomationData = {
                msg_id: msgIds
            }
            ServerManager.instance.httpPostJsonSend('msg/read', infomationData);
        }
        this._data.newMessages[type] = 0;
        this.refreshUnReadPoint();

    }


    refreshData(callback: Laya.Handler, data?: any): void {
        console.log("当前请求类型", this._curType)
        let _data = {
            offset: data['offset'] ? data['offset'] : 0,
            pagesize: 15,
            msgType: this._curType
        };
        ServerManager.instance.httpSendPost('msg/list', _data, callback);
    }

    onDisable(): void {
        this._switchTab = null;
        this._listDataRefresh = null;
        this.backBtn.off(Event.CLICK, this, this.onBackClick)
    }


}