/**
* @brief: 排行榜规则界面
* @ author: gongganghao
* @ data: 2023-12-11 10:58
*/
import { RankRuleViewBase } from "./RankRuleView.generated";
import Event = Laya.Event;
import { DragDialog } from "../../core/logic/DragDialog";
import { PageManager } from "../../page/PageManager";
import { PagePath } from "../../page/data/PageData";
import { GlobalData } from "../data/GlobalData";
import { RankType } from "./RankView";
import { ServerManager } from "../../server/ServerManager";
const { regClass } = Laya;
@regClass()
export class RankRuleView extends RankRuleViewBase {



    private _curType: string;
    onEnable(): void {
        this.rewardBtn.on(Event.CLICK, this, this.onChangeTab, [true])
        this.ruleBtn.on(Event.CLICK, this, this.onChangeTab, [false])
        this.closeBtn.on(Event.CLICK, this, this.onCloseClick)
        this.getComponent(DragDialog).closeHandler = new Laya.Handler(this, this.onCloseClick)
        this.rewardList.renderHandler = new Laya.Handler(this,this.renderRankItem)
    }

    onOpened(rankType: string): void {
        this._curType = rankType;
        this.ruleBox.visible = true;
        this.rewardBox.visible = false;
        this.getRankRuleInfo();
    }


    renderRankItem(item:Laya.Box,index:number){
        let rank = item.getChildByName("rank") as Laya.Label;
        let reward = item.getChildByName("reward") as Laya.Label;
        let data = this.rewardList.array[index];
        rank.text = "第" + data.define_reward_id + "名";
        reward.text = data.reward_num + "";
    }

    getRankRuleInfo() {
        let _data = {rank_id : "rank_" + this._curType + "_data"};
        ServerManager.instance.httpSendPost('vincent/rank/rankInfo', _data, Laya.Handler.create(this,(data:any)=>{
            if(data.ret == 0){
                this.rewardList.array = data.data.rank_reward;
                this.ruleArea.text = data.data.rank_rule;
            }
        }));
    }

    onChangeTab(isReward: boolean): void {
        this.rewardBox.visible = isReward;
        this.ruleBox.visible = !isReward;
        this.rewardBtn.width = isReward ? 296 : 208;
        this.ruleBtn.width = !isReward ? 296 : 208;
        this.rewardBtn.skin = isReward ? "resources/images/page/congshianniu.png" : "resources/images/page/quxiaoicon.png";
        this.ruleBtn.skin = !isReward ? "resources/images/page/congshianniu.png" : "resources/images/page/quxiaoicon.png";
        this.rewardBtn.labelColors = isReward ? "#000000" : GlobalData.themeColor;
        this.ruleBtn.labelColors = !isReward ? "#000000" : GlobalData.themeColor;
    }


    onCloseClick() {
        PageManager.instance.close(PagePath.RankRulePage);
    }

    onDisable(): void {
        this.rewardBtn.off(Event.CLICK, this, this.onChangeTab)
        this.ruleBtn.off(Event.CLICK, this, this.onChangeTab)
        this.closeBtn.off(Event.CLICK, this, this.onCloseClick)
    }
}