import { GlobalData } from "../scene/data/GlobalData";
import { UnionManage } from "./UnionManage";

/**
 * 平台声音管理播放类
 **/
export default class SoundUtil {
    private static _instance: SoundUtil = null;
    static get instance(): SoundUtil {
        if (!SoundUtil._instance)
            SoundUtil._instance = new SoundUtil();
        return SoundUtil._instance;
    }


    /**平台标识头**/
    private channel: any = null;
    /**背景音乐实例**/
    private music: any = null;
    /**背景音乐url地址*/
    private musicUrl: string = null;
    constructor() {
        if (Laya.Browser.onMiniGame) {
            this.channel = Laya.Browser.window.wx;
        } else if (Laya.Browser.onTTMiniGame) {
            this.channel = Laya.Browser.window.tt;
        } else {
            this.channel = null;
        }
    }





    /**
     * @param url 声音资源
     * @param type 0背景音乐；1音效
     * @param time 声音起始位置，只针对背景音乐生效
     **/
    play(url: string, type: number = 1, time: number = 0) {
        if (!this.channel) {
            //非小游戏环境声音播放
            if (type) {
                Laya.SoundManager.playSound(url, 1);
            } else {
                if(Laya.SoundManager['_bgMusic'] == url)return;
                Laya.loader.load(url).then(()=>{
                    Laya.SoundManager.playMusic(url, 0, null, time);
                })
            }
            return;
        }



        //小游戏环境声音播放
        if (!type && this.music) {
            this.stop();
        }

        this.playUrl(url, type, time);
    }

    /**
     * 播放url地址
     * @param url 
     * @param type 
     * @param time 
     */
    playUrl(url: string, type: number, time: number = 0) {
        var audioContext: any = this.channel.createInnerAudioContext();
        audioContext.loop = !type ? true : false;//是否循环播放
        audioContext.autoplay = false;//是否自动播放
        if (!type && time) {
            audioContext.seek(time);//跳转到指定播放位置
        }

        if (audioContext.onCanplay) {
            audioContext.onCanplay(() => {
                //声音加载完成 
                audioContext.play();
            });
        } else {
            audioContext.onCanPlay(() => {
                //声音加载完成 
                audioContext.play();
            });
        }
        audioContext.onEnded(() => {
            //播放结束
            if (!audioContext.loop) {
                audioContext.stop();
                audioContext.destroy();
            }
        });
        audioContext.onError((error: any) => {
            console.log("播放出错", error);
        });
        if (!type) {
            this.music = audioContext;//存储背景音乐实例
            this.musicUrl = url;
        }
        audioContext.src = url;
    }



    /**
     * 继续播放
     */
    continuePlay() {
        if (this.musicUrl) {
            this.playUrl(this.musicUrl, 0, 0);
        }
    }

    /**
   * 停止
   */
    stop() {
        Laya.SoundManager.stopAll();
        if (this.music) {
            this.music.stop();
            this.music.destroy();
        }
        this.music = null;
    }
}