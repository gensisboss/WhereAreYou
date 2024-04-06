/**
* @brief: 评论管理类
* @ author: gongganghao
* @ data: 2023-12-15 17:05
*/
import { ServerManager } from "../../server/ServerManager";
import Event = Laya.Event;
import { CommentItemData } from "../../item/CommentItem";
import { GlobalData } from "../../scene/data/GlobalData";
import { SubcommentItemData } from "../../item/SubcommentItem";

export type GameCommnetData = {
    //游戏id
    gameId:number
    //游戏开发者id
    gameDevelopId:string,
    //评论数据改变
    callBcak?:Laya.Handler
}

export class GameCommentManager {

    private static _instance: GameCommentManager;
    public static get instance(): GameCommentManager {
        return this._instance || (this._instance = new GameCommentManager);
    }

    public curReplyCommentData: any;

    private _data:GameCommnetData;
	private _listMainDic: any;
	private _listMainArr: CommentItemData[];
	private _pageMaxCount: number = 10;
	private _pageSubMaxCount :number=3;
	private _mainCommentOffset: number = 0;
	private _mainCommentOffsetType: number = 0;
	private _mainTopComment: any = null; //主置顶评论
	private _partTopComment: any = null; //副置顶评论
	private _isUsedTopComment: boolean = false; //是否使用过置顶评论;

    //#region列表数据逻辑
   initData(data:GameCommnetData) {
        this._data = data;
        this._isUsedTopComment = false;
        this._mainTopComment = null;
        this._partTopComment = null;
        this._mainCommentOffset = 0;
        this._mainCommentOffsetType = 0;
        this._listMainDic = {};
        this._listMainArr = [];
    }


    //获取主评论的列表数据
    getCommentListData(dataSource: any): CommentItemData[] {
        if (!this._listMainDic) {
            this._listMainDic = {};
        }
        if (!this._listMainArr) {
            this._listMainArr = [];
        }
        if (!dataSource) {
            return this._listMainArr;
        }
        this._mainCommentOffset = dataSource.offset;
        this._mainCommentOffsetType = dataSource.offset_type;
        let data = dataSource.list;
        if (data && data.length) {
            for (var i: number = 0; i < data.length; i++) {
                let tempData = data[i];
                let a = this.changeCommentData(tempData);
                if (!a) continue;
                //排除置顶评论
                if (this._mainTopComment && this._mainTopComment.commentId == a.commentId) continue;
                this.removeCommentData(a.commentId);
                this._listMainDic[tempData.comment_id] = a;
                this._listMainArr.push(a);
            }
        }
        //如果有置顶评论
        if (this._mainTopComment && !this._listMainArr.includes(this._mainTopComment)) {
            this._listMainDic[this._mainTopComment.commentId] = this._mainTopComment;
            this._listMainArr.unshift(this._mainTopComment)
        }
        return this._listMainArr;
    }

    //获取子评论的列表数据
    getCommentPartListData(commentId: number, dataSource: any): CommentItemData {
        if (!dataSource) {
            return this._listMainDic[commentId].childrenData;
        }
        let data = dataSource.list;
        this._listMainDic[commentId].offset = dataSource.offset;
        this._listMainDic[commentId].offsetType = dataSource.offset_type;
        if (data && data.length) {
            for (var i: number = 0; i < data.length; i++) {
                let a = this.changeCommentPartData(data[i]);
                if (!a) continue;
                //排除置顶评论
                if (this._partTopComment && this._partTopComment.commentId == a.commentId) continue;
                this._listMainDic[commentId].childNum++;
                this.removeCommentData(a.commentId, a.originId);
                this._listMainDic[commentId].childrenData.push(a);
            }
        }
        //如果有置顶子评论，则一定有置顶主评论
        if (this._partTopComment && this._listMainDic[this._mainTopComment.commentId] && this._listMainDic[this._mainTopComment.commentId].childrenData.indexOf(this._partTopComment) < 0) {
            this._listMainDic[this._mainTopComment.commentId].childrenData.unshift(this._partTopComment);
        }
        return this._listMainDic[commentId];
    }
     //收起会删除所有子评论数据 免得再打开数据不是最新的
    removeCommentData(commentId: number, parentID?: number, isAll: boolean = false): void {
        if (parentID) {
            let itemData: CommentItemData = this._listMainDic[parentID];
            if (isAll) {
                itemData.childrenData = [];
                itemData.offsetType = 0;
                itemData.offset = 0;
            }
            else {
                itemData.childNum--;
                this.removeListItemData(itemData.childrenData, commentId);
            }
        }
        else {
            if (this._listMainDic[commentId]) {
                delete this._listMainDic[commentId];
                this.removeListItemData(this._listMainArr, commentId);
            }
        }
    }
    
    removeListItemData(arr: any[], commentId: number) {
        let len = arr.length;
        for (var i: number = 0; i < len; i++) {
            let data = arr[i];
            if (data.commentId == commentId) {
                arr.splice(i, 1);
                return;
            }
        }
        console.log("删除评论失败");
    }

