/**
*
* @ brief: SceneOpenManage
* @ author: zyh
* @ data: 2023-09-14 16:38
*/
export class SceneOpenManage {

    private static _instance: SceneOpenManage = new SceneOpenManage;
    static get instance(): SceneOpenManage {
        return SceneOpenManage._instance;
    }

    private viewStack: IViewStackData[] = []; // 界面栈

    // 打开新的界面
    public add(path: string, params?: any, closeOther: boolean = true) {
        const data: IViewStackData = {};
        data.path = path;
        data.params = params;
        data.closeOther = closeOther;
        this.viewStack.push(data);
    }

    // 关闭当前界面，如果存在的话
    public remove(): void {
        if (this.viewStack.length) {
            this.viewStack.pop();
        }
    }

    // 判断是否可以回退
    public canGoBack(): boolean {
        return this.viewStack.length > 1;
    }

    // 回退到上一级界面
    public goBack(): void {
        if (this.canGoBack()) {
            const data = this.viewStack.pop();
            Laya.Scene.open(data.path, data.closeOther, data.params);
        }
        else {
            console.error("无法回退，因为没有更多的界面可供访问");
        }
    }
}

interface IViewStackData {
    path?: string;
    params?: any;
    closeOther?: boolean;
}