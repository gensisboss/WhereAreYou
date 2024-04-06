import { LangUtils } from "./LangUtils";

/**
 * ...
 * @author ww
 */
export class TxtUtils {

    constructor() {

    }

    /**
     * 获取格式化的数字
     * @param	num
     * @return
     */
    static getDisplayNum(num: number): string {
        if (typeof (num) == 'string') num = parseInt(num);
        if ((num < 1000)) return num + "";
        if ((num < 10000)) return (num%10 == 0) ?(num / 1000) + "k" : (num / 1000).toFixed(3)  + "k";
        return (num%10 == 0) ? (num / 10000) + "w" : (Math.floor(num / 10000)).toFixed(2)  + "w";
    }


    static getFixed(num: number, fix: number = 1): string {
        var str: string;
        str = num + "";
        var tP: number = 0;
        tP = str.indexOf(".");
        if ((tP < 0)) return str;
        return str.substr(0, tP) + "." + str.substr(tP + 1, fix);
    }

    /**
     * 获取格式化的数字
     * @param	num
     * @return
     */
    static getDisplayNumFix(num: number, fix: number = 1): string {
        if ((num < 1000)) return num + "";
        if ((num < 10000)) return TxtUtils.getFixed(num / 1000, fix) + "k";
        if ((num < 1000000)) return TxtUtils.getFixed(num / 10000, fix) + "w";
        if ((num < 1000000000)) return TxtUtils.getFixed(num / 1000000, fix) + "m";
        if ((num < 1000000000)) return TxtUtils.getFixed(num / 1000000000, fix) + "b";
        return TxtUtils.getFixed(num / 1000000000) + "t";
    }

    /**
     * 中文版数字
     * @param	num
     * @return
     */
    static getDisplayNumCN(num: number): string {
        if ((num < 10000)) return num + "";
        if ((num < 100000000)) return Math.floor(num / 10000) + "万";
        return Math.floor(num / 100000000) + "亿";
        //if (num < 100000000) return (num / 10000).toFixed(0) + "万";
        //return (num / 100000000).toFixed(0) + "亿";
    }

    static getTimeStamp(date: string): number {
        return Math.floor(Date.parse(date.replace(/-/g, '/')) / 1000);
        //return Math.floor((Date.parse(new Date(date))||Date.parse(new Date(date)))/1000);
    }

    // 获取当前时间戳
    static getTimeStampCurrent(isSecond: boolean = true): number {
        if (isSecond) {
            return new Date().getTime() / 1000;
        }

        return new Date().getTime();
    }

    // 获取当天零点的时间戳
    static getTimeStampTodayZero(isSecond: boolean = true): number {
        if (isSecond) {
            return (new Date(new Date().toLocaleDateString()).getTime()) / 1000;
        }

        return new Date(new Date().toLocaleDateString()).getTime()
    }

    static formatTime(time: number, showToday: boolean = true): string {
        var tDate: Date = new Date();
        var today: number = Math.floor(tDate.getTime() / 86400);
        var day: number = Math.floor(time / 86400);
        if (today == day && showToday) {
            return LangUtils.lang('今天');
        } else {
            var date: Date = new Date(time);
            if (date.getFullYear() != tDate.getFullYear()) {
                return LangUtils.lang("{0}年{1}月{2}日", date.getFullYear(), date.getMonth() + 1, date.getDate());
            } else {
                return LangUtils.lang("{0}月{1}日", date.getMonth() + 1, date.getDate());
            }
        }
    }

    static formatTimeToNumber(time: number, showYear: boolean = true): string {
        var date: Date = new Date(time);
        var str: string = '';
        if (showYear) {
            str += date.getFullYear() + '.';
        }
        var m: number = date.getMonth() + 1
        if ((m < 10))
            str += '0' + m;
        else
            str += m;
        var d: number = date.getDate();
        if ((d < 10))
            str += '.0' + d;
        else
            str += '.' + d;
        return str;
    }

    /**
     * 获取过去的时间
     * @param	timeStr
     * @return
     */
    static getPastTimeStr(timeStr: any): string {
        if (!timeStr) return "未知";

        var date: Date;
        date = new Date(timeStr);
        var dTime: number;
        dTime = Math.floor((Laya.Browser.now() - date.getTime()) / 1000);
        if ((dTime <= 0)) dTime = 1;
        var str: string;
        str = TxtUtils.getTimeDeltaStr(dTime);
        if ((str.indexOf(LangUtils.lang("月")) < 0)) {
            return str + LangUtils.lang( "前");
        }
        var now: Date;
        now = new Date();
        var dYear: number
        var dMonth: number;
        dYear = now.getFullYear() - date.getFullYear();
        //trace("date:",now,date);
        //trace("dYear:",now.getFullYear(),date.getFullYear());
        //trace("aaaa:"+new Date(1542074368514).toString());
        dMonth = dYear * 12 + now.getMonth() - date.getMonth();
        if ((dMonth < 12)) {
            return dMonth  + LangUtils.lang("月前");
        }
        return dYear  + LangUtils.lang("年前");

    }

