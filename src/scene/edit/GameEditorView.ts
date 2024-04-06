import { GameEditorViewBase } from "./GameEditorView.generated";

/**
* @brief: 游戏编辑界面
* @ author: gongganghao
* @ data: 2023-11-01 19:51
*/
import Event = Laya.Event;
import { PageManager } from "../../page/PageManager";
import { PagePath } from "../../page/data/PageData";
import { ServerManager } from "../../server/ServerManager";
import { GameType } from "../data/GameData";
import TransformIcon from "../../core/logic/TransformIcon";
import { MarkUtils } from "../../utils/MarkUtils";
import { PlayGameData } from "../game/GamePlayerView";
import { GlobalData } from "../data/GlobalData";
import { MusicData } from "./MusicView";
import SoundUtil from "../../utils/SoundUtils";

const { regClass } = Laya;

type PointInfo = {
    isAdd: boolean,
    point: Laya.Point
}

type IconInfo = {
    name?: string,
    url: string,
    data: any
}




@regClass()
export class GameEditorView extends GameEditorViewBase {

    private _transformIcon: TransformIcon;
    private _addPoint: Laya.Point[] = [];
    private _reducePoint: Laya.Point[] = [];
    private _isAdd: boolean = true;
    private _undoPoints: PointInfo[] = [];
    private _redoPoints: PointInfo[] = [];
    private _pointMap: Map<Laya.Point, Laya.Sprite> = new Map();
    private _data: any;
    private _editList: any[];
    private _isSaved: boolean = false;
    private _curImageName: string;
    private _glowIconIndex: number = 0;


    onEnable(): void {
        this.backBtn.on(Event.CLICK, this, this.onBackClick)
        this.playBtn.on(Event.CLICK, this, this.onPlayClick)
        this.saveBtn.on(Event.CLICK, this, this.onSaveClick)
        this.publishBtn.on(Event.CLICK, this, this.onPublishClick)
        this.musicBtn.on(Event.CLICK, this, this.onMusicClick)
        this.gameIcon.on(Event.CLICK, this, this.onIconClick)
        this.add.on(Laya.Event.CLICK, this, this.changePoint, [true])
        this.reduce.on(Laya.Event.CLICK, this, this.changePoint, [false])
        this.redo.on(Laya.Event.CLICK, this, this.onRedoClick)
        this.undo.on(Laya.Event.CLICK, this, this.onUndoClick)
        this.reset.on(Laya.Event.CLICK, this, this.onResetClick)
        this.cut.on(Laya.Event.CLICK, this, this.onCutClick)
        this.guideBox.on(Laya.Event.CLICK, this, this.onGuideClick)
        this.descInput.on(Event.INPUT, this, this.onDescInput)
        this.add.selected = true;

        this._transformIcon = this.gameIcon.getComponent(TransformIcon);
        this._transformIcon.transformMoveHandler = new Laya.Handler(this, this.onIconPosChange)
        this._transformIcon.transformScaleHandler = new Laya.Handler(this, this.onIconScaleChange)

        this.editBox.width = Laya.stage.width;
        this.editBox.height = Laya.stage.height;

        this.updateBtnEnabled();
    }

    onOpened(param: any): void {
        if (!param.editList) {
            param.editList = []
        }
        this.numTip.text = "0";
        this._data = param;
        this.readArchive();
        this.resizeEditBox();
        if (this._data.game_bgm?.length > 0) {
            SoundUtil.instance.play(this._data.game_bgm,0)
        }
    }

    onGuideClick(){
        localStorage.setItem("editGuide","1")
        this.showGuideBox(false);
    }

    showGuideBox(isShow: boolean) {
        if(!isShow){
            this.guideTip.text = "点击关闭";
            if (!isShow && localStorage.getItem("editGuide") == "1") {
                this.guideBox.visible = false;
            }
        }else{
            this.guideBox.visible = true
        }
    }

    async readArchive() {
        if (this._data.game_data) {
            let res = await Laya.loader.load(ServerManager.instance.formatUrl(this._data.game_data));
            this._editList = res.data.list;
            this.descInput.text = res.data.target;
        } else {
            this._editList = this._data.editList || [];
            this.descInput.text = this._data.game_topic;
        }
        this.renderGlowIcon(0);
    }

