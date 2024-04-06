import Utils = Laya.Utils;
import Sprite = Laya.Sprite;
import Point = Laya.Point;
import Rectangle = Laya.Rectangle;
import Browser = Laya.Browser;
import Handler = Laya.Handler;


/**
* 系统拖拽处理类
* @author ww
*/
export class SystemDragOverManager {
    static SYSTEMDRAGOVER = "SystemDragOver";

    constructor() {

    }

    private static dragOver(e: DragEvent): void {
        e.preventDefault();
    }

    static dragDrop(e: DragEvent): boolean {
        //console.log("system dragover", e);
        var file: File;
        try {
            file = e.dataTransfer.files[0];
            if (file) {
                var _item = e.dataTransfer.items[0];
                var entry = _item && _item.webkitGetAsEntry();
                 let _clienX = e.clientX;   // offsetX/Y是相对浏览器的，clientXY是相对于canvas的，如果canvas有缩放的话，用offsetXY就是错的
                 let _clienY = e.clientY;
                //let _clienX = e.offsetX;
                //let _clienY = e.offsetY;
                if (!file.type && entry.isDirectory) {
                    SystemDragOverManager.onDictDrag(_item, _clienX, _clienY);
                } else if (e.dataTransfer.files.length == 1) {
                    SystemDragOverManager.onFileDrag(SystemDragOverManager._useDataTransferItem?_item:file, _clienX, _clienY);
                }
                else {
                    SystemDragOverManager.curIndex = 0;
                    SystemDragOverManager.fileArr = e.dataTransfer.files;
                    SystemDragOverManager.onFileDragBatch(SystemDragOverManager.fileArr[0]);
                }
            }
            e.preventDefault();
        }
        catch (e) {
        }

        return false;
    }

    private static onDictDrag(dict: any, x: any, y: any): void {
        SystemDragOverManager.doSendDragEvent(dict, x, y, null);
    }

    private static getFileFromEntryRecursively(entry: any, containExt: string, _outFileList: any, handler: Handler): void {
        var _fullPath: string = entry.fullPath;
        var _files: any[] = _outFileList.readFiles;
        _files.push(_fullPath);
        if (entry.isFile) {
            entry.file(function (file: any): void {
                var _out = { file: file, path: _fullPath };
                _outFileList.fileList.push(_out);
                var extension = Utils.getFileExtension(file.name);
                if (containExt && containExt == extension) {
                    _outFileList.haveExt = true;
                }
                SystemDragOverManager.checkFiles(_files, _fullPath, handler, _outFileList);
            }, function (e: any): void {
                console.log(e);
            });
        } else {
            var reader: any = entry.createReader();
            reader.readEntries(function (entries: any): void {
                for (let i = 0, len = entries.length; i < len; i++) {
                    var entry1: any = entries[i];
                    SystemDragOverManager.getFileFromEntryRecursively(entry1, containExt, _outFileList, handler);
                }
                SystemDragOverManager.checkFiles(_files, _fullPath, handler, _outFileList);
            });
        }
    }

    private static checkFiles(_files: any[], _fullPath: string, handler: Handler, _outFileList: any): void {
        var _i = _files.indexOf(_fullPath);
        if (_i != -1) {
            _files.splice(_i, 1);
        }
        if (_files.length == 0 && handler) {
            delete _outFileList.readFiles;
            handler.runWith(_outFileList);
        }
    }

    /**
     * 读取文件夹中的所有文件
     * @param item 文件夹
     * @param containExt 必须包含的扩展名
     * @param handler
     */
    static readDirect(item: any, containExt: string, handler: Handler): void {
        var entry: any = item.webkitGetAsEntry();
        var _outFileList: any = {
            readFiles: [],
            fileList: []
        };
        if (entry.isDirectory) {
            SystemDragOverManager.getFileFromEntryRecursively(entry, containExt, _outFileList, handler);
        } else {
            handler && handler.runWith(null);
        }
    }
    /**
     * 将file读取成arraybuffer
     * @param	file
     * @param	complete
     */
    static readAsArrayBuffer(file: any, complete: Handler, param: any = null): void {
        var reader: any;
        reader = new FileReader();;
        reader.onload = function (e: any): void {
            if (param) {
                complete.runWith([reader.result, null, param]);
            } else {
                complete.runWith(reader.result);
            }
        }
        reader.readAsArrayBuffer(file);
    }

    static readAsText(file: any, complete: Handler): void {
        var reader: any;
        reader = new FileReader();;
        reader.onload = function (e: any): void {
            complete.runWith(reader.result);
        }
        reader.readAsText(file);
    }

    static readAsJsonObject(file: any, complete: Handler):any{
        let reader = new FileReader();;
        reader.onload = function (e: any): void {
            var txt = reader.result as string
            var obj = JSON.parse(txt)
            complete.runWith(obj);
        }
        reader.readAsText(file);
    }

    /**
     * 将file读取成地址
     * @param	file
     * @param	complete
     */
    static readAsDataURL(file: any, complete: Handler): void {
        let reader = new FileReader();;
        reader.onload = function (e: any): void {
            complete.runWith(reader.result);
        }
        reader.readAsDataURL(file);
    }

    static SystemDrag = "SystemDrag";
    private static curIndex = 0;
    private static fileArr: FileList;

    private static onFileDragBatch(file: any): void {
        SystemDragOverManager.onFileDrag(file, 0, 0);
        //for (var i:number = 0; i < file.length; ++i )
        //{
        //onFileDrag(file[i], x, y);
        //}
    }

