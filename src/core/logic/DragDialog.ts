/**
* @brief: 拖动弹窗
* @ author: gongganghao
* @ data: 2023-11-21 11:47
*/
import { TweenType } from "../../page/data/PageData";
import Event = Laya.Event;
type DragArea = {
    minX: number,
    minY: number,
    maxX: number,
    maxY: number,
}
const { regClass, property } = Laya;
@regClass()
export class DragDialog extends Laya.Script {

    @property({ type: Laya.Box, tips: "背景遮罩" })
    public maskBox: Laya.Box;
    @property({ type: TweenType, tips: "缓动类型", options: { "顶部": TweenType.Top, "底部": TweenType.Bottom, "中心": TweenType.Center, "左侧": TweenType.Left, "右侧": TweenType.Right } })
    public tweenType: TweenType = TweenType.Bottom;
    @property({ type: Number, tips: "缓动事件（毫秒）" })
    public tweenTime: number = 500;
    @property({ type: Laya.Box, tips: "拖动物体" })
    public dragBox: Laya.Box;
    @property({ type: Laya.UIComponent, tips: "拖动区域" })
    public dragImage: Laya.UIComponent;
    @property({ type: Boolean, tips: "自动归位" })
    public auto: boolean = true;
    @property({ type: Boolean, tips: "外部控制缓动" })
    public delay: boolean = false;


    public closeHandler:Laya.Handler;

    private _dragArea: DragArea;
    private _mouseDown: boolean = false;
    private _dragOffset:Laya.Vector2 = new Laya.Vector2();

    onEnable(): void {
        this.showMask(false)
        if(!this.delay){
            this.openHandeler();
        }else{
            this.dragBox.y = Laya.stage.height;
        }

        this.maskBox.on(Event.CLICK, this, this.onCloseClick)
        this.dragImage && this.dragImage.on(Event.MOUSE_DOWN, this, this.onDragMouseDown);
        this.dragImage && this.dragImage.on(Event.MOUSE_UP, this, this.onDragMouseUp);
    }


    openHandeler(){
        this.caculateDragArea();
        this.initDrapBox();
        this.tweenDialog(true, Laya.Handler.create(this, this.showMask, [true]))
    }

    initDrapBox(){
        let size = new Laya.Vector2(this.dragBox.width, this.dragBox.height);
        switch (this.tweenType) {
            case TweenType.Top:
                this.dragBox.y = -size.y;
                break;
            case TweenType.Left:
                this.dragBox.x = -size.x;
                break;
            case TweenType.Center:
                this.dragBox.pos(Laya.stage.width/2, Laya.stage.height/2)
                break;
            case TweenType.Right:
                this.dragBox.x = Laya.stage.width;
                break;
            case TweenType.Bottom:
                this.dragBox.y = Laya.stage.height;
                break;
            default:
                break;
        }
    }

    


    caculateDragArea() {
        let pos = new Laya.Vector2(this.dragBox.x,this.dragBox.y)
        let size = new Laya.Vector2(this.dragBox.width, this.dragBox.height);
        switch (this.tweenType) {
            case TweenType.Top:
                this._dragArea = {
                    minX: pos.x,
                    maxX: pos.x,
                    minY: -size.y,
                    maxY: 0
                }
                break;
            case TweenType.Left:
                this._dragArea = {
                    minX: -size.x,
                    maxX: 0,
                    minY: pos.y,
                    maxY: pos.y
                }
                break;
            case TweenType.Center:
                this._dragArea = {
                    minX: this.dragBox.width/2,
                    maxX: Laya.stage.width-this.dragBox.width/2,
                    minY: this.dragBox.height/2,
                    maxY: Laya.stage.height-this.dragBox.height/2,
                }
                break;
            case TweenType.Right:
                this._dragArea = {
                    minX: 0,
                    maxX: size.x,
                    minY: pos.y,
                    maxY: pos.y
                }
                break;
            case TweenType.Bottom:
                this._dragArea = {
                    minX: pos.x,
                    maxX: pos.x,
                    minY: Laya.stage.height-size.y,
                    maxY: Laya.stage.height
                }
                break;
            default:
                break;
        }
    }



    showMask(isShow: boolean) {
        this.maskBox.visible = isShow;
    }

