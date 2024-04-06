/**
* @brief: 主页界面逻辑
* @ author: gongganghao
* @ data: 2023-11-07 11:43
*/

import { HomeViewBase } from "./HomeView.generated";
import Event = Laya.Event;
import { PageManager } from "../../page/PageManager";
import { PagePath, TweenType } from "../../page/data/PageData";
import { GlobalData } from "../data/GlobalData";
import { PlayGameItem, PlayGameItemData } from "../../item/PlayGameItem";
import { SwitchTab } from "../../core/logic/SwitchTab";
import { IMultiListRefresh, MultiListRefresh } from "../../core/logic/MultiListRefresh";
import { ServerManager } from "../../server/ServerManager";
import { TxtUtils } from "../../utils/TxtUtils";
import SoundUtil from "../../utils/SoundUtils";

export enum GameListType {
    follow = "follow",
    recommend = "recommend"
}

export type HomeData = {
    homeTab: number,
    listType: string,
    selectIndex: number,
    curGameList?:any;
    tempGameIds?:string;
}

const { regClass } = Laya;

@regClass()
export class HomeView extends HomeViewBase implements IMultiListRefresh {

    private _data: HomeData;
    //当前音乐数据
    private _musicUrl: string = "";
    public get musicUrl(): string {
        return this._musicUrl;
    }
    public set musicUrl(value: string) {
        if (value && value.length > 0 && this._data.homeTab == 0) {
            this._musicUrl = value;
            SoundUtil.instance.play(value, 0)
        } else {
            this._musicUrl = null
            SoundUtil.instance.stop();
        }
    }

    private _scrollLimit: number = 100;
    private _tempPos: Laya.Vector2 = new Laya.Vector2();
    private _switchTab: SwitchTab;
    private _listDataRefresh: MultiListRefresh;
    private _listKeyArr: string[] = [GameListType.follow, GameListType.recommend]

    onEnable(): void {
        Laya.stage.on(Event.RESIZE,this,this.onResized)
        this.homeBox.on(Event.CLICK, this, this.changeHomeTab, [0])
        this.createBox.on(Event.CLICK, this, this.changeHomeTab, [1])
        this.myBox.on(Event.CLICK, this, this.changeHomeTab, [2])
        this.rankBtn.on(Event.CLICK, this, this.onRankBtnClick)

        this.listBox.on(Event.MOUSE_DOWN, this, this.listBeginFormat);
        this.listBox.on(Event.MOUSE_MOVE, this, this.listMoveFormat);
        this.listBox.on(Event.MOUSE_UP, this, this.listEndFormat);


        this.gameFollwList.scrollBar.rollRatio = this.gameRecommendList.scrollBar.rollRatio = 0.9;
        this.gameFollwList.array = this.gameRecommendList.array = [];
        this.gameFollwList.spaceY = this.gameRecommendList.spaceY = 0;
        this._listDataRefresh = this.listBox.getComponent(MultiListRefresh);
        this._listDataRefresh.initListsData([this.gameFollwList, this.gameRecommendList], this._listKeyArr, this, 0);


        this.gameFollwList.renderHandler = new Laya.Handler(this, this.renderFollwGameItem);
        this.gameRecommendList.renderHandler = new Laya.Handler(this, this.renderRecommendGameItem);
        this._switchTab = new SwitchTab();
        this._switchTab.setColor("#FFFFFF", GlobalData.themeColor)
        this.middleBox.height = this.listBox.height = this.gameFollwList.height = this.gameRecommendList.height = Laya.stage.height;
        this._switchTab.initItems([this.followBtn, this.recomendBtn], null, new Laya.Handler(this, this.getListData))
    }





    onOpened(param: HomeData): void {
        this._data = param;
        this._listDataRefresh.listRenderCompleteCallBack = new Laya.Handler(this, (data: any) => {
            this.tipFollowNull.visible =  this.gameFollwList.array.length <= 0 ;
            this.tipRecommnedNull.visible = this.gameRecommendList.array.length <= 0;
        })
        if(this._data.curGameList){
            if(this._data.listType == GameListType.follow){
                this.gameFollwList.array = this._data.curGameList;
            }else{
                this.gameRecommendList.array = this._data.curGameList;
            }
            this._listDataRefresh.updateDataWithKey(this._data.listType,"offset",this._data.curGameList.length)
            this._listDataRefresh.updateDataWithKey(this._data.listType,"array",this._data.curGameList)
            this._listDataRefresh.updateDataWithKey(this._data.listType,"args", this._data.selectIndex)
            this._listDataRefresh.updateDataWithKey(this._data.listType,"value", this._data.selectIndex*Laya.stage.height)

            this._switchTab.onTabChange(this._data.listType == GameListType.follow ? 0 : 1)
            this.resetList();
        }else{
            this._switchTab.onTabClick(this._data.listType == GameListType.follow ? 0 : 1)
        }
        this.switchHomeTab(this._data.homeTab)
        this.beginGameEffect(false);
    }

  

