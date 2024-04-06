/**
* @brief: 全局数据
* @ author: gongganghao
* @ data: 2023-11-27 15:47
*/
import { Union_App } from "../../utils/union/Union_App";
import Event = Laya.Event;
import { ServerManager } from "../../server/ServerManager";
import { LangUtils } from "../../utils/LangUtils";
import { UnionManage } from "../../utils/UnionManage";

export type SocialData = {
    /**粉丝数*/
    fans: string;
    /**关注数*/
    follow: string;
    /**好友数*/
    friend: string;
}


export enum UserDataKey {
    token = "token",
    developer_uid = "developer_uid",
    avatar = "avatar",
    bg = "bg",
    nickname = "nickname",
    gender = "gender",
    slogan = "slogan",
    interests = "interest",
    fans = "fans",
    follow = "follow",
    friend = "friend",
    like = "look_like",
    collect = "look_favorite",
    letter = "sms_type",
    chat = "chat_on",
    language = "language",
    crystal = "crystal_num",
    cards = "card_num",
    freeTimes = "ai_vincent_limit_num"
}

export class GlobalData {

    //临时的全局游戏数据用于更新
    static tempGameData:any = null;

    //星星对应的百分比
    static starConfig: number[] = [0.3, 0.5, 1]

    //使用沙漏增加的时间(秒)
    static addSandLock: number = 30;

    //通用缓动时间(毫秒)
    static tweenTime:number = 300;

   
    //生成一次图片所需要花费的水晶数量
    static spendCrystal = 20;

    //版本号
    static versionName: string = "1.0.0";


    //主题色
    static themeColor: string = "#FFD122";

    static tempEditData: any;

    //#region 玩家数据相关
    //玩家数据
    static userData: any;

    //性别映射
    static genderMap = { "1": "男", "2": "女", "3": "其他" }

    /**
    * 当前用户token
    */
    static get token(): string {
        return GlobalData.userData ? GlobalData.userData.token : "";
    }
    /**
     * 当前用户UID
     */
    static get developer_uid(): any {
        return GlobalData.userData ? GlobalData.userData.developer_uid : -1;
    }
    /**
    * 当前用户的头像地址
    */
    static get avatar(): string {
        return GlobalData.userData ? GlobalData.userData.avatar : "resources/images/common/icon.png";
    }

    /**
    * 当前用户的水晶数量
    */
    static get crystal(): string {
        return GlobalData.userData ? GlobalData.userData.crystal_num : "0";
    }

    /**
   * 当前用户的激励卡数量
   */
    static get cards(): string {
        return GlobalData.userData ? GlobalData.userData.card_num : "0";
    }

    /**
    * 当前用户的免费生成次数
    */
    static get freeTimes(): string {
        return GlobalData.userData ? GlobalData.userData.ai_vincent_limit_num : "0";
    }

    /**
    * 当前用户的背景地址
    */
    static get bg(): string {
        return GlobalData.userData ? GlobalData.userData.bg : "resources/images/create/wodebj.png";
    }
    /**
     * 当前用户的用户名
     */
    static get nickname(): string {
        return GlobalData.userData ? GlobalData.userData.nickname : "";
    }

    /**
     * 当前用户的性别 未知：0 男：1 女：2 其他： 3
     */
    static get gender(): string {
        return GlobalData.userData ? GlobalData.userData.gender : "0";
    }

    /**
    * 当前用户的标语
    */
    static get slogan(): string {
        return GlobalData.userData ? GlobalData.userData.slogan : "";
    }

    /**
    * 当前用户的喜好
    */
    static get interest(): string {
        return GlobalData.userData ? GlobalData.userData.interest || "" : "";
    }

    /**
    * 当前用户点赞数
    */
    static get likenum(): string {
        return GlobalData.userData ? GlobalData.userData.likenum : "0";
    }

