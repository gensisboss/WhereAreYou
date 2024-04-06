/**
* @brief: 搜索框
* @ author: gongganghao
* @ data: 2023-12-01 11:03
*/
import { SearchBoxBase } from "./SearchBox.generated";
import Event = Laya.Event;
export type SearchData = {
    prompt?: string
    searchCallBack: Laya.Handler;
    cancelCallBack?: Laya.Handler;
}

const { regClass } = Laya;
@regClass()
export class SearchBox extends SearchBoxBase {

    private _data: SearchData;
    

    onEnable(): void {
        this.cancelBtn.visible = false;
        this.searchIcon.visible = true;
        this.cancelBtn.on(Event.CLICK, this, this.onCancelBtnClick)
        this.searchInput.on(Event.INPUT, this, this.onSearchInput)

        //监听手机确定事件
        this.searchInput.textField.on('confirm', this, this.onSearchBtnClick);
        //监听键盘按下事件
        this.searchInput.on(Event.ENTER, this, this.onSearchBtnClick);
        //获取焦点
        this.searchInput.on(Laya.Event.FOCUS, this, this.focusFunc,[true]);
        this.searchInput.on(Laya.Event.BLUR, this, this.focusFunc,[false]);
    }

    focusFunc(isFocus: boolean) {
        this.searchIcon.visible = !isFocus;
        this.searchInput.left = isFocus ? 10 : 64;
    }

    setSearchText(des:string){
        this.searchInput.text = des;
        this._data.searchCallBack.runWith(this.searchInput.text)
        this.onSearchInput();
    }

    onSearchInput() {
        if (this.searchInput.text.length > 0) {
            this.cancelBtn.visible = true;
        } else {
            this.cancelBtn.visible = false;
        }
    }

    onSearchBtnClick() {
        if (this.searchInput.text.length > 0) {
            this._data.searchCallBack.runWith(this.searchInput.text)
        } else {
            //TODO:弹窗提示不能为空
        }

    }

    onCancelBtnClick() {
        this._data.cancelCallBack && this._data.cancelCallBack.run();
        this.searchInput.text = "";
        this.focusFunc(false);
    }

    refreshUI(data: SearchData) {
        this._data = data;
        this.searchInput.prompt = data.prompt || "";
    }

    onDisable(): void {
        this._data = null;
        this.cancelBtn.off(Event.CLICK, this, this.onCancelBtnClick)
        this.searchInput.off(Event.INPUT, this, this.onSearchInput)

    }
}