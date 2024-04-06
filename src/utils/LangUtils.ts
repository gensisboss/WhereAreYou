
export class LangUtils {
    public static language: string = '';
    public static defaultLanguage: string = 'zh';
    public static languageAdaptLib: string[] = ['zh'];
    public static enLanguagePath = "resources/data/lang.json";

    static initLanguage(lang: string = LangUtils.defaultLanguage, complete?: Laya.Handler): void {
        if (lang != LangUtils.defaultLanguage) {
            LangUtils.language = lang;
        } else {
            LangUtils.language = '';
            Laya.Text.langPacks = null;
        }

        Laya.loader.load([
            { url: LangUtils.enLanguagePath, type: Laya.Loader.JSON },
        ], Laya.Handler.create(null, LangUtils.onLangLoaded, [complete]));
    }


    private static onLangLoaded(complete: Laya.Handler): void {
        let langpack: Laya.TextResource = Laya.loader.getRes(LangUtils.enLanguagePath);
        if (langpack) {
            Laya.Text.langPacks = langpack.data;
        }
        if (complete) {
            complete.run();
        }
    }

    static langPack: any;
    static lang(body: string, ...args: any): string {
        if (!body) return '';
        let exstr: string = LangUtils.getLangParaStr(body);

        var i: number = 0, len: number = 0;
        len = args.length;
        if (LangUtils.langPack && LangUtils.langPack[body]) {

            body = LangUtils.langPack[body];
        }
        for (i = 0; (i < len); i++) {
            body = body.replace("{" + i + "}", args[i]);
        }
        if (exstr) {
            body = body.replace(exstr, "");
        }
        return body;
    }


    /**
    * 语言包|&参数提取Str
    */
    static getLangParaStr(text: string): string {
        let exindex = text.indexOf("|&")
        if (exindex > 0) {
            text = text.substr(exindex);
            return text
        }
        return null
    }





}