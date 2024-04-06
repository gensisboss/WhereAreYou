/**
* @brief: 兴趣标签
* @ author: gongganghao
* @ data: 2023-11-15 15:11
*/


import { HistoryItemBase } from "./HistoryItem.generated";
const { regClass } = Laya;

@regClass()
export class HistoryItem extends HistoryItemBase {

    refreshUI(data:string){
        this.tab.text = data;
        this.width = this.tab.textField.textWidth + 50;
    }

}