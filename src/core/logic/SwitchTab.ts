import { GlobalData } from "../../scene/data/GlobalData";

/**
* @brief: table切换逻辑
* @ author: gongganghao
* @ data: 2023-11-16 20:41
*/
export  class SwitchTab {

    private _selectTip:Laya.Image;
    private _btnList:any[];
    private _selectHandle:Laya.Handler;
    private _curTween:Laya.Tween;
    private _isVerticle: boolean = false;
    private _syncWidth: boolean = false;
    private _normalColor:string = "#999999";
    private _selectColor:string = GlobalData.themeColor;


    public curSelect:number;
   
    onEnable(): void {
    }

    
    initItems(btnList: any[],  selectTip?: any, callBack?:Laya.Handler): void {
        this._btnList = btnList;
        this._selectTip = selectTip;
        this._selectHandle = callBack;
        for (var i = 0; i < btnList.length; i++) {
            btnList[i].on(Laya.Event.CLICK, this, this.onTabClick, [i]);
        }
    }

    setStyle(isV:boolean=false,isSync:boolean=false){
        this._isVerticle = isV;
        this._syncWidth = isSync;
    }

    setColor(normal:string,select:string){
        this._normalColor = normal;
        this._selectColor = select;
    }
    
    onTabClick(index:number){
        if(this.curSelect == index){
            return;
        }
        this.curSelect = index;
        this.updateSelectTip();
        this._selectHandle && this._selectHandle.runWith(index);
        this.refreshTabColor(index);
    }

    onTabChange(index:number){
        this.curSelect = index;
        this.updateSelectTip();
        this.refreshTabColor(index);
    }

    refreshTabColor(index:number){
        for (var i = 0; i < this._btnList.length; i++) {
            let tab = this._btnList[i];
            if(tab instanceof Laya.Label){
                tab.color = i==index ? this._selectColor :this._normalColor;
            }
        }
    }

    updateSelectTip(): void {
        if (this._selectTip) {
            var tBtn: any = this._btnList[this.curSelect];
            if(this._curTween){
                this._curTween.clear();
            }
            if (this._isVerticle) {
                let posY =  tBtn.y + Math.round(((tBtn.customHeight || tBtn.height) - this._selectTip.height * this._selectTip.scaleY) * 0.5);
                this._curTween=Laya.Tween.to(this._selectTip,{y: posY},200,null,Laya.Handler.create(this,()=>{this._curTween = null}))
            } else {
                let posX =  tBtn.x + Math.round(((tBtn.customWidth || tBtn.width) - this._selectTip.width * this._selectTip.scaleX) * 0.5);
                this._curTween=Laya.Tween.to(this._selectTip,{x: posX},200,null,Laya.Handler.create(this,()=>{this._curTween = null}))
            }
            if (this._syncWidth) {
                this._selectTip.width = tBtn.width;
            }
        }
    }

    
    onDisable(): void {
    }
    
    onDestroy(): void {
    }
}