     /**
     * 获取过去的时间带空格
     * @param	timeStr
     * @return
     */
     static getPastTimeStrWithSpace(timeStr: any): string {
        if (!timeStr) return " 未知";

        var date: Date;
        date = new Date(timeStr);
        var dTime: number;
        dTime = Math.floor((Laya.Browser.now() - date.getTime()) / 1000);
        if ((dTime <= 0)) dTime = 1;
        var str: string;
        str = TxtUtils.getTimeDeltaStr(dTime);
        if ((str.indexOf(LangUtils.lang("月")) < 0)) {
            if ((dTime < 60)) return dTime + " " + LangUtils.lang("秒前");
            dTime = Math.floor(dTime / 60);
            if ((dTime < 60)) return dTime  + " " + LangUtils.lang("分前");
            dTime = Math.floor(dTime / 60);
            if ((dTime < 24)) return dTime   + " " + LangUtils.lang("小时前");
            dTime = Math.floor(dTime / 24);
            if ((dTime < 7)) return dTime  + " " + LangUtils.lang("天前");
            dTime = Math.floor(dTime / 7);
            if ((dTime < 4)) return dTime  + " " + LangUtils.lang("星期前");
        }
        var now: Date;
        now = new Date();
        var dYear: number
        var dMonth: number;
        dYear = now.getFullYear() - date.getFullYear();
        //trace("date:",now,date);
        //trace("dYear:",now.getFullYear(),date.getFullYear());
        //trace("aaaa:"+new Date(1542074368514).toString());
        dMonth = dYear * 12 + now.getMonth() - date.getMonth();
        if ((dMonth < 12)) {
            return dMonth + " " + LangUtils.lang("月前");
        }
        return dYear + " " + LangUtils.lang("年前");

    }

    /**
     * 获取相差时间字符串
     * @param	dTime
     * @return
     */
    static getTimeDeltaStr(dTime: number): string {
        if ((dTime < 60)) return dTime + LangUtils.lang("秒");
        dTime = Math.floor(dTime / 60);
        if ((dTime < 60)) return dTime  + LangUtils.lang("分钟");
        dTime = Math.floor(dTime / 60);
        if ((dTime < 24)) return dTime   + LangUtils.lang("小时");
        dTime = Math.floor(dTime / 24);
        if ((dTime < 7)) return dTime   + LangUtils.lang("天");
        dTime = Math.floor(dTime / 7);
        if ((dTime < 4)) return dTime  + LangUtils.lang("星期");
        dTime = Math.floor(dTime / 4);
        return dTime  + LangUtils.lang("月");
    }

    static getTimeDeltaStr2(dTime: number, rate: number = 1000): string {
        dTime = Math.round(dTime / rate);
        var s: number = 0;
        s = dTime % 60;
        var m: number = 0;
        m = Math.floor(dTime / 60);
        var rst: string;
        rst = LangUtils.lang("{0}分{1}秒", m, s);

        return rst;
    }

    /**
     * 返回2格时间戳的间隔
     * @param s1 大的时间戳
     * @param s2 小的时间戳
     * @returns 
     */
    static getRemainderTime(s1: number, s2: number): string {
        if (s1 < s2) {
            console.error("getRemainderTime: 参数错误");
            return "参数错误";
        }

        var runTime = (s1 - s2);
        var year = Math.floor(runTime / 86400 / 365);
        runTime = runTime % (86400 * 365);
        var month = Math.floor(runTime / 86400 / 30);
        runTime = runTime % (86400 * 30);
        var day = Math.floor(runTime / 86400);
        runTime = runTime % 86400;
        var hour = Math.floor(runTime / 3600);
        runTime = runTime % 3600;
        var minute = Math.floor(runTime / 60);
        runTime = runTime % 60;
        var second = runTime;

        var ret = "";
        if (year > 0) {
            ret += Math.floor(year) + LangUtils.lang('年|&id=001');
        }
        if (month > 0) {
            ret += Math.floor(month) + LangUtils.lang('月|&id=001');
        }
        if (day > 0) {
            ret += Math.floor(day) + LangUtils.lang('天|&id=001');
        }
        if (hour > 0) {
            ret += Math.floor(hour) + LangUtils.lang('时|&id=001');
        }
        if (minute > 0) {
            ret += Math.floor(minute) + LangUtils.lang('分|&id=001');
        }
        if (second > 0) {
            ret += Math.floor(second) + LangUtils.lang('秒|&id=001');
        }

        return ret;
    }

