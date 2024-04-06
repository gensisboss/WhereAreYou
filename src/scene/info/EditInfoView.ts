/**
* @brief: 玩家信息界面
* @ author: gongganghao
* @ data: 2023-11-01 14:01
*/

import { EditInfoViewBase } from "./EditInfoView.generated";
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




const { regClass } = Laya;
@regClass()
export class EditInfoView extends EditInfoViewBase {
    private _editData: any[] = [
        { title: "昵称", tip: "请输入昵称", type: UserDataKey.nickname, desc: GlobalData.nickname, limit: 10 },
        { title: "性别", tip: "请选择", type: UserDataKey.gender, desc: GlobalData.gender, limit: 1 },
    ]


    private _headIcon: string;
    private _allInterests: any[];


    onEnable(): void {
        this.backBtn.on(Event.CLICK, this, this.onBackBtnClick)
        this.saveBtn.on(Event.CLICK, this, this.onSaveClick)
        this.sloganInput.on(Event.INPUT, this, this.onSloganChange)
        this.editList.selectEnable = true;
        this.editList.renderHandler = new Laya.Handler(this, this.renderEditItem)
    }


    onOpened(): void {
        if (!GlobalData.tempEditData) {
            GlobalData.tempEditData = DataUtils.copy(this._editData)
        }
        this.editList.array = GlobalData.tempEditData;
        this.editList.refresh();
        this.refreshHeadInfo(GlobalData.avatar);
        this.sloganInput.text = GlobalData.slogan;

    }

    getInterestById(id:string){
        for (let i = 0; i < this._allInterests.length; i++) {
            if(id == this._allInterests[i].tag_id) {
                return this._allInterests[i].tag_name;
            }
        }
        return "";
    }

    renderEditItem(item: Laya.Box, index: number) {
        item.offAll()
        let data = this.editList.array[index];
        let title = item.getChildByName("title") as Laya.Label;
        let list = item.getChildByName("list") as Laya.Panel;
        let input = item.getChildByName("desc") as Laya.TextInput;
        title.text = data.title
        list.visible = false;
        input.visible = true;
        input.prompt = data.tip;
        if (data.type == UserDataKey.gender) {
            input.editable = false;
            input.text = GlobalData.genderMap[data.desc as keyof typeof GlobalData.genderMap];
            item.on(Event.CLICK, this, this.editGender)
        } else if (data.type == UserDataKey.interests) {
            input.editable = false;
            if (data.desc.length > 0) {
                list.visible = true;
                input.visible = false;
                let flowList = list.getComponent(FlowList)
                flowList.array = data.desc.split(",");
                flowList.renderHandler = new Laya.Handler(this, (box: Laya.Box, data: any, index: number) => {
                    let tab = box.getChildByName("tab") as Laya.Label;
                    tab.text = this.getInterestById(data);
                    box.width = tab.textField.textWidth + 10;
                })
                flowList.refresh();
                list.width = flowList.getContent().width;
            } else {
                list.visible = false;
                input.visible = true;
            }
            item.on(Event.CLICK, this, this.editInterests)
        }
        else {
            input.editable = true;
            input.text = data.desc;
            input.on(Event.INPUT, this, this.onNickNameChange, [input])
        }
    }


    onNickNameChange(e: Laya.Input) {
        GlobalData.tempEditData[0].desc = e.text;
    }

    onSloganChange() {
        this.sloganNum.text = this.sloganInput.text.length + "/50"
    }

 

    checkIsChange() {
        if (this.sloganInput.text != GlobalData.slogan) {
            return true;
        }
        if (GlobalData.tempEditData) {
            for (let i = 0; i < GlobalData.tempEditData.length; i++) {
                if (!DataUtils.deepEqual(GlobalData.tempEditData[i].desc, this._editData[i].desc)) {
                    return true;
                }
            }
        }
        return false;

    }


    onSaveClick() {
        if (this.checkIsChange()) {
            this.saveInfo();
        }
        GlobalData.tempEditData = null;
        PageManager.instance.back();
    }

    saveInfo() {
        GlobalData.updateUserData(UserDataKey.slogan, this.sloganInput.text);
        for (let i = 0; i < GlobalData.tempEditData.length; i++) {
            const data = GlobalData.tempEditData[i];
            GlobalData.updateUserData(data.type, data.desc)
        }

        var data: any = {
            avatar: GlobalData.avatar,
            nickname: GlobalData.nickname,
            gender: GlobalData.gender,
            slogan: GlobalData.slogan,
            interest: GlobalData.interest,
            device: GlobalData.getPlatform(), // 必填 客户端系统 android|ios
        };
        ServerManager.instance.httpSendPost('developer/updateUserInfo', data);
    }