    renderGlowIcon(index: number) {
        for (let i = index; i < this._editList.length; i++) {
            let info = this._editList[i];
            let image = MarkUtils.createGlow(new Laya.Vector2(info.data.pos[0], info.data.pos[1]), ServerManager.instance.formatUrl(info.url), this.chooseBox)
            image.name = info.name;
            image.mouseThrough = true;
            image.on(Event.CLICK, this, this.onDeleteIconClick, [info.name])
        }
        this.numTip.text = this._editList.length + "";
    }

    private onDeleteIconClick(name: string) {
        for (let i = 0; i < this._editList.length; i++) {
            if (this._editList[i].name == name) {
                this._editList.splice(i, 1);
                break;
            }
        }
        this.numTip.text = this._editList.length + "";
        let child = this.chooseBox.getChildByName(name);
        child && child.destroy();
    }


    resizeEditBox() {
        Laya.loader.load(this._data.game_img, Laya.Handler.create(this, (res: any) => {
            this.gameIcon.skin = this._data.game_img;
            this.gameIcon.width = res.sourceWidth;
            this.gameIcon.height = res.sourceHeight;
            let scale = 1;
            if (this.gameIcon.height >= this.editBox.height && this.gameIcon.width >= this.editBox.width) {
                scale = 1
            } else if (this.gameIcon.height <= this.editBox.height) {
                scale = this.editBox.height / this.gameIcon.height;
            } else if (this.gameIcon.width <= this.editBox.width) {
                scale = this.editBox.width / this.gameIcon.width;
            }
            this._transformIcon.minScale = scale;
            this._transformIcon.setScale(scale)
            this._transformIcon.setPosition((this.editBox.width - this.gameIcon.displayWidth) / 2, 0)
            this.gameMask.width = this.chooseBox.width = this.pointBox.width = this.gameIcon.width;
            this.gameMask.height = this.chooseBox.height = this.pointBox.height = this.gameIcon.height;
        }))
        this.uploadPicture();
    }


    onIconPosChange(posX: number, posY: number) {
        if (posX != null) {
            this.gameMask.pos(posX, posY)
            this.chooseBox.pos(posX, posY)
            this.pointBox.pos(posX, posY)
            // this.topBox.visible = false;
            // this.bottomBox.visible = false;
            // this.leftBox.visible = false;
        } else {
            // this.topBox.visible = true;
            // this.bottomBox.visible = true;
            // this.leftBox.visible = true;
        }
    }

    onIconScaleChange(scale: number) {
        if (scale != null) {
            this.gameMask.scale(scale, scale)
            this.chooseBox.scale(scale, scale)
            this.pointBox.scale(scale, scale)
            // this.topBox.visible = false;
            // this.bottomBox.visible = false;
            // this.leftBox.visible = false;
        } else {
            // this.topBox.visible = true;
            // this.bottomBox.visible = true;
            // this.leftBox.visible = true;
        }
    }


    onDescInput() {
        this._data.game_topic = this.descInput.text;
    }


    private async uploadPicture() {
        let data = { "img_url": this._data.game_img }
        this.showGuideBox(true)
        ServerManager.instance.httpPostJsonSend("/vincent/mask/put_origin_img", data, Laya.Handler.create(this, (res: any) => {
            if (res.ret == 0) {
                this._curImageName = res.data;
                console.log("图片上传成功")
            }
            this.showGuideBox(false)
            PageManager.instance.hideTipOrLoading();
        }), Laya.Handler.create(this, (e: any) => {
            console.log("图片上传失败")
        }))

    }

    private onRedoClick() {
        let pointInfo = this._redoPoints.pop() as PointInfo;
        if (pointInfo.isAdd) {
            this._addPoint.pop();
        } else {
            this._reducePoint.pop();
        }
        this._undoPoints.push(pointInfo);
        let point = this._pointMap.get(pointInfo.point);
        if (point) {
            point.graphics.clear();
            point.removeSelf();
            point.destroy();
        }
        this.updateBtnEnabled();

    }

    private onUndoClick() {
        let pointInfo = this._undoPoints.pop();
        this.createPoint(pointInfo.isAdd, pointInfo.point)
    }

    private onResetClick() {
        this._undoPoints = [];
        this._redoPoints = [];
        this._pointMap.clear();
        this._addPoint = [];
        this._reducePoint = [];
        this.pointBox.destroyChildren();
        this.updateBtnEnabled();

    }

