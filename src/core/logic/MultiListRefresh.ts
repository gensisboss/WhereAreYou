/**
* @brief: 多列表数据使用同一列表的切换与加载
* @ author: gongganghao
* @ data: 2023-11-22 17:24
*/

export type TTabListData = {
    list:Laya.List;
    key?: string;
    isChange?: boolean;
    array?: any[];
    offset?: any;
    page?: number;
    value?: number;//滑动的位置
    args?: any;//临时用的 列表协议参数等 这个值不会变
    fliter?: Function,
}

export interface IMultiListRefresh {
    refreshData?(callback: Laya.Handler, data?: TTabListData): void;
}
import Event = Laya.Event;
const { regClass, property } = Laya;
@regClass()
export class MultiListRefresh extends Laya.Script {


    @property({ type: Number, tips: "list滚动条上滑限制值" })
    public listTopLimit: number = -100;
    @property({ type: Number, tips: "list滚动条下滑限制值" })
    public listBottomLimit: number = 100;


    /**当前列表 */
    list: any;

    /**是否已获取到底部刷新数据*/
    isBottomUpdateData: boolean = false;
    /**是否已获取到顶部刷新数据*/
    isTopUpdateData: boolean = false;
    /**获取数据接口*/
    dataHandler: IMultiListRefresh;

    /**是否采用下拉强制刷新操作*/
    isForceUpdate: boolean = false;
    /**刷新返回数据回调(此回调用于针对数据做填充铺满操作)*/
    listDataHandler: Laya.Handler;


    isChangeValue: boolean = false;
    listRenderCompleteCallBack: Laya.Handler;//列表刷新完成执行的回调

    private _listDataDic: any;//列表的数据  key是标签页名字
    private _curKey: string;//当前哪个标签页
    private _initComplete: boolean = false;


    private listEnable(list:Laya.List) {
        list.scrollBar.on(Event.CHANGE, this, this.onScrollBarChange);
        list.scrollBar.on("dragTopLimit", this, this.onScrollTopLimit);
        list.scrollBar.on("dragBottomLimit", this, this.onScrollTopLimit);
        list.scrollBar.topMoveLimit = this.listTopLimit;//预览顶部放ui的空间
    }

    /** 初始化列表数据 */
    public initListsData(list: any, keys: string[], dataHandler: IMultiListRefresh, args?: any) {
        this.list = list;
        this._listDataDic = {};
        this.dataHandler = dataHandler;
        for (var i: number = 0; i < keys.length; i++) {
            this.initDataWithKey(keys[i],i, args);
        }
    }

    public setFliterFunction(key: string, fun: Function) {
        if (this._listDataDic[key]) {
            this._listDataDic[key].fliter = fun;
        }
    }


    private initDataWithKey(key: string, index:number, args?: any) {
        let tabdata: TTabListData = {} as any;
        if( this.list instanceof Array){
            tabdata.list = this.list[index]
        }else{
            tabdata.list = this.list;
        }
        this.listEnable(tabdata.list)
        tabdata.page = 0;
        tabdata.isChange = false;
        tabdata.key = key;
        tabdata.offset = 0;
        tabdata.array = [];
        tabdata.value = 0;
        tabdata.args = args;
        tabdata.fliter = null;
        this._listDataDic[key] = tabdata;
    }

    /**
     * 获取对应数据
     * @param key 
     */
    getDataByKey(key: string){
        if (this._listDataDic[key]) {
           return this._listDataDic[key];
        }
        return null;
    }

    /**更新数据 */
    updateDataWithKey(key: string, args: any,value:any) {
        if (this._listDataDic[key]) {
            this._listDataDic[key][args] = value;
        }
    }

    /**
     * 清空数据强制重新请求
     * @param key 
     * @param args 
     */
    forceRefreshData(key: string, args?: any) {
        if (this._listDataDic[key]) {
            delete this._listDataDic[key];
        }
        this.changeTabWithKey(key, args)
    }

