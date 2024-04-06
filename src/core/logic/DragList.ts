/**
* @brief: 可拖动列表内的item
* @ author: gongganghao
* @ data: 2023-11-28 15:42
*/
import Event = Laya.Event;
const { regClass, property } = Laya;
@regClass()
export class DragList extends Laya.Script {


    @property({ type: Laya.Prefab, tips: "渲染节点" })
    public item: Laya.Prefab;
    @property({ type: Number, tips: "水平间隔距离" })
    public spaceX: number = 10;
    @property({ type: Number, tips: "垂直间隔距离" })
    public spaceY: number = 10;

    /**改变 <code>List</code> 的选择项时执行的处理器，(默认返回参数： 项索引（index:int）)。*/
    selectHandler: Laya.Handler | null;
    /**单元格渲染处理器(默认返回参数cell:UIComponent,index:int)。*/
    renderHandler: Laya.Handler | null;
    /**单元格鼠标事件处理器(默认返回参数e:Event,index:int)。*/
    mouseHandler: Laya.Handler | null;
    /**指定是否可以选择，若值为true则可以选择，否则不可以选择。 @default false*/
    selectEnable: boolean = false;

    private _boxPool: Laya.Box[];
    private _panel: Laya.Panel;

    private _array: any[] = [];
    public get array(): any[] {
        return this._array || [];
    }
    public set array(value: any[]) {
        this._array = value;

    }

    private _isVerticle: boolean = true;
    private _content: Laya.Box;


    //#region 拖动item所需参数
    private _curMoveItem: Laya.Box;
    private _curMoveIndex: number = -1;
    private _tempPoint: Laya.Point = new Laya.Point();
    private _tempAnchor: Laya.Vector2 = new Laya.Vector2();
    private _contentOffset: number = 0;
    private _contentIsMove: boolean = false;
    private _offsetPos: number = 100000;
    //#endregion



    onAwake(): void {
        this._panel = this.owner as Laya.Panel
        this._boxPool = [];
        this._content = new Laya.Box();
        this._content.width = this._panel.width;
        this._content.height = this._panel.height;
        this._panel.addChild(this._content);
        this._content.pos(0, 0)
    }



    onEnable(): void {
        this._isVerticle = this._panel.scrollType == Laya.ScrollType.Vertical
        if (this._isVerticle) {
            this._panel.vScrollBar.on(Event.CHANGE, this, this.onPanelScroll)
        } else {
            this._panel.hScrollBar.on(Event.CHANGE, this, this.onPanelScroll)
        }

    }

    onPanelScroll() {
        if (this._isVerticle) {
            this._contentOffset = this._panel.vScrollBar.value;
        } else {
            this._contentOffset = this._panel.hScrollBar.value;
        }
    }


    onItemMouseDown(moveIndex: number) {
        this._curMoveIndex = moveIndex;
        this._panel.scrollType = Laya.ScrollType.None;
        this._curMoveItem = this._content.getChildAt(moveIndex) as Laya.Box;
        this._tempAnchor.setValue(this._curMoveItem.mouseX, this._curMoveItem.mouseY)
        Laya.stage.on(Event.MOUSE_MOVE, this, this.onItemMouseMove)
    }

    onUpdate() {
        return;
        console.log("监测鼠标移动")
        this._contentIsMove = false;
        if (this._curMoveItem) {
            let initPos = 0
            if (this._isVerticle) {

            } else {
                initPos = (this._curMoveIndex - 1) * (this._curMoveItem.width + this.spaceX)
                if (this._curMoveItem.x > initPos + this._offsetPos) {
                    if (this._content.x > this._panel.width - this._content.width) {
                        this._content.x--;
                    } else {
                        this._content.x = this._panel.width - this._content.width;
                    }
                }
                if (this._curMoveItem.x < initPos - this._offsetPos) {
                    if (this._content.x < 0) {
                        this._content.x++
                    } else {
                        this._content.x = 0;
                    }
                }
                this._tempPoint = this._panel.globalToLocal(new Laya.Point(Laya.stage.mouseX, Laya.stage.mouseY))
                this._curMoveItem.pos(this._tempPoint.x - this._tempAnchor.x, this._tempPoint.y - this._tempAnchor.y)
                this.changeMoveIndex(this._content.x)
            }
        }
    }


