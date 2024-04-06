/**
* @brief: 动态加载列表
* @ author: gongganghao
* @ data: 2023-11-01 14:13
*/
const { regClass, property } = Laya;

/** 拉动刷新的列表示例 
 * @readme 重点示范基于列表橡皮筋效果的上下拉动、列表滚动暂停、恢复、列表数据添加方式等，
 * 以及横向拉动单元格效果，与快捷跳转到指定的列表单元格位置等功能。
*/
@regClass()
export default class LoadingList extends Laya.Script {

    @property({ type: Laya.Box })
    public loadingBox: Laya.Box;

    private _loadingList : Laya.List;
  
    /** 消息生成的当前最大id值 */
    private _msgIdNow: number = 1;

  
    constructor() { super(); }

    onEnable(): void {
        this._loadingList = this.owner as Laya.List;
        this._loadingList.array = this.createListData(15);
        this._loadingList.repeatY = Math.ceil(this._loadingList.array.length/ this._loadingList.repeatX);
      
        //游戏逻辑关联引擎的停止滚动接口
        this.refreshLimit("dragTopLimit", 100);
        this.refreshLimit("dragBottomLimit", 100);
    }

  

    /**
     * 处理列表刷新数据时的限制
     * @param eventName 要侦听的事件名
     * @param moveLimit 移动距离的上限，达到上限后才会抛出要侦听的事件
     * @param distance 相对布局，位于父节点的距离
     * @param time  需要加载多少毫秒后恢复
     */
    refreshLimit(eventName: string, moveLimit: number, distance: number = 0, time: number = 1000): void {
        if (eventName === "dragTopLimit") {
            //设置下拉的最大橡皮筋高度,只有在启用了停止滚动的功能后有效
            this._loadingList.scrollBar.topMoveLimit = moveLimit;
        } else if (eventName === "dragBottomLimit") {
            this._loadingList.scrollBar.bottomMoveLimit = moveLimit;
        }
        //帧听达到限制的事件，达到限制条件的时候再触发停止滚动的接口
        this._loadingList.scrollBar.on(eventName, this, () => {
            console.log("达到了滚动限制:" + eventName);
            //显示加载进度ui
            this.loadingBox.visible = true;
            //处理加载ui的位置
            if (eventName === "dragTopLimit") {
                //先清理bottom的状态，避免top计算出错
                this.loadingBox.bottom = NaN;
                this.loadingBox.top = distance;
                //创建模拟数据
                var _arr = this.createListData(3, "顶部新增标题");
                //加到源数据前面
                _arr = _arr.concat(this._loadingList.array);
                var index = 0;
            } else if (eventName === "dragBottomLimit") {
                //先清理top的状态，避免bottom计算出错
                this.loadingBox.top = NaN;
                this.loadingBox.bottom = distance;
                //创建模拟数据
                var _arr = this.createListData(3, "底部新增标题");
                //加到源数据后面
                _arr = this._loadingList.array.concat(_arr);
                var index = this._loadingList.array.length - 1;
            }
            //模拟数据加载效果，X秒后恢复
            Laya.timer.once(time, this, () => {
                //更新list数据源
                this._loadingList.array = _arr;
                this._loadingList.refresh();
                //将选中索引设定为该索引
                this._loadingList.scrollTo(index)
                this._loadingList.scrollBar.backToNormal();
                this.loadingBox.visible = false;
            });
        });
    }


    



    /** 创建list模拟数据
     * @param max 最大生成数量
     * @param msgTitle 标题文本
     */
    createListData(max: number = 5, msgTitle: string = "初始测试标题"): any {
        var _arr: Array<any> = [];

        for (var i: number = 0; i < max; i++) {
            _arr[i] = {};
            _arr[i].title = { "text": msgTitle + (this._msgIdNow + i) };
            //给img子节点直接设置数据源的方式，引擎是不支持的，但可以通过runtime类来修改数据源处理流程来实现，具体可参考本示例list单元格的Runtime类
            _arr[i].icon = { "skin": "resources/images/bag/"+Math.round(Math.random()*50)+".png" };
        }
        this._msgIdNow += i;
        return _arr;
    }

    onDisable(): void {
    }
}