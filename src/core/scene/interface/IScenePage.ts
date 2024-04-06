import { IScene } from "./IScene";

/**
 *
 * @ brief: IScenePage
 * @ author: hugao
 * @ data: 2023-09-13 19:36
 */
export interface IScenePage {
    /**
     * 当前场景
     */
    scene: IScene;
    /**
     * 销毁
     */
    destroy():void;
}