import { GlobalData } from "../scene/data/GlobalData";
import { ConfirmData } from "../scene/home/ConfirmView";
import { TipType } from "../scene/home/TipView";
import { PageData, PagePath, TweenData, TweenType } from "./data/PageData";

/**
* @brief: 界面管理类
* @ author: gongganghao
* @ data: 2023-11-06 17:21
*/

export class PageManager {

    private static _instance: PageManager;
    public static get instance(): PageManager {
        return this._instance || (this._instance = new PageManager);
    }



    //缓存在关闭当前界面后是否需要打开的上一个界面
    private _pageCachePath: PageData[] = [];
    private _pageData: Map<string, Laya.Scene> = new Map();

    /**
     * 打开界面
     * @param path 
     * @param data 
     * @param parent 
     * @param closeOther 
     * @param name 
     */
    open(path: PagePath, data?: any, parent?: Laya.Node, closeOther: boolean = false, name?: string, tweenData?: TweenData) {
        let pageData: PageData = {
            path: path,
            data: data,
            parent: parent,
            name: name,
            closeOther: closeOther,
            tweenData: tweenData
        }
        if (closeOther) {
            let closePage = this._pageCachePath[this._pageCachePath.length - 1];
            //被动关
            closePage && this._close(closePage, !!tweenData, true)
            this._pageCachePath.push(pageData)
        }
        //主动开
        return this._open(pageData, !!tweenData, false)
    }

    /**
     * 
     * @param page 缓动界面
     * @param isPassive 是否被动开启或者关闭
     * @param tweenData 缓动数据
     * @param isOpen 是否是开启
     * @param callBack 缓动回调
     */
    private tweenPage(page: Laya.Scene, isPassive: boolean, tweenData: TweenData, isOpen: boolean, callBack?: Laya.Handler) {
        let size = new Laya.Vector2(page.width, page.height);
        let offset = new Laya.Vector2((tweenData.offsetX ? tweenData.offsetX : 0), (tweenData.offsetY ? tweenData.offsetY : 0));
        let type = isPassive ? this.invertDirection(tweenData.type) : tweenData.type;
        if (isOpen) {
            switch (type) {
                case TweenType.Top:
                    page.x += offset.x;
                    page.y = -size.y;
                    Laya.Tween.to(page, { y: offset.y }, GlobalData.tweenTime, null, callBack)
                    break;
                case TweenType.Left:
                    page.y += offset.y;
                    page.x = -size.x;
                    Laya.Tween.to(page, { x: offset.x }, GlobalData.tweenTime, null, callBack)
                    break;
                case TweenType.Center:
                    page.pos((Laya.stage.width - size.x) / 2 + offset.x, (Laya.stage.height - size.y) / 2 + offset.y)
                    callBack && callBack.run()
                    break;
                case TweenType.Right:
                    page.y += offset.y;
                    page.x = Laya.stage.width;
                    Laya.Tween.to(page, { x: Laya.stage.width - offset.x - size.x }, GlobalData.tweenTime, null, callBack)
                    break;
                case TweenType.Bottom:
                    page.x += offset.x;
                    page.y = Laya.stage.height;
                    Laya.Tween.to(page, { y: Laya.stage.height - offset.y - size.y }, GlobalData.tweenTime, null, callBack)
                    break;
                default:
                    callBack && callBack.run()
                    break;
            }
        } else {
            switch (type) {
                case TweenType.Top:
                    Laya.Tween.to(page, { y: -size.y }, GlobalData.tweenTime, null, callBack)
                    break;
                case TweenType.Left:
                    Laya.Tween.to(page, { x: -size.x }, GlobalData.tweenTime, null, callBack)
                    break;
                case TweenType.Center:
                    callBack && callBack.run()
                    break;
                case TweenType.Right:
                    Laya.Tween.to(page, { x: Laya.stage.width }, GlobalData.tweenTime, null, callBack)
                    break;
                case TweenType.Bottom:
                    Laya.Tween.to(page, { y: Laya.stage.height }, GlobalData.tweenTime, null, callBack)
                    break;
                default:
                    callBack && callBack.run()
                    break;
            }
        }

    }


