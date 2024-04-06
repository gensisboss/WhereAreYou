/**
* @brief: 游戏运行数据
* @ author: gongganghao
* @ data: 2023-12-07 19:16
*/
import Event = Laya.Event;

//游戏类型
export enum GameType {
    /**图标模式 */
    icon = "icon",
    /**剧情模式 */
    plot = "plot"
}

//游戏数据
export type GameData = {
    /**作者Id */
    developer_uid: string,
    /**游戏Id */
    game_id: string,
    /**游戏名称 */
    game_name: string,
    /**游戏图片 */
    game_img: string,
    /**游戏描述 */
    game_desc: string,
    /**游戏类型 */
    game_mod: GameType,
    /**游戏数据*/
    game_data: string,
    /**游戏时间(秒) */
    duration: number,
    /**游戏标签 */
    game_tag: string,
}

