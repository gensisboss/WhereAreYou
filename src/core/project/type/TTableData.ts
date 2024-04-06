import { TAniItem } from "../../tableData/type/TAniItem";
import { TGameItem } from "../../tableData/type/TGameItem";
import { TNPCItem } from "../../tableData/type/TNPCItem";
import { TRoleItem } from "../../tableData/type/TRoleItem";
import { TSceneItem } from "../../tableData/type/TSceneItem";
import { TStageItem } from "../../tableData/type/TStageItem";

/**
* 
* @ brief: TTableData
* @ author: zyh
* @ data: 2023-09-19 20:40
*/
export type TTableData = {
    ani: TAniItem[];
    npc: TNPCItem[];
    role: TRoleItem[];
    game: TGameItem[];
    scene: TSceneItem[];
    stage: TStageItem[];
}