import { IProject } from "./interface/IProject";
import { IProjectContext } from "./interface/IProjectContext";
import { TProjectData } from "./type/TProjectData";

export abstract class ProjectBase implements IProject {
    //项目数据 TODO  
    projectData: TProjectData;

    uiData: TUIData;

    abstract getProjectContext(): IProjectContext;

    setUIData(uiData: TUIData): void {
        this.uiData = uiData;
    }

    init(projectData: TProjectData, gameData?: any): void {
        this.projectData = projectData;
        let tableParse = this.getProjectContext().tableParse;
        tableParse.parsePos(projectData.postionData);
        tableParse.parse(projectData.tableData);
    }

    destroy() {

    }
}

export type TUIData = {
    sceneContainer?: Laya.Node;
    touchArea?: Laya.Sprite;
    rockerBg?: Laya.Image;
    rockerBar?: Laya.Button;
}