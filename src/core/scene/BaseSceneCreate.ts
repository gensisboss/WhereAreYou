import { TUIData } from "../project/ProjectBase";
import { IScene } from "./interface/IScene";
import { SceneContextBase } from "./SceneContextBase";
import { TRoleItem } from "../tableData/type/TRoleItem";
import { TStageItem } from "../tableData/type/TStageItem";
import { ISceneCreate } from "./interface/ISceneCreate";
import { TCharacterItem } from "../tableData/type/TCharacterItem";
import { TNPCItem } from "../tableData/type/TNPCItem";
import { NPCData } from "../tableData/NPCData";

/**
 *
 * @ brief: BaseSceneCreate
 * @ author: hugao
 * @ data: 2023-09-21 10:11
 */
export class BaseSceneCreate<T extends Laya.Node> implements ISceneCreate<T>{

    protected _getNodeByName(node: Laya.Node, name: string): Laya.Node {
        if (node.name == name) {
            return node;
        }
        let child: Laya.Node[] = (node as any)._children;
        if (child != null && child.length > 0) {
            for (let i = 0; i < child.length; i++) {
                let obj = child[i];
                let result = this._getNodeByName(obj, name);
                if (result) {
                    return result;
                }
            }
        }
        return null;
    }

    protected _getPosByName(name: string, scene: Laya.Node): Laya.Vector3 {
        let node = this._getNodeByName(scene, name);
        if (node instanceof Laya.Sprite3D) {
            return node.transform.position;
        }
        else {
            return new Laya.Vector3(0, 0, 0);
        }
    }

    createView(stage: TStageItem, uiData: TUIData, gameContext: SceneContextBase, avatarInfo: TCharacterItem,npcList?:TNPCItem[]): Promise<IScene> {
        return null;
    }

    async createRole(avatarInfo: TCharacterItem, scene3d: Laya.Node, uiData: TUIData,context:SceneContextBase): Promise<void> {
        return null;
    }

    createCharater(avatarInfo: TCharacterItem, scene: Laya.Node,isNPC:boolean): Promise<T> {
        throw new Error("Method not implemented.");
    }
}