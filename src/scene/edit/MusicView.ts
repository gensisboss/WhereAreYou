/**
* @brief: 生成音乐界面
* @ author: gongganghao
* @ data: 2023-12-08 11:50
*/
import Event = Laya.Event;
import { PageManager } from "../../page/PageManager";
import { PagePath, TweenType } from "../../page/data/PageData";
import { DragDialog } from "../../core/logic/DragDialog";
import { ServerManager } from "../../server/ServerManager";
import { MusicViewBase } from "./MusicView.generated";
import { SwitchTab } from "../../core/logic/SwitchTab";
import { IMultiListRefresh, MultiListRefresh } from "../../core/logic/MultiListRefresh";
import { MusicItem } from "../../item/MusicItem";
import { EditorMusicData } from "./EditorMusicView";
import SoundUtil from "../../utils/SoundUtils";

export enum MusicType {
    all = "all",
    my = "my"
}

export type MusicData = {
    url?:string
    callback:Laya.Handler
}
const { regClass } = Laya;
@regClass()
export  class MusicView extends MusicViewBase implements IMultiListRefresh {

    private _data:MusicData;
    private _dragDialog:DragDialog;
    private _switchTab: SwitchTab;
    private _curType: string = MusicType.all;
    private _listDataRefresh: MultiListRefresh;
    private _listKeyArr: string[] = [MusicType.all, MusicType.my]
    onEnable(): void {
        this._dragDialog = this.getComponent(DragDialog);
        this._dragDialog.closeHandler = new Laya.Handler(this,this.onBackClick)
        this.generateBtn.on(Event.CLICK,this,this.onGenerateClick) 
        this.descnput.on(Event.INPUT,this,this.onMusicInput)
        this.nameInput.on(Event.INPUT,this,this.onMusicInput)

        this._listDataRefresh = this.libraryList.getComponent(MultiListRefresh);
        this._listDataRefresh.listRenderCompleteCallBack = new Laya.Handler(this, (data: any) => {
            this.tipNull.visible = data.array.length <= 0;
            this.libraryList.visible =  data.array.length > 0;
        })
        this._listDataRefresh.initListsData(this.libraryList, this._listKeyArr, this);
        this.libraryList.selectEnable = true;
        this.libraryList.renderHandler = new Laya.Handler(this, this.renderMusicItem)
        this.libraryList.selectHandler = new Laya.Handler(this, this.selectMusicItem)
        this._switchTab = new SwitchTab();
        this._switchTab.setColor("#DEDFDF","#181B21")
        this._switchTab.initItems([this.allSort, this.mySort,], this.selectTab, new Laya.Handler(this, this.getListData))
    }

    onGenerateClick(){
        if(this.nameInput.text.length <= 0){
            PageManager.instance.showTip("请输入音乐昵称")
            return;
        }
        if(this.descnput.text.length <= 0){
            PageManager.instance.showTip("请输入音乐描述")
            return;
        }
        PageManager.instance.showGenerate();
        ServerManager.instance.createAIMusic(this.descnput.text,Laya.Handler.create(this,(data:any)=>{
            if(data.ret == 0){
                SoundUtil.instance.stop()
                PageManager.instance.hideTipOrLoading()
                let musicData:EditorMusicData = {
                    name:this.nameInput.text,
                    desc:this.descnput.text,
                    url:ServerManager.instance.AIBaseUrl + data.data.url,
                    callback:Laya.Handler.create(this,this.onGenerateCallBack)
                }
                PageManager.instance.open(PagePath.EditMusicPage,musicData,null,false)
            }else{
                PageManager.instance.showTip(data.msg)
            }
        }))
       
    }

    onGenerateCallBack(isUse:boolean,musicData?:EditorMusicData){
        SoundUtil.instance.stop();
        if(isUse){
            this._data.callback && this._data.callback.runWith(musicData.url);
            this.onSaveMyMusic(musicData);
            PageManager.instance.close(PagePath.MusicPage);
        }else{
           this._data.url &&  SoundUtil.instance.play(this._data.url,0);
        }
    }

    onSaveMyMusic(data:EditorMusicData){
        let _data = {
            preform_name: data.name,
            preform_desc: data.desc,
            preform_file: data.url,
        }
        ServerManager.instance.httpSendPost("/vincent/audio/add",_data)
    }



    getListData(index: number) {
        this._curType = this._listKeyArr[index];
        this._listDataRefresh.changeTabWithKey(this._curType);
    }

    refreshData(callback: Laya.Handler, data?: any): void {
        let _data = {
            offset: data['offset'] ? data['offset'] : 0,
            pagesize: 15,
            page:data['page'] ? data['page'] : 0,
            condition : JSON.stringify([{"preform_type":[10]}]) 
        };
        if(this._curType == MusicType.all){
            ServerManager.instance.httpSendPost('/store/getStorePreformList',_data, callback);
        }else{
            ServerManager.instance.httpSendPost('/vincent/audio/getList',_data, callback);
        }
    }

    
    renderMusicItem(item: Laya.Box, index: number) {
        let musicItem = item as MusicItem;
        let data = this.libraryList.array[index];
        data.deleteCallBack = Laya.Handler.create(this,this.onDeleteMusic,[index]);
        musicItem.refreshUI(data);
    }

    onDeleteMusic(index:number){
        this.libraryList.array.splice(index,1);
        this.libraryList.refresh();
    }

    selectMusicItem(index:number){
        let data = this.libraryList.array[index];
        let musicData:EditorMusicData = {
            name:data.preform_name,
            desc:data.preform_desc,
            url: ServerManager.instance.formatUrl(data.preform_file),
            callback:Laya.Handler.create(this,this.onGenerateCallBack)
        }
        PageManager.instance.open(PagePath.EditMusicPage,musicData,null,false)
        this.libraryList["_selectedIndex"] = -1;
    }



    onMusicInput(){
        let canGenerate = this.descnput.text.length > 0 && this.nameInput.text.length > 0
        this.generateBtn.selected = canGenerate;
        this.generateBtn.labelColors = canGenerate ? "#000000,#000000,#000000" : "#FFFFFF,#FFFFFF,#FFFFFF";
        this.nameNum.text = this.nameInput.text.length + "/" + this.nameInput.maxChars;
        this.descNum.text = this.descnput.text.length + "/" + this.descnput.maxChars;
    }

    
    onOpened(param:MusicData): void {
        this._data = param;
        this.dragBox.height = Laya.stage.height;
        this._dragDialog.openHandeler();
        this._switchTab.onTabClick(0)
        this.onMusicInput();
    }


    onBackClick():void{
        PageManager.instance.close(PagePath.MusicPage);
    }
    
   
    onDisable(): void {
        this._dragDialog =  null;
        this.generateBtn.off(Event.CLICK,this,this.onGenerateClick) 
        this.descnput.off(Event.INPUT,this,this.onMusicInput)
        this.nameInput.off(Event.INPUT,this,this.onMusicInput)
    }
}