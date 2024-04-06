/**
* @brief: 头像框自适应
* @ author: gongganghao
* @ data: 2023-11-15 15:11
*/

import { ChatType } from "../scene/message/ChatView";
import Event = Laya.Event;
import { ChatItemBase } from "./ChatItem.generated";
import { PageManager } from "../page/PageManager";
import { PagePath, TweenType } from "../page/data/PageData";
import { GlobalData } from "../scene/data/GlobalData";
const { regClass } = Laya;

export type ChatItemData = {
    senderId: string, 
    ext: { chatType: ChatType, chatContent: any }, 
    userInfo: any,
    time?:number
}


@regClass()
export class ChatItem extends ChatItemBase {


    private static _myChatBg: string = "resources/images/common/chatMyBg.png";
    private static _otherChatBg: string = "resources/images/common/chatOtherBg.png";
    private _maxWidth: number = 400;
    private _chatSpace: number = 20;
    private _timeSpace: number = 48;
    private _isMy:boolean;

    onEnable(): void {
        this.gameDelete.on(Event.CLICK,this,this.showDeleteTip)
    }

    showDeleteTip(){
        PageManager.instance.showTip("游戏不存在");
    }



    refreshUI(data: ChatItemData,) {
        this._isMy = data.senderId == GlobalData.developer_uid;
        this.chatTime.visible = false;
        this.chatBg.visible = false;
        this.gameItem.visible = false;
        this.gameDelete.visible = false;
        this.setHeadInfo(data.userInfo)
        switch (data.ext.chatType) {
            case ChatType.game:
                this.setImgInfo(data.ext.chatContent)
                break;
            case ChatType.msg:
                this.setMsgInfo(data.ext.chatContent)
                break;
            default:
                break;
        }
    }

    setHeadInfo(userInfo: any) {
        this.head.left = this._isMy ? NaN : 10;
        this.head.right = this._isMy ? 10 : NaN;
        this.head.size(64, 64)
        if(this._isMy){
            this.head.refreshUI({ uid: GlobalData.developer_uid, url: GlobalData.avatar });
        }else{
            this.head.refreshUI({ uid: userInfo.developer_uid, url: userInfo.avatar });
        }
    }



    setMsgInfo(content: any) {
        this.chatBg.visible = true;
        this.chatBg.left = this._isMy ? NaN : 100;
        this.chatBg.right = this._isMy ? 100 : NaN;
        this.chatBg.width = this._maxWidth;
        this.chatLabel.width = this._maxWidth - this._chatSpace;
        this.chatLabel.text = content;
        this.chatBg.skin = this._isMy ? ChatItem._myChatBg : ChatItem._otherChatBg;
        if (this.chatLabel.textField.textWidth + this._chatSpace < this._maxWidth) {
            this.chatLabel.width = this.chatLabel.textField.textWidth;
            this.chatBg.width = this.chatLabel.textField.textWidth + this._chatSpace;
        }
        this.chatBg.height = this.chatLabel.textField.textHeight + this._chatSpace;
        this.height = this.chatBg.height + (this.chatTime.visible ? this._timeSpace : 0);
    }



    setImgInfo(data: any) {
        if(data.audit_status == 2){
            this.gameDelete.visible = false;
            this.gameItem.visible = true;
            this.gameItem.left = this._isMy ? NaN : 100;
            this.gameItem.right = this._isMy ? 100 : NaN;
            data.callback = new Laya.Handler(this, async () => {
                PageManager.instance.open(PagePath.SubjectPage, { list: [data], curSelect: 0 }, null, true, "", { type: TweenType.Right })
            })
            this.height = this.gameItem.height + (this.chatTime.visible ? this._timeSpace : 0) + this._chatSpace;
            this.gameItem.refreshUI(data)
        }else{
            this.gameDelete.visible = true;
            this.gameItem.visible = false;
            this.gameDelete.left = this._isMy ? NaN : 100;
            this.gameDelete.right = this._isMy ? 100 : NaN;
            this.height = this.gameDelete.height + (this.chatTime.visible ? this._timeSpace : 0) + this._chatSpace;
        }
       
    }




    onDisable() {
        this.height = 0;
        this.gameDelete.off(Event.CLICK,this,this.showDeleteTip)

    }

}