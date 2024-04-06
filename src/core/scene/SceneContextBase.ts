import { ISceneContext } from "./interface/ISceneContext";

/**
*
* @ brief: SceneContextBase
* @ author: hugao
* @ data: 2023-09-13 19:28
*/
export class SceneContextBase implements ISceneContext{
    eventCenter: Laya.EventDispatcher;

    camera:Laya.Camera;

    constructor(){
        this.eventCenter=new Laya.EventDispatcher();
    }

    destroy(): void {
        //throw new Error("Method not implemented.");
        this.eventCenter.offAll();
    }
}