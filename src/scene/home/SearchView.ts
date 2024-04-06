/**
* @brief: 搜索界面
* @ author: gongganghao
* @ data: 2023-12-01 11:54
*/
import Event = Laya.Event;
import { SearchBox, SearchData } from "../../item/SearchBox";
import { FlowList } from "../../core/logic/FlowList";
import { HistoryItem } from "../../item/HistoryItem";
import { ConfirmData } from "./ConfirmView";
import { PageManager } from "../../page/PageManager";
import { PagePath } from "../../page/data/PageData";
import { SearchViewBase } from "./SearchView.generated";
import { SwitchTab } from "../../core/logic/SwitchTab";
import { IMultiListRefresh, MultiListRefresh } from "../../core/logic/MultiListRefresh";
import { SearchGroupItem, SearchGroupItemData } from "../../item/SearchGroupItem";
import { UserItem, UserItemData } from "../../item/UserItem";
import { SearchGameItem, SearchGameItemData } from "../../item/SearchGameItem";

export enum SearchType {
    all = "all",
    user = "user",
    game = "game",
}

const { regClass } = Laya;
@regClass()
export class SearchView extends SearchViewBase implements IMultiListRefresh {

    //搜索界面参数
    private _historyFlowList: FlowList;
    private _historyData: string[];
    private _maxHistory: number = 30;
    private _recommendData: string[] = ["PartyGame", "PartyGame", "PartyGame", "PartyGame", "PartyGame", "PartyGame", "PartyGame", "PartyGame"]

    //搜索结果界面参数
    private _resultFlowList: FlowList;
    private _switchTab: SwitchTab;
    private _listDataRefresh: MultiListRefresh;
    private _listKeyArr: string[] = [SearchType.all, SearchType.user, SearchType.game]
    private _searchGameItem:Laya.Prefab;
    private _searchUserItem:Laya.Prefab;
    private _searchGroupItem:Laya.Prefab;


    private _tempUserData: UserItemData[] = [

    ]




    onEnable(): void {
        this.searchTipBox.visible = true;
        this.resultBox.visible = false;
        this._historyData = JSON.parse(Laya.LocalStorage.getItem("History")) || [];
        if (this._historyData.length > 0) {
            this.historyBox.visible = true;
        } else {
            this.historyBox.visible = false;
        }
        let searchData: SearchData = {
            prompt: "搜索用户/游戏",
            searchCallBack: new Laya.Handler(this, this.onSearchSureCallBack),
            cancelCallBack: new Laya.Handler(this, this.onSearchCancelCallBack)
        }
        this.searchBox.refreshUI(searchData)
        this._historyFlowList = this.historyPanel.getComponent(FlowList);
        this._historyFlowList.selectEnable = true;
        this._historyFlowList.renderHandler = new Laya.Handler(this, this.renderHistoryItem)
        this._historyFlowList.selectHandler = new Laya.Handler(this, this.selectHistoryItem)

        this.recommendList.selectEnable = true;
        this.recommendList.renderHandler = new Laya.Handler(this, this.renderRecommendItem);
        this.recommendList.selectHandler = new Laya.Handler(this, this.selectRecommendItem);

        this.clearHistory.on(Event.CLICK, this, this.onClearHistoryClick)
        this.refreshRecommend.on(Event.CLICK, this, this.onRefreshCommendClick)
        this.backBtn.on(Event.CLICK, this, this.onBcakBtnClick)

        //-----------------结果界面-------------------------------
        this._searchGameItem = Laya.loader.getRes("prefab/searchGameItem.lh")
        this._searchUserItem = Laya.loader.getRes("prefab/userItem.lh")
        this._searchGroupItem = Laya.loader.getRes("prefab/searchGroupItem.lh")
        this._listDataRefresh = this.resultList.getComponent(MultiListRefresh);
        this._listDataRefresh.listRenderCompleteCallBack = new Laya.Handler(this, (data: any) => {
            this.tipNull.visible = data.array.length <= 0;
        })
        this._resultFlowList = this.resultList.getComponent(FlowList)
        this._listDataRefresh.initListsData(this._resultFlowList, this._listKeyArr, this);
        this._resultFlowList.renderHandler = new Laya.Handler(this, this.renderResultItem)
        this._switchTab = new SwitchTab();
        this._switchTab.initItems([this.allSort, this.userSort, this.gameSort], this.selectTab, new Laya.Handler(this, this.getListData))
    }




