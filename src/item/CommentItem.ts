/**
* @brief: 评论item
* @ author: gongganghao
* @ data: 2023-11-23 17:11
*/
export type CommentItemData = {
    uid?:string;
    isAuthor:boolean;//是否是作者
    name:string;//评论人名称
    icon?:string //评论人头像
    time:number,//上传的时间戳
    likeNum:number,//当前评论点赞数量
    isLike:boolean,//当前评论是否点赞
    commentId?:number,//当前评论ID
    desc:string,//评论内容
    gameId?:number,//游戏ID
    offset?:number;//页数偏移量
    childrenData?:SubcommentItemData[];
    offsetType?:number
    childNum?:number
    isSelf:boolean,
    originId:number,
    parentCommentId:number,
    parentCommentUId:number,
    relyCallBack:Laya.Handler;
    deleteCallBack:Laya.Handler;
}

import { CommentItemBase } from "./CommentItem.generated";
import Event = Laya.Event;
import { SubcommentItem, SubcommentItemData } from "./SubcommentItem";
import { FlowList } from "../core/logic/FlowList";
import { GameCommentManager } from "../core/manager/GameCommentManager";
import { TxtUtils } from "../utils/TxtUtils";
import { GlobalData } from "../scene/data/GlobalData";
import { ListSelectData } from "../scene/home/ListSelectView";
import { PageManager } from "../page/PageManager";
import { PagePath } from "../page/data/PageData";
import { ListChooseData } from "../scene/home/ListChooseView";
const { regClass } = Laya;
@regClass()
export  class CommentItem extends CommentItemBase {

    private _data:CommentItemData
    //是否折叠
    private _isFold:boolean = true;
    private _subFlowList:FlowList;
    private _throttleLikeComment: Function;

    onEnable(): void {
        this._isFold = false;
        this.foldBtn.visible = false;
        this.downImage.visible = false;
        this.commentDes.on(Event.CLICK,this,this.onCommentClick)
        this.reply.on(Event.CLICK,this,this.onReplyClick)
        this.foldBtn.on(Event.CLICK,this,this.onFoldClick)
        this.likeBtn.on(Event.CLICK,this,this.onLikeClick)
        this.unfoldBtn.on(Event.CLICK,this,this.onUnFoldClick)
        this._subFlowList = this.subcommentList.getComponent(FlowList);
        this._subFlowList.renderHandler = new Laya.Handler(this,this.renderSubcommentItem)
        this._throttleLikeComment = GlobalData.throttle(this.likeComment, 1000)
    }

    renderSubcommentItem(item:Laya.Box,data:SubcommentItemData,index:number){
        let subcommentItem = item as SubcommentItem;
        data.relyCallBack = this._data.relyCallBack;
        data.deleteCallBack = this._data.deleteCallBack;
        subcommentItem.refreshUI(data);
    }

    
    
    refreshUI(data:CommentItemData): void {
        this._data = data;
        this.head.refreshUI({url:data.icon,uid:data.uid});
        this.author.refreshUI({name:data.name,isAuthor:data.isAuthor})
        this.endBox.visible = this._data.childNum > 0;
        this.commentDes.text = data.desc;
        this.commentTime.text = TxtUtils.getPastTimeStrWithSpace(data.time);
        this.replyBox.width = this.commentTime.textField.textWidth + 60;
        this.likeBtn.selected = data.isLike;
        this.likeNum.text = data.likeNum+"";
        this.caculateHeight();
        if(this._data.childrenData.length > 0){
            this.onUnFoldClick();
        }
    }

    caculateHeight(){
        this.endBox.visible = this._data.childNum > 0;
        this.foldBtn.visible = !this._isFold;
        let descHeight = this.commentDes.textField.textHeight;
        this.replyBox.top = this.commentDes.top + descHeight + 10;
        this.endBox.height = this.subcommentList.height  + this.unfoldBtn.height;
        this.height =  this.replyBox.top + this.replyBox.height + (this.endBox.visible ? this.endBox.height : 0)
    }

    onLikeClick(){
        this.likeBtn.selected = !this.likeBtn.selected;
        this.likeNum.text = this._data.isLike ? (this.likeBtn.selected ?this._data.likeNum : this._data.likeNum-1).toString() :  (this.likeBtn.selected ?this._data.likeNum+1 : this._data.likeNum).toString();
        this._throttleLikeComment();
    }

    onCommentClick(){
        if(this._data.uid == GlobalData.developer_uid){
            let listdata: ListChooseData = {
                arr: ["删除"],
                colors: ["#FF0000"],
                callback: new Laya.Handler(this, this.deleteComment)
            }
            PageManager.instance.open(PagePath.ListChoosePage, listdata)
        }
       
    }

    deleteComment(type:string){
        if(type == "删除"){
            GameCommentManager.instance.removeComment(this._data.commentId,0,this._data.deleteCallBack)
        }
    }

    likeComment(){
        GameCommentManager.instance.likeComment(this.likeBtn.selected,this._data.commentId)
    }

    onFoldClick(){
        this._isFold = true;
        this._subFlowList.array = [];
        this._subFlowList.refresh();
        this.subcommentList.height = 0;
        this.unfoldBtn.visible = true;
        GameCommentManager.instance.removeCommentData(0,this._data.commentId,true)
        this.caculateHeight();
    }

    onUnFoldClick(){
        this._isFold = false;
        GameCommentManager.instance.getCommentList(this._data.commentId, Laya.Handler.create(this, this.moreListCallBack),true);  
    }

    private moreListCallBack(data: any) {
        if (data.success) {
            this._data = GameCommentManager.instance.getCommentPartListData(this._data.commentId, data.data);
            if (data.data.offset >= this._data.childNum) {
                this.unfoldBtn.visible = false;
            }else {
                this.unfoldBtn.visible = true;
            }
            this.refreshSubList();
        }
    }

    private refreshSubList(){
        this._subFlowList.array = this._data.childrenData;
        this._subFlowList.refresh();
        this.caculateHeight();
    }

    onReplyClick(){
        this._data.relyCallBack && this._data.relyCallBack.runWith(this._data);
    }
    
    onDisable(): void {
        this._data = null;
        this._subFlowList = null;
        this._throttleLikeComment = null;
        this.commentDes.off(Event.CLICK,this,this.onCommentClick)
        this.reply.off(Event.CLICK,this,this.onReplyClick)
        this.foldBtn.off(Event.CLICK,this,this.onFoldClick)
        this.unfoldBtn.off(Event.CLICK,this,this.onUnFoldClick)
        this.likeBtn.off(Event.CLICK,this,this.onLikeClick)

    }
}