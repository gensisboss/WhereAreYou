/**
* @brief: 社交界面
* @ author: gongganghao
* @ data: 2023-11-15 17:42
*/
import Event = Laya.Event;
import { MessageItem } from "../../item/MessageItem";
import { PageManager } from "../../page/PageManager";
import { PagePath, TweenType } from "../../page/data/PageData";
import { SwitchTab } from "../../core/logic/SwitchTab";
import { IMultiListRefresh, MultiListRefresh } from "../../core/logic/MultiListRefresh";
import { SocailViewBase } from "./SocailView.generated";
import { ServerManager } from "../../server/ServerManager";
import { SearchData } from "../../item/SearchBox";
import { UserItem } from "../../item/UserItem";


export type SocialData = {
    uid:string;
    type:SocailType,
}


export enum SocailType {
    friend = "friend",
    follow = "follow",
    fan = "fan",
}

const { regClass } = Laya;
@regClass()
export class SocailView extends SocailViewBase implements IMultiListRefresh {

    private _curType: string = SocailType.friend;
    private _switchTab: SwitchTab;
    private _listDataRefresh: MultiListRefresh;
    private _listKeyArr: string[] = [SocailType.friend, SocailType.follow, SocailType.fan]
    private _searchStr: string = "";
    private _data:SocialData;

  
    //设置默认页数
    private _pagesize = 20;

    onEnable(): void {
        this.backBtn.on(Event.CLICK, this, this.onBackClick)

        this._listDataRefresh = this.userList.getComponent(MultiListRefresh);
        this._listDataRefresh.initListsData(this.userList, this._listKeyArr, this);
        this._listDataRefresh.listRenderCompleteCallBack = new Laya.Handler(this, (data: any) => {
            this.tipNull.visible = data.array.length <= 0;
            this.userList.visible =  data.array.length > 0;
        })
        this.userList.renderHandler = new Laya.Handler(this, this.renderUserItem)
      

        let searchData: SearchData = {
            prompt: "搜索用户名字/id",
            searchCallBack: new Laya.Handler(this, this.onSearchSureCallBack),
            cancelCallBack: new Laya.Handler(this, this.onSearchCancelCallBack)
        }
        this.searchBox.refreshUI(searchData)
        this._switchTab = new SwitchTab();
        this._switchTab.initItems([this.friendSort, this.followSort, this.fanSort], this.selectTab, new Laya.Handler(this, this.getListData))

    }

    onOpened(param: SocialData): void {
        this._data = param;
        this._curType = param.type;
        this._switchTab.onTabClick(this._listKeyArr.indexOf(this._curType))
    }

    onSearchSureCallBack(search: string) {
        this._searchStr = search;
        this._listDataRefresh.forceRefreshData(this._curType)
    }

    onSearchCancelCallBack() {
        this._searchStr = "";
        this._listDataRefresh.forceRefreshData(this._curType)
    }


    renderUserItem(item: Laya.Box, index: number) {
        let userItem = item as UserItem;
        let data = this.userList.array[index];
        userItem.refreshUI(data);

    }

    selectMessageItem(index: number) {
        PageManager.instance.open(PagePath.ChatPage, null, null, true, "", { type: TweenType.Right })
    }


    onBackClick() {
        PageManager.instance.back();
    }


    getListData(index: number) {
        this._curType = this._listKeyArr[index];
        this._searchStr = "";
        this._listDataRefresh.changeTabWithKey(this._curType)
    }


    refreshData(callback: Laya.Handler, data?: any): void {
        switch (this._curType) {
            case SocailType.friend:
                if (this._searchStr.length > 0) {
                    this.getSearchFriendData(data, callback)
                } else {
                    this.getFriendData(data, callback)
                }
                break;
            case SocailType.follow:
                if (this._searchStr.length > 0) {
                    this.getSearchFollowData(data, callback)
                } else {
                    this.getFollowData(data, callback)
                }
                break;
            case SocailType.fan:
                if (this._searchStr.length > 0) {
                    this.getSearchFansData(data, callback)
                } else {
                    this.getFansData(data, callback)
                }
                break;
            default:
                break;
        }

    }

