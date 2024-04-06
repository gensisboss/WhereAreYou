import { IScene } from "./interface/IScene";
import { IScenePage } from "./interface/IScenePage";

/**
 *
 * @ brief: ScenePageBase
 * @ author: hugao
 * @ data: 2023-09-13 19:37
 */
export class ScenePageBase implements IScenePage {
    scene: IScene;
    sceneConfig: any;//TODO
    constructor(sceneConfig: any) {
        this.sceneConfig = sceneConfig;
    }

    destroy(){
        if(this.scene) this.scene.destroy();
        this.scene=null;
    }
}