    private onCutClick() {
        this._isSaved = false;
        this._glowIconIndex++;
        let data = { "img_url": this._curImageName, "add_points": this._addPoint, "reduce_points": this._reducePoint }


        ServerManager.instance.httpPostJsonSend("/vincent/mask/matting_img", data, Laya.Handler.create(this, (res: any) => {
            if (res.ret == 0) {
                let info: IconInfo = {
                    name: "cut" + this._glowIconIndex,
                    url: res.data.url,
                    data: res.data.info
                }
                this._editList.push(info)
                this.renderGlowIcon(this._editList.length - 1)
            } else {
                PageManager.instance.showTip("剪裁失败")
            }
        }), Laya.Handler.create(this, (e: any) => {
            console.log("请求失败", e.message)
        }))
        this.onResetClick();
    }

    onClosed(type?: string): void {
        this._data.editList = this._editList;
    }



    private updateBtnEnabled() {
        this.reduce.mouseEnabled = this._addPoint.length > 0;
        this.redo.mouseEnabled = this._redoPoints.length > 0;
        this.undo.mouseEnabled = this._undoPoints.length > 0;
        this.reset.mouseEnabled = this._addPoint.length > 0 || this._reducePoint.length > 0;
        this.cut.mouseEnabled = this._addPoint.length > 0;


        this.reduce.skin = this.reduce.mouseEnabled ? "resources/images/edit/jian.png" : "resources/images/edit/jiangray.png";
        this.reduce.stateNum = this.reduce.mouseEnabled ? 2 : 1;
        (this.reduce.getChildAt(0) as Laya.Label).color = this.reduce.mouseEnabled ? "#ffffff" : "#666b85"
        this.reduce.selected = !this._isAdd;
        this.undo.skin = this.undo.mouseEnabled ? "resources/images/edit/back.png" : "resources/images/edit/backgray.png";
        this.undo.stateNum = this.undo.mouseEnabled ? 2 : 1;
        (this.undo.getChildAt(0) as Laya.Label).color = this.undo.mouseEnabled ? "#ffffff" : "#666b85"
        this.redo.skin = this.redo.mouseEnabled ? "resources/images/edit/back.png" : "resources/images/edit/backgray.png";
        this.redo.stateNum = this.redo.mouseEnabled ? 2 : 1;
        (this.redo.getChildAt(0) as Laya.Label).color = this.redo.mouseEnabled ? "#ffffff" : "#666b85"
        this.reset.skin = this.reset.mouseEnabled ? "resources/images/edit/reset.png" : "resources/images/edit/resetgray.png";
        this.reset.stateNum = this.reset.mouseEnabled ? 2 : 1;
        (this.reset.getChildAt(0) as Laya.Label).color = this.reset.mouseEnabled ? "#ffffff" : "#666b85"
        this.cut.skin = this.cut.mouseEnabled ? "resources/images/edit/save.png" : "resources/images/edit/savegray.png";
        this.cut.stateNum = this.cut.mouseEnabled ? 2 : 1;
        (this.cut.getChildAt(0) as Laya.Label).color = this.cut.mouseEnabled ? "#ffffff" : "#666b85"


        if (this.reset.mouseEnabled) {
            this.gameMask.visible = true;
            this.updateMask();
        } else {
            this.gameMask.visible = false;
            this.gameMask.skin = "";
        }

    }

    onBackClick() {
        if (this._isSaved) {
            PageManager.instance.back();
        } else {
            PageManager.instance.showConfirm("当前游戏尚未发布，是否直接退出？", "确定", "取消", Laya.Handler.create(this, (isSure: boolean) => {
                isSure && PageManager.instance.back();
            }))
        }

    }

    detectCanPlay() {
        if (this.descInput.text.length <= 0) {
            PageManager.instance.showTip("请输入游戏目标");
            return false;
        }
        if(this._editList.length <= 0){
            PageManager.instance.showTip("请剪裁至少一个目标");
            return false;
        }
        return true;
    }


    onPlayClick() {
        if (!this.detectCanPlay()) {
            return;
        }
        let playData: PlayGameData = {
            id: -1,
            url: this.gameIcon.skin,
            list: this._editList,
            duration: 120,
            type: GameType.plot,
            target: this.descInput.text,
        }
        PageManager.instance.open(PagePath.GamePage, playData, null, true)
    }

