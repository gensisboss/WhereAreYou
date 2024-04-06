/**
* @brief: 菜单折叠展开逻辑
* @ author: gongganghao
* @ data: 2023-11-02 11:41
*/
//折叠类型
export enum FoldType{
    /**
     * 垂直折叠
     */
    vertical = "verticle",
    /**
     * 水平折叠
     */
    horizontal = "horizontal",
}
import Event = Laya.Event;
const { regClass, property } = Laya;
@regClass()
export default class Fold extends Laya.Script {

    @property({ type: Laya.Image, tips: "折叠背景" })
    public flodBg: Laya.Image;
    @property({ type: FoldType, tips: "折叠类型" ,options: { "垂直": FoldType.vertical, "水平": FoldType.horizontal }})
    public flodType: FoldType = FoldType.horizontal;
    @property({ type: Laya.Button, tips: "折叠按钮" })
    public flodBtn: Laya.Button;
    @property({ type: Laya.Box, tips: "菜单栏" })
    public menuBox: Laya.Box;
    @property({ type: Number, tips: "缓动时间" })
    public tweenTime: number = 500;
    @property({ type: Number, tips: "展开宽度" })
    public maxWidth: number = 500;
    @property({ type: Number, tips: "收起宽度" })
    public minWidth: number = 100;

    private _isOpen:boolean = false;
    
    foldHandler:Laya.Handler;

    onEnable(): void {
        this.flodBtn.on(Event.CLICK,this,this.onFoldChange)
        this.flodBg.on(Event.CLICK,this,this.onFoldChange)
    }

    onFoldChange() {
        let box = this.owner as Laya.Box;
        if (this._isOpen) {
            //背景缓动收起
            if(this.flodType == FoldType.horizontal){
                box.width = this.minWidth;
                Laya.Tween.to(this.flodBg, { width: this.minWidth }, this.tweenTime, Laya.Ease.strongOut);
            }else{
                box.height = this.minWidth;
                Laya.Tween.to(this.flodBg, { height: this.minWidth }, this.tweenTime, Laya.Ease.strongOut);
            }
           
            //菜单消失
            Laya.Tween.to(this.menuBox, { alpha: 0 }, this.tweenTime/2, Laya.Ease.strongOut, Laya.Handler.create(this, () => {
                //修改帮助菜单显示状态
                this.menuBox.visible = false;
                this._isOpen = false;
                this.flodBtn.selected = this._isOpen;
            }));
        } else {
            //背景缓动打开
            if(this.flodType == FoldType.horizontal){
                box.width = this.maxWidth;
                Laya.Tween.to(this.flodBg, { width: this.maxWidth }, this.tweenTime, Laya.Ease.strongOut);
            }else{
                box.height = this.maxWidth;
                Laya.Tween.to(this.flodBg, { height: this.maxWidth }, this.tweenTime, Laya.Ease.strongOut);
            }
            //菜单显示
            Laya.Tween.to(this.menuBox, { alpha: 1 }, this.tweenTime/2, Laya.Ease.strongOut, Laya.Handler.create(this, () => {
                //修改帮助菜单显示状态
                this.menuBox.visible = true;
                this._isOpen = true;
                this.flodBtn.selected = this._isOpen;
            }));
        }
        this.foldHandler && this.foldHandler.runWith(this._isOpen)
    }

    onDisable(): void {
        this.flodBtn.off(Event.CLICK,this,this.onFoldChange)
        this.flodBg.off(Event.CLICK,this,this.onFoldChange)
    }

}