    onResized(){
        this.gameFollwList.scrollBar.stopScroll();
        this.gameRecommendList.scrollBar.stopScroll();
        this.resetList();
    }



    changeHomeTab(index: number) {
        if (this._data.homeTab == index) {
            return;
        }
        this.switchHomeTab(index);
    }

    beginGameEffect(isBegin:boolean = true) {
        if(isBegin){
            this.bottomBox.bottom = 50;
            this.topBox.top = 50;
            Laya.Tween.to(this.bottomBox, { bottom: -300 }, GlobalData.tweenTime)
            Laya.Tween.to(this.topBox, { top: -300 }, GlobalData.tweenTime)
        }else{
            this.bottomBox.bottom = -300;
            this.topBox.top = -300;
            Laya.Tween.to(this.bottomBox, { bottom: 50 }, GlobalData.tweenTime)
            Laya.Tween.to(this.topBox, { top: 50 }, GlobalData.tweenTime)
        }
        
    }


    switchHomeTab(index: number) {
        this._data.homeTab = index;
        this.pageBox.visible = true;
        this.middleBox.visible = false;
        this.pageBox.destroyChildren();
        SoundUtil.instance.stop();
        switch (index) {
            case 0:
                this.middleBox.visible = true;
                this.pageBox.visible = false;
                this.diamonds.text = TxtUtils.getDisplayNum(parseInt(GlobalData.crystal))
                if (this.musicUrl) SoundUtil.instance.play(this.musicUrl, 0)
                break;
            case 1:
                this.showGuideBox(false);
                PageManager.instance.open(PagePath.EditModePage, null, this.pageBox)
                break;
            case 2:
                this.showGuideBox(true);
                PageManager.instance.open(PagePath.InfoPage, GlobalData.developer_uid, this.pageBox)
                break;
        }
        for (let i = 0; i < this.tabBox.numChildren; i++) {
            let child = this.tabBox.getChildAt(i);
            let normal = child.getChildByName("normal") as Laya.Image;
            let select = child.getChildByName("select") as Laya.Image;
            normal.visible = i != index;
            select.visible = i == index;
        }
    }

    showGuideBox(isShow: boolean) {
        if (isShow) {
            if (localStorage.getItem("createGuide") == "1") {
                this.createTip.destroy();
            } else {
                this.createTip.visible = true;
                localStorage.setItem("createGuide", "1")
                Laya.timer.once(3000, this, () => {
                    this.createTip.destroy();
                })
            }
        } else {
            localStorage.setItem("createGuide", "1")
            this.createTip.destroy();
        }

    }



    onRankBtnClick() {
        PageManager.instance.open(PagePath.RankPage, null, null, true, "", { type: TweenType.Right })
    }

    getListData(index: number) {
        this._data.listType = this._listKeyArr[index];
        this._listDataRefresh.changeTabWithKey(this._data.listType);
        Laya.Tween.to(this.listBox, { x: -index * Laya.stage.width }, GlobalData.tweenTime, null, Laya.Handler.create(this, () => {
            this._data.selectIndex = this._listDataRefresh.getDataByKey(this._data.listType).args;
            this.resetList();
        }))
    }


    refreshData(callback: Laya.Handler, data?: any): void {
        let _data = {
            offset: data['offset'] ? data['offset'] : 0,
            pagesize: 20,
            game_ids : this._data.tempGameIds || "",
        };
        switch (this._data.listType) {
            case GameListType.follow:
                ServerManager.instance.httpSendPost('vincent/game/momentsList', _data, Laya.Handler.create(this, (info: any) => {
                    if (this._data.listType == GameListType.follow) {
                        callback.runWith(info)
                    }
                }));
                break;
            case GameListType.recommend:
              
                ServerManager.instance.httpSendPost('/vincent/game/list', _data, Laya.Handler.create(this, (info: any) => {
                    if (this._data.listType == GameListType.recommend) {
                        if (info && (info.success || !info.ret)) {
                            if (info.data) {
                                let listData = info.data.list ? info.data.list : info.data;
                                this._data.tempGameIds = listData.map(function(game) {
                                    return game.game_id;
                                }).join(',');
                            }
                        }
                        callback.runWith(info)
                    }
                }));
                break;
            default:
                break;
        }


    }




    private resetList() {
        
        let indexFollw = this._listDataRefresh.getDataByKey(GameListType.follow).args;
        this.gameFollwList.scrollTo(indexFollw);

        let indexRecommend = this._listDataRefresh.getDataByKey(GameListType.recommend).args;
        this.gameRecommendList.scrollTo(indexRecommend);

        this.listBox.x = this._data.listType == GameListType.recommend ? -Laya.stage.width : 0;
        this.musicUrl = this._data.listType == GameListType.follow ? this.gameFollwList.array[this._data.selectIndex]?.game_bgm : this.gameRecommendList.array[this._data.selectIndex]?.game_bgm;


    }

    private _moveDir:Laya.ScrollType = Laya.ScrollType.None;