    /**
    *  用户是否封号
    */
    static getClosure(userData: any): boolean {
        //closure  0否   1 封号
        return userData.closure == 1;
    }
    /**
     *  用户是否注销
     */
    static getIsDelete(userData: any): boolean {
        //closure 2注销
        return userData.closure == 2;
    }

    /**
    * 当前用户的社交
    */
    static get social(): SocialData {
        return GlobalData.userData ? { fans: GlobalData.userData.fans, follow: GlobalData.userData.follow, friend: GlobalData.userData.friend } : null;
    }

    private static _ageTime: number;//生日时间戳
    static set ageGate(age: string) {
        this._ageTime = Date.parse(age) / 1000;
        // if(this.token!=""&&this._ageTime){
        //     Server.instance.updateBirthday(this._ageTime,this.getPlatform(),null);
        //     this._ageTime=0;
        // }
    }
    static get ageGate(): string {
        if (isNaN(this._ageTime)) return "";
        return this._ageTime + "";
    }
    private static _age: number[];


    static get curAge(): number {
        if (!this._age) {
            this._age = [];
            let birtyday = new Date(GlobalData.userData.birthday * 1000);
            let curTime = new Date();
            let curToday = [curTime.getFullYear(), curTime.getMonth() + 1, curTime.getDate()];
            let birthToDay = [birtyday.getFullYear(), birtyday.getMonth() + 1, birtyday.getDate()]
            this._age = curToday.map((val, index) => {
                return val - birthToDay[index]
            })
            if (this._age[2] < 0) {
                let lastMonth = new Date(curToday[0], curToday[1], 0);
                this._age[1]--;
                this._age[2] += lastMonth.getDate();
            }
            if (this._age[1] < 0) {
                this._age[0]--;
                this._age[1] += 12;
            }
        }
        return this._age[0];
    }

    /**
     * 设置语言
     * @param value 
     * @param callback 
     * @returns 
     */
    static setLanguage(value: string, callback?: Laya.Handler) {
        GlobalData.updateUserData(UserDataKey.language, value)
        let lang = value == "1" ? "zh" : "en";
        LangUtils.initLanguage(lang, Laya.Handler.create(this, () => {
            callback && callback.run();
            GlobalData.tryExit();
        }))

    }

    /**
    * 更新用户信息
    */
    static updateUserData(key: string, value: any) {
        if (GlobalData.userData) {
            GlobalData.userData[key] = value;
        } else {
            GlobalData.userData = {
                [key]: value
            }
        }
    }

    /**
    * 获取userData中的数据
    */
    static getUserDataByKey(key: string): any {
        if (!GlobalData.userData) {
            return null;
        }
        return GlobalData.userData[key];
    }


    //#endregion


    //#region 登录数据
    static isAppTest: boolean = false;

    static appTestLogin(c: Laya.Handler) {
        let data: any = {};
        data.ret = 0;
        data.msg = "";
        data.data = {
            "notice": "1",
            "collectnum": "32",
            "ip": "1.202.77.122",
            "created_at": "1653551298",
            "language": "1",
            "group_id": "2",
            "avatar": "https:\/\/oss.layabox1-beijing.layabox.com\/11133\/person_file\/ea108a85d47b9387330ad7f5a7ad5ca4.jpeg",
            "is_shutup": "0",
            "look_favorite": "3",
            "closure": "0",
            "multiplayer": "1",
            "avatar_show": "",
            "is_facilitator": "1",
            "bg": "",
            "follow": "3",
            "sp_id": "432",
            "worksnum": "8",
            "nickname": "\u6e38\u5ba2\u73a9\u5bb6",
            "look_like": "0",
            "newmoment": "1",
            "gamecollectnum": "9",
            "blackgnum": "0",
            "lastplayer": "17547",
            "interest": "",
            "friend": "2",
            "is_restrict": "0",
            "lastmaker": "18644",
            "birthday": "1161920701",
            "lastlogin": "1666933381",
            "fans": "19",
            "slogan": "",
            "developer_uid": "11133",
            "incr_like_game": "0",
            "chat_on": "0",
            "gamelikenum": "23",
            "blackunum": "0",
            "incr_fans": "0",
            "gender": "2",
            "likenum": "25",
            "sms_type": "3",
            "isNew": 0,
            "token": "e622f9347f401c4e31461d21bf53b089632ca02f",
            "serverTime": Math.floor(Date.now() / 1000)
        };
        c && c.runWith(JSON.stringify(data));

    }

