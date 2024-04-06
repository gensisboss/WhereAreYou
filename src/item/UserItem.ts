/**
* @brief: 用户item
* @ author: gongganghao
* @ data: 2023-12-01 14:38
*/
import { UserItemBase } from "./UserItem.generated";
import Event = Laya.Event;
import { PageManager } from "../page/PageManager";
import { PagePath, TweenType } from "../page/data/PageData";
import { ChatViewData } from "../scene/message/ChatView";
import { GlobalData } from "../scene/data/GlobalData";
export type UserItemData = {
    developer_uid:string,
    nickname:string,
    isFollow?:boolean;
    isFans?:boolean;
    mutualfollow?:number,
    isBlack:boolean
    avatar?:string,
    setCallBack?:Laya.Handler,
    fans:number,
    chat_on:number,
}
const { regClass } = Laya;
@regClass()
export  class UserItem  extends UserItemBase{

    private _data:UserItemData;
    onEnable(): void {
        this.follow.on(Event.CLICK,this,this.onFollowClick)
        this.chatBtn.on(Event.CLICK,this,this.onChatClick)
        this.setBtn.on(Event.CLICK,this,this.onSetClick)
    }

    onFollowClick(){
        GlobalData.followSomeOne(this._data.developer_uid,true)
        this._data.mutualfollow = 1;
        this.refreshFollowState();
    }

    refreshFollowState(){
        this.chatBtn.visible = this.getCanChat();
        if(this._data.mutualfollow == 1){
            //好友
            this.follow.labelColors =  "#FFFFFF";
            this.follow.label =  "好友" ;
            this.follow.skin = "resources/images/create/followingbtn.png";
        }else if(this._data.isFollow){
            //粉丝
            this.follow.labelColors =  "#000000";
            this.follow.label =  "关注" ;
            this.follow.skin = "resources/images/create/followbtn.png";
        }else{
            //关注
            this.follow.labelColors =  "#FFFFFF";
            this.follow.label =  "已关注" ;
            this.follow.skin = "resources/images/create/followingbtn.png";
        }
    }

    onChatClick(){
        let data:ChatViewData = {
            uid:this._data.developer_uid,
            title:this._data.nickname
        }
        PageManager.instance.open(PagePath.ChatPage,data,null,true,"",{type:TweenType.Right})
    }

    onSetClick(){
        this._data.setCallBack && this._data.setCallBack.runWith(this._data.developer_uid)
    }
    
    refreshUI(data:UserItemData): void {
        this._data = data;
        this.refreshFollowState();
        this.head.refreshUI({url:data.avatar, uid:data.developer_uid})
        this.names.text = data.nickname;
        this.black.visible = data.isBlack;
        this.black.visible && (this.black.left = this.names.left + this.names.textField.textWidth + 10);
        this.fans.text = "粉丝数量：" +  data.fans;
        this.userid.text = "id: " + data.developer_uid;
        this.setBtn.visible = data.setCallBack != null
    }


    getCanChat(){
        return this._data.chat_on == 1 && !!this._data.mutualfollow;
    }

    
    
    onDisable(): void {
        this._data = null;
        this.follow.off(Event.CLICK,this,this.onFollowClick)
        this.chatBtn.off(Event.CLICK,this,this.onChatClick)
        this.setBtn.off(Event.CLICK,this,this.onSetClick)
    }
}