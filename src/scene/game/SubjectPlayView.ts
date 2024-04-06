/**
* @brief: 专题游玩界面
* @ author: gongganghao
* @ data: 2023-12-13 14:52
*/
import { SubjectPlayViewBase } from "./SubjectPlayView.generated";
import Event = Laya.Event;
import { PageManager } from "../../page/PageManager";
import { PlayGameItem } from "../../item/PlayGameItem";
import SoundUtil from "../../utils/SoundUtils";

export type SubjectPlayData = {
    list:any[],
    curSelect:number
}
const { regClass } = Laya;
@regClass()
export class SubjectPlayView extends SubjectPlayViewBase{

    
      //当前音乐数据
      private _musicUrl: string = "";
      public get musicUrl(): string {
          return this._musicUrl;
      }
      public set musicUrl(value: string) {
          if (value && value.length > 0) {
                SoundUtil.instance.play(value,0)
          } else {
            SoundUtil.instance.stop();
          }
          this._musicUrl = value;
      }

    private _data:SubjectPlayData;
    private _tempPos: Laya.Vector2 = new Laya.Vector2();
    private _scrollLimit: number = 100;

    onEnable(): void {
        Laya.stage.on(Event.RESIZE,this,this.onResized)
        this.backBtn.on(Event.CLICK, this, this.onBackClick)
        this.middleBox.on(Event.MOUSE_DOWN, this, this.listBeginFormat);
        this.middleBox.on(Event.MOUSE_UP, this, this.listEndFormat);
        this.gameList.renderHandler = new Laya.Handler(this, this.renderGameItem);
        this.middleBox.height = this.gameList.height = Laya.stage.height;
    }

    onOpened(param:SubjectPlayData): void {
        this._data = param;
        this.gameList.visible = param.list.length > 0;
        if(param.list.length > 0){
            this.gameList.array = param.list;
            this.gameList.refresh();
            this.gameList.spaceY = 0;
            this.gameList.scrollBar.value = this._data.curSelect * Laya.stage.height;
            this.musicUrl = this.gameList.array[this._data.curSelect]?.game_bgm;
        }
    }

    onResized(){
        this.gameList.scrollBar.stopScroll();
        this.gameList.scrollBar.value = this._data.curSelect * Laya.stage.height;
    }


    private renderGameItem(item: Laya.Box, index: number) {
        let playGameItem = item as PlayGameItem;
        let data = this.gameList.array[index];
        data.inHome = false;
        data.callback = null;
        playGameItem.refreshUI(data);
    }


    onBackClick() {
        PageManager.instance.back();
    }

    private listBeginFormat(e: Laya.Event) {
        this._tempPos.setValue(e.stageX, e.stageY);
    }



    private listEndFormat(e: Laya.Event) {
        this.gameList.scrollBar.stopScroll();
        if (Math.abs(e.stageY - this._tempPos.y) >= this._scrollLimit) {
            this._data.curSelect += (e.stageY < this._tempPos.y ? 1 : -1)
        }
        if (this._data.curSelect < 0) {
            this._data.curSelect = 0;
        }
        if (this._data.curSelect >= this.gameList.array.length) {
            this._data.curSelect = this.gameList.array.length-1;
        }
        this._tempPos.y = e.stageY;
        let offset = this._data.curSelect * Laya.stage.height;
        Laya.Tween.to(this.gameList.scrollBar, { value: offset }, 500, Laya.Ease.cubicOut,Laya.Handler.create(this,()=>{
            this.musicUrl = this.gameList.array[this._data.curSelect]?.game_bgm;
        }))
    }




    onDisable(): void {
        Laya.stage.off(Event.RESIZE,this,this.onResized)
        this.backBtn.off(Event.CLICK, this, this.onBackClick)
        this.middleBox.off(Event.MOUSE_DOWN, this, this.listBeginFormat);
        this.middleBox.off(Event.MOUSE_UP, this, this.listEndFormat);
    }
}