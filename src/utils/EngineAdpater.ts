
/**
* 
* @ brief: EngineAdpater
* @ author: zyh
* @ data: 2023-09-20 17:00
*/
export class EngineAdpater {
    static __init__() {
        const prototype = EngineAdpater.prototype;
        //@ts-ignore
        Laya.Scene3D.prototype._setBelongScene = prototype._setBelongScene;
    }

    private _scene: any;
    private _children: any;
    private _onActiveInScene: any
    /**
     * @internal
     */
    _setBelongScene(scene: Node): void {
        if (!this._scene || this._scene != scene) {
            //this._scene = scene;
            this._onActiveInScene();
            for (var i: number = 0, n: number = this._children.length; i < n; i++)
                this._children[i]._setBelongScene(this._scene);
        }
    }
}
/**
 * 多重继承
 * @param derivedCtor 子类 需要继承的对象 
 * @param baseCtors  被继承的基类数组
 */
export function applyMixins(derivedCtor: any, baseCtors: any[]) {
    baseCtors.forEach(baseCtor => {
      Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
        if (name !== 'constructor') {
          let descriptor = Object.getOwnPropertyDescriptor(baseCtor.prototype, name);
          Object.defineProperty(derivedCtor.prototype, name, descriptor as PropertyDescriptor);
        }
      });
    });
  }