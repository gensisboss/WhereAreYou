/**
* @brief: 关于产品界面
* @ author: gongganghao
* @ data: 2023-11-01 14:01
*/

import Event = Laya.Event;
import { PageManager } from "../../page/PageManager";
import { PagePath, TweenType } from "../../page/data/PageData";
import { HeadData } from "../../item/Head";
import { ListChooseData } from "../home/ListChooseView";
import { ImageUtils } from "../../utils/ImageUtile";
import { PreviewIconData } from "./PreviewIconView";
import { EditIconData } from "./EditIconView";
import { GlobalData, UserDataKey } from "../data/GlobalData";
import { FlowList } from "../../core/logic/FlowList";
import { ListSelectData } from "../home/ListSelectView";
import { EditInterestData } from "./EditInterestView";
import { DataUtils } from "../../utils/DataUtils";
import { ServerManager } from "../../server/ServerManager";
import { AboutViewBase } from "./AboutView.generated";




const { regClass } = Laya;
@regClass()
export class AboutView extends AboutViewBase {
    private _editData: any[] = [
        { title: "昵称", tip: "请输入昵称", type: UserDataKey.nickname, desc: GlobalData.nickname, limit: 10 },
        { title: "性别", tip: "请选择", type: UserDataKey.gender, desc: GlobalData.gender, limit: 1 },
        { title: "兴趣", tip: "请选择五个你感兴趣的游戏类型", type: UserDataKey.interests, desc: GlobalData.interest, limit: 5 },
    ]


    private _headIcon: string;
    private _allInterests: any[];


    onEnable(): void {
        this.backBtn.on(Event.CLICK, this, this.onBackBtnClick)
        this.contentList.selectEnable = true;
        this.contentList.renderHandler = new Laya.Handler(this, this.renderItem)
        this.contentList.selectHandler = new Laya.Handler(this, this.selectItem)
    }


    onOpened(): void {
        this.getContentList();
    }

    getContentList() {
        Laya.loader.load('https://layabox-1.oss-cn-beijing.aliyuncs.com/system/settings/_ver.txt', Laya.Handler.create(this, (index: Laya.TextResource) => {
            let jsonPath = "https://layabox-1.oss-cn-beijing.aliyuncs.com/system/settings/config_" +(index?index.data:"") + ".json";
            Laya.loader.load(jsonPath, Laya.Handler.create(this, (data:  Laya.TextResource) => {
                //设置
                if(data.data){
                    this.version.text = '版本号:'+ GlobalData.versionName +"(test)";
                    let info = [
                        { name: "Facebook", info: data.data.about_facebook,infoleft:150},
                        { name: "Twitter", info: data.data.about_twitter,infoleft:130},
                        { name: "客服邮箱", info: data.data.about_email,infoleft:150 },
                        { name: "编辑器反馈邮箱", info: data.data.about_developer_feedback,infoleft:230},
                        { name: "Discord 用户群", info: data.data.about_discord,infoleft:220}
                    ]
                    this.contentList.array = info;
                }
            }));
        }));
    }

   

    renderItem(item: Laya.Box, index: number) {
        let data = this.contentList.array[index];
        let title = item.getChildByName("title") as Laya.Label;
        let desc = item.getChildByName("desc") as Laya.Label;
        title.text = data.name;
        desc.text = data.info;
      
    }

    selectItem(index: number) {
        let info = this.contentList.array[index].info;
        GlobalData.copyInfo(info)
        PageManager.instance.showTip("复制成功")
    }


    onBackBtnClick() {
        PageManager.instance.back();
    }


    onDisable(): void {
        this.backBtn.off(Event.CLICK, this, this.onBackBtnClick)
    }

}