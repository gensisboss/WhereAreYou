/**
* @brief: 自适应item高度列表
* @ author: gongganghao
* @ data: 2023-11-17 15:42
*/
import Event = Laya.Event;
const { regClass, property } = Laya;
@regClass()
export class FlowList extends Laya.Script {


    @property({ type: Laya.Prefab, tips: "渲染节点" })
    public item: Laya.Prefab;
    @property({ type: Number, tips: "水平间隔距离" })
    public spaceX: number = 10;
    @property({ type: Number, tips: "垂直间隔距离" })
    public spaceY: number = 10;
    @property({ type: Boolean, tips: "是否自动滚动到最后" })
    public isAuto: boolean = true;


    /**改变 <code>List</code> 的选择项时执行的处理器，(默认返回参数： 项索引（index:int）)。*/
    selectHandler: Laya.Handler | null;
    /**单元格渲染处理器(默认返回参数cell:UIComponent,index:int)。*/
    renderHandler: Laya.Handler | null;
    /**单元格鼠标事件处理器(默认返回参数e:Event,index:int)。*/
    mouseHandler: Laya.Handler | null;
    /**指定是否可以选择，若值为true则可以选择，否则不可以选择。 @default false*/
    selectEnable: boolean = false;

    private _boxPool: Laya.Box[] = [];
    private _panel: Laya.Panel;

    private _array: any[] = [];
    public get array(): any[] {
        return this._array || [];
    }
    public set array(value: any[]) {
        this._array = value;
    }

    get scrollBar(): Laya.ScrollBar | null {
        if(this._panel.scrollType == Laya.ScrollType.Vertical || this._panel.scrollType == Laya.ScrollType.Both) return this._panel.vScrollBar;
        if(this._panel.scrollType == Laya.ScrollType.Horizontal) return this._panel.hScrollBar;
        return null;
    }

    get scrollType(){
        return this._panel.scrollType;
    }



    private _isVerticle:boolean = true;
    private _content:Laya.Box = new Laya.Box();;
    private _itemPosArr: Laya.Vector2[];



    onAwake(): void {
        this._panel = this.owner as Laya.Panel
        this._boxPool = [];
        this._content.width = this._panel.width;
        this._content.height = this._panel.height;
        this._panel.addChild(this._content);
        this._content.pos(0,0)
        this._content.width = this._panel.width;
        this._content.height = this._panel.height;
    } 


    onEnable(): void {
        this._isVerticle = this._panel.scrollType != Laya.ScrollType.Horizontal
        if(this._panel.scrollType != Laya.ScrollType.None){
            if(this._isVerticle){
                this._panel.vScrollBar.on(Event.CHANGE,this,this.onScrollChange)
            }else{
                this._panel.hScrollBar.on(Event.CHANGE,this,this.onScrollChange)
            }
        }
      
    }



    caculateVisibleIndex(value:number){
        let offset = 0
        let space =  this._isVerticle ? this.spaceY : this.spaceX
        for (let i = 0; i < this._content.numChildren; i++) {
            const element = this._content.getChildAt(i) as Laya.Box;
            offset += (space + (this._isVerticle ? element.height : element.width));
            if(offset >= value){
                return i;
            }
        }
        return this._content.numChildren;
    }

    onScrollChange(){
        if(!this.isAuto){
            return;
        }
        let value = 0
        if(this._isVerticle){
            value = this._panel.vScrollBar.value;
        }else{
            value = this._panel.hScrollBar.value;
        }
        let startIndex = this.caculateVisibleIndex(value);
        let endIndex = this.caculateVisibleIndex(value+this._panel.height);
        for (let i = 0; i < this._content.numChildren; i++) {
            const item = this._content.getChildAt(i) as Laya.Box;
            if(i<startIndex || i>endIndex){
                item.visible = false;
            }else{
                item.visible = true;
            }            
        }
    }

    changeRenderItem(item:Laya.Prefab){
        this._content.destroyChildren();
        this.item = item
        this._boxPool = [];
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
        this.updateLayout();
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
            let box = this.createBox();
            box.name = ""+index;
            box.on(Event.CLICK, this, this.itemSelect, [data,index])
            box.on("resize", this, this.updateLayout);
            this.renderHandler.runWith([box, data, index])
            this._content.addChild(box)
            return box;
        }
        return null;
    }

    itemSelect(data: any, index: number) {
        if (this.selectEnable) {
            this.selectHandler && this.selectHandler.runWith([data,index]);
        }
    }

    updateLayout() {
        let posX = 0;
        let posY = 0;
     
        let len = this._content.numChildren;
        this._itemPosArr = [];
        switch (this._panel.scrollType) {
            case Laya.ScrollType.Vertical:
                for (let i = 0; i < len; i++) {
                    const item = this._content.getChildAt(i) as Laya.Box;
                    item.y = posY;
                    posY += (item.height + this.spaceY);
                    this._itemPosArr.push(new Laya.Vector2(0,posY))
                }
                this._content.height = Math.max(posY,this._content.height);
                this.isAuto && (this._panel.vScrollBar.value =  this._panel.vScrollBar.max);
                break;
            case Laya.ScrollType.Horizontal:
                for (let i = 0; i < len; i++) {
                    const item = this._content.getChildAt(i) as Laya.Box;
                    item.x = posX;
                    posX += (item.width+this.spaceX);
                    this._itemPosArr.push(new Laya.Vector2(posX,0))
                }
                this._content.width = Math.max(posX,this._content.width);
                this.isAuto && (this._panel.hScrollBar.value = this._panel.hScrollBar.max);
                break;
            case Laya.ScrollType.Both:
                let maxHeight = 0;
                for (let i = 0; i < len; i++) {
                    const item = this._content.getChildAt(i) as Laya.Box;
                    item.x = posX;
                    posX += item.width + this.spaceX;
                    item.y = posY;
                    maxHeight = Math.max(item.height, maxHeight)
                    if (posX+100 >= this._content.width) {
                        posY += (maxHeight+this.spaceY);
                        maxHeight = 0;
                        posX = 0;
                    }
                    this._itemPosArr.push(new Laya.Vector2(posX,posY))
                }
                this._content.height = Math.max(posY+50,this._content.height);
                this.isAuto && (this._panel.vScrollBar.value = this._panel.vScrollBar.max);
                break;
            default:
                for (let i = 0; i < len; i++) {
                    const item = this._content.getChildAt(i) as Laya.Box;
                    item.y = posY;
                    posY += (item.height + this.spaceY);
                    this._itemPosArr.push(new Laya.Vector2(0,posY))
                }
                this._panel.height = this._content.height = Math.max(posY,this._content.height);
                break;
        }
      
        this._panel.refresh();
    }

    addChild(node:any){
        this._content.addChild(node)
    }


    getContent(){
        return this._content;
    }


    onDisable(): void {
        if(this._panel.scrollType != Laya.ScrollType.None){
            if(this._isVerticle){
                this._panel.vScrollBar.off(Event.CHANGE,this,this.onScrollChange)
            }else{
                this._panel.hScrollBar.off(Event.CHANGE,this,this.onScrollChange)
            }
        }
       
    }


}
