{
  "_$ver": 1,
  "_$id": "ss02jkp3",
  "_$runtime": "res://953a7d47-e1d4-4e9e-abbb-8428acfcb530",
  "_$type": "Scene",
  "left": 0,
  "right": 0,
  "top": 0,
  "bottom": 0,
  "name": "Scene2D",
  "autoDestroyAtClosed": true,
  "_$comp": [
    {
      "_$type": "2c062f61-fa69-49f2-8a12-68537201c3b8",
      "scriptPath": "../src/core/logic/DragDialog.ts",
      "maskBox": {
        "_$ref": "csz6tbb6"
      },
      "tweenType": "Bottom",
      "tweenTime": 300,
      "dragBox": {
        "_$ref": "36n2x946"
      },
      "dragImage": null,
      "auto": false,
      "delay": true
    }
  ],
  "_$child": [
    {
      "_$id": "36n2x946",
      "_$var": true,
      "_$type": "Box",
      "name": "dragBox",
      "width": 750,
      "height": 1468,
      "_mouseState": 2,
      "bgColor": "rgba(23, 26, 31, 1)",
      "_$child": [
        {
          "_$id": "csz6tbb6",
          "_$var": true,
          "_$type": "Box",
          "name": "topBox",
          "width": 750,
          "height": 100,
          "zOrder": 2,
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
              "_$id": "w57mofu6",
              "_$var": true,
              "_$type": "Image",
              "name": "backBtn",
              "x": 20,
              "y": 20,
              "width": 64,
              "height": 64,
              "left": 20,
              "top": 20,
              "skin": "res://8585de3f-e3de-41b4-8797-a978497cdf6e",
              "color": "#ffffff"
            },
            {
              "_$id": "fwbk3bus",
              "_$type": "Label",
              "name": "title",
              "x": 260,
              "y": 30,
              "width": 231,
              "height": 40,
              "centerX": 0,
              "centerY": 0,
              "text": "生成图片",
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
          "_$id": "0j8d1dml",
          "_$type": "Box",
          "name": "middleBox",
          "y": 100,
          "width": 750,
          "height": 1368,
          "_mouseState": 2,
          "top": 100,
          "bottom": 0,
          "_$child": [
            {
              "_$id": "4ct75ebc",
              "_$type": "Box",
              "name": "descBox",
              "x": 32,
              "y": 50,
              "width": 686,
              "height": 340,
              "_mouseState": 2,
              "left": 32,
              "right": 32,
              "top": 50,
              "_$child": [
                {
                  "_$id": "raestl6w",
                  "_$type": "Label",
                  "name": "Label",
                  "x": 28,
                  "y": 20,
                  "width": 96,
                  "height": 25,
                  "left": 28,
                  "top": 20,
                  "text": "图片描述",
                  "font": "SimHei",
                  "fontSize": 24,
                  "color": "#FFFFFF",
                  "fitContent": "yes",
                  "padding": "0,0,0,0"
                },
                {
                  "_$id": "mekw047x",
                  "_$var": true,
                  "_$type": "TextInput",
                  "name": "descnput",
                  "y": 70,
                  "width": 686,
                  "height": 250,
                  "_mouseState": 2,
                  "left": 0,
                  "right": 0,
                  "top": 70,
                  "bottom": 20,
                  "text": "",
                  "font": "SimHei",
                  "fontSize": 24,
                  "color": "#FFFFFF",
                  "valign": "middle",
                  "overflow": "scroll",
                  "wordWrap": true,
                  "padding": "20,20,20,20",
                  "skin": "res://8b43682c-5d43-4622-aabc-aa621f15f2f8",
                  "sizeGrid": "20,20,20,20,0",
                  "maxChars": 500,
                  "prompt": "请输入图片描述",
                  "promptColor": "#A9A9A9",
                  "multiline": true,
                  "_$child": [
                    {
                      "_$id": "c4y5erax",
                      "_$var": true,
                      "_$type": "Label",
                      "name": "descNum",
                      "x": 604,
                      "y": 190,
                      "width": 72,
                      "height": 50,
                      "right": 10,
                      "bottom": 10,
                      "text": "0/10",
                      "font": "SimHei",
                      "fontSize": 22,
                      "color": "rgba(153, 153, 153, 1)",
                      "align": "center",
                      "valign": "middle",
                      "padding": "0,0,0,0"
                    }
                  ]
                }
              ]
            },
            {
              "_$id": "iwcjy57a",
              "_$type": "Box",
              "name": "Box",
              "x": 32,
              "y": 400,
              "width": 686,
              "height": 680,
              "_mouseState": 2,
              "left": 32,
              "right": 32,
              "top": 400,
              "_$child": [
                {
                  "_$id": "a7mp2zm7",
                  "_$type": "Label",
                  "name": "Label",
                  "x": 28,
                  "y": 20,
                  "width": 140,
                  "height": 29,
                  "left": 28,
                  "top": 20,
                  "text": "上传参考图",
                  "font": "SimHei",
                  "fontSize": 28,
                  "color": "#FFFFFF",
                  "fitContent": "yes",
                  "padding": "0,0,0,0"
                },
                {
                  "_$id": "81qgbnut",
                  "_$var": true,
                  "_$type": "Image",
                  "name": "bg",
                  "y": 70,
                  "width": 686,
                  "height": 310,
                  "_mouseState": 2,
                  "left": 0,
                  "right": 0,
                  "top": 70,
                  "bottom": 300,
                  "skin": "res://8b43682c-5d43-4622-aabc-aa621f15f2f8",
                  "sizeGrid": "20,20,20,20,0",
                  "color": "#ffffff",
                  "_$child": [
                    {
                      "_$id": "uck0xcz8",
                      "_$var": true,
                      "_$type": "Image",
                      "name": "loadIcon",
                      "x": 20,
                      "y": 80,
                      "width": 204,
                      "height": 204,
                      "visible": false,
                      "mask": {
                        "_$ref": "s1wojsny"
                      },
                      "left": 20,
                      "top": 80,
                      "color": "#ffffff",
                      "_$child": [
                        {
                          "_$id": "s1wojsny",
                          "_$type": "Sprite",
                          "name": "Sprite",
                          "width": 204,
                          "height": 204,
                          "texture": {
                            "_$uuid": "73aa5eb6-1d92-436e-9db6-aa3b2561c98b",
                            "_$type": "Texture"
                          },
                          "_gcmds": [
                            {
                              "_$type": "DrawRoundRectCmd",
                              "x": 0,
                              "y": 0,
                              "width": 1,
                              "height": 1,
                              "lt": 20,
                              "rt": 20,
                              "lb": 20,
                              "rb": 20,
                              "percent": true,
                              "lineWidth": 1,
                              "lineColor": "#000000",
                              "fillColor": "#FFFFFF"
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "_$id": "bp4o3wna",
                      "_$type": "Label",
                      "name": "tip",
                      "x": 20,
                      "y": 20,
                      "width": 482,
                      "height": 28,
                      "left": 20,
                      "top": 20,
                      "text": "上传本地图片AI会在参考图的基础上进行创作",
                      "font": "SimHei",
                      "fontSize": 24,
                      "color": "#FFFFFF",
                      "valign": "middle",
                      "padding": "0,0,0,0"
                    },
                    {
                      "_$id": "t9dmy1fz",
                      "_$var": true,
                      "_$type": "Image",
                      "name": "uploadBtn",
                      "x": 20,
                      "y": 80,
                      "width": 204,
                      "height": 204,
                      "left": 20,
                      "top": 80,
                      "skin": "res://b970c50d-f63f-4433-8a38-30fd5a56ae8c",
                      "useSourceSize": true,
                      "color": "#ffffff",
                      "_$child": [
                        {
                          "_$id": "2tuggg70",
                          "_$type": "Image",
                          "name": "Image",
                          "x": 68,
                          "y": 68,
                          "width": 68,
                          "height": 68,
                          "centerX": 0,
                          "centerY": 0,
                          "skin": "res://ddba459d-241d-4f47-9b8a-a38c82b15a0a",
                          "useSourceSize": true,
                          "color": "#ffffff"
                        }
                      ]
                    },
                    {
                      "_$id": "d6jxegdp",
                      "_$var": true,
                      "_$type": "Image",
                      "name": "deleteBtn",
                      "x": 612,
                      "width": 64,
                      "height": 64,
                      "visible": false,
                      "right": 10,
                      "top": 0,
                      "skin": "res://22a85d98-394d-4d66-ad60-f03e9f2db41d",
                      "useSourceSize": true,
                      "color": "#ffffff"
                    },
                    {
                      "_$id": "gfh3923k",
                      "_$var": true,
                      "_$type": "Box",
                      "name": "iconBox",
                      "y": 49,
                      "width": 686,
                      "height": 231,
                      "visible": false,
                      "_mouseState": 2,
                      "left": 0,
                      "right": 0,
                      "bottom": 30,
                      "_$child": [
                        {
                          "_$id": "gm3dc8u9",
                          "_$type": "Label",
                          "name": "Label",
                          "x": 32,
                          "width": 168,
                          "height": 29,
                          "left": 32,
                          "top": 0,
                          "text": "图片相似度：",
                          "font": "SimHei",
                          "fontSize": 28,
                          "color": "#FFFFFF",
                          "fitContent": "yes",
                          "padding": "0,0,0,0"
                        },
                        {
                          "_$id": "euylhjuz",
                          "_$prefab": "0ea938b8-7283-484d-8fa6-55e0d9311b95",
                          "_$var": true,
                          "name": "slider",
                          "active": true,
                          "x": 20,
                          "y": 36,
                          "visible": true,
                          "left": 20,
                          "right": 20,
                          "centerY": -30
                        },
                        {
                          "_$id": "ag6c3gzu",
                          "_$var": true,
                          "_$type": "Button",
                          "name": "reloadBtn",
                          "x": 93,
                          "y": 171,
                          "width": 200,
                          "height": 60,
                          "_mouseState": 2,
                          "bottom": 0,
                          "centerX": -150,
                          "stateNum": 2,
                          "skin": "res://3494b3c0-912e-456d-8b39-71f743ca2437",
                          "sizeGrid": "20,30,20,30,0",
                          "label": "重新上传",
                          "labelFont": "SimHei",
                          "labelSize": 24,
                          "labelBold": true,
                          "labelColors": "#ffffff,#ffffff,#ffffff"
                        },
                        {
                          "_$id": "s5yhl9xk",
                          "_$var": true,
                          "_$type": "Button",
                          "name": "useBtn",
                          "x": 393,
                          "y": 171,
                          "width": 200,
                          "height": 60,
                          "_mouseState": 2,
                          "bottom": 0,
                          "centerX": 150,
                          "stateNum": 2,
                          "selected": true,
                          "skin": "res://3494b3c0-912e-456d-8b39-71f743ca2437",
                          "sizeGrid": "20,30,20,30,0",
                          "label": "直接使用",
                          "labelFont": "SimHei",
                          "labelSize": 24,
                          "labelBold": true,
                          "labelColors": "#000000,#000000,#000000"
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
          "_$id": "8uxj5dvf",
          "_$var": true,
          "_$type": "Button",
          "name": "generateBtn",
          "x": 55,
          "y": 1238,
          "width": 640,
          "height": 80,
          "_mouseState": 2,
          "bottom": 150,
          "centerX": 0,
          "stateNum": 2,
          "skin": "res://7da052d1-2549-47d9-a8be-5fc7ac1ca648",
          "sizeGrid": "15,30,15,30,0",
          "label": "生成",
          "labelFont": "SimHei",
          "labelSize": 30,
          "labelBold": true,
          "labelColors": "#ffffff,#ffffff,#ffffff",
          "_$child": [
            {
              "_$id": "xmwmvr2i",
              "_$var": true,
              "_$type": "Image",
              "name": "free",
              "x": 528,
              "y": -20,
              "width": 112,
              "height": 44,
              "_mouseState": 2,
              "right": 0,
              "top": -20,
              "skin": "res://d2c91479-2043-4cbc-be41-d4d1167fce79",
              "useSourceSize": true,
              "color": "#ffffff",
              "_$child": [
                {
                  "_$id": "31cm0fbz",
                  "_$var": true,
                  "_$type": "Button",
                  "name": "video",
                  "x": 56,
                  "y": 4,
                  "width": 36,
                  "height": 36,
                  "visible": false,
                  "alpha": 0.65,
                  "_mouseState": 2,
                  "right": 20,
                  "centerY": 0,
                  "stateNum": 2,
                  "skin": "res://a8febe84-e5e9-4747-8fe4-0eff5e038f93",
                  "label": "",
                  "labelSize": 20
                },
                {
                  "_$id": "9fpcwccy",
                  "_$var": true,
                  "_$type": "Label",
                  "name": "freeNum",
                  "width": 112,
                  "height": 44,
                  "left": 0,
                  "right": 0,
                  "top": 0,
                  "bottom": 0,
                  "text": "免费（5）",
                  "font": "SimHei",
                  "fontSize": 20,
                  "color": "rgba(204, 204, 204, 1)",
                  "align": "center",
                  "valign": "middle",
                  "padding": "0,0,0,0"
                }
              ]
            }
          ]
        },
        {
          "_$id": "7ob8e1hn",
          "_$var": true,
          "_$type": "Image",
          "name": "stimulateBg",
          "x": 536,
          "y": 1324,
          "width": 64,
          "height": 64,
          "right": 150,
          "bottom": 80,
          "skin": "res://a91d8b9f-7fe2-4538-8d73-7b5288720a65",
          "useSourceSize": true,
          "color": "#ffffff",
          "_$child": [
            {
              "_$id": "epe0iv3u",
              "_$type": "Label",
              "name": "Label",
              "x": 60,
              "y": 17,
              "width": 90,
              "height": 31,
              "left": 60,
              "centerY": 0,
              "text": "激励卡",
              "font": "SimHei",
              "fontSize": 30,
              "color": "#FFFFFF",
              "fitContent": "yes",
              "padding": "0,0,0,0"
            },
            {
              "_$id": "k7mts4ay",
              "_$type": "Image",
              "name": "Image",
              "x": 40,
              "width": 24,
              "height": 24,
              "right": 0,
              "top": 0,
              "skin": "res://d2cb422b-6d12-45a6-a333-b957a9c9fbeb",
              "useSourceSize": true,
              "color": "#ffffff",
              "_$child": [
                {
                  "_$id": "kftag36a",
                  "_$var": true,
                  "_$type": "Label",
                  "name": "stimulateNum",
                  "width": 24,
                  "height": 24,
                  "left": 0,
                  "right": 0,
                  "top": 0,
                  "bottom": 0,
                  "text": "6",
                  "font": "SimHei",
                  "fontSize": 20,
                  "color": "rgba(0, 0, 0, 1)",
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
}