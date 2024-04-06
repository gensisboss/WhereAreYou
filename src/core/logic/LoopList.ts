
const { regClass, property } = Laya;

@regClass()
export default class LoopList extends Laya.Script {


    @property({ type: Number, tips: "循环距离" })
    public loopDis: number = 0;
    @property({ type: Boolean, tips: "是否定位" })
    public isFormat: boolean = false;


    /**最小滑动限制 */
    private _minLimit: number;
    /**最大滑动限制 */
    private _maxLimit: number;


    private _list: Laya.List;

    onEnable(): void {
        this._list = this.owner as Laya.List;

        this._list.scrollBar.on(Laya.Event.CHANGE, this, this.onScrollBarChange);
        this._list.on(Laya.Event.MOUSE_UP, this, this.tweenToFormat);
        this._list.on(Laya.Event.MOUSE_OUT, this, this.tweenToFormat);
    }

    setListData(arr: any, index?: number) {
        !this._list && (this._list = this.owner as Laya.List);
        this._list.array = arr;
        this._list.scrollTo(1)
        this.getMinLimit();
        this.getMaxLimit();
    }

    onScrollBarChange(): void {
        let sliderValue = this._list.scrollBar.value;
        let listArr = this._list.array;
        
        console.log(sliderValue+"--"+this._maxLimit+"--"+this._minLimit)
        if (sliderValue > this._maxLimit) {
            var cell = listArr.shift();
            listArr[listArr.length] = cell;
            this._list.array = listArr;
            console.log("划到最后", this._list.scrollBar.value)

        } else if (sliderValue < this._minLimit) {
            cell = listArr.pop();
            listArr.unshift(cell);
            this._list.array = listArr;
            console.log("划到开始", this._list.scrollBar.value)
        }
    }

    /**
     * 缓动处理
     * @param time 缓动效果时间
     */
    tweenToFormat() {
        if (this.isFormat) {
            let itemPara = this._list.scrollType == Laya.ScrollType.Vertical ? this._list.cells[0].height : this._list.cells[0].width
            let spacePara = this._list.scrollType == Laya.ScrollType.Vertical ? this._list.spaceY : this._list.spaceX;
            let offset =  Math.round(this._list.scrollBar.value/(itemPara + spacePara)) ;
            console.log("滑动结束",this._list.scrollBar.value)
            this._list.scrollTo(offset);
        }

    }



    /**取得最小限制 */
    private getMinLimit() {
        if (this._list.scrollType == Laya.ScrollType.Vertical) {
            //垂直滑动
            this._minLimit =  this._list.cells[0].height - this._list.spaceY - this.loopDis;
        }
        if (this._list.scrollType == Laya.ScrollType.Horizontal) {
            //水平滑动
            this._minLimit =  this._list.cells[0].width - this._list.spaceX - this.loopDis;
        }

    }

    /**取得最大限制 */
    private getMaxLimit() {
        let len = this._list.array.length-1;
        if (this._list.scrollType == Laya.ScrollType.Vertical) {
            //垂直滑动
            this._maxLimit = this._list.cells[0].height*len  + this._list.spaceY*(len-1) + this.loopDis;
        }
        if (this._list.scrollType == Laya.ScrollType.Horizontal) {
            //水平滑动
            this._maxLimit = this._list.cells[0].width*len  + this._list.spaceX*(len-1) + this.loopDis;
        }

    }


}