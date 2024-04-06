import { SceneContextBase } from "../SceneContextBase";

/**
 *
 * @ brief: IScene
 * @ author: hugao
 * @ data: 2023-09-13 19:41
 */
export interface IScene {
    context:SceneContextBase;
    /**
     * 
     */
    readonly isPause: boolean;
    /**
     * 暂停
     */
    pause(): void;
    /**
     * 恢复
     */
    resume(): void;
    /**
     * 销毁
     */
    destroy():void;
}