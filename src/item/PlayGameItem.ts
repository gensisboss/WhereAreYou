/**
* @brief: 头像框自适应
* @ author: gongganghao
* @ data: 2023-11-15 15:11
*/

import { PlayGameItemBase } from "./PlayGameItem.generated";
import Event = Laya.Event;
import { PageManager } from "../page/PageManager";
import { PagePath } from "../page/data/PageData";
import { ServerManager } from "../server/ServerManager";
import { GlobalData } from "../scene/data/GlobalData";
import { GameCommnetData } from "../core/manager/GameCommentManager";
import { PlayGameData } from "../scene/game/GamePlayerView";
import { UnionManage } from "../utils/UnionManage";
const { regClass } = Laya;

export type PlayGameItemData = {
    inHome: boolean,
    game_id: number,
    game_name: string,
    game_img: string,
    game_logo?: string,
    owner: any,
    game_desc: string,
    isLike: boolean,
    likenum: number,
    comment: number,
    isCollect: boolean,
    collectnum: number,
    sharenum: number,
    star_num: number;
    game_data: any,
    callback?: Laya.Handler;
}

@regClass()
export class PlayGameItem extends PlayGameItemBase {


    private _starData = [0, 0, 0]
    private _data: PlayGameItemData;

    private _throttleLikeGame: Function;
    private _throttleCollectGame: Function;
    onEnable(): void {
        this.playBox.on(Event.CLICK, this, this.onPlayGameClick)
        this.likeBox.on(Event.CLICK, this, this.onLikeBtnClick)
        this.commentBox.on(Event.CLICK, this, this.onCommentBtnClick)
        this.collectBox.on(Event.CLICK, this, this.onCollectBtnClick)
        this.shareBox.on(Event.CLICK, this, this.onShareBtnClick)
        this.followBtn.on(Event.CLICK, this, this.onFollwBtnClick)
        this.starList.renderHandler = new Laya.Handler(this, this.renderStarItem);
        this._throttleLikeGame = GlobalData.throttle(this.likeGame, 1000)
        this._throttleCollectGame = GlobalData.throttle(this.collectGame, 1000)
        this.width = Laya.stage.width;
        this.height = Laya.stage.height;
        this.socailBox.right = 0;
        this.playBtn.scale(1, 1);
        this.playBtn.alpha = 1;
        this.info.left = 0;
        this.starBg.left = -10;

    }




    renderStarItem(item: Laya.Box, index: number) {
        let star = item.getChildByName("star") as Laya.Button;
        star.selected = index < this._data.star_num;
    }

    refreshUI(data: PlayGameItemData) {
        this._data = data;
        this._data.likenum = Number(data.likenum)
        this._data.collectnum = Number(data.collectnum)
        this._data.comment = Number(data.comment)
        this.resizeGameBg();
        (this.likeBox.getChildAt(0) as Laya.Button).selected = data.isLike;
        (this.likeBox.getChildAt(1) as Laya.Label).text = data.likenum + "";
        (this.collectBox.getChildAt(0) as Laya.Button).selected = data.isCollect;
        (this.collectBox.getChildAt(1) as Laya.Label).text = data.collectnum + "";
        (this.commentBox.getChildAt(1) as Laya.Label).text = data.comment + "";
        (this.shareBox.getChildAt(1) as Laya.Label).text = data.sharenum + "";
        this.head.refreshUI({ uid: this._data.owner.developer_uid, url: this._data.owner.avatar })
        this.followBtn.visible = !this._data.owner.isFollow && this._data.owner.developer_uid != GlobalData.developer_uid;
        this.authorName.text = this._data.owner.nickname;
        this.gameName.text = this._data.game_name;
        this.gameDesc.text = this._data.game_desc;
        this.starList.array = this._starData;
        this.starList.refresh();
        this.info.bottom = this._data.inHome ? 150 : 0;
    }

    resizeGameBg() {
        let url = ServerManager.instance.formatUrl(this._data.game_img);
        Laya.loader.load(url, Laya.Handler.create(this, (res: any) => {
            if (res) {
                this.gameBg.skin = url;
                this.gameBg.height = Laya.stage.height;
                let scale = Laya.stage.height / res.sourceHeight;
                this.gameBg.width = res.sourceWidth * scale;
                this.gameBg.pos((Laya.stage.width - this.gameBg.width) / 2, 0)
            }

        }))
    }

    onFollwBtnClick() {
        this.followBtn.visible = false;
        this._data.owner.isFollow = true;
        GlobalData.followSomeOne(this._data.owner.developer_uid, true)
    }