    private async _open(pageData: PageData, useTween: boolean = true, isPassive?: boolean) {
        let page = await Laya.Scene.load(pageData.path);
        this._pageData.set(pageData.path + pageData.name, page)
        if (pageData.parent) {
            pageData.parent.addChild(page)
            page.onOpened(pageData.data)
        } else {
            page.open(false, pageData.data)
        }
        if (useTween && pageData.tweenData) {
            Laya.timer.callLater(this, this.tweenPage, [page, isPassive, pageData.tweenData, true]);
        }
        return page;
    }

    invertDirection(dir: TweenType) {
        switch (dir) {
            case TweenType.Top:
                return TweenType.Bottom;
            case TweenType.Bottom:
                return TweenType.Top;
            case TweenType.Left:
                return TweenType.Right;
            case TweenType.Right:
                return TweenType.Left;
            case TweenType.Center:
                return TweenType.Center;
            default:
                break;
        }
    }

    back(data?: any) {
        let closePage = this._pageCachePath.pop();
        let openPage = this._pageCachePath[this._pageCachePath.length - 1];
        if (openPage) {
            data && (openPage.data = data);
            //被动开
            this._open(openPage, !!closePage.tweenData, true)
        }
        Laya.timer.callLater(this, () => {
            //主动关
            this._close(closePage, !!closePage.tweenData, false)
        })

    }

    tweenClose(path: PagePath, tweenData: TweenData, name?: string, callback?: Laya.Handler) {
        let page = this._pageData.get(path + name)
        if (page) {
            this.tweenPage(page, false, tweenData, false, callback)
            this._pageData.delete(path + name)
        }
    }


    close(path: PagePath, name?: string) {
        this._pageData.delete(path + name)
        Laya.Scene.close(path, name)
    }



    /**
     * 关闭界面
     * @param pageData 
     * @param useTween 
     * @param isPassive 
     */
    private _close(pageData: PageData, useTween: boolean = true, isPassive?: boolean) {
        let callBack = Laya.Handler.create(this, () => {
            let page = this._pageData.get(pageData.path + pageData.name)
            page.close();
            this._pageData.delete(pageData.path + pageData.name)
        })
        if (useTween && pageData.tweenData) {
            this.tweenPage(this._pageData.get(pageData.path + pageData.name), isPassive, pageData.tweenData, false, callBack)
        } else {
            callBack.run();
        }
    }

    showConfirm(tip: string, sureStr?: string, cancelStr?: string, callBack?: Laya.Handler) {
        let data: ConfirmData = {
            tip: tip,
            sureStr: sureStr,
            cancelStr: cancelStr,
            callBack: callBack
        }
        this.open(PagePath.ConfirmPage, data)
    }

    /**
     * 打开提示界面
     * @param tip 提示内容
     * @param delay 延迟关闭时间
     */
    showTip(tip: string, delay?: number) {
        this.open(PagePath.TipPage, { type: TipType.txt, tip: tip, delay: delay })
    }

    /**
    * 打开加载界面
    * @param tip 提示内容
    */
    _isLoading: boolean = false;
    showLoading(tip?: string) {
        if (this._isLoading) {
            return;
        }
        this._isLoading = true;
        this.open(PagePath.TipPage, { type: TipType.load, tip: tip })
    }

    /**
   * 打开生成界面
   */
    showGenerate() {
        if (this._isLoading) {
            return;
        }
        this._isLoading = true;
        this.open(PagePath.TipPage, { type: TipType.generate })
    }


    /**
     * 关闭提示或者加载界面
     */
    hideTipOrLoading() {
        this._isLoading = false;
        this.close(PagePath.TipPage)
    }

}