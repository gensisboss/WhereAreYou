import { IProjectContext } from "./IProjectContext";

export interface IProject {
    /**
     * 初始化项目
     * @param projectData 项目数据
     * @param gameData 游玩数据
     */
    init(projectData:any,gameData?:any):void;
    /**
     * 获取项目上下文
     */
    getProjectContext(): IProjectContext;
    /**
     * 销毁
     */
    destroy(): void;

}