    private _lastPos: number = 0;
    changeMoveIndex(curPos: number) {
        if (Math.abs(curPos - this._lastPos) > this._offsetPos) {
            if (curPos > this._lastPos) {
                this._curMoveIndex++;
            } else {
                this._curMoveIndex--;
            }
            this._lastPos = curPos;
        }
        if (this._curMoveIndex >= this.array.length) {
            this._curMoveIndex = this.array.length - 1;
        }
        if (this._curMoveIndex < 0) {
            this._curMoveIndex = 0;
        }
    }


    changeArrData() {
        let fitIndex = 0;
        console.log("初始的位置", this._curMoveIndex)
        if (this._isVerticle) {
            fitIndex = Math.floor(this._curMoveItem.y / this._offsetPos);
        } else {
            fitIndex = Math.floor(this._curMoveItem.x / this._offsetPos);
        }
        console.log("当前的合适位置", fitIndex)
        if (fitIndex < 0 || fitIndex >= this.array.length) {
            return;
        }
        if (this._curMoveIndex != fitIndex) {
            let tempData = this.array[this._curMoveIndex];
            if (this._curMoveIndex < fitIndex) {
                while (this._curMoveIndex < fitIndex) {
                    this.array[this._curMoveIndex] = this.array[this._curMoveIndex + 1]
                    this._curMoveIndex++;
                }
                this.array[fitIndex] = tempData;
            } else {
                while (this._curMoveIndex > fitIndex) {
                    this.array[this._curMoveIndex] = this.array[this._curMoveIndex - 1]
                    this._curMoveIndex--;
                }
                this.array[fitIndex] = tempData;
            }
            this.refresh();
        }else{
            this.setItemPos(this._curMoveItem,this._curMoveIndex)
        }
    }


    onItemMouseMove(e: Event) {
        if (this._curMoveItem && !this._contentIsMove) {
            this._tempPoint = this._panel.globalToLocal(new Laya.Point(e.stageX, e.stageY))
            this._curMoveItem.pos(this._tempPoint.x - this._tempAnchor.x, this._tempPoint.y - this._tempAnchor.y)
        }
    }

    onItemMouseUp(e: Event) {
        this.changeArrData();
        this._curMoveItem = null;
        Laya.stage.off(Event.MOUSE_MOVE, this, this.onItemMouseMove)
        this._panel.scrollType = this._isVerticle ? Laya.ScrollType.Vertical : Laya.ScrollType.Horizontal;
    }


    refresh() {
        for (let i = 0; i < this._content.numChildren; i++) {
            const element = this._content.getChildAt(i) as Laya.Box;
            this.recoverBox(element)
        }
        this._content.destroyChildren();
        for (let i = 0; i < this.array.length; i++) {
            this.createItem(this.array[i], i)
        }
    }

    createBox() {
        if (this._boxPool.length > 0) {
            return this._boxPool.pop()
        } else {
            return this.item.create();
        }
    }


    recoverBox(box: Laya.Box) {
        box.offAll();
        box.removeSelf();
        this._boxPool.push(box);
    }


    createItem(data: any, index: number) {
        if (this.renderHandler) {
            let box = this.createBox() as Laya.Box;
            box.name = "" + index;
            box.on(Event.CLICK, this, this.itemSelect, [data.index])
            box.on(Event.MOUSE_DOWN, this, this.onItemMouseDown, [index])
            box.on(Event.MOUSE_UP, this, this.onItemMouseUp)
            this.renderHandler.runWith([box, data, index])
            this.setItemPos(box, index)
            return box;
        }
        return null;
    }

    itemSelect(data: any, index: number) {
        if (this.selectEnable) {
            this.selectHandler && this.selectHandler.runWith([data.index]);
        }
    }

    setItemPos(box: Laya.Box, index: number) {
        this._content.addChild(box)
        let len = this.array.length;
        if (this._isVerticle) {
            box.x = (this._panel.width-box.width)/2;
            this._offsetPos = box.height + this.spaceY;
            box.y = index * this._offsetPos;
            this._content.width = this._panel.width;
            this._content.height = len * box.height + (len - 1) * this.spaceY;
        } else {
            this._offsetPos = box.width + this.spaceX;
            box.x = index * this._offsetPos;
            box.y = (this._panel.height-box.height)/2;
            this._content.width = len * box.width + (len - 1) * this.spaceX;
            this._content.height = this._panel.height;
        }
    }



    getContent() {
        return this._content;
    }


    onDisable(): void {
        if (this._isVerticle) {
            this._panel.vScrollBar.off(Event.CHANGE, this, this.onPanelScroll)
        } else {
            this._panel.hScrollBar.off(Event.CHANGE, this, this.onPanelScroll)
        }

    }


}
