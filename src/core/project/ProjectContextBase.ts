
import { IProject } from "./interface/IProject";
import { IProjectContext } from "./interface/IProjectContext";

export class ProjectContextBase implements IProjectContext {
    project: IProject;

    eventCenter: Laya.EventDispatcher;


    constructor(project: IProject) {
        this.project = project;
        this.eventCenter = new Laya.EventDispatcher();
    }

    destroy() {

    }
}