    getGameData() {
        return {
            url: this.gameIcon.skin,
            list: this._editList,
            duration: 120,
            type: GameType.plot,
            target: this.descInput.text
        }
    }


    onSaveClick() {
        let saveData = {
            game_id: this._data.game_id,
            game_data: JSON.stringify(this.getGameData()),
            game_img: this.gameIcon.skin,
            game_bgm: this._data.game_bgm
        }

        ServerManager.instance.httpSendPost("vincent/game/edit", saveData, Laya.Handler.create(this, (data: any) => {
            if (data.ret == 0) {
                this._isSaved = true;
                PageManager.instance.showTip("保存成功")
            }
        }))
    }

    onMusicClick() {
        let musicData: MusicData = {
            url: this._data.game_bgm,
            callback: Laya.Handler.create(this, (url: string) => {
                this._data.game_bgm = url;
                SoundUtil.instance.play(url,0)
            })
        }
        PageManager.instance.open(PagePath.MusicPage, musicData, null, false)
    }

    onPublishClick() {
        if (!this.detectCanPlay()) {
            return;
        }
        this._data.game_data = this.getGameData();
        PageManager.instance.open(PagePath.PublishPage, this._data)
    }

    private onIconClick(e: Event) {
        this.showGuideBox(false);
        let newPoint = new Laya.Point(this.gameIcon.mouseX, this.gameIcon.mouseY)
        this.createPoint(this._isAdd, newPoint);
    }

    private createPoint(isAdd: boolean, pointPos: Laya.Point) {
        let point = new Laya.Sprite();
        let clonePos = new Laya.Point(pointPos.x, pointPos.y)
        let realPos = this.pointBox.globalToLocal(this.gameIcon.localToGlobal(clonePos))
        if (isAdd) {
            this._addPoint.push(pointPos)
            point.graphics.drawCircle(realPos.x, realPos.y, 10, "#00FF00")
        } else {
            this._reducePoint.push(pointPos)
            point.graphics.drawCircle(realPos.x, realPos.y, 10, "#FF0000")
        }

        this._pointMap.set(pointPos, point);
        this._redoPoints.push({ isAdd: isAdd, point: pointPos })
        this.pointBox.addChild(point);
        this.updateBtnEnabled();
    }

    private updateMask() {
        let data = { "img_url": this._curImageName, "add_points": this._addPoint, "reduce_points": this._reducePoint }


        ServerManager.instance.httpPostJsonSend("/vincent/mask/get_mask_img", data, Laya.Handler.create(this, (data: any) => {
            this.gameMask.skin = "data:image/png;base64," + data.data.data;
        }), Laya.Handler.create(this, (e: any) => {
            console.log("请求失败", e.message)
        }))
    }

    private changePoint(isAdd: boolean) {
        this.add.selected = isAdd;
        this.reduce.selected = !isAdd;
        this._isAdd = isAdd;
        this.showGuideBox(false);
    }



    onDisable(): void {
        this._transformIcon = null;
        this._data = null;
        this._undoPoints = [];
        this._redoPoints = [];
        this._pointMap.clear();
        this._addPoint = [];
        this._reducePoint = [];
        this.pointBox.destroyChildren();
        this.chooseBox.destroyChildren();
        this.guideBox.off(Laya.Event.CLICK, this, this.onGuideClick)
        this.backBtn.off(Event.CLICK, this, this.onBackClick)
        this.playBtn.off(Event.CLICK, this, this.onPlayClick)
        this.publishBtn.off(Event.CLICK, this, this.onPublishClick)
        this.musicBtn.off(Event.CLICK, this, this.onMusicClick)
        this.gameIcon.off(Event.CLICK, this, this.onIconClick)
        this.add.off(Laya.Event.CLICK, this, this.changePoint)
        this.reduce.off(Laya.Event.CLICK, this, this.changePoint)
        this.redo.off(Laya.Event.CLICK, this, this.onRedoClick)
        this.undo.off(Laya.Event.CLICK, this, this.onUndoClick)
        this.reset.off(Laya.Event.CLICK, this, this.onResetClick)
        this.cut.off(Laya.Event.CLICK, this, this.onCutClick)
        this.descInput.off(Event.INPUT, this, this.onDescInput)
        this.saveBtn.off(Event.CLICK, this, this.onSaveClick)
    }

}