    //获取好友数据
    getFriendData(data: any, c?: Laya.Handler, e?: Laya.Handler) {
        let _http = 'relation/friendList';
        let _data = {} as any;
        _data['pagesize'] = data['pagesize'] ? data['pagesize'] : this._pagesize;
        _data['developer_uid'] = data['developer_uid'] ? data['developer_uid'] : this._data.uid;
        _data['offset'] = data['offset'] ? data['offset'] : 0;
        ServerManager.instance.httpSendPost(_http, _data, Laya.Handler.create(this, this.getListCallBack, [c, "好友", _data['developer_uid']]));
    }

    //搜索好友数据
    getSearchFriendData(data: any, c?: Laya.Handler, e?: Laya.Handler) {
        let _http = 'relation/searchFriendList';
        let _data = {} as any;
        _data['keyword'] = this._searchStr;
        _data['pagesize'] = data['pagesize'] ? data['pagesize'] : this._pagesize;
        _data['offset'] = data['offset'] ? data['offset'] : 0;
        ServerManager.instance.httpSendPost(_http, _data, Laya.Handler.create(this, this.getListCallBack, [c, "好友", null]));
    }

    //获取关注数据
    getFollowData(data: any, c?: Laya.Handler, e?: Laya.Handler) {
        let _http = 'relation/followList';
        let _data = {} as any;
        _data['pagesize'] = data['pagesize'] ? data['pagesize'] : this._pagesize;
        _data['developer_uid'] = data['developer_uid'] ? data['developer_uid'] : this._data.uid;
        _data['offset'] = data['offset'] ? data['offset'] : 0;
        ServerManager.instance.httpSendPost(_http, _data, Laya.Handler.create(this, this.getListCallBack, [c, "关注", _data['developer_uid']]));
    }

    //搜索关注数据
    getSearchFollowData(data: any, c?: Laya.Handler, e?: Laya.Handler) {
        let _http = 'relation/searchFollowList';
        let _data = {} as any;
        _data['keyword'] =  this._searchStr;
        _data['pagesize'] = data['pagesize'] ? data['pagesize'] : this._pagesize;
        _data['offset'] = data['offset'] ? data['offset'] : 0;
        ServerManager.instance.httpSendPost(_http, _data, Laya.Handler.create(this, this.getListCallBack, [c, "关注", null]));
    }

    //获取粉丝数据
    getFansData(data: any, c?: Laya.Handler, e?: Laya.Handler) {
        let _http = 'relation/fansList';
        let _data = {} as any;
        _data['pagesize'] = data['pagesize'] ? data['pagesize'] : this._pagesize;
        _data['developer_uid'] = data['developer_uid'] ? data['developer_uid'] : this._data.uid;
        _data['offset'] = data['offset'] ? data['offset'] : 0;
        ServerManager.instance.httpSendPost(_http, _data, Laya.Handler.create(this, this.getListCallBack, [c, "粉丝", _data['developer_uid']]));
    }

    //搜索粉丝数据
    getSearchFansData(data: any, c?: Laya.Handler, e?: Laya.Handler) {
        let _http = 'relation/searchFansList';
        let _data = {} as any;
        _data['keyword'] = this._searchStr;
        _data['pagesize'] = data['pagesize'] ? data['pagesize'] : this._pagesize;
        _data['offset'] = data['offset'] ? data['offset'] : 0;
        ServerManager.instance.httpSendPost(_http, _data, Laya.Handler.create(this, this.getListCallBack, [c, "粉丝", null]));
    }

    getListCallBack(callback: Laya.Handler, name: string, uid: string, data: any) {
        if (data.ret == 0) {
            if (uid) {
                // UserRelevanceManager.setFansWithUID(uid, Number(data.data.fans));
                // UserRelevanceManager.setFollowCountWithUID(uid, Number(data.data.follow));
                // UserRelevanceManager.setFriendWithGameID(uid, Number(data.data.friend));
            }
            callback.runWith(data);
        } else {
            PageManager.instance.showTip(data.msg)
        }
    }



    onDisable(): void {
        this._switchTab = null;
        this._listDataRefresh = null;
        this.backBtn.off(Event.CLICK, this, this.onBackClick)

    }


}