import { WXUtils } from "../../utils/WXUtils";

/**
 * 刘海屏适配
 */
const { regClass, property } = Laya;
@regClass()
export class FringeAdpter extends Laya.Script {
    @property({ type: Boolean, tips: "适配顶部" })
    topAdpter: boolean = false;
    @property({ type: Boolean, tips: "适配高度" })
    heightAdpter: boolean = false;
    @property({ type: Boolean, tips: "iphoneX底部抬高适配" })
    iphoneXBottomAdpter: boolean = false;
    @property({ type: Boolean, tips: "iphoneX底部变高适配" })
    iphoneXHeightAdpter: boolean = false;
    @property({ type: Number, tips: "和工具顶部对齐的坐标" })
    refertooltop: number;
    @property({ type: Number, tips: "和工具底部对齐的坐标" })
    refertoolbottom: number;
    @property({ type: Boolean, tips: "只适配工具栏下移" })
    onlyMoveDown: boolean = false;
    @property({ type: Boolean, tips: "横屏适配左侧刘海" })
    leftAdpter: boolean = false;
    @property({ type: Boolean, tips: "横屏适配右侧偏移" })
    rightAdpter: boolean = false;

    attributeKey: any[] = ['x', 'y', 'top', 'left', 'right', 'bottom', 'height'];
    attributeCache: any = {};

    private _isChange: boolean;
    onAwake(): void {
        if (!WXUtils.isQMP()) return;
        this.cacheAttribute();
        this.run();
    }

    onEnable() {
        if (this._isChange) {
            this.run();
        }
    }

    onDisable() {

    }

    onDestroy() {
    }

    private run() {
        this._isChange = false;
        if (!WXUtils.isQMP()) return;
        var tar: any = (<Laya.Box>this.owner);
        var topOffset: number;
        topOffset = WXUtils.TopOffset;
        if (this.refertooltop != undefined) {
            topOffset = WXUtils.getTopBtnsOffset() - this.refertooltop;
        }
        if (this.refertoolbottom != undefined) {
            let wxtop = WXUtils.getTop();
            if (!Laya.Browser.onMiniGame) {
                wxtop = WXUtils.getTop(topOffset);
            }
            topOffset = wxtop - this.refertoolbottom;
        }
        if (this.onlyMoveDown) {
            if ((topOffset < 0)) {
                topOffset = 0;
            }
        }
        let _value;
        let topKey: string;
        if (this.topAdpter) {
            /* topKey = this.get_top();
            if (tar[topKey] != undefined && !isNaN(tar[topKey])) {
                tar[topKey] += topOffset;
            } else {
                tar[this.get_y()] += topOffset;
            } */

            topKey = 'top';
            if (tar[topKey] == undefined || isNaN(tar[topKey])) {
                topKey = 'y';
            }
            _value = this.attributeCache[topKey];
            tar[topKey] = _value + topOffset;
        }
        if (this.leftAdpter) {
            /* topKey = 'left'
            if (tar[topKey] != undefined && !isNaN(tar[topKey])) {
                tar[topKey] += topOffset;
            } else {
                tar['x'] += topOffset;
            } */

            topKey = 'left';
            if (tar[topKey] == undefined || isNaN(tar[topKey])) {
                topKey = 'x';
            }
            _value = this.attributeCache[topKey];
            tar[topKey] = _value;
        }

        if (this.rightAdpter) {
            topKey = 'right';
            if (tar[topKey] == undefined || isNaN(tar[topKey])) {
                topKey = 'x';
            }
            _value = this.attributeCache[topKey];
            tar[topKey] = _value;
        }

        if (this.heightAdpter) {
            _value = this.attributeCache['height'];
            tar.height = _value + topOffset;
        }
        if (WXUtils.isIphoneX()) {
            if (this.iphoneXBottomAdpter) {
                /* let bottomKey = this.get_bottom();
                if (tar[bottomKey] != undefined && !isNaN(tar[bottomKey])) {
                    tar[bottomKey] += WXUtils.BottomOffset;
                    //tar.bottom += WXUtils.TopOffset;
                } else {
                    tar[this.get_y()] -= WXUtils.BottomOffset;
                    //tar.y -= WXUtils.TopOffset;
                } */

                topKey = 'bottom';
                if (tar[topKey] == undefined || isNaN(tar[topKey])) {
                    topKey = 'y';
                }
                _value = this.attributeCache[topKey];

                if (topKey == 'y')
                    tar[topKey] = _value - topOffset;
                else
                    tar[topKey] = _value + topOffset;
            }
            if (this.iphoneXHeightAdpter) {
                //tar.height += WXUtils.TopOffset;
                topKey = 'height';
                let _height = this.attributeCache[topKey];
                tar.height = _height + WXUtils.BottomOffset;
            }
        }
    }

    private cacheAttribute() {
        for (let index = 0; index < this.attributeKey.length; index++) {
            const element = this.attributeKey[index];
            const attribute = (this.owner as any)[element];
            if (attribute != undefined && !isNaN(attribute)) {
                this.attributeCache[element] = attribute;
            }
        }
    }


}

