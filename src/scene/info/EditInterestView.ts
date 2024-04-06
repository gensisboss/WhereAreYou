import Event = Laya.Event;
import { PageManager } from "../../page/PageManager";
import { ServerManager } from "../../server/ServerManager";
import { EditInterestViewBase } from "./EditInterestView.generated";



export type EditInterestData = {
    choose: string[],
    callBack: Laya.Handler,
    allInterests:any[],
}

/**
* @brief: 编辑单个信息界面
* @ author: gongganghao
* @ data: 2023-11-17 17:49
*/
const { regClass } = Laya;
@regClass()
export class EditInterestView extends EditInterestViewBase {

    private _selectIndex: string[] = []
    private _data: EditInterestData;
    private _limitChoose: number = 5;

    onEnable(): void {
        this.backBtn.on(Event.CLICK, this, this.onCancelClick)
        this.tabList.selectEnable = true;
        this.tabList.renderHandler = new Laya.Handler(this, this.renderTabItem)
        this.tabList.selectHandler = new Laya.Handler(this, this.selectTabItem)
    }

    renderTabItem(item: Laya.Box, index: number) {
        let desc = item.getChildByName("desc") as Laya.Label;
        let select = item.getChildByName("select") as Laya.Image;
        desc.text = this._data.allInterests[index].tag_name;
        select.visible = this._selectIndex.includes(this._data.allInterests[index].tag_id.toString());
    }



    selectTabItem(index: number) {
        let tagId = this._data.allInterests[index].tag_id.toString();
        if (this._selectIndex.includes(tagId)) {
            this._selectIndex.splice(this._selectIndex.indexOf(tagId), 1)
        } else {
            if (this._selectIndex.length >= this._limitChoose) {
                PageManager.instance.showTip("已选"+this._limitChoose+"个感兴趣类型");
                return;
            }
            this._selectIndex.push(tagId)
        }
        this.tabList.refresh();
        this.tipNum.text = "已选择类型 " + "[color=#2a9cfc]"+ this._selectIndex.length +  "[/color]"
    }

    onOpened(param: EditInterestData): void {
        this._data = param;
        this._selectIndex = param.choose;
        this.tabList.array = param.allInterests;
        this.tabList.refresh();
        this.tipNum.text = "已选择类型 " + "[color=#2a9cfc]"+ this._selectIndex.length +  "[/color]"
    }




    onCancelClick() {
        this._data.callBack && this._data.callBack.runWith(this._selectIndex.join(","))
        PageManager.instance.back();
    }


    onDisable(): void {
        this.backBtn.off(Event.CLICK, this, this.onCancelClick)

    }


}