    onLikeBtnClick() {
        let likeBtn = this.likeBox.getChildAt(0) as Laya.Button;
        let likeNum = this.likeBox.getChildAt(1) as Laya.Label;
        likeBtn.selected = !likeBtn.selected;
        this._data.likenum += this._data.isLike ? (likeBtn.selected ? 0 : - 1) : (likeBtn.selected ? 1 : 0);
        likeNum.text = this._data.likenum + ""
        this._data.isLike = !this._data.isLike;
        this._throttleLikeGame()
    }

    likeGame() {
        let likeBtn = this.likeBox.getChildAt(0) as Laya.Button;
        GlobalData.likeGame(this._data.game_id.toString(), likeBtn.selected)
    }

    onCollectBtnClick() {
        let collectBtn = this.collectBox.getChildAt(0) as Laya.Button;
        let collectNum = this.collectBox.getChildAt(1) as Laya.Label;
        collectBtn.selected = !collectBtn.selected;
        this._data.collectnum += this._data.isCollect ? (collectBtn.selected ? 0 : - 1) : (collectBtn.selected ? 1 : 0);
        collectNum.text = this._data.collectnum + ""
        this._data.isCollect = !this._data.isCollect;
        this._throttleCollectGame()
    }

    collectGame() {
        let collectBtn = this.collectBox.getChildAt(0) as Laya.Button;
        GlobalData.collectGame(this._data.game_id.toString(), collectBtn.selected)
    }

    onShareBtnClick() {
        let sharData = {
            title:this._data.game_name,
            imgsrc: ServerManager.instance.formatUrl(this._data.game_logo),
            desc:this._data.game_desc,
            ext:{
                senceid:this._data.game_id,
            }
        }
        UnionManage.instance.share(sharData,()=>{
            this._data.sharenum ++;
            (this.shareBox.getChildAt(1) as Laya.Label).text = this._data.sharenum + "";
            GlobalData.shareGame(this._data.game_id.toString())
        })
       
    }

    onCommentBtnClick() {
        let data: GameCommnetData = {
            gameId: this._data.game_id,
            gameDevelopId: this._data.owner.developer_uid,
            callBcak: new Laya.Handler(this, (isAdd) => {
                this._data.comment += isAdd ? 1 : -1;
                (this.commentBox.getChildAt(1) as Laya.Label).text = this._data.comment + "";
            }),
        }
        PageManager.instance.open(PagePath.GameCommentPage, data)
    }

    playeEffect() {
        Laya.Tween.to(this.socailBox, { right: -this.socailBox.width }, GlobalData.tweenTime)
        Laya.Tween.to(this.info, { left: -this.info.width }, GlobalData.tweenTime)
        Laya.Tween.to(this.playBtn, { scaleX: 0, scaleY: 0, alpha: 0 }, GlobalData.tweenTime)
        Laya.Tween.to(this.starBg, { left: -this.starBg.width - 10 }, GlobalData.tweenTime)
    }

    async onPlayGameClick() {
        GlobalData.tempGameData = this._data;
        let res = await Laya.loader.load(ServerManager.instance.formatUrl(this._data.game_data));
        if (res) {
            let playerData = res.data as PlayGameData;
            playerData.id = this._data.game_id;
            this.playeEffect();
            this._data.callback && this._data.callback.run();
            Laya.timer.once(GlobalData.tweenTime, this, () => {
                this.uploadPlayGameToServer();
                PageManager.instance.open(PagePath.GamePage, playerData, null, true)
            })
        }
      
    }

    uploadPlayGameToServer(){
          //上报点击进入游戏分析
          ServerManager.instance.httpSendPost("/vincent/game/gameAnalysis", {
            game_id: this._data.game_id,
            click: 1,
        })
        //上报玩游戏了
        ServerManager.instance.httpSendPost("play/playGame", {
            game_id: this._data.game_id,
        })

    }

    onDisable(): void {
        this._data = null;
        this.playBox.off(Event.CLICK, this, this.onPlayGameClick)
        this.likeBox.off(Event.CLICK, this, this.onLikeBtnClick)
        this.commentBox.off(Event.CLICK, this, this.onCommentBtnClick)
        this.collectBox.off(Event.CLICK, this, this.onCollectBtnClick)
        this.shareBox.off(Event.CLICK, this, this.onShareBtnClick)
        this.followBtn.off(Event.CLICK, this, this.onFollwBtnClick)
        this._throttleLikeGame = null;
        this._throttleCollectGame = null;
    }

}