    //增加评论数据
    addComment(datasource: any): void {
        if (datasource.origin_id == "0") {
            this.addMainCommentData(datasource);
            this.addendMainData(this._listMainDic[datasource.comment_id]);//增加一些服务器不传的数据
        }
        else {
            this.addPartCommentData(datasource);
            let childData = this._listMainDic[datasource.origin_id].childrenData;
            let data = childData[childData.length - 1];
            this.addendPartData(data);//增加一些服务器不传的数据
        }
        this._data.callBcak && this._data.callBcak.runWith(true);
        console.log("添加评论");

    }
    private addMainCommentData(datasource: any): void {//增加主评论数据
        let a = this.changeCommentData(datasource);
        this._listMainDic[datasource.comment_id] = a;
        this._listMainArr.unshift(a);
    }
    private addPartCommentData(datasource: any): void {//增加子评论数据
        let a = this.changeCommentPartData(datasource);
        this._listMainDic[datasource.origin_id].childrenData.push(a);
        this._listMainDic[datasource.origin_id].childNum++;
    }
    private addendMainData(data: any) {//增加主评论附加数据（服务器不传的数据）
        data.isLike = 0;
        data.name = GlobalData.nickname;
        data.icon = GlobalData.avatar;
    }
    private addendPartData(data: any) {//增加子评论附加数据（服务器不传的数据）
        this.addendMainData(data);
        data.rightIsAuthor = this.curReplyCommentData.leftIsAuthor;
        data.rightName = this.curReplyCommentData.leftName;
    }

    private changeCommentData(commentData: any): CommentItemData {
        if (commentData.closure && commentData.closure == 2) return null;
        let partData: CommentItemData = {} as any;
        partData.uid = commentData.developer_uid;
        partData.isAuthor = this._data.gameDevelopId == commentData.developer_uid;//是否是作者
        partData.icon = commentData.avatar;
        partData.name = commentData.nickname;//左边的名字
        partData.isSelf = (commentData.developer_uid == GlobalData.developer_uid);//是否是自己的评论
        partData.desc = commentData.comment_content;//评论内容
        partData.gameId = Number(commentData.game_id);//游戏ID
        partData.time = commentData.create_at * 1000;//上传的时间戳
        partData.likeNum = Number(commentData.like_num);//当前评论点赞数量
        partData.isLike = commentData.islike;//当前评论是否点赞
        partData.commentId = Number(commentData.comment_id);//当前评论ID
        partData.childNum = Number(commentData.child_num);//孩子数量
        partData.originId = Number(commentData.origin_id);//父对象ID
        partData.parentCommentId = Number(commentData.parent_id);//commentData.parent_id;//父评论ID
        partData.parentCommentUId = Number(commentData.replyto_uid);
        partData.childrenData = [];
        partData.offset = 0;//页数偏移量
        partData.offsetType = 0;//页数偏移量类型
        return partData;
    }
    private changeCommentPartData(commentData: any) {
        if (commentData.closure && commentData.closure == 2) return null;
        let partData: SubcommentItemData = {} as any;
        partData.uid = commentData.developer_uid;
        partData.leftIsAuthor = this._data.gameDevelopId == commentData.developer_uid;//是否是作者
        partData.icon = commentData.avatar;
        partData.leftName = commentData.nickname;//左边的名字

        if (commentData.reply) {
            partData.rightIsAuthor = false;
            partData.rightName = commentData.reply.nickname;//右边名字
        }
        partData.isSelf = (commentData.developer_uid == GlobalData.developer_uid);//是否是自己的评论
        partData.desc = commentData.comment_content;//评论内容
        partData.gameId = Number(commentData.game_id);//游戏ID

        partData.time = commentData.create_at * 1000;//上传的时间戳
        partData.likeNum = Number(commentData.like_num);//当前评论点赞数量
        partData.isLike = commentData.islike;//当前评论是否点赞
        partData.parentCommentId = Number(commentData.parent_id);//commentData.parent_id;//父评论ID
        partData.originId = Number(commentData.origin_id);//父对象ID
        partData.commentId = Number(commentData.comment_id);//当前评论ID
        partData.parentCommentUId = Number(commentData.replyto_uid);
        return partData;
    }
    /**
     * 发送请求评论列表
     */
    getCommentList(commentId: number, callback: Laya.Handler, isSub: boolean = false): void {
        let offset = this._mainCommentOffset;
        let offsetType = this._mainCommentOffsetType;
        if (this._listMainDic[commentId]) {
            offset = this._listMainDic[commentId].offset;
            //如果当前主评论的id和当前请求的主评论id相同
            if (this._mainTopComment && this._mainTopComment.commentId == commentId) {
                //并且当前存在置顶子评论
                this._partTopComment && (this._isUsedTopComment = true);
            }
            offsetType = this._listMainDic[commentId].offsetType;
        }
        let path = 'comment/list';
        let data;

        isSub && (this._pageSubMaxCount = this._isUsedTopComment ? 2 : 3);
        let maxCount = isSub ? this._pageSubMaxCount : this._pageMaxCount;
        data = { game_id: this._data.gameId, comment_id: commentId, offset: offset, offset_type: offsetType, pagesize: maxCount }
        if (isSub) {
            ServerManager.instance.httpSendPost(path, data, callback);
        } else {
            ServerManager.instance.httpSendPost(path, data, Laya.Handler.create(this, (data: any) => {
                callback && callback.runWith(data)
            }));
        }

    }


    sendAddComment(originId: number, parentId: number, desc: string, callback?: Laya.Handler, errHandler?: Laya.Handler) {
        ServerManager.instance.httpSendPost('comment/add', { game_id: this._data.gameId, parent_id: parentId, origin_id: originId, comment_content: desc, device: GlobalData.getPlatform() }, callback, errHandler);
    }
    likeComment(isLike: boolean, commentID: number, complete?: Laya.Handler, error?: Laya.Handler): void {
        let path = isLike ? "comment/like" : "comment/unlike";
        ServerManager.instance.httpSendPost(path, { comment_id: commentID }, complete, error);
    }
    removeComment(commentID: number,parentId?:number, complete?: Laya.Handler, error?: Laya.Handler): void {
        this.removeCommentData(commentID,parentId)
        ServerManager.instance.httpSendPost("comment/del", { comment_id: commentID }, complete, error);
        this._data.callBcak && this._data.callBcak.runWith(false);
        console.log("删除评论");
    }

    //#endregion
}