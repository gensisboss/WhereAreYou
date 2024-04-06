/**
* @brief: 悬浮窗
* @ author: gongganghao
* @ data: 2023-11-30 12:00
*/
import { TweenType } from "../../page/data/PageData";
import Event = Laya.Event;
const { regClass, property } = Laya;
type DragArea = {
    minX: number,
    minY: number,
    maxX: number,
    maxY: number,
}
@regClass()
export class FloatWindow extends Laya.Script {

    @property({ type: Laya.Box, tips: "背景遮罩" })
    public maskBox: Laya.Box;
    @property({ type: Laya.Box, tips: "拖动物体" })
    public dragBox: Laya.Box;
    @property({ type: Laya.UIComponent, tips: "拖动区域" })
    public dragImage: Laya.UIComponent;


    public closeHandler: Laya.Handler;

    private _mouseDown: boolean = false;
    private _offsetPos:Laya.Vector2 = new Laya.Vector2()

    onEnable(): void {
        this.maskBox.on(Event.CLICK, this, this.onCloseClick)
        this.dragImage.on(Event.MOUSE_DOWN, this, this.onDragMouseDown);
        this.dragImage.on(Event.MOUSE_UP, this, this.onDragMouseUp);
    }

    setPostion(pos: Laya.Vector2) {
        this.dragBox.pos(pos.x,pos.y)
    }


    onDragMouseDown(evt: Event): void {
        this._mouseDown = true;
        this._offsetPos.setValue(this.dragImage.mouseX,this.dragImage.mouseY)
        Laya.stage.on(Event.MOUSE_MOVE, this, this.onDragMouseMove);
    }

    onDragMouseMove(evt: Event): void {
        if (!this._mouseDown) {
            return;
        }
        this.dragBox.x = evt.stageX-this._offsetPos.x;
        this.dragBox.y = evt.stageY-this._offsetPos.y;

    }

    onDragMouseUp(evt: Event): void {
        this._mouseDown = false;
        Laya.stage.off(Event.MOUSE_MOVE, this, this.onDragMouseMove);
    }

    onUpdate(): void {
        if (this.dragBox.x < 0) {
            this.dragBox.x = 0
        }
        if (this.dragBox.x > Laya.stage.width - this.dragBox.width) {
            this.dragBox.x = Laya.stage.width - this.dragBox.width
        }
        if (this.dragBox.y < 0) {
            this.dragBox.y = 0
        }
        if (this.dragBox.y > Laya.stage.height - this.dragBox.height) {
            this.dragBox.y = Laya.stage.height - this.dragBox.height
        }
    }




    onCloseClick() {
        this.closeHandler && this.closeHandler.run();
    }


    onDisable(): void {
        this.maskBox.off(Event.CLICK, this, this.onCloseClick)
        this.dragImage.off(Event.MOUSE_DOWN, this, this.onDragMouseDown);
        this.dragImage.off(Event.MOUSE_UP, this, this.onDragMouseUp);
    }


}