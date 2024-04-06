/**
* @brief: 图片标记工具
* @ author: gongganghao
* @ data: 2023-12-12 17:17
*/
import Event = Laya.Event;
const { regClass } = Laya;
@regClass()
export  class MarkUtils  {

    /**标记颜色 */
    static markColor = "#ffff00";


    /**
     * 创建圆形标记
     * @param pos 
     * @param radius 
     * @param parent 
     */
    static createCircle(pos:Laya.Vector2,radius:number,parent:Laya.Box) {
        let circle = new Laya.Sprite();
        circle.graphics.drawCircle(pos.x,pos.y,radius,null,this.markColor,10)
        parent.addChild(circle);
    }


    /**
     * 创建矩形标记
     * @param pos 
     * @param width 
     * @param height 
     * @param parent 
     */
    static createRect(pos:Laya.Vector2,width:number,height:number,parent:Laya.Box) {
        let rect = new Laya.Sprite();
        rect.graphics.drawRect(pos.x,pos.y,width,height,null,this.markColor,10)
        parent.addChild(rect);
    }


    /**
     * 创建遮罩标记
     * @param skin 
     * @param parent 
     */
    static createMask(skin:string,parent:Laya.Box) {
        let image = new Laya.Image(skin)
        image.useSourceSize  = true;
        image.color =this.markColor
        image.pos(0,0)
        parent.addChild(image);
    }


    /**
     * 创建外发光标记
     * @param pos 
     * @param skin 
     * @param parent 
     */
    static createGlow(pos:Laya.Vector2,skin:string,parent:Laya.Box) {
        let image = new Laya.Image(skin)
        image.useSourceSize  = true;
        image.pos(pos.x,pos.y)
        this.applayFilter(image)
        parent.addChild(image);
        return image;
    }

    static applayFilter(spr:Laya.Image): void {
		//创建一个发光滤镜
		var glowFilter: Laya.GlowFilter = new Laya.GlowFilter(this.markColor, 10, 0, 0);
		//设置滤镜集合为发光滤镜
		spr.filters = [glowFilter];
	}

}