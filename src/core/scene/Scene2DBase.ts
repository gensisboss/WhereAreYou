import { IScene } from "./interface/IScene";
import { SceneContextBase } from "./SceneContextBase";

/**
 *
 * @ brief: Scene2DBase
 * @ author: hugao
 * @ data: 2023-09-13 19:39
 */
export abstract class Scene2DBase extends Laya.Scene implements IScene {
    context:SceneContextBase;
    private _pause: boolean;

    onEnable() {
        //super.onEnable();
        this.timer.loop(1, this, this.onUpdate);
    }

    onUpdate() {
        if (this._pause) return;
        this.customUpdate();
    }

    abstract customUpdate(): void;

    pause() {
        this._pause = true;
    }

    resume() {
        this._pause = false;
    }

    get isPause() {
        return this._pause;
    }
}