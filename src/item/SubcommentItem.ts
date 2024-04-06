/**
* @brief: 子评论item
* @ author: gongganghao
* @ data: 2023-11-23 17:27
*/
export  type SubcommentItemData = {
    icon:string,//评论者头像
    leftIsAuthor?:boolean,//左边是否是作者
    leftName?:string,//左边的名字
    rightIsAuthor?:boolean,//右边是否是作者
    rightName?:string,//右边的名字
    time:number,//上传的时间戳
    likeNum?:number,//当前评论点赞数量
    isLike?:boolean,//当前评论是否点赞
    commentId?:number,//当前评论ID
    desc:string,//评论内容
    gameId?:number,//游戏ID
    parentCommentId?:number,//父评论ID
    offset?:number;//页数偏移量
    uid?:string;
    isSelf:boolean,
    originId:number,
    parentCommentUId:number,
    relyCallBack:Laya.Handler;
    deleteCallBack:Laya.Handler;

}
import { SubcommentItemBase } from "./SubcommentItem.generated";
import Event = Laya.Event;
import { TxtUtils } from "../utils/TxtUtils";
import { GameCommentManager } from "../core/manager/GameCommentManager";
import { GlobalData } from "../scene/data/GlobalData";
import { PageManager } from "../page/PageManager";
import { PagePath } from "../page/data/PageData";
import { ListChooseData } from "../scene/home/ListChooseView";
const { regClass } = Laya;
@regClass()
export  class SubcommentItem extends SubcommentItemBase{

    private _data:SubcommentItemData;
    private _throttleLikeComment: Function;

    onEnable(): void {
        this.downImage.visible = false;
        this.commentDes.on(Event.CLICK,this,this.onCommentClick)
        this.reply.on(Event.CLICK,this,this.onReplyClick)
        this.likeBtn.on(Event.CLICK,this,this.onLikeClick)
        this._throttleLikeComment = GlobalData.throttle(this.likeComment, 1000)

    }
    
    refreshUI(data:SubcommentItemData): void {
        this._data = data;
        this.head.refreshUI({url:data.icon,uid:data.uid});
        this.leftauthor.refreshUI({name:data.leftName,isAuthor:data.leftIsAuthor})
        this.rightauthor.refreshUI({name:data.rightName,isAuthor:data.rightIsAuthor})
        this.headInfo.width = this.leftauthor.width + 50 + this.rightauthor.width;
        this.commentDes.text = data.desc;
        this.commentTime.text = TxtUtils.getPastTimeStrWithSpace(data.time);
        this.replyBox.width = this.commentTime.textField.textWidth + 60;
        this.likeBtn.selected = data.isLike;
        this.likeNum.text = data.likeNum+"";
        this.caculateHeight();
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
            GameCommentManager.instance.removeComment(this._data.commentId,this._data.parentCommentId,this._data.deleteCallBack)
        }
    }


    caculateHeight(){
        let descHeight = this.commentDes.textField.textHeight;
        this.replyBox.top = this.commentDes.top + descHeight + 10;
        this.height =  this.replyBox.top + this.replyBox.height;
    }

    onLikeClick(){
        this.likeBtn.selected = !this.likeBtn.selected;
        this.likeNum.text = this._data.isLike ? (this.likeBtn.selected ?this._data.likeNum : this._data.likeNum-1).toString() :  (this.likeBtn.selected ?this._data.likeNum+1 : this._data.likeNum).toString();
        this._throttleLikeComment();
    }

    likeComment(){
        GameCommentManager.instance.likeComment(this.likeBtn.selected,this._data.commentId)
    }

    onReplyClick(){
        this._data.relyCallBack && this._data.relyCallBack.runWith(this._data);
    }
    
    onDisable(): void {
        this._data = null;
        this.commentDes.off(Event.CLICK,this,this.onCommentClick)
        this.reply.off(Event.CLICK,this,this.onReplyClick)
        this.likeBtn.off(Event.CLICK,this,this.onLikeClick)
    }
}