    /**
     * 切换标签更新数据
     * @param key 标签 
     * @param args 
     */
    public changeTabWithKey(key: string, args?: any) {
        this._initComplete = false;
        if (!this._listDataDic[key]) {
            this.initDataWithKey(key, args);
        }
        if (this._curKey && this._curKey != key && this._listDataDic[this._curKey])
            this._listDataDic[this._curKey].value = this._listDataDic[this._curKey].list.scrollBar.value;//存储老的滑动位置

        this._curKey = key;

        if (this._listDataDic[key].array.length) {
            this.isChangeValue = true;
            this._listDataDic[this._curKey].list.array = this._listDataDic[key].array;
            this.listRenderCompleteCallBack && this.listRenderCompleteCallBack.runWith(this._listDataDic[key]);
        }else {
            this.getTopPageData(this.listRenderCompleteCallBack);
        }
        Laya.timer.callLater(this, this.changeScrollValue, [this._listDataDic[this._curKey].value]);
        this.resetType(false);
    }
    changeScrollValue(value: number) {
        if (!this._curKey || !this._listDataDic[this._curKey]) return;
        if (!value || value < 0) value = 0;
        this.isChangeValue = true;
        this._listDataDic[this._curKey].value = this._listDataDic[this._curKey].list.scrollBar.value = value;//设置值会发Laya.Event.CHANGE事件 先不执行下滑操作
        this._initComplete = true;
    }
    private onScrollBarChange() {
        if (!this._initComplete) return
        var curScrollValue: number = Math.round(this._listDataDic[this._curKey].list.scrollBar.value);
        var scrollMacValue: number = this._listDataDic[this._curKey].list.scrollBar.max;
        var data: any = this._listDataDic[this._curKey].list.array;

        //解决list数组组件在初始状态触发底部刷新的bug
        if (data && !this.isChangeValue && !this.isBottomUpdateData && scrollMacValue > 1 && (scrollMacValue - curScrollValue <= this.listBottomLimit)) {
            // console.log("滑动到底部需要获取新数据");
            this.isBottomUpdateData = true;
            this.getNextPageData(this.listRenderCompleteCallBack);
        }
        this.isChangeValue = false;

    }

    private onScrollTopLimit() {
        if (!this.isTopUpdateData) {
            this.isTopUpdateData = true;
            this.getTopPageData(this.listRenderCompleteCallBack);
        }

    }

    /**获取顶部数据*/
    public getTopPageData(callback?: Laya.Handler) {
        this.dataHandler.refreshData(Laya.Handler.create(this, this.onRefreshDataCB, [callback, this._curKey]), this._listDataDic[this._curKey]);
    }

    /**获取顶部数据的回调*/
    private onRefreshDataCB(callback: Laya.Handler, key: string, data: any) {
        if(!this._listDataDic) return;
        let tabData = this._listDataDic[key] as TTabListData;
        if (!tabData) return;//针对弱联网 界面关闭后才收到协议的报错
        tabData.isChange = false;
        if (data && (data.success || !data.ret)) {
            if (data.data) {
                let listData = data.data.list ? data.data.list : data.data;
                if (listData.length || this.isForceUpdate) {
                    var renderData: any = listData;
                    if (tabData.array.length > 0) {
                        for (let i = 0; i < renderData.length; i++) {
                            const element = renderData[i];
                            if (!tabData.array.includes(element)) {
                                tabData.array.push(element);
                            }
                        }
                    } else {
                        for (let i = 0; i < renderData.length; i++) {
                            const element = renderData[i];
                            if (!tabData.fliter || tabData.fliter && tabData.fliter(element)) {
                                tabData.array.push(element);
                            }
                        }
                    }
                    tabData.page++;
                    tabData.isChange = renderData.length ? true : false;
                    tabData.offset = data.data.offset;
                    this.resetType();
                }
            }
        }
       
        this._listDataDic[this._curKey].list.array = tabData.array;
        this._listDataDic[this._curKey].list.refresh();
        callback && callback.runWith([tabData]);
        this.listDataHandler && this.listDataHandler.runWith([{ data: tabData.array }]);

    }

    /**
     * 获取尾部数据
     * callback 返回list列表是否存在数据配合前端做无数据处理
     */
    public getNextPageData(callback?: Laya.Handler) {
        this.dataHandler.refreshData(Laya.Handler.create(this, this.onRefreshDataCB, [callback, this._curKey]), this._listDataDic[this._curKey]);
    }




    private resetType(boo: boolean = false) {
        this.isBottomUpdateData = boo;
        this.isTopUpdateData = boo;
    }


    onDisable() {
        this._listDataDic = null;
        this.listRenderCompleteCallBack && this.listRenderCompleteCallBack.clear();
        this.listDataHandler && this.listDataHandler.clear();
    }
}