    static loginUserInfo: any = {};
    /**
     * 获取账号信息
     */
    static getLoginUserInfo() {
        let getComplete = function (data: any): void {
            if (data && data.errCode == 0) {
                console.log("getUserInfo ok " + JSON.stringify(data));
                GlobalData.loginUserInfo = data;
            }
        };
        Union_App.I.getUserInfo(getComplete)
    }
    /**
     * 当前用户是否登录
     */
    static get isLogin(): boolean {
        return GlobalData.userData != null;
    }


    //#endregion



    //#region 公用方法
    static throttle(func: (...args: any[]) => any, limit: number) {
        let inThrottle: boolean;
        return function (this: any, ...args: any[]) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                Laya.timer.once(limit, this, () => (inThrottle = false));
            }
        };
    }


    /**
     * 关注用户
     * @param uid 
     * @param isFollw 
     * @param c 
     * @param e 
     */
    static followSomeOne(uid: string, isFollw: boolean, c?: Laya.Handler, e?: Laya.Handler) {
        var data: any = { developer_uid: uid };
        ServerManager.instance.httpSendPost((isFollw ? 'relation/follow' : 'relation/unfollow'), data, c, e);
    }

    /**
    * 分享游戏
    * @param gameId 
    * @param c 
    * @param e 
    */
    static shareGame(gameId: string, c?: Laya.Handler, e?: Laya.Handler) {
        var data: any = { game_id: gameId };
        ServerManager.instance.httpSendPost('game/share', data, c, e);
    }


    /**
    * 喜欢游戏
    * @param gameId 
    * @param isLike
    * @param c 
    * @param e 
    */
    static likeGame(gameId: string, isLike: boolean, c?: Laya.Handler, e?: Laya.Handler) {
        var data: any = { game_id: gameId };
        ServerManager.instance.httpSendPost((isLike ? 'game/like' : 'game/unLike'), data, c, e);
    }


    /**
    * 收藏游戏
    * @param gameId 
    * @param isCollect
    * @param c 
    * @param e 
    */
    static collectGame(gameId: string, isCollect: boolean, c?: Laya.Handler, e?: Laya.Handler) {
        var data: any = { game_id: gameId };
        ServerManager.instance.httpSendPost((isCollect ? 'game/collect' : 'game/unCollect'), data, c, e);
    }



  




    /**
    * 客户端系统 android|ios
    */
    static getPlatform() {
        if (false) {
            if (Union_App.I.onIOS()) {
                return "ios"
            }
            return "android"
        }
        return "pc"
    }

    static tryExit(): void {
        if (Laya.Browser.onMiniGame || Laya.Browser.onLayaRuntime) {
            Laya.Browser.window.wx.exitMiniProgram({
                "complete": function () {
                }
            });
        }
        else if (Laya.Browser.onBDMiniGame) {
            (window as any).swan.exitMiniProgram();
        }
        else if (Laya.Browser.onTTMiniGame) {
            (window as any).tt.exitMiniProgram();
        }
        else if (Laya.Browser.window.wkbridge) {
            Laya.Browser.window.PlatformClass.createClass('LayaApp').call('exit');
        }
        else {
            window.location.reload();
        }
    }

    /**
    * 复制
    */
    static copyInfo(copyContent: string) {
        if (document.execCommand) {
            var copyTextarea = document.createElement("textarea");
            document.body.appendChild(copyTextarea);
            copyTextarea.innerText = copyContent;
            copyTextarea.select();
            document.execCommand("Copy");
            copyTextarea.parentNode.removeChild(copyTextarea);
        }
    }




    //#endregion




    



}