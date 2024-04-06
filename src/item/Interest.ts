/**
* @brief: 兴趣标签
* @ author: gongganghao
* @ data: 2023-11-15 15:11
*/


import { InterestBase } from "./Interest.generated";
const { regClass } = Laya;

@regClass()
export class Interest extends InterestBase {

    refreshUI(data:string){
        this.tab.text = data;
        this.width = this.tab.textField.textWidth + 10;
    }

}