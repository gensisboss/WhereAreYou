
/**
* @brief: 游戏编辑模版界面
* @ author: gongganghao
* @ data: 2023-11-01 19:51
*/
import Fold from "../../core/logic/Fold";
import Event = Laya.Event;
import { PageManager } from "../../page/PageManager";
import { PagePath } from "../../page/data/PageData";
import { EditorModeViewBase } from "./EditorModeView.generated";
import { Game } from "../../item/Game";
import { ServerManager } from "../../server/ServerManager";
import { DescData } from "./DescView";
import { ListChooseData } from "../home/ListChooseView";



const { regClass } = Laya;


@regClass()
export class EditorModeView extends EditorModeViewBase {

    private _draftFold: Fold;

   

    onEnable(): void {
        this._draftFold = this.draftBox.getComponent(Fold);
        this.createBox.on(Event.CLICK, this, this.onCreateClick)
    
        this.draftList.renderHandler = new Laya.Handler(this, this.renderDraftItem)
        this.modeList.selectEnable = true;
        this.modeList.renderHandler = new Laya.Handler(this, this.renderModeItem)
        this.modeList.selectHandler = new Laya.Handler(this, this.selectModeItem)
    }


    onOpened(param: any): void {
        this.getAllListData();
    }



    renderDraftItem(item: Laya.Box, index: number) {
        let game = item as Game;
        let data = this.draftList.array[index];
        game.refreshUI({ info: data, callback: new Laya.Handler(this,()=>{
            let listdata: ListChooseData = {
                arr: ["编辑","删除"],
                colors:["#FFFFFF","#FF0000"],
                callback: new Laya.Handler(this, this.chooseViewCB,[data,index])

            }
            PageManager.instance.open(PagePath.ListChoosePage, listdata)
           
        },null,false)})
    }

    chooseViewCB(data:any,index:number, choose: string) {
        let gamedata: any = {
            game_id : data.game_id,
            from_game_id : 0
        };
        switch (choose) {
            case "编辑":
                PageManager.instance.open(PagePath.EditPage, data, null, true)
                break;
            case "删除":
                PageManager.instance.showConfirm("删除后将不可恢复，确定删除吗？", null, null, Laya.Handler.create(this, (isSure: boolean) => {
                    if (isSure) {
                        ServerManager.instance.httpSendPost('editor/gameDelete', gamedata,Laya.Handler.create(this,()=>{
                            this.draftList.array.splice(index,1);
                            this.draftList.refresh();
                        }));
                    }
                }));
                break;
            default:
                break;
        }
    }




    renderModeItem(item: Laya.Box, index: number) {
        let icon = item.getChildByName("icon") as Laya.Image;
        icon.skin = ServerManager.instance.formatUrl(this.modeList.array[index].url) 
    }

    selectModeItem(index: number) {
        const data = this.modeList.array[index];
        let descdata:DescData = {
            prompt:data.prompt,
            addition:data.desc
        }
        PageManager.instance.open(PagePath.DescPage, descdata, null, false)
        this.modeList["_selectedIndex"] = -1;
    }



    getAllListData() {
        this.getDraftData();
        this.getModeData();
        
    }




    getDraftData() {
        let _data = {
            page: 0,
            pagesize: 20,
        };
        return new Promise((resolve, reject) => {
            ServerManager.instance.httpSendPost('/vincent/game/draftList', _data, Laya.Handler.create(this, (data: any) => {
                if (data.ret == 0) {
                    console.log("当前草稿数据", data.data.list)
                    this.draftList.array = data.data.list;
                    let repeatY = Math.ceil(data.data.list.length/this.draftList.repeatX)
                    this.draftList.repeatY = repeatY;
                    this._draftFold.maxWidth = 170*repeatY + 100;
                    this.draftList.refresh();
                }
                this.draftBox.visible = this.draftList.array && this.draftList.array.length > 0
                resolve(data)
            }));
        })
    }


    getModeData() {
        let _data = {
            offset: 0,
            pagesize: 5,
        };
        return new Promise((resolve, reject) => {
            ServerManager.instance.httpSendPost('/vincent/game/style', _data, Laya.Handler.create(this, (data: any) => {
                console.log("当前模版数据", data)
                if (data.ret == 0) {
                    this.modeList.array = data.data;
                    this.modeList.refresh();
                }
                this.modeBox.visible = this.modeList.array && this.modeList.array.length > 0;
                resolve(data)
            }));
        })
    }



    onCreateClick() {
        let data:DescData = {
            addition:"",
            prompt:""
        }
        PageManager.instance.open(PagePath.DescPage, data, null, false)
    }



    onDisable(): void {
        this._draftFold = null;
        this.createBox.off(Event.CLICK, this, this.onCreateClick)

    }

}