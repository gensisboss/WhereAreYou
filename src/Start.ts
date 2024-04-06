import { StartBase } from "./Start.generated";
import { EngineAdpater } from "./utils/EngineAdpater";

const { regClass } = Laya;

@regClass()
export class Start extends StartBase {

    onAwake() {
        EngineAdpater.__init__();

    }

    onEnable() {

    }

    onDisable() {

    }

 
}