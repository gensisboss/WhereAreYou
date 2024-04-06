/**
 *
 * @ brief: ISceneContext
 * @ author: hugao
 * @ data: 2023-09-13 19:34
 */
export interface ISceneContext {
    /**
     * 事件派发器
     */
    eventCenter: Laya.EventDispatcher;
    /**
     * 销毁
     */
    destroy():void;
}