    tweenDialog(isOpen: boolean, callBack?: Laya.Handler) {
        let size = new Laya.Vector2(this.dragBox.width, this.dragBox.height);
        if (isOpen) {
            switch (this.tweenType) {
                case TweenType.Top:
                    Laya.Tween.to(this.dragBox, { y: 0 }, this.tweenTime, null, callBack)
                    break;
                case TweenType.Left:
                    Laya.Tween.to(this.dragBox, { x: 0 }, this.tweenTime, null, callBack)
                    break;
                case TweenType.Center:
                    this.dragBox.scale(0, 0)
                    Laya.Tween.to(this.dragBox, { scaleX: 1, scaleY: 1 }, this.tweenTime, null, callBack)
                    break;
                case TweenType.Right:
                    Laya.Tween.to(this.dragBox, { x: Laya.stage.width - size.x }, this.tweenTime, null, callBack)
                    break;
                case TweenType.Bottom:
                    Laya.Tween.to(this.dragBox, { y: Laya.stage.height - size.y }, this.tweenTime, null, callBack)
                    break;
                default:
                    callBack && callBack.run()
                    break;
            }
        } else {
            switch (this.tweenType) {
                case TweenType.Top:
                    Laya.Tween.to(this.dragBox, { y: -size.y }, this.tweenTime, null, callBack)
                    break;
                case TweenType.Left:
                    Laya.Tween.to(this.dragBox, { x: -size.x }, this.tweenTime, null, callBack)
                    break;
                case TweenType.Center:
                    Laya.Tween.to(this.dragBox, { scaleX: 0, scaleY: 0 }, this.tweenTime, null, callBack)
                    break;
                case TweenType.Right:
                    Laya.Tween.to(this.dragBox, { x: Laya.stage.width }, this.tweenTime, null, callBack)
                    break;
                case TweenType.Bottom:
                    Laya.Tween.to(this.dragBox, { y: Laya.stage.height }, this.tweenTime, null, callBack)
                    break;
                default:
                    callBack && callBack.run()
                    break;
            }
        }

    }


    onDragMouseDown(evt: Event): void {
        this._mouseDown = true;
        this._dragOffset.setValue(this.dragImage.mouseX,this.dragImage.mouseY)
        Laya.stage.on(Event.MOUSE_MOVE, this, this.onDragMouseMove);
    }

    onDragMouseMove(evt: Event): void {
        if (!this._mouseDown) {
            return;
        }
        switch (this.tweenType) {
            case TweenType.Top:
                this.dragBox.y = this.maskBox.mouseY - this.dragBox.height;
                break;
            case TweenType.Bottom:
                this.dragBox.y = this.maskBox.mouseY;
                break;
            case TweenType.Left:
                this.dragBox.x = this.maskBox.mouseX - this.dragBox.width;
                break;
            case TweenType.Right:
                this.dragBox.x = this.maskBox.mouseX;
                break;
            case TweenType.Center:
                this.dragBox.x = this.maskBox.mouseX-this._dragOffset.x + this.dragBox.width/2;
                this.dragBox.y = this.maskBox.mouseY-this._dragOffset.y + this.dragBox.height/2;
                break;
            default:
                break;
        }

    }

    onDragMouseUp(evt: Event): void {
        this._mouseDown = false;
        Laya.stage.off(Event.MOUSE_MOVE, this, this.onDragMouseMove);
        this.auto && this.autoTween();
    }

    onUpdate(): void {
        if (this._dragArea) {
            if (this.dragBox.x < this._dragArea.minX) {
                this.dragBox.x = this._dragArea.minX
            }
            if (this.dragBox.x > this._dragArea.maxX) {
                this.dragBox.x = this._dragArea.maxX
            }
            if (this.dragBox.y < this._dragArea.minY) {
                this.dragBox.y = this._dragArea.minY
            }
            if (this.dragBox.y > this._dragArea.maxY) {
                this.dragBox.y = this._dragArea.maxY
            }
        }
    }

    autoTween(){
        let closeCallBack = Laya.Handler.create(this,()=>{
            this.showMask(false);
            this.closeHandler && this.closeHandler.run();
        })
        switch (this.tweenType) {
            case TweenType.Top:
                if(this.dragBox.y > (this._dragArea.maxY+this._dragArea.minY)/2){
                    this.tweenDialog(true)
                }else{
                    this.tweenDialog(false,closeCallBack)
                }
                break;
            case TweenType.Left:
                if(this.dragBox.x > (this._dragArea.maxX+this._dragArea.minX)/2){
                    this.tweenDialog(true)
                }else{
                    this.tweenDialog(false,closeCallBack)
                }
                break;
            case TweenType.Center:
                break;
            case TweenType.Right:
                if(this.dragBox.x < (this._dragArea.maxX+this._dragArea.minX)/2){
                    this.tweenDialog(true)
                }else{
                    this.tweenDialog(false,closeCallBack)
                }
                break;
            case TweenType.Bottom:
                if(this.dragBox.y < (this._dragArea.maxY+this._dragArea.minY)/2){
                    this.tweenDialog(true)
                }else{
                    this.tweenDialog(false,closeCallBack)
                }
                break;
            default:
                break;
        }
    }



    onCloseClick() {
        if(this.closeHandler){
            this.tweenDialog(false,Laya.Handler.create(this,()=>{
                this.showMask(false);
                this.closeHandler.run();
            }))
        }
      
    }


    onDisable(): void {
        this.closeHandler = null;
        this._dragArea = null;
        this.maskBox.off(Event.CLICK, this, this.onCloseClick)
        this.dragImage && this.dragImage.off(Event.MOUSE_DOWN, this, this.onDragMouseDown);
        this.dragImage && this.dragImage.off(Event.MOUSE_UP, this, this.onDragMouseUp);
    }


}