    static getDateStr(time: any, format: string = "yyyy-MM-dd HH:mm:ss", rate: number = 1000): string {
        if (typeof (time) == 'string') time = parseInt(time) || 0;
        time *= rate;
        //@ts-ignore
        return new Date(time).Format(format);
    }

    static formattingTimer(t: number, hasHour: boolean = true): string {
        var hours: number = t / 1000 / 60 / 60;
        var hoursRound: number = Math.floor(hours);
        var minutes: number = t / 1000 / 60 - (60 * hoursRound);
        var minutesRound: number = Math.floor(minutes);
        var seconds: number = t / 1000 - (60 * 60 * hoursRound) - (60 * minutesRound);
        var secondsRound: number = Math.floor(seconds);

        var str: string = '0' + hoursRound + ':';
        if (!hasHour) {
            minutesRound = Math.floor(t / 1000 / 60);
            str = "";
        }
        if ((minutesRound < 10))
            str += '0' + minutesRound;
        else
            str += '' + minutesRound;
        str += ':';

        if ((secondsRound < 10))
            str += '0' + secondsRound;
        else
            str += '' + secondsRound;

        return str;
    }

    static formattingTimer2(value: number, hasHaomiao: boolean = true): string {
        var result: string = '';
        var hao: number;
        hao = (value / 60000) >> 0;
        if ((hao < 10)) {
            result += '0' + hao;
        }
        else {
            result += hao;
        }
        result += ':';
        hao = ((value / 1000) >> 0) % 60;
        if ((hao < 10)) {
            result += '0' + hao;
        }
        else {
            result += hao;
        }
        if (!hasHaomiao) return result;
        result += ':';
        hao = ((value % 1000) / 10) >> 0;
        if ((hao < 10)) {
            result += '0' + hao;
        }
        else {
            result += hao;
        }
        return result;
    }

   

    /**
     * @param str
     * @param len 字母数量长度（汉字相对于2两个字母）
     * @return 
     * 
     */
    static beautySub(str: string, len: number): string {
        if(!str) return "";
        // var reg:RegExp = /[\u4e00-\u9fa5]/;    //专业匹配中文
        var strlen: number = str.length;
        var nowlen: number = 0;
        for (var i: number = 0; i < strlen; i++) {
            var chat: number = str.charCodeAt(i);
            if ((chat >= 128)) {
                nowlen += 2;
            }
            else {
                nowlen++;
            }
            if ((nowlen > len)) {
                break;
            }
        }
        return (i < strlen) ? str.slice(0, i) + '...' : str;
    }

    static getchatnum(str: string) {
        var strlen: number = str.length;
        var nowlen: number = 0;
        for (var i: number = 0; (i < strlen); i++) {
            var chat: number = str.charCodeAt(i);
            if ((chat >= 128)) {
                nowlen += 2;
            }
            else {
                nowlen++;
            }
        }
        return nowlen;
    }

    /**
     * 生成指定范围的随机数
     * @param {*} minNum 最小值
     * @param {*} maxNum 最大值
     */
    static getRandRange(minNum: number, maxNum: number): number {
        return (Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum);
    }

    /**
     * 获取字符个数，中文算两个字符
     * @param	str
     * @return
     */
    static getCharCount(str: string): number {
        if (!str || !str.length) return 0;
        var reg: any = /[\u4e00-\u9fa5]/g;    //专业匹配中文

        var matchs: any[];
        var chineseCharNum: number = 0;
        matchs = str.match(reg)
        if (matchs) {
            chineseCharNum = matchs.length;
        }
        return str.length + chineseCharNum;
    }
  

    static str2ArrayBuffer(str: string): ArrayBuffer {
        var buf: ArrayBuffer = new ArrayBuffer(str.length * 2);
        var dataView: Uint16Array = new Uint16Array(buf);
        var i: number = 0, len: number = 0;
        len = str.length;
        for (i = 0; (i < len); i++) {
            dataView[i] = str.charCodeAt(i);
        }
        return buf;
    }

 
}


