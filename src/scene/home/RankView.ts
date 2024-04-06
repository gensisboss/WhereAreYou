/**
* @brief: 排行榜界面
* @ author: gongganghao
* @ data: 2023-12-09 16:46
*/
import { RankViewBase } from "./RankView.generated";
import Event = Laya.Event;
import { IMultiListRefresh, MultiListRefresh } from "../../core/logic/MultiListRefresh";
import { ServerManager } from "../../server/ServerManager";
import { SwitchTab } from "../../core/logic/SwitchTab";
import { PageManager } from "../../page/PageManager";
import { PagePath, TweenType } from "../../page/data/PageData";
import { GlobalData } from "../data/GlobalData";
import { RankItem } from "../../item/RankItem";
export enum RankType {
    player = "player",
    game = "game",
    maker = "maker",
}

const { regClass } = Laya;
@regClass()
export class RankView extends RankViewBase implements IMultiListRefresh {

    private _switchTab: SwitchTab;
    private _curType: string = RankType.player;
    private _listDataRefresh: MultiListRefresh;
    private _listKeyArr: string[] = [RankType.player, RankType.game, RankType.maker]

    onEnable(): void {
        this.backBtn.on(Event.CLICK, this, this.onBackClick)
        this.ruleBtn.on(Event.CLICK, this, this.onRuleBtnClick)
        this._listDataRefresh = this.rankList.getComponent(MultiListRefresh);
        this._listDataRefresh.listRenderCompleteCallBack = new Laya.Handler(this, (data: any) => {
            this.tipNull.visible = data.array.length <= 0;
            this.myBox.visible = data.array.length > 0;
            this.rankList.visible = data.array.length > 0;
            if (data.array.length > 0) {
                this.checkMyRank(data.array)
            }
        })
        this._listDataRefresh.initListsData(this.rankList, this._listKeyArr, this);
        this.rankList.selectEnable = true;
        this.rankList.renderHandler = new Laya.Handler(this, this.renderRankItem)
        this._switchTab = new SwitchTab();
        this._switchTab.initItems([this.playerSort, this.gameSort, this.creatSort], this.selectTab, new Laya.Handler(this, this.getListData))

    }


    onOpened(param: any): void {
        this._switchTab.onTabChange(0)
    }

    selectMessageItem(chatData: any) {
        PageManager.instance.open(PagePath.ChatPage, chatData, null, true, "", { type: TweenType.Right })
    }

    onRuleBtnClick() {
        PageManager.instance.open(PagePath.RankRulePage, this._curType)
    }

    checkMyRank(arr: any[]) {
        let flag = false;
        for (let i = 0; i < arr.length; i++) {
            let info = arr[i];
            if (info.userInfo.developer_uid == GlobalData.developer_uid) {
                info.type = this._curType;
                flag = true;
                this.myItem.refreshUI(info);
                break;
            }
        }
        this.myBox.visible = flag;
    }



    renderRankItem(item: Laya.Box, index: number) {
        let ranItem = item as RankItem;
        let data = this.rankList.array[index];
        data.type = this._curType;
        ranItem.refreshUI(data);
    }


    onBackClick() {
        PageManager.instance.back();
    }


    getListData(index: number) {
        this._curType = this._listKeyArr[index];
        this._listDataRefresh.changeTabWithKey(this._curType);
    }


    refreshData(callback: Laya.Handler, data?: any): void {
        let _data = {
            pagesize: 20,
            order: "desc",
            period: "2week",
            page: data['page'] ? data['page'] : 0,
        };
        ServerManager.instance.httpSendPost('vincent/rank/' + this._curType, _data, callback);
    }


    onDisable(): void {
        this._switchTab = null;
        this._listDataRefresh = null;
        this.backBtn.off(Event.CLICK, this, this.onBackClick)
        this.ruleBtn.off(Event.CLICK, this, this.onRuleBtnClick)
    }

}