    changeHeadCallBack(url: string) {
        GlobalData.updateUserData(UserDataKey.avatar,url)
        var data: any = {
            avatar: url,
            device: GlobalData.getPlatform(), // 必填 客户端系统 android|ios
        };
        ServerManager.instance.httpSendPost('developer/updateUserInfo', data);
        this.refreshHeadInfo(url);
    }


    chooseViewCB(choose: string) {
        let callback = Laya.Handler.create(this, (data: any, src: string) => {
            let editData: EditIconData = {
                ab: data,
                url: src,
                isHead: true,
                callBack:Laya.Handler.create(this,this.changeHeadCallBack)
            }
            PageManager.instance.open(PagePath.EditIconPage, editData, null, true, "", { type: TweenType.Right })
        })
        switch (choose) {
            case "相册选择":
                ImageUtils.chooseImage(callback)
                break;
            case "拍一张":
                ImageUtils.chooseImage(callback, "camera");
                break;
            case "查看头像":
                let previewData: PreviewIconData = {
                    isPure:true,
                    url: this._headIcon,
                }
                PageManager.instance.open(PagePath.PreviewIconPage, previewData)
                break;
            default:
                break;
        }
    }


    getInterestList() {
        ServerManager.instance.httpSendPost("interest/interestList", {}, Laya.Handler.create(this, (data: any) => {
            this._allInterests = data.data;
            this.editList.array = GlobalData.tempEditData;
            this.editList.refresh();
        }))
    }


    openChooseView() {
        let data: ListChooseData = {
            arr: ["相册选择", "拍一张", "查看头像"],
            callback: new Laya.Handler(this, this.chooseViewCB)
        }
        PageManager.instance.open(PagePath.ListChoosePage, data)
    }


    refreshHeadInfo(headIcon: string) {
        this._headIcon = ServerManager.instance.formatUrl(headIcon);
        let data: HeadData = {
            uid: GlobalData.developer_uid,
            url:  this._headIcon,
            callback: new Laya.Handler(this, this.openChooseView),
        }
        this.head.refreshUI(data);
    }


    editGender(e: Event) {
        let data: ListSelectData = {
            title: "性别",
            data: Object.values(GlobalData.genderMap),
            callBack: Laya.Handler.create(this, this.editGenderCallBack),
            pos: new Laya.Vector2(e.stageX, e.stageY + 50)
        }
        PageManager.instance.open(PagePath.ListSelectPage, data)
    }

    editGenderCallBack(index: number) {
        let value = Object.keys(GlobalData.genderMap)[index]
        GlobalData.tempEditData[1].desc = value;
        this.editList.array = GlobalData.tempEditData;
        this.editList.refresh();
    }


    editInterests() {
        let data: EditInterestData = {
            allInterests: this._allInterests,
            choose: GlobalData.tempEditData[2].desc.split(","),
            callBack: Laya.Handler.create(this, this.editInterestsCallBack),
        }
        PageManager.instance.open(PagePath.EditInterestmPage, data, null, true, "", { type: TweenType.Right })
    }

    editInterestsCallBack(interests: string) {
        GlobalData.tempEditData[2].desc = interests;
        this.editList.array = GlobalData.tempEditData;
        this.editList.refresh();
    }



    onBackBtnClick() {
        if (this.checkIsChange()) {
            let callBack = Laya.Handler.create(this, (isSure: boolean) => {
                if(isSure != undefined){
                    if (isSure) {
                        this.saveInfo();
                    }
                    PageManager.instance.back();
                    GlobalData.tempEditData = null;
                }
            })
            PageManager.instance.showConfirm("存在未提交的内容", "保存并退出", "直接退出", callBack)
        } else {
            PageManager.instance.back();
            GlobalData.tempEditData = null;
        }

    }


    onDisable(): void {
        this.backBtn.off(Event.CLICK, this, this.onBackBtnClick)
        this.saveBtn.off(Event.CLICK, this, this.onSaveClick)
        this.sloganInput.off(Event.INPUT, this, this.onSloganChange)

    }

}