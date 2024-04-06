/**
* @brief: 主页游戏评论界面
* @ author: gongganghao
* @ data: 2023-11-23 16:14
*/
import { GameCommentViewBase } from "./GameCommentView.generated";
import Event = Laya.Event;
import { DragDialog } from "../../core/logic/DragDialog";
import { FlowList } from "../../core/logic/FlowList";
import { CommentItem } from "../../item/CommentItem";
import { PageManager } from "../../page/PageManager";
import { PagePath } from "../../page/data/PageData";
import { ServerManager } from "../../server/ServerManager";
import { GameCommentManager, GameCommnetData } from "../../core/manager/GameCommentManager";
import { LangUtils } from "../../utils/LangUtils";



const { regClass } = Laya;
@regClass()
export  class GameCommentView extends GameCommentViewBase{

    private _commentFlowList:FlowList;

 

    onEnable(): void {
        this.getComponent(DragDialog).closeHandler = new Laya.Handler(this,this.onCloseClick)
        this._commentFlowList = this.commentList.getComponent(FlowList);
        this._commentFlowList.renderHandler = new Laya.Handler(this,this.renderCommentItem)
        this.sendInput.textField.on("confirm", this, this.onSendClick);
        this.sendBtn.on(Event.CLICK, this, this.onSendClick);
		
    }

    onOpened(param: GameCommnetData): void {
		GameCommentManager.instance.initData(param)
        GameCommentManager.instance.getCommentList(0,Laya.Handler.create(this,this.updateListShow))
    }


    updateListShow(data:any){
        if(data.success || data.ret == 0){
			let list = GameCommentManager.instance.getCommentListData(data.data);
            if(list.length){
                this.tipNull.visible = false;
                this.commentList.visible = true;
                this._commentFlowList.array = list;
				this._commentFlowList.refresh();
                return;
            }
        }
        this.tipNull.visible = true;
        this.commentList.visible = false;
    }

    renderCommentItem(item:Laya.Box, data:any, index:number){
        let commentItm = item as CommentItem;
		data.relyCallBack = Laya.Handler.create(this,this.replyCallBack)
		data.deleteCallBack = Laya.Handler.create(this,()=>{
            GameCommentManager.instance.getCommentList(0,Laya.Handler.create(this,this.updateListShow))
        })
        commentItm.refreshUI(data)
    }

	replyCallBack(data:any){
		GameCommentManager.instance.curReplyCommentData = data;
		this.updateInput(data.name || data.leftName)
	}


    //#region点击发送逻辑
    private _isSending:boolean = false;
    onSendClick(){
        if(this._isSending){
            return;
        }
        if (this.sendInput.text.length <= 0) {
            PageManager.instance.showTip("评论输入内容不能为空");
            return;
        }
        this._isSending = true;
		this.sendCmd();
    }

	updateInput(name: string) {
        this._isSending = false
        this.sendInput.text = "";
        if (name) {
            this.sendInput.prompt = LangUtils.lang(`回复@{0}`, name);
            this.sendInput.focus = true;
        }
        else{
			this.sendInput.prompt = "发送评论...";
		}
    }

    sendCmd() {
        let originId: number = 0;
        let parentId: number = 0;
        if (GameCommentManager.instance.curReplyCommentData) {
            if (GameCommentManager.instance.curReplyCommentData["childrenData"]) {
                originId = GameCommentManager.instance.curReplyCommentData.commentId;
                parentId = GameCommentManager.instance.curReplyCommentData.commentId;
            }
            else {
                originId = GameCommentManager.instance.curReplyCommentData.originId;
                parentId = GameCommentManager.instance.curReplyCommentData.commentId;
            }
        }
        GameCommentManager.instance.sendAddComment(originId, parentId, this.sendInput.text, new Laya.Handler(this, this.onAddCommentData));
    }

    onAddCommentData(sourceData: any) {//获取评论数据 并  更新评论列表
        if (sourceData.ret == 0) {
            GameCommentManager.instance.addComment(sourceData.data);
			GameCommentManager.instance.getCommentList(0,Laya.Handler.create(this,this.updateListShow))
        }
        this._isSending = false;
        this.sendInput.text = "";
    }
    //#endregion


    onCloseClick(){
        PageManager.instance.close(PagePath.GameCommentPage);
    }


   
   
    
    onDisable(): void {
        this.sendInput.textField.off("confirm", this, this.onSendClick);
        this.sendBtn.off(Event.CLICK, this, this.onSendClick);

    }
    
}