    //#region-----------------搜索界面方法-------------------------------
    renderHistoryItem(item: Laya.Box, data: string, index: number) {
        let historyItem = item as HistoryItem;
        historyItem.refreshUI(data)
    }

    selectHistoryItem(data: any, index: number) {
        this.searchBox.setSearchText(data);
    }

    renderRecommendItem(item: Laya.Box, index: number) {
        let desc = item.getChildByName("desc") as Laya.Label;
        desc.text = this._recommendData[index];
    }

    selectRecommendItem(index: number) {
        this.searchBox.setSearchText(this._recommendData[index]);
    }

    onSearchSureCallBack(str: string) {
        if (!this._historyData.includes(str)) {
            this._historyData.unshift(str);
            while (this._historyData.length > this._maxHistory) {
                this._historyData.pop();
            }
            Laya.LocalStorage.setItem("History", JSON.stringify(this._historyData))
        }
        this.searchTipBox.visible = false;
        this.resultBox.visible = true;
        //TODO:获取搜索结果
    }

    onSearchCancelCallBack(str: string) {
        this.searchTipBox.visible = true;
        this.resultBox.visible = false;
        this.refreshSearchTipBox();
    }

    onBcakBtnClick() {
        PageManager.instance.back()
    }




    refreshSearchTipBox() {
        this.historyBox.visible = this._historyData.length > 0;
        this._historyFlowList.array = this._historyData;
        this._historyFlowList.refresh();
        this.historyBox.height = this._historyFlowList.getContent().height + 10;
        this.recommendBox.top = this.historyBox.visible ? this.historyBox.height + 10 : 0;
    }

    onRefreshCommendClick() {
        //TODO:获取推荐搜索
        this.recommendList.array = this._recommendData;
        this.recommendList.repeatY = Math.ceil(this._recommendData.length / 2)
    }

    onClearHistoryClick() {
        let callBack = Laya.Handler.create(this, (isSure: boolean) => {
            if (isSure) {
                this._historyData = [];
                Laya.LocalStorage.setItem("History", JSON.stringify(this._historyData))
                this.refreshSearchTipBox();
            }
        })
        PageManager.instance.showConfirm("确定删除全部搜索记录吗？",null,null,callBack)
    }

    //#endregion



    onOpened(): void {
        this.refreshSearchTipBox();
        this.onRefreshCommendClick();

    }



    //#region-----------------结果界面方法-------------------------------
    renderResultItem(item: Laya.Box, data: any, index: number) {
        switch (this._listKeyArr[this._switchTab.curSelect]) {
            case SearchType.all:
                (item as SearchGroupItem).refreshUI(data)
                break;
            case SearchType.user:
                (item as UserItem).refreshUI(data)
                break;
            case SearchType.game:
                (item as SearchGameItem).refreshUI(data)
                break;
            default:
                break;
        }
    }

    changeTab(index: number) {
        this._switchTab.onTabClick(index)
    }

    getGroupData() {
       

    }

    getListData(index: number) {
        switch (this._listKeyArr[index]) {
            case SearchType.all:
                this._resultFlowList.changeRenderItem(this._searchGroupItem);
                break;
            case SearchType.user:
                this._resultFlowList.changeRenderItem(this._searchUserItem);
                break;
            case SearchType.game:
                this._resultFlowList.changeRenderItem(this._searchGameItem);
                break;
            default:
                break;
        }
        this._listDataRefresh.changeTabWithKey(this._listKeyArr[index])
    }
    refreshData(callback: Laya.Handler, key?: any): void {
        let netData:any = {
            success:true
        }
        switch (this._listKeyArr[this._switchTab.curSelect]) {
            case SearchType.all:
                netData.data = this.getGroupData()
                break;
            case SearchType.user:
                netData.data = this._tempUserData;
                break;
            case SearchType.game:
                break;
            default:
                break;
        }
        callback.runWith(netData)
    }

    //#endregion




    onDisable(): void {
        this._switchTab = null;
        this._listDataRefresh = null;
        this.clearHistory.off(Event.CLICK, this, this.onClearHistoryClick)
        this.refreshRecommend.off(Event.CLICK, this, this.onRefreshCommendClick)
        this.backBtn.off(Event.CLICK, this, this.onBcakBtnClick)
    }
}