/**
* @brief: 玩家设置界面
* @ author: gongganghao
* @ data: 2023-11-30 17:42
*/
import { PlayerSettingViewBase } from "./PlayerSettingView.generated";
import Event = Laya.Event;
import { FlowList } from "../../core/logic/FlowList";
import { SetItem } from "../../item/SetItem";
import { PageManager } from "../../page/PageManager";
import { PagePath, TweenType } from "../../page/data/PageData";
import { ListSelectData } from "../home/ListSelectView";
import { GlobalData, UserDataKey } from "../data/GlobalData";
import { ServerManager } from "../../server/ServerManager";
import { DBUtils } from "../../utils/DBUtils";
const { regClass } = Laya;
@regClass()
export class PlayerSettingView extends PlayerSettingViewBase {

    private _settingConfig: any
    private _flowList: FlowList;
    private _cacheSize: number;

    async onEnable(): Promise<void> {
        this.backBtn.on(Event.CLICK, this, this.onBackClick)
        this.loginOutBtn.on(Event.CLICK, this, this.onLogOutClick)
        this._flowList = this.listBox.getComponent(FlowList)
        this._flowList.renderHandler = new Laya.Handler(this, this.renderSetItem)
        Laya.loader.load('resources/data/playerSetting.json', Laya.Handler.create(this, (data: Laya.TextResource) => {
            //设置
            this._settingConfig = data ? data.data.config : null;
            if (this._settingConfig) {
                this.modifiyData();
            }
            this.content.height = this._flowList.getContent().height + 200;
        }));

    }


    renderSetItem(item: Laya.Box, data: any, index: number) {
        let setItem = item as SetItem;
        setItem.refreshUI(data)
    }

    onOpened(): void {

    }


    async getCacheSize() {
        return new Promise((resolve: (value?: number) => void, reject) => {
            if (Laya.Browser.onLayaRuntime) {
                let fs = Laya.Browser.window.wx.getFileSystemManager();
                fs.stat({
                    path: "wxfile://tmp",
                    recursive: false,
                    success: (res: any) => {
                        resolve(res.stats.size);
                    },
                    fail: (res: any) => {
                        resolve(0);
                    }
                });
            } else if (Laya.Browser.onTTMiniGame) {
                let fs = Laya.Browser.window.tt.getFileSystemManager();
                const stat = fs.statSync("ttfile://tmp");
                console.log("当前缓存大小", stat.size)
                resolve(stat.size)
            }
            else {
                resolve(0);
            }
        })
    }

    modifiyData() {
        for (let i = 0; i < this._settingConfig.length; i++) {
            let elements = this._settingConfig[i].config;
            for (let j = 0; j < elements.length; j++) {
                let data = elements[j];
                data.value = this.getSetItemData(data);
                data.callBack = new Laya.Handler(this, this.onSetItemClick, [data])
            }
        }
        this._flowList.array = this._settingConfig;
        this._flowList.refresh();
    }



    getSetItemData(data: any) {
        switch (data.name) {
            case "accountNum":
                return GlobalData.getUserDataByKey(UserDataKey.developer_uid)
            case "language":
                return GlobalData.getUserDataByKey(UserDataKey.language);
            case "like":
                return GlobalData.getUserDataByKey(UserDataKey.like)
            case "collect":
                return GlobalData.getUserDataByKey(UserDataKey.collect)
            case "letter":
                return GlobalData.getUserDataByKey(UserDataKey.letter)
            case "chat":
                return GlobalData.getUserDataByKey(UserDataKey.chat)
            case "clear":
                return DBUtils.byteConvert(this._cacheSize);
            default:
                return data.value;
        }
    }


