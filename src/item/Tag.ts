/**
* @brief: 游戏标签
* @ author: gongganghao
* @ data: 2023-11-15 15:11
*/


import { TagBase } from "./Tag.generated";
const { regClass } = Laya;

@regClass()
export class Tag extends TagBase {

    refreshUI(data:string){
        this.tab.text = data;
        this.width = this.tab.textField.textWidth + 50;
    }

}