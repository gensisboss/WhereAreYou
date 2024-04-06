/**
 * @author lkm
 */
export interface IUnion {
    spid: string;
    /**登录方法 */
    login(callback?: Function, _market?: any): void;
    /**初始化分享 */
    initShare(param?: any, callback?: Function): void;
    /**分享方法 */
    share(param?: any, callback?: Function): void;
    /**获取用户授权方法 */
    getUserInfo?(callback?: Function): void;

    getopenId?(): string
    /**展示banner */
    showBanner?(adUnitId?: string, style?: any, callback?: Laya.Handler, offsetY?: number, isTop?: boolean): void;
    /**隐藏banner */
    hideBanner?(): void;
    /**激励式广告 */
    createVideo?(adUnitId: string, callBack?: Laya.Handler): void;
    recorderStart?(callback?: Laya.Handler): void;
    recorderStop?(): void;
    shareVideo?(videoPath: string, callback?: Laya.Handler): void;
    destroyWxBtn?(): void;
    checkUnion?(type: string):boolean;
    isLogin?(callback?: Function):void;
}   
