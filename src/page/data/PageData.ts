/**
* @brief: 界面数据
* @ author: gongganghao
* @ data: 2023-11-06 17:25
*/
export  enum PagePath {
    InfoPage = "scene/info/PlayerInfoView.ls",
    SettingPage = "scene/info/PlayerSettingView.ls",
    EditInterestmPage = "scene/info/EditInterestView.ls",
    EditInfoPage = "scene/info/EditInfoView.ls",
    EditIconPage = "scene/info/EditIconView.ls",
    AboutPage = "scene/info/AboutView.ls",
    PreviewIconPage = "scene/info/PreviewIconView.ls",
    SocailPage = "scene/info/SocailView.ls",
    ListChoosePage = "scene/home/ListChooseView.ls",
    RankPage = "scene/home/RankView.ls",
    RankRulePage = "scene/home/RankRuleView.ls",
    TagChoosePage = "scene/edit/TagChooseView.ls",
    EditPage = "scene/edit/GameEditView.ls",
    DescPage = "scene/edit/DescView.ls",
    MusicPage = "scene/edit/MusicView.ls",
    EditModePage = "scene/edit/EditModeView.ls",
    EditSourcePage = "scene/edit/EditSourceView.ls",
    EditMusicPage = "scene/edit/EditMusicView.ls",
    PublishPage = "scene/edit/PublishView.ls",
    HomePage = "scene/home/HomeView.ls",
    GamePage = "scene/game/GamePlayerView.ls",
    GameEndPage = "scene/game/GameEndView.ls",
    ResurgencePage = "scene/game/ResurgenceView.ls",
    SubjectPage = "scene/game/SubjectPlayView.ls",
    SearchPage = "scene/home/SearchView.ls",
    MessagePage = "scene/message/MessageView.ls",
    ChatPage = "scene/message/ChatView.ls",
    ConfirmPage = "scene/home/ConfirmView.ls",
    PraisePage = "scene/home/PraiseView.ls",
    ListSelectPage = "scene/home/ListSelectView.ls",
    TipPage = "scene/home/TipView.ls",
    GameCommentPage = "scene/home/GameCommentView.ls"
}


export  type PageData = {
    path:PagePath,
    data?:any,
    parent?:Laya.Node,
    closeOther:boolean,
    name?:string,
    tweenData?:TweenData
}

export enum TweenType{
    Top = "Top",
    Bottom = "Bottom",
    Left = "Left",
    Right = "Right",
    Center = "Center"
}

export type TweenData = {
    type : TweenType,
    offsetX?: number,
    offsetY?: number,
}