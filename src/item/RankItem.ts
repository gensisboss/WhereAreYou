/**
* @brief: 排行Item
* @ author: gongganghao
* @ data: 2023-12-09 17:08
*/
import { RankType } from "../scene/home/RankView";
import Event = Laya.Event;
import { RankItemBase } from "./RankItem.generated";
import { GlobalData } from "../scene/data/GlobalData";
import { TxtUtils } from "../utils/TxtUtils";

export type RankItemData = {
    rank: number,
    type: RankType,
    userInfo?: any
    gameInfo?: any,
    rankval?:number,
}
const { regClass } = Laya;
@regClass()
export class RankItem extends RankItemBase {

    private _rankBgColor = ["#fc652b","#fcaa2a","#2aa6fc","#666b85"]

    refreshUI(data: RankItemData) {
        let isMySelf = data.userInfo.developer_uid == GlobalData.developer_uid;
        this.rankBg.color = this._rankBgColor[(data.rank < 3 ? data.rank:3)]
        this.rankNum.text = (data.rank + 1).toString();
        this.rankNum.color = isMySelf ? GlobalData.themeColor : "#FFFFFF";
        this.selfBg.visible = isMySelf;
        switch (data.type) {
            case RankType.player:
                this.head.refreshUI({uid:data.userInfo.developer_uid,url:data.userInfo.avatar})
                this.names.text = data.userInfo.nickname;
                this.game.visible = false;
                this.gameName.visible = false;
                this.info.visible = true;
                this.infoNum.text = TxtUtils.getDisplayNum(data.rankval);
                this.infoIcon.skin = "resources/images/rank/xingji.png"
                break;
            case RankType.game:
                this.head.refreshUI({uid:data.userInfo.developer_uid,url:data.userInfo.avatar})
                this.names.text = data.userInfo.nickname;
                this.game.visible = true;
                this.gameName.visible = true;
                this.game.refreshUI({info:data.gameInfo})
                this.gameName.text = data.gameInfo.game_name;
                this.info.visible = false;
                break;
            case RankType.maker:
                this.head.refreshUI({uid:data.userInfo.developer_uid,url:data.userInfo.avatar})
                this.names.text = data.userInfo.nickname;
                this.game.visible = false;
                this.gameName.visible = false;
                this.info.visible = true;
                this.infoNum.text = TxtUtils.getDisplayNum(data.rankval);
                this.infoIcon.skin = "resources/images/rank/zuopin.png"
                break;
            default:
                break;
        }
    }

    
}