    static checkNext(): void {
        if (!SystemDragOverManager.fileArr || SystemDragOverManager.fileArr.length == 0)
            return;
        if ((SystemDragOverManager.curIndex + 1 < SystemDragOverManager.fileArr.length)) {
            SystemDragOverManager.curIndex += 1;
            SystemDragOverManager.onFileDrag(SystemDragOverManager.fileArr[SystemDragOverManager.curIndex], 0, 0);
        }
    }

    static getFileNameWithOutExtension(fileName: string): string {
        var arr: any[];
        arr = fileName.split(".");
        arr.pop();
        return arr.join(".");
    }

    private static onFileDrag(file: File|DataTransferItem, x: number, y: number): void {
        var fileName: string;
        if(file instanceof DataTransferItem){
            fileName = file.getAsFile().name;
        }else {
            fileName = file.name;
        }
        var extension: string;
        extension = Utils.getFileExtension(fileName);

        if (false/* MultiInputPage.instance && MultiInputPage.instance.displayedInStage */) {
            //
            SystemDragOverManager.readAsArrayBuffer(file, Handler.create(null, SystemDragOverManager.onReadAsDataUrl, [fileName]));
        }
        else if (Browser.getQueryString("uploadMusic")) {
            SystemDragOverManager.readAsArrayBuffer(file, Handler.create(null, SystemDragOverManager.onReadAsDataUrl, [fileName]));
        }
        /*	if(window.ActionManger.cameraRay&&window.ActionManger.cameraRay.isEditmodel)
            {
                if (extension == "vox")
                {
                    readAsArrayBuffer(file, Handler.create(null, onReadAsDataUrl, [fileName]));
                }
                else if(extension=="png"||extension =="jpg"){

                    readAsDataURL(file,Handler.create(null,onReadPicUrl,[fileName]))
                   // ArtEditor.instance.openImageEditor(fileName, 1);
                  
                }
            }
            else if ( MultiInputPage.instance && MultiInputPage.instance.displayedInStage)
            {
                //
                readAsArrayBuffer(file, Handler.create(null, onReadAsDataUrl, [fileName]));
            }
            else if (Browser.getQueryString("uploadMusic"))
            {
                readAsArrayBuffer(file, Handler.create(null, onReadAsDataUrl, [fileName]));
            }else{
                readAsArrayBuffer(file,Handler.create(null,onReadPicUrl2,[fileName]))
            }*/

        //if ( MultiInputPage.instance && MultiInputPage.instance.displayedInStage)
        //{
        ////
        //readAsArrayBuffer(file, Handler.create(null, onReadAsDataUrl, [fileName]));
        //}
        //else if (Browser.getQueryString("uploadMusic"))
        //{
        //readAsArrayBuffer(file, Handler.create(null, onReadAsDataUrl, [fileName]));
        //}
        //向鼠标下的显示对象发送拖拽事件
        SystemDragOverManager.doSendDragEvent(file, x, y, extension);
    }

    private static _tempBounds: Rectangle;
    private static _useDataTransferItem=false;

    static __init__(useDataTransferItem=false): void {
        Browser.container.ondrop = SystemDragOverManager.dragDrop;
        Browser.container.ondragover = SystemDragOverManager.dragOver;
        SystemDragOverManager._useDataTransferItem = useDataTransferItem;
        SystemDragOverManager._tempBounds = new Rectangle();
    }

    static getObjectsUnderPoint(sprite: Sprite, x: number, y: number, rst: any[] = null, filterFun: Function = null): any[] {
        rst = rst ? rst : [];
        if (filterFun != null && !filterFun(sprite)) return rst;
        var bounds = sprite.getBounds();
        if ((bounds.width <= 0) || (bounds.height <= 0)) {
            SystemDragOverManager._tempBounds.setTo(sprite.x, sprite.y, sprite.width * sprite.scaleX, sprite.height * sprite.scaleY);
            bounds = SystemDragOverManager._tempBounds;
        }
        if (bounds.contains(x, y)) {
            var tempP = new Point();
            tempP.setTo(x, y);
            tempP = sprite.fromParentPoint(tempP);
            x = tempP.x;
            y = tempP.y;
            var childList: Sprite[];
            //@ts-ignore
            childList = sprite["_childs"] || sprite._children;
            for (let i = childList.length - 1; i > -1; i--) {
                var child = childList[i];
                if (child instanceof Sprite)
                    SystemDragOverManager.getObjectsUnderPoint(child, x, y, rst, filterFun);
            }
            rst.push(sprite);
        }
        return rst;
    }

    static visibleAndEnableObjFun(tar: Sprite): boolean {
        return tar.visible && tar.mouseEnabled;
    }

    private static doSendDragEvent(file: any, x: number, y: number, extension: string): void {
        var rst: any[];
        let r = Browser.pixelRatio;
        rst = SystemDragOverManager.getObjectsUnderPoint(Laya.stage, x * r, y * r, null, SystemDragOverManager.visibleAndEnableObjFun);
        let len = rst.length;
        for (let i = 0; i < len; i++) {
            rst[i].event(SystemDragOverManager.SYSTEMDRAGOVER, [file, extension])
        }
    }
           
    private static onReadAsDataUrl(preFile: string, buff: ArrayBuffer): void {
        /* if (Browser.getQueryString("uploadMusic")) {
            //UpLoadLocalResource.instance.setData(preFile, buff);
            ArtEventCenter.instance.event("on_drag_end", [preFile, buff]);
            return;
        }
        if (MultiInputPage.instance && MultiInputPage.instance.displayedInStage) {
            ArtEventCenter.instance.event("on_drag_end", [preFile, buff]);
            //UpLoadLocalResource.instance.setData();
        }
        else {
            //addModelByArrayBuffer(buff);
        } */
    }


}


