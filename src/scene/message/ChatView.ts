/**
* @brief: 信息界面
* @ author: gongganghao
* @ data: 2023-11-15 17:42
*/
import { FlowList } from "../../core/logic/FlowList";
import { ChatItem, ChatItemData } from "../../item/ChatItem";
import { PageManager } from "../../page/PageManager";
import Event = Laya.Event;
import { ChatViewBase } from "./ChatView.generated";
import { IMultiListRefresh, MultiListRefresh, TTabListData } from "../../core/logic/MultiListRefresh";
import { SwitchTab } from "../../core/logic/SwitchTab";
import { PlayerListType } from "../info/PlayerInfoView";
import { GlobalData } from "../data/GlobalData";
import { ServerManager } from "../../server/ServerManager";
import { GameItem } from "../../item/GameItem";

export enum ChatType {
    msg = 1,
    game = 2
}


export type ChatViewData = {
    uid: string,
    title?: string,
    list?: any;
}


const { regClass } = Laya;

@regClass()
export class ChatView extends ChatViewBase implements IMultiListRefresh {

    private _chatFlowList: FlowList;
    private _switchTab: SwitchTab;
    private _listDataRefresh: MultiListRefresh;
    private _listKeyArr: string[] = [PlayerListType.create, PlayerListType.like, PlayerListType.collect]
    private _curType: string = PlayerListType.create;
    private _data: ChatViewData;
    private _isOpenList: boolean = false;

    onEnable(): void {
        this.backBtn.on(Event.CLICK, this, this.onBackClick)
        this.sendBtn.on(Event.CLICK, this, this.onSendClick)
        this.changeBtn.on(Event.CLICK, this, this.onChangeClick)
        this.sendInput.on(Event.INPUT, this, this.onInputChang)

        this._chatFlowList = this.chatList.getComponent(FlowList);
        this._chatFlowList.renderHandler = new Laya.Handler(this, this.renderChatItem)

        this._listDataRefresh = this.gameList.getComponent(MultiListRefresh);
        this._listDataRefresh.listRenderCompleteCallBack = new Laya.Handler(this, (data: any) => {
            this.tipNull.visible = data.array.length <= 0;
        })
        this._listDataRefresh.initListsData(this.gameList, this._listKeyArr, this);
        this.gameList.renderHandler = new Laya.Handler(this, this.renderGameItem)
        this._switchTab = new SwitchTab();
        this._listDataRefresh.setFliterFunction(PlayerListType.create, this.fliterFun)
        this._switchTab.initItems([this.createSort, this.likeSort, this.collectSort], this.selectTab, new Laya.Handler(this, this.getListData))

    }

    onOpened(param: ChatViewData): void {
        this._data = param;
        this.getContentList(param.uid)
        this.title.text = param.title || "聊天";
        this._switchTab.onTabClick(0);
    }

    getContentList(uid: string) {
        let data = {
            offset: 0,
            pagesize: 20,
            developer_uid: uid
        };
        ServerManager.instance.httpSendPost('msg/smsList', data, Laya.Handler.create(this, (info) => {
            if (info.ret == 0) {
                this._chatFlowList.array = info.data.list;
                this._chatFlowList.array.reverse();
                this._chatFlowList.refresh();
            }
        }));
    }

    onInputChang() {
        this.sendBtn.mouseEnabled = this.sendInput.text.length > 0;
        this.sendBtn.selected = this.sendInput.text.length > 0;
    }

    fliterFun(data: any) {
        return data.audit_status != 0;
    }

    onChangeClick() {
        this._isOpenList = !this._isOpenList;
        this.changeBtn.skin = this._isOpenList ? "resources/images/common/tianjiajianpan.png" : "resources/images/common/tianjiatupian.png";
        this.listBox.visible = this._isOpenList;
        this.bottomBox.height = this._isOpenList ? this.inputBox.height + this.listBox.height : this.inputBox.height;
        if (this._isOpenList) {
            this._switchTab.onTabClick(this._switchTab.curSelect)
        }
    }

    onBackClick() {
        PageManager.instance.back();
    }

    onSendClick() {
        let chatData: ChatItemData = {
            senderId: GlobalData.developer_uid, 
            ext: { chatType: ChatType.msg, chatContent: this.sendInput.text }, 
            userInfo: { avatar: GlobalData.avatar, developer_uid: GlobalData.developer_uid } 
        };
        this._chatFlowList.array.push(chatData);
        this._chatFlowList.refresh();
        this.sendMsg(ChatType.msg,this.sendInput.text)
        this.sendInput.text = ""
        this.onInputChang();
    }

    onSendGameClick(gameInfo: any) {
        let chatData: ChatItemData = {
            senderId: GlobalData.developer_uid, 
            ext: { chatType: ChatType.game, chatContent: gameInfo }, 
            userInfo: { avatar: GlobalData.avatar, developer_uid: GlobalData.developer_uid } 
        };
        this._chatFlowList.array.push(chatData);
        this._chatFlowList.refresh();
        this.sendMsg(ChatType.game,gameInfo.game_id)
    }

    sendMsg(type: number, info: any, callback?: Laya.Handler){
        let data = {
            developer_uid: this._data.uid,
            chatType: type,
            chatContent: info,
            device:GlobalData.getPlatform(),
            edition: "official"
        };
        ServerManager.instance.httpSendPost('msg/sendMessage', data,callback);
    }



    renderGameItem(item: Laya.Box, index: number) {
        let gameItem = item as GameItem;
        let data = this.gameList.array[index];
        data.showHead = this._curType != PlayerListType.create;
        data.callback = new Laya.Handler(this, this.onSendGameClick, [data])
        gameItem.refreshUI(data);
    }

    renderChatItem(item: Laya.Box, data: any, index: number) {
        let chatItem = item as ChatItem;
        chatItem.refreshUI(data);
    }


    //#region 列表数据相关

    getListData(index: number) {
        this._curType = this._listKeyArr[index]
        this._listDataRefresh.changeTabWithKey(this._curType)
    }




    refreshData(callback: Laya.Handler, data?: TTabListData): void {
        let _data = {
            developer_uid: parseInt(GlobalData.developer_uid),
            offset: data.offset ? data.offset : 0,
            pagesize: 9,
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
        }
    }
    //#endregion






    onDisable(): void {
        this._switchTab = null;
        this._listDataRefresh = null;
        this.changeBtn.off(Event.CLICK, this, this.onChangeClick)
        this.backBtn.off(Event.CLICK, this, this.onBackClick)
        this.sendBtn.off(Event.CLICK, this, this.onSendClick)
        this.sendInput.off(Event.INPUT, this, this.onInputChang)
    }

}