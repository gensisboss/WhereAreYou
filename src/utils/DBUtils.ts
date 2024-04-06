/**
* @brief: 二进制转换工具
* @ author: gongganghao
* @ data: 2023-11-27 14:43
*/

import Byte = Laya.Byte;
import HTMLCanvas = Laya.HTMLCanvas;
export class DBUtils {
    static LJSON: string = "json";
    static LJSONBIN: string = "jsonBin";
    static TXT: string = "txt";
    static ARRAYBUFFER: string = "ArrayBuffer";
    static SYNC: string = "sync";
    static JSONTYPE: number = 1;
    static TXTTYPE: number = 2;
    static ARRAYBUFFERTYPE: number = 3;
    static SYNCTYPE: number = 4;
    static JSONBINTYPE: number = 5;
    private static _keyStr: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

    constructor() {
    }

    /**
    * 字节转换
    * @param bytes 
    */
    static byteConvert(bytes: any) {
        if (isNaN(bytes)) {
            return '';
        }
        let symbols = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        let exp = Math.floor(Math.log(bytes) / Math.log(2));
        if (exp < 1) {
            exp = 0;
        }
        let i = Math.floor(exp / 10);
        bytes = bytes / Math.pow(2, 10 * i);

        if (bytes.toString().length > bytes.toFixed(2).toString().length) {
            bytes = bytes.toFixed(2);
        }
        return bytes + ' ' + symbols[i];
    };




    static putCanvas(dt: Uint8Array, canvasWidth: number, canvasHeight: number): any {
        var canv: HTMLCanvas = new HTMLCanvas(true);
        canv.lock = true;
        canv.size(canvasWidth, canvasHeight);

        var ctx2d: CanvasRenderingContext2D = canv.getContext('2d') as unknown as CanvasRenderingContext2D;

        var imgData: any = ctx2d.createImageData(canvasWidth, canvasHeight);
        imgData.data.set(new Uint8ClampedArray(dt.buffer));
        ctx2d.putImageData(imgData, 0, 0);
        return canv;
    }


    /* will return a  Uint8Array type */
    static decodeArrayBuffer(input: string): ArrayBuffer {
        var bytes: number = (input.length / 4) * 3;
        var ab: ArrayBuffer = new ArrayBuffer(bytes);
        DBUtils.decode(input, ab);

        return ab;
    }

    static removePaddingChars(input: any): any {
        var lkey: any = DBUtils._keyStr.indexOf(input.charAt(input.length - 1));
        if (lkey == 64) {
            return input.substring(0, input.length - 1);
        }
        return input;
    }

    static decode(input: string, arrayBuffer: ArrayBuffer): Uint8Array {
        //get last chars to see if are valid
        input = DBUtils.removePaddingChars(input);
        input = DBUtils.removePaddingChars(input);

        var bytes: any = parseInt(<string><unknown>((input.length / 4) * 3), 10);

        var uarray: Uint8Array;
        var chr1: any, chr2: any, chr3: any;
        var enc1: any, enc2: any, enc3: any, enc4: any;
        var i: number = 0;
        var j: number = 0;

        if (arrayBuffer)
            uarray = new Uint8Array(arrayBuffer);
        else
            uarray = new Uint8Array(bytes);

        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        var keyStr: string = DBUtils._keyStr;
        for (i = 0; (i < bytes); i += 3) {
            //get the 3 octects in 4 ascii chars
            enc1 = keyStr.indexOf(input.charAt(j++));
            enc2 = keyStr.indexOf(input.charAt(j++));
            enc3 = keyStr.indexOf(input.charAt(j++));
            enc4 = keyStr.indexOf(input.charAt(j++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            uarray[i] = chr1;
            if (enc3 != 64) uarray[i + 1] = chr2;
            if (enc4 != 64) uarray[i + 2] = chr3;
        }

        return uarray;
    }



    static str2ab(str: string): ArrayBuffer {
        if (!str) return null;
        var buf: ArrayBuffer = new ArrayBuffer(str.length);
        var bufView: Uint8Array = new Uint8Array(buf);
        for (var i: number = 0, len: number = str.length; (i < len); i++) {
            bufView[i] = str.charCodeAt(i);
        }
        return buf;
    }

    static utf8ToAb(str: string): ArrayBuffer {
        const uint8array: Uint8Array = new TextEncoder().encode(str);
        return uint8array.buffer;
    }

    static utf8toAb0(str: string): ArrayBuffer {
        let byte = new Byte();
        byte.writeUTFBytes(str);
        return byte.buffer;
    }

    static abToUtf8(buffer: ArrayBuffer): string {

        let byte = new Byte(buffer);
        return byte.readUTFBytes();
    }

    static utf8toAb1(str: string): ArrayBuffer {
        //TODO
        return null;
    }


}
