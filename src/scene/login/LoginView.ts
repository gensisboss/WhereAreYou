/**
* @brief: 登录加载界面
* @ author: gongganghao
* @ data: 2023-11-14 19:52
*/


import { PageManager } from "../../page/PageManager";
import { PagePath, TweenType } from "../../page/data/PageData";
import { LangUtils } from "../../utils/LangUtils";
import { UnionManage } from "../../utils/UnionManage";
import { GameListType, HomeData } from "../home/HomeView";
import { LoginViewBase } from "./LoginView.generated";

const { regClass } = Laya;

@regClass()
export class LoginView extends LoginViewBase {


    private _isLoginSuccess:boolean;
    onEnable(): void {
        this._isLoginSuccess = false;
        UnionManage.instance.login(() => {
           this._isLoginSuccess = true;
        })
        Laya.timer.loop(10, this, this.loadingEffect);
    }

    loadingEffect() {
        this.loading.value += 0.01;
        this.star.x = this.loading.bar.width-15;
        if (this.loading.value >= 1 && this._isLoginSuccess) {
            let homeData: HomeData = {
                homeTab: 0,
                listType: GameListType.recommend,
                selectIndex: 0
            }
            PageManager.instance.open(PagePath.HomePage, homeData, null, true, "", { type: TweenType.Right })
            this.close();
            this.destroy()
        }

    }


    onDisable(): void {
        Laya.timer.clear(this, this.loadingEffect)

    }


}