    onSelectViewBack(data: any, type: string) {
        let sendData = {} as any;
        switch (data.name) {
            case "language":
                PageManager.instance.showConfirm("确定要修改语言吗？修改后需要重启应用", "确定", "再想想", Laya.Handler.create(this, (isSure: boolean) => {
                    if (isSure) {
                        GlobalData.setLanguage(type)
                        sendData[UserDataKey.language] = Number(type);
                        this.sendHttpByKey(sendData)
                    }
                }))
                break;
            case "like":
                GlobalData.updateUserData(UserDataKey.like, type)
                sendData[UserDataKey.like] = Number(type);
                this.sendHttpByKey(sendData)
                break;
            case "collect":
                GlobalData.updateUserData(UserDataKey.collect, type)
                sendData[UserDataKey.collect] = Number(type);
                this.sendHttpByKey(sendData)
                break;
            case "letter":
                GlobalData.updateUserData(UserDataKey.letter, type)
                sendData[UserDataKey.letter] = Number(type);
                this.sendHttpByKey(sendData)
                break;
            case "chat":
                GlobalData.updateUserData(UserDataKey.chat, type)
                sendData[UserDataKey.chat] = Number(type);
                this.sendHttpByKey(sendData)
                break;
            default:
                break;
        }
        this.modifiyData();

    }

    //发送修改设置请求
    sendHttpByKey(data: any) {
        ServerManager.instance.httpSendPost('developer/updateSetting', data);
    }

    openSelectView(data: any, ignoreLang?: boolean) {
        let selectData: ListSelectData = {
            title: "选项",
            ignoreLang: ignoreLang,
            data: Object.values(data.alias),
            callBack: Laya.Handler.create(this, this.onSelectViewBack, [data]),
            pos: new Laya.Vector2(Laya.stage.mouseX, Laya.stage.mouseY)
        }
        PageManager.instance.open(PagePath.ListSelectPage, selectData)

    }

    onSetItemClick(data: any) {
        switch (data.name) {
            case "like":
            case "collect":
            case "letter":
            case "chat":
                this.openSelectView(data)
                break;
            case "language":
                this.openSelectView(data, true)
                break;
            case "product":
                PageManager.instance.open(PagePath.AboutPage, null, null, true, "", { type: TweenType.Right })
                break;
            case "clear":
                if (this._cacheSize) {
                    PageManager.instance.showTip('清理中...', 5000);
                    if (Laya.Browser.onLayaRuntime) {
                        var fs = Laya.Browser.window.wx.getFileSystemManager();
                        fs.rmdir({
                            dirPath: "wxfile://tmp",
                            recursive: true,
                            success: (res: any) => {
                                //删除缓存目录后 重建目录
                                Laya.Browser.window.wx.getFileSystemManager().mkdirSync("wxfile://tmp", false);
                                this._cacheSize = 0;
                                this.modifiyData();
                                PageManager.instance.hideTipOrLoading();
                            },
                        });
                    } else if (Laya.Browser.onTTMiniGame) {
                        const fileSystemManager = Laya.Browser.window.tt.getFileSystemManager();

                        // 先创建一个目录
                        const examplePath = "ttfile://tmp";

                        try {
                            fileSystemManager.mkdirSync(examplePath);
                            console.log("创建成功");
                        } catch (err) {
                            console.log("创建失败", err);
                        }

                        // 删除文件
                        fileSystemManager.rmdir({
                            dirPath: examplePath,
                            success(_res) {
                                this._cacheSize = 0;
                                this.modifiyData();
                                PageManager.instance.hideTipOrLoading();
                            },
                            fail(res) {
                                console.log("创建失败", res.errMsg);
                            },
                        });

                    }

                } else {
                    PageManager.instance.showTip('已经很干净了！');
                }
                break;
            default:
                break;
        }
    }

    onBackClick(): void {
        PageManager.instance.back();
    }

    onLogOutClick() {
        GlobalData.tryExit();
    }

    onDisable(): void {
        this.backBtn.off(Event.CLICK, this, this.onBackClick)
        this.loginOutBtn.off(Event.CLICK, this, this.onLogOutClick)
    }
}