    private listBeginFormat(e: Laya.Event) {
        this._moveDir = Laya.ScrollType.None;
        this._tempPos.setValue(e.stageX, e.stageY);
    }


    private listMoveFormat(e: Laya.Event) {
        if(this._moveDir == Laya.ScrollType.None){
            this._moveDir = Math.abs(e.stageY - this._tempPos.y) < Math.abs(e.stageX - this._tempPos.x) ? Laya.ScrollType.Horizontal : Laya.ScrollType.Vertical;
        }
        if (this._moveDir == Laya.ScrollType.Horizontal) {
            if (this._data.listType == GameListType.recommend) {
                if (e.stageX > this._tempPos.x) {
                    this.listBox.x = -Laya.stage.width + e.stageX - this._tempPos.x
                    this.gameFollwList.scrollBar.stopScroll();
                    this.gameRecommendList.scrollBar.stopScroll();
                }
            } else {
                if (e.stageX < this._tempPos.x) {
                    this.gameFollwList.scrollBar.stopScroll();
                    this.gameRecommendList.scrollBar.stopScroll();
                    this.listBox.x = e.stageX - this._tempPos.x
                }
            }
        }
        
    }




    private listEndFormat(e: Laya.Event) {
        this.gameFollwList.scrollBar.stopScroll();
        this.gameRecommendList.scrollBar.stopScroll();
        //判断左右滑动还是上下滑动
        if (this._moveDir == Laya.ScrollType.Vertical) {
            //上下滑动
            if (Math.abs(e.stageY - this._tempPos.y) >= this._scrollLimit) {
                this._data.selectIndex += (e.stageY < this._tempPos.y ? 1 : -1)
            }
            if (this._data.selectIndex < 0) {
                this._data.selectIndex = 0;
            }
            let maxIndex = this._data.listType == GameListType.recommend ? (this.gameRecommendList?.array?.length || 0) : (this.gameFollwList?.array?.length || 0)
            if (this._data.selectIndex >= maxIndex) {
                this._data.selectIndex = maxIndex - 1;
            }
            this._listDataRefresh.updateDataWithKey(this._data.listType,"args", this._data.selectIndex)
            this._tempPos.y = e.stageY;
            let offset = this._data.selectIndex * Laya.stage.height;
            if (this._data.listType == GameListType.follow) {
                this.gameFollwList.selectedIndex = this._data.selectIndex;
                this.musicUrl = this.gameFollwList.array[this._data.selectIndex]?.game_bgm;
                Laya.Tween.to(this.gameFollwList.scrollBar, { value: offset }, GlobalData.tweenTime, Laya.Ease.cubicOut)
            } else {
                this.musicUrl = this.gameRecommendList.array[this._data.selectIndex]?.game_bgm;
                this.gameRecommendList.selectedIndex = this._data.selectIndex;
                Laya.Tween.to(this.gameRecommendList.scrollBar, { value: offset }, GlobalData.tweenTime, Laya.Ease.cubicOut)
            }
            this.listBox.x = this._data.listType == GameListType.recommend ? -Laya.stage.width : 0;
        } else if(this._moveDir == Laya.ScrollType.Horizontal) {
            //左右滑动
            if (Math.abs(e.stageX - this._tempPos.x) >= this._scrollLimit) {
                this._switchTab.onTabClick(e.stageX > this._tempPos.x ? 0 : 1)
            } else {
                this.listBox.x = this._data.listType == GameListType.recommend ? -Laya.stage.width : 0;
            }
        }
        this._moveDir = Laya.ScrollType.None;
    }

    private renderRecommendGameItem(item: Laya.Box, index: number) {
        let playGameItem = item as PlayGameItem;
        let data = this.gameRecommendList.array[index];
        data.inHome = true;
        data.callback = Laya.Handler.create(this, this.beginGameEffect)
        playGameItem.refreshUI(data);
    }

    private renderFollwGameItem(item: Laya.Box, index: number) {
        let playGameItem = item as PlayGameItem;
        let data = this.gameFollwList.array[index];
        data.inHome = true;
        data.callback = Laya.Handler.create(this, this.beginGameEffect)
        playGameItem.refreshUI(data);
    }


    onClosed(type?: string): void {
        this._data.curGameList = this._data.listType == GameListType.follow ? this.gameFollwList.array : this.gameRecommendList.array;
    }

    onDisable(): void {
        Laya.stage.off(Event.RESIZE,this,this.onResized)
        this.homeBox.off(Event.CLICK, this, this.changeHomeTab)
        this.createBox.off(Event.CLICK, this, this.changeHomeTab)
        this.myBox.off(Event.CLICK, this, this.changeHomeTab)
        this.listBox.off(Event.MOUSE_DOWN, this, this.listBeginFormat);
        this.listBox.off(Event.MOUSE_MOVE, this, this.listMoveFormat);
        this.listBox.off(Event.MOUSE_UP, this, this.listEndFormat);
        this.rankBtn.off(Event.CLICK, this, this.onRankBtnClick)
        this._switchTab = null;
        this._listDataRefresh = null;
    }


}