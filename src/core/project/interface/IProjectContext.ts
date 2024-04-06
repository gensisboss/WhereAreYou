
import { IProject } from "./IProject";

export interface IProjectContext {
    /**
     * 项目对象
     */
    project: IProject;
    /**
     * 事件中心对象
     */
    eventCenter:Laya.EventDispatcher;
    /**
     * 销毁
     */
    destroy(): void;
}