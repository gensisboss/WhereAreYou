/**
* @brief: 作者标签
* @ author: gongganghao
* @ data: 2023-11-15 15:11
*/
export type AuthorData = {
    name:string;
    isAuthor?:boolean;
}

import { AuthorBase } from "./Author.generated";
const { regClass } = Laya;

@regClass()
export class Author extends AuthorBase {

    refreshUI(data:AuthorData){
        this.authorName.text = data.name;
        this.authorIcon.visible = data?.isAuthor;
        this.width = this.authorName.textField.textWidth + (this.authorIcon.visible ? this.authorIcon.width+10 : 10)
    }

}