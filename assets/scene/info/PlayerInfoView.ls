{
  "_$ver": 1,
  "_$id": "ss02jkp3",
  "_$runtime": "res://71f9611a-1170-43d9-b8b7-3e3bdefdd97e",
  "_$type": "Scene",
  "left": 0,
  "right": 0,
  "top": 0,
  "bottom": 0,
  "name": "Scene2D",
  "_$child": [
    {
      "_$id": "f5nhwgki",
      "_$var": true,
      "_$type": "Image",
      "name": "playerBg",
      "y": -100,
      "width": 750,
      "height": 620,
      "_mouseState": 2,
      "top": -100,
      "centerX": 0,
      "skin": "res://645f1e74-59c5-44b1-9a71-d1e9e1b73019",
      "color": "#ffffff"
    },
    {
      "_$id": "zsfhrurm",
      "_$var": true,
      "_$type": "Box",
      "name": "topBox",
      "width": 750,
      "height": 100,
      "visible": false,
      "mouseThrough": true,
      "left": 0,
      "right": 0,
      "top": 0,
      "bgColor": "rgba(23, 26, 31, 1)",
      "_$child": [
        {
          "_$id": "fs3r2her",
          "_$var": true,
          "_$type": "Label",
          "name": "otherName",
          "x": 275,
          "y": 25,
          "width": 200,
          "height": 50,
          "centerX": 0,
          "centerY": 0,
          "text": "-",
          "font": "SimHei",
          "fontSize": 34,
          "color": "#FFFFFF",
          "align": "center",
          "valign": "middle",
          "padding": "0,0,0,0"
        }
      ]
    },
    {
      "_$id": "kh2urg5r",
      "_$var": true,
      "_$type": "Panel",
      "name": "Panel",
      "y": 100,
      "width": 750,
      "height": 1368,
      "_mouseState": 2,
      "mouseThrough": true,
      "left": 0,
      "right": 0,
      "top": 100,
      "bottom": 0,
      "scrollType": 2,
      "_$comp": [
        {
          "_$type": "0c52dee2-8c13-4ad5-8609-849f85d2de9b",
          "scriptPath": "../src/core/logic/NestList.ts",
          "nestLists": [
            {
              "_$ref": "1e5ihx4r"
            }
          ],
          "direction": "Top"
        }
      ],
      "_$child": [
        {
          "_$id": "9mg5f5r9",
          "_$type": "Image",
          "name": "Image",
          "y": 287,
          "width": 750,
          "height": 1681,
          "mouseThrough": true,
          "left": 0,
          "right": 0,
          "top": 287,
          "bottom": -600,
          "skin": "res://859d5621-f22e-46f5-acd5-f566a6c7878d",
          "sizeGrid": "40,40,0,40,0",
          "color": "#ffffff"
        },
        {
          "_$id": "mkxzv8a7",
          "_$var": true,
          "_$type": "HBox",
          "name": "myBtnBox",
          "x": 65,
          "y": 520,
          "width": 620,
          "height": 100,
          "zOrder": 1,
          "_mouseState": 2,
          "top": 520,
          "centerX": 0,
          "space": 130,
          "align": "middle",
          "_$child": [
            {
              "_$id": "plj5b2af",
              "_$var": true,
              "_$type": "Box",
              "name": "message",
              "y": -10,
              "width": 120,
              "height": 120,
              "_mouseState": 2,
              "_$child": [
                {
                  "_$id": "04i1zlog",
                  "_$type": "Image",
                  "name": "icon",
                  "x": 18,
                  "y": -2,
                  "width": 84,
                  "height": 84,
                  "_mouseState": 2,
                  "centerX": 0,
                  "centerY": -20,
                  "skin": "res://73838012-73c1-45ad-b92b-70e0a3e8d4f1",
                  "useSourceSize": true,
                  "color": "#ffffff"
                },
                {
                  "_$id": "2s9e5qbp",
                  "_$type": "Label",
                  "name": "Label",
                  "y": 86,
                  "width": 120,
                  "height": 28,
                  "centerX": 0,
                  "centerY": 40,
                  "text": "消息",
                  "font": "SimHei",
                  "fontSize": 22,
                  "color": "rgba(128, 128, 128, 1)",
                  "align": "center",
                  "valign": "middle",
                  "padding": "0,0,0,0"
                },
                {
                  "_$id": "6gm8og7u",
                  "_$var": true,
                  "_$type": "Image",
                  "name": "messageTip",
                  "x": 86,
                  "width": 24,
                  "height": 24,
                  "visible": false,
                  "right": 10,
                  "top": 0,
                  "skin": "res://d2cb422b-6d12-45a6-a333-b957a9c9fbeb",
                  "sizeGrid": "5,5,5,5,0",
                  "color": "#ffffff"
                }
              ]
            },
            {
              "_$id": "k87y9qr5",
              "_$var": true,
              "_$type": "Box",
              "name": "editInfo",
              "x": 250,
              "y": -10,
              "width": 120,
              "height": 120,
              "_mouseState": 2,
              "_$child": [
                {
                  "_$id": "ul8qmkeb",
                  "_$type": "Image",
                  "name": "icon",
                  "x": 18,
                  "y": -2,
                  "width": 84,
                  "height": 84,
                  "centerX": 0,
                  "centerY": -20,
                  "skin": "res://165bb6b1-2f3e-4a0c-9e79-0b4754c28ade",
                  "useSourceSize": true,
                  "color": "#ffffff"
                },
                {
                  "_$id": "tph2wmf4",
                  "_$type": "Label",
                  "name": "Label",
                  "y": 86,
                  "width": 120,
                  "height": 28,
                  "centerX": 0,
                  "centerY": 40,
                  "text": "编辑",
                  "font": "SimHei",
                  "fontSize": 22,
                  "color": "rgba(128, 128, 128, 1)",
                  "align": "center",
                  "valign": "middle",
                  "padding": "0,0,0,0"
                }
              ]
            },
            {
              "_$id": "ve7lsnuh",
              "_$var": true,
              "_$type": "Box",
              "name": "setting",
              "x": 500,
              "y": -10,
              "width": 120,
              "height": 120,
              "_mouseState": 2,
              "_$child": [
                {
                  "_$id": "z4ggr9h7",
                  "_$type": "Image",
                  "name": "icon",
                  "x": 18,
                  "y": -2,
                  "width": 84,
                  "height": 84,
                  "_mouseState": 2,
                  "centerX": 0,
                  "centerY": -20,
                  "skin": "res://e2264a4c-7ca7-43c0-a5c9-85fdba5d50fd",
                  "useSourceSize": true,
                  "color": "#ffffff"
                },
                {
                  "_$id": "75btiyh7",
                  "_$type": "Label",
                  "name": "Label",
                  "y": 86,
                  "width": 120,
                  "height": 28,
                  "centerX": 0,
                  "centerY": 40,
                  "text": "设置",
                  "font": "SimHei",
                  "fontSize": 22,
                  "color": "rgba(128, 128, 128, 1)",
                  "align": "center",
                  "valign": "middle",
                  "padding": "0,0,0,0"
                }
              ]
            }
          ]
        },
        {
          "_$id": "gvk3k7oj",
          "_$var": true,
          "_$type": "HBox",
          "name": "otherBtnBox",
          "x": 60,
          "y": 520,
          "width": 630,
          "height": 100,
          "zOrder": 1,
          "_mouseState": 2,
          "left": 60,
          "right": 60,
          "top": 520,
          "space": 100,
          "align": "middle",
          "_$child": [
            {
              "_$id": "s823cwfu",
              "_$var": true,
              "_$type": "Button",
              "name": "followBtn",
              "y": 14,
              "width": 382,
              "height": 72,
              "_mouseState": 2,
              "left": 0,
              "centerY": 0,
              "stateNum": 1,
              "skin": "res://7a4e4262-e320-4a46-9b68-61615738a4ec",
              "sizeGrid": "20,30,20,20,0",
              "label": "关注",
              "labelFont": "SimHei",
              "labelSize": 28,
              "labelBold": true,
              "labelColors": "#ffffff,#ffffff,#ffffff"
            },
            {
              "_$id": "41h6ga0z",
              "_$var": true,
              "_$type": "Button",
              "name": "chatBtn",
              "x": 414,
              "y": 14,
              "width": 216,
              "height": 72,
              "_mouseState": 2,
              "right": 0,
              "centerY": 0,
              "stateNum": 1,
              "skin": "res://b053a107-c80c-40c4-b76d-c7c876d993ec",
              "sizeGrid": "20,30,20,20,0",
              "label": "发私信",
              "labelFont": "SimHei",
              "labelSize": 28,
              "labelBold": true,
              "labelColors": "#ffffff,#ffffff,#ffffff"
            }
          ]
        },
        {
          "_$id": "0j8d1dml",
          "_$var": true,
          "_$type": "Box",
          "name": "listBox",
          "y": 621,
          "width": 750,
          "height": 1367,
          "zOrder": 1,
          "_mouseState": 2,
          "top": 621,
          "bottom": -620,
          "_$child": [
            {
              "_$id": "1nk3024u",
              "_$type": "Box",
              "name": "tabBox",
              "width": 750,
              "height": 80,
              "left": 0,
              "right": 0,
              "top": 0,
              "_$child": [
                {
                  "_$id": "5e3c5ib2",
                  "_$var": true,
                  "_$type": "Label",
                  "name": "createSort",
                  "x": 38,
                  "y": 15,
                  "width": 200,
                  "height": 50,
                  "_mouseState": 2,
                  "centerY": 0,
                  "text": "创作",
                  "font": "SimHei",
                  "fontSize": 24,
                  "color": "rgba(153, 153, 153, 1)",
                  "align": "center",
                  "valign": "middle",
                  "padding": "0,0,0,0"
                },
                {
                  "_$id": "c1tnzklb",
                  "_$var": true,
                  "_$type": "Label",
                  "name": "historySort",
                  "x": 26,
                  "y": 15,
                  "width": 150,
                  "height": 50,
                  "_mouseState": 2,
                  "centerY": 0,
                  "text": "历史",
                  "font": "SimHei",
                  "fontSize": 24,
                  "color": "rgba(153, 153, 153, 1)",
                  "align": "center",
                  "valign": "middle",
                  "padding": "0,0,0,0"
                },
                {
                  "_$id": "xa6auzrc",
                  "_$var": true,
                  "_$type": "Label",
                  "name": "likeSort",
                  "x": 275,
                  "y": 15,
                  "width": 200,
                  "height": 50,
                  "_mouseState": 2,
                  "centerY": 0,
                  "text": "喜欢",
                  "font": "SimHei",
                  "fontSize": 24,
                  "color": "rgba(153, 153, 153, 1)",
                  "align": "center",
                  "valign": "middle",
                  "padding": "0,0,0,0",
                  "_$child": [
                    {
                      "_$id": "x1bqfz72",
                      "_$var": true,
                      "_$type": "Image",
                      "name": "likeLock",
                      "x": 132,
                      "y": 1,
                      "width": 48,
                      "height": 48,
                      "visible": false,
                      "right": 20,
                      "centerY": 0,
                      "skin": "res://5696927e-f530-43df-b9fe-5c2a0353fc09",
                      "useSourceSize": true,
                      "color": "#ffffff"
                    }
                  ]
                },
                {
                  "_$id": "gectk83d",
                  "_$var": true,
                  "_$type": "Label",
                  "name": "collectSort",
                  "x": 525,
                  "y": 15,
                  "width": 200,
                  "height": 50,
                  "_mouseState": 2,
                  "centerY": 0,
                  "text": "收藏",
                  "font": "SimHei",
                  "fontSize": 24,
                  "color": "rgba(153, 153, 153, 1)",
                  "align": "center",
                  "valign": "middle",
                  "padding": "0,0,0,0",
                  "_$child": [
                    {
                      "_$id": "n82o6rzb",
                      "_$var": true,
                      "_$type": "Image",
                      "name": "collectLock",
                      "x": 132,
                      "y": 1,
                      "width": 48,
                      "height": 48,
                      "visible": false,
                      "right": 20,
                      "centerY": 0,
                      "skin": "res://5696927e-f530-43df-b9fe-5c2a0353fc09",
                      "useSourceSize": true,
                      "color": "#ffffff"
                    }
                  ]
                },
                {
                  "_$id": "8h81mwsf",
                  "_$type": "Image",
                  "name": "Image",
                  "x": 32,
                  "y": 76,
                  "width": 686,
                  "height": 2,
                  "left": 32,
                  "right": 32,
                  "bottom": 2,
                  "skin": "res://aa64395f-9919-4479-86dc-3462d852ad35",
                  "color": "#ffffff"
                },
                {
                  "_$id": "nupd62u3",
                  "_$var": true,
                  "_$type": "Image",
                  "name": "selectTab",
                  "x": 30,
                  "y": 78,
                  "width": 166,
                  "height": 4,
                  "anchorY": 1,
                  "bottom": 2,
                  "skin": "res://cb4c8543-174d-492f-a463-68852ca3e983",
                  "color": "#ffffff"
                }
              ]
            },
            {
              "_$id": "1e5ihx4r",
              "_$var": true,
              "_$type": "List",
              "name": "gameList",
              "x": 32,
              "y": 100,
              "width": 686,
              "height": 1267,
              "visible": false,
              "_mouseState": 2,
              "mouseThrough": true,
              "hitTestPrior": true,
              "left": 32,
              "right": 32,
              "top": 100,
              "bottom": 0,
              "itemTemplate": {
                "_$ref": "581hnwdh",
                "_$tmpl": "itemRender"
              },
              "repeatX": 3,
              "repeatY": 10,
              "elasticEnabled": true,
              "spaceX": 16,
              "spaceY": 16,
              "scrollType": 2,
              "_$comp": [
                {
                  "_$type": "9aa8e3ac-f8d8-47eb-8c32-0c3e44fdf023",
                  "scriptPath": "../src/core/logic/MultiListRefresh.ts",
                  "listTopLimit": -65,
                  "listBottomLimit": 65
                }
              ],
              "_$child": [
                {
                  "_$id": "581hnwdh",
                  "_$prefab": "0d53ea82-3faf-4a32-91ad-2cdbf37d5b1f",
                  "name": "gameItem",
                  "active": true,
                  "x": 0,
                  "y": 0
                }
              ]
            }
          ]
        },
        {
          "_$id": "r5j5qhq5",
          "_$var": true,
          "_$type": "Box",
          "name": "tips",
          "y": 700,
          "width": 750,
          "height": 400,
          "top": 700,
          "centerX": 0,
          "_$child": [
            {
              "_$id": "6wf8xcym",
              "_$var": true,
              "_$type": "Image",
              "name": "tipsIcon",
              "x": 303,
              "y": 128,
              "width": 144,
              "height": 144,
              "centerX": 0,
              "centerY": 0,
              "skin": "res://2754e66c-4c05-4e27-9df1-f47455949cd3",
              "useSourceSize": true,
              "color": "#ffffff"
            },
            {
              "_$id": "c7j2ecj2",
              "_$var": true,
              "_$type": "Label",
              "name": "tipsTxt",
              "y": 372,
              "width": 750,
              "height": 28,
              "left": 0,
              "right": 0,
              "bottom": 0,
              "text": "暂无数据",
              "font": "SimHei",
              "fontSize": 30,
              "color": "rgba(132, 132, 132, 1)",
              "align": "center",
              "valign": "middle",
              "padding": "0,0,0,0"
            }
          ]
        },
        {
          "_$id": "9flql3f0",
          "_$var": true,
          "_$type": "Box",
          "name": "infoBox",
          "width": 750,
          "height": 500,
          "zOrder": 1,
          "_mouseState": 2,
          "left": 0,
          "right": 0,
          "top": 0,
          "_$child": [
            {
              "_$id": "jnivxetr",
              "_$prefab": "2b2bf7b0-babc-40cd-9e91-27a5bfd58c51",
              "_$var": true,
              "name": "head",
              "active": true,
              "x": 50,
              "y": 220,
              "visible": true,
              "left": 50,
              "bottom": 120,
              "width": 160,
              "height": 160
            },
            {
              "_$id": "6sxg9rsp",
              "_$var": true,
              "_$type": "Label",
              "name": "nickName",
              "x": 50,
              "y": 398,
              "width": 597,
              "height": 32,
              "left": 50,
              "bottom": 70,
              "text": "玩家昵称",
              "font": "SimHei",
              "fontSize": 30,
              "color": "#FFFFFF",
              "bold": true,
              "valign": "middle",
              "overflow": "ellipsis",
              "padding": "0,0,0,0"
            },
            {
              "_$id": "buch0p9z",
              "_$var": true,
              "_$type": "Label",
              "name": "slogan",
              "x": 50,
              "y": 441,
              "width": 584,
              "height": 59,
              "left": 50,
              "bottom": 0,
              "text": "玩家的描述信息玩家的描述信息玩家的描述信息玩家的描述信息玩家的描述信息玩家的描述信息玩家的描述信息玩家的描述信息玩家的描述信息玩家的描述信息玩家的描述信息玩家的描述信息",
              "font": "SimHei",
              "fontSize": 20,
              "color": "#FFFFFF",
              "underline": true,
              "overflow": "ellipsis",
              "wordWrap": true,
              "padding": "0,0,0,0"
            },
            {
              "_$id": "0h7jxg17",
              "_$type": "HBox",
              "name": "socail",
              "x": 303,
              "y": 290,
              "width": 427,
              "height": 90,
              "_mouseState": 2,
              "right": 20,
              "bottom": 120,
              "space": 50,
              "align": "center",
              "_$child": [
                {
                  "_$id": "37ug52g9",
                  "_$var": true,
                  "_$type": "Box",
                  "name": "follow",
                  "width": 100,
                  "height": 100,
                  "_mouseState": 2,
                  "_$child": [
                    {
                      "_$id": "jda8tue4",
                      "_$type": "Label",
                      "name": "num",
                      "x": 18,
                      "y": 10,
                      "width": 64,
                      "height": 40,
                      "_mouseState": 2,
                      "centerX": 0,
                      "centerY": -20,
                      "text": "2.8K",
                      "font": "SimHei",
                      "fontSize": 32,
                      "color": "#ffffff",
                      "bold": true,
                      "align": "center",
                      "valign": "middle",
                      "padding": "0,0,0,0"
                    },
                    {
                      "_$id": "czzwt4af",
                      "_$type": "Label",
                      "name": "add",
                      "x": 60,
                      "width": 64,
                      "height": 40,
                      "visible": false,
                      "_mouseState": 2,
                      "left": 60,
                      "centerY": -30,
                      "text": "+124",
                      "font": "SimHei",
                      "fontSize": 20,
                      "color": "rgba(252, 220, 42, 1)",
                      "bold": true,
                      "valign": "middle",
                      "padding": "0,0,0,0"
                    },
                    {
                      "_$id": "3sd4qipw",
                      "_$type": "Label",
                      "name": "Label",
                      "x": -10,
                      "y": 56,
                      "width": 120,
                      "height": 28,
                      "centerX": 0,
                      "centerY": 20,
                      "text": "关注",
                      "font": "SimHei",
                      "fontSize": 22,
                      "color": "rgba(255, 255, 255, 0.4)",
                      "align": "center",
                      "valign": "middle",
                      "padding": "0,0,0,0"
                    }
                  ]
                },
                {
                  "_$id": "yo5gm371",
                  "_$var": true,
                  "_$type": "Box",
                  "name": "fan",
                  "x": 150,
                  "width": 100,
                  "height": 100,
                  "_mouseState": 2,
                  "_$child": [
                    {
                      "_$id": "ms4fjo9z",
                      "_$type": "Label",
                      "name": "num",
                      "x": 18,
                      "y": 10,
                      "width": 64,
                      "height": 40,
                      "_mouseState": 2,
                      "centerX": 0,
                      "centerY": -20,
                      "text": "2.8K",
                      "font": "SimHei",
                      "fontSize": 32,
                      "color": "#ffffff",
                      "bold": true,
                      "align": "center",
                      "valign": "middle",
                      "padding": "0,0,0,0"
                    },
                    {
                      "_$id": "3jbxjjny",
                      "_$type": "Label",
                      "name": "add",
                      "x": 60,
                      "width": 64,
                      "height": 40,
                      "visible": false,
                      "_mouseState": 2,
                      "left": 60,
                      "centerY": -30,
                      "text": "+124",
                      "font": "SimHei",
                      "fontSize": 20,
                      "color": "rgba(252, 220, 42, 1)",
                      "bold": true,
                      "valign": "middle",
                      "padding": "0,0,0,0"
                    },
                    {
                      "_$id": "4aojar6f",
                      "_$type": "Label",
                      "name": "Label",
                      "x": -10,
                      "y": 56,
                      "width": 120,
                      "height": 28,
                      "centerX": 0,
                      "centerY": 20,
                      "text": "粉丝",
                      "font": "SimHei",
                      "fontSize": 22,
                      "color": "rgba(255, 255, 255, 0.4)",
                      "align": "center",
                      "valign": "middle",
                      "padding": "0,0,0,0"
                    }
                  ]
                },
                {
                  "_$id": "jmavblvh",
                  "_$var": true,
                  "_$type": "Box",
                  "name": "praise",
                  "x": 300,
                  "width": 100,
                  "height": 100,
                  "_mouseState": 2,
                  "_$child": [
                    {
                      "_$id": "c74yc87f",
                      "_$type": "Label",
                      "name": "num",
                      "x": 18,
                      "y": 10,
                      "width": 64,
                      "height": 40,
                      "_mouseState": 2,
                      "centerX": 0,
                      "centerY": -20,
                      "text": "2.8K",
                      "font": "SimHei",
                      "fontSize": 32,
                      "color": "#ffffff",
                      "bold": true,
                      "align": "center",
                      "valign": "middle",
                      "padding": "0,0,0,0"
                    },
                    {
                      "_$id": "j0ltv7t1",
                      "_$type": "Label",
                      "name": "add",
                      "x": 60,
                      "width": 64,
                      "height": 40,
                      "visible": false,
                      "_mouseState": 2,
                      "left": 60,
                      "centerY": -30,
                      "text": "+124",
                      "font": "SimHei",
                      "fontSize": 20,
                      "color": "rgba(252, 220, 42, 1)",
                      "bold": true,
                      "valign": "middle",
                      "padding": "0,0,0,0"
                    },
                    {
                      "_$id": "mvd05esr",
                      "_$type": "Label",
                      "name": "Label",
                      "x": -10,
                      "y": 56,
                      "width": 120,
                      "height": 28,
                      "centerX": 0,
                      "centerY": 20,
                      "text": "获赞",
                      "font": "SimHei",
                      "fontSize": 22,
                      "color": "rgba(255, 255, 255, 0.4)",
                      "align": "center",
                      "valign": "middle",
                      "padding": "0,0,0,0"
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "_$id": "y6t2cyl1",
      "_$var": true,
      "_$type": "Box",
      "name": "backBox",
      "width": 750,
      "height": 100,
      "visible": false,
      "left": 0,
      "right": 0,
      "top": 0,
      "_$comp": [
        {
          "_$type": "7d1869da-8c5a-43de-a676-87d6973c547e",
          "scriptPath": "../src/core/logic/FringeAdapter.ts",
          "topAdpter": true,
          "heightAdpter": false,
          "iphoneXBottomAdpter": false,
          "iphoneXHeightAdpter": false,
          "refertooltop": null,
          "refertoolbottom": null,
          "onlyMoveDown": false,
          "leftAdpter": false,
          "rightAdpter": false
        }
      ],
      "_$child": [
        {
          "_$id": "216n9g27",
          "_$var": true,
          "_$type": "Image",
          "name": "backBtn",
          "x": 20,
          "y": 20,
          "width": 64,
          "height": 64,
          "_mouseState": 2,
          "left": 20,
          "top": 20,
          "skin": "res://16e17a44-cfd6-4e3d-b00c-6f1f2dd2c32d",
          "useSourceSize": true,
          "color": "#ffffff"
        }
      ]
    }
  ]
}