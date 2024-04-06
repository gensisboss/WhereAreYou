{
  "_$ver": 1,
  "_$id": "36bp0wpa",
  "_$runtime": "res://2efd177f-650b-4aa7-ba83-8cdcbc4571ff",
  "_$type": "Scene",
  "left": 0,
  "right": 0,
  "top": 0,
  "bottom": 0,
  "name": "Scene2D",
  "_$child": [
    {
      "_$id": "4u0j44f6",
      "_$type": "Box",
      "name": "middleBox",
      "y": 100,
      "width": 750,
      "height": 1248,
      "_mouseState": 2,
      "left": 0,
      "right": 0,
      "top": 100,
      "bottom": 120,
      "_$child": [
        {
          "_$id": "ma15zihk",
          "_$var": true,
          "_$type": "Panel",
          "name": "chatList",
          "x": 10,
          "y": 10,
          "width": 730,
          "height": 1228,
          "_mouseState": 2,
          "left": 10,
          "right": 10,
          "top": 10,
          "bottom": 10,
          "scrollType": 2,
          "elasticEnabled": true,
          "_$comp": [
            {
              "_$type": "343b66e3-e3aa-49b5-bf6c-fb0f0fd184a1",
              "scriptPath": "../src/core/logic/FlowList.ts",
              "item": {
                "_$uuid": "31918136-1263-4314-9b68-55169bd00412",
                "_$type": "Prefab"
              },
              "spaceX": 30,
              "spaceY": 50,
              "isAuto": true
            }
          ]
        }
      ]
    },
    {
      "_$id": "iddxlyah",
      "_$var": true,
      "_$type": "Box",
      "name": "bottomBox",
      "y": 1348,
      "width": 750,
      "height": 120,
      "_mouseState": 2,
      "left": 0,
      "right": 0,
      "bottom": 0,
      "bgColor": "rgba(0, 0, 0, 1)",
      "_$child": [
        {
          "_$id": "9luea7y0",
          "_$var": true,
          "_$type": "Box",
          "name": "inputBox",
          "width": 750,
          "height": 120,
          "_mouseState": 2,
          "left": 0,
          "right": 0,
          "top": 0,
          "_$child": [
            {
              "_$id": "x87r6pzb",
              "_$var": true,
              "_$type": "TextInput",
              "name": "sendInput",
              "x": 100,
              "y": 24,
              "width": 480,
              "height": 72,
              "_mouseState": 2,
              "left": 100,
              "centerY": 0,
              "text": "",
              "font": "SimHei",
              "fontSize": 28,
              "color": "#FFFFFF",
              "valign": "middle",
              "overflow": "scroll",
              "padding": "2,20,2,20",
              "skin": "res://1f6db6e4-1a23-4b2f-b74f-8f5bb2d4363a",
              "sizeGrid": "20,30,20,30,0",
              "maxChars": 0,
              "prompt": "发送消息",
              "promptColor": "#A9A9A9"
            },
            {
              "_$id": "bxwiuel1",
              "_$var": true,
              "_$type": "Button",
              "name": "sendBtn",
              "x": 586,
              "y": 25,
              "width": 144,
              "height": 72,
              "_mouseState": 2,
              "right": 20,
              "centerY": 1,
              "stateNum": 2,
              "skin": "res://67d8cdde-a84e-4d28-8bd9-3ed9b111b99d",
              "label": "发送",
              "labelFont": "SimHei",
              "labelSize": 34,
              "labelColors": "#4d4d4d,#ffffff,#ffffff"
            },
            {
              "_$id": "58ldtybz",
              "_$var": true,
              "_$type": "Image",
              "name": "changeBtn",
              "x": 20,
              "y": 28,
              "width": 64,
              "height": 64,
              "left": 20,
              "centerY": 0,
              "skin": "res://04c59ad5-b319-4570-8460-175f1de594e9",
              "useSourceSize": true,
              "color": "#ffffff"
            }
          ]
        },
        {
          "_$id": "dwn0dzgv",
          "_$var": true,
          "_$type": "Box",
          "name": "listBox",
          "y": 120,
          "width": 750,
          "height": 580,
          "zOrder": 1,
          "_mouseState": 2,
          "left": 0,
          "right": 0,
          "top": 120,
          "_$child": [
            {
              "_$id": "7onyliuu",
              "_$type": "Box",
              "name": "tabBox",
              "y": 1,
              "width": 750,
              "height": 80,
              "left": 0,
              "right": 0,
              "top": 1,
              "_$child": [
                {
                  "_$id": "p7zbjxas",
                  "_$var": true,
                  "_$type": "Label",
                  "name": "createSort",
                  "x": 25,
                  "y": 22,
                  "width": 200,
                  "height": 50,
                  "_mouseState": 2,
                  "centerX": -250,
                  "text": "创作",
                  "fontSize": 24,
                  "color": "rgba(153, 153, 153, 1)",
                  "align": "center",
                  "valign": "middle",
                  "padding": "0,0,0,0"
                },
                {
                  "_$id": "7jojqcs0",
                  "_$var": true,
                  "_$type": "Label",
                  "name": "likeSort",
                  "x": 275,
                  "y": 22,
                  "width": 200,
                  "height": 50,
                  "_mouseState": 2,
                  "centerX": 0,
                  "text": "喜欢",
                  "fontSize": 24,
                  "color": "rgba(153, 153, 153, 1)",
                  "align": "center",
                  "valign": "middle",
                  "padding": "0,0,0,0"
                },
                {
                  "_$id": "d21xt1cn",
                  "_$var": true,
                  "_$type": "Label",
                  "name": "collectSort",
                  "x": 525,
                  "y": 22,
                  "width": 200,
                  "height": 50,
                  "_mouseState": 2,
                  "centerX": 250,
                  "text": "收藏",
                  "fontSize": 24,
                  "color": "rgba(153, 153, 153, 1)",
                  "align": "center",
                  "valign": "middle",
                  "padding": "0,0,0,0"
                },
                {
                  "_$id": "1ciakizj",
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
                  "_$id": "6fop6gsn",
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
              "_$id": "2pm8x0xj",
              "_$var": true,
              "_$type": "Box",
              "name": "tipNull",
              "x": 225,
              "y": 200,
              "width": 300,
              "height": 240,
              "top": 200,
              "centerX": 0,
              "_$child": [
                {
                  "_$id": "p5gaxyov",
                  "_$type": "Image",
                  "name": "Image",
                  "x": 54,
                  "width": 192,
                  "height": 192,
                  "top": 0,
                  "centerX": 0,
                  "skin": "res://c28c2a44-a7c1-42fe-979e-fe378c83194d",
                  "useSourceSize": true,
                  "color": "#ffffff"
                },
                {
                  "_$id": "voghbf41",
                  "_$type": "Label",
                  "name": "Label",
                  "x": 90,
                  "y": 212,
                  "width": 120,
                  "height": 28,
                  "bottom": 0,
                  "centerX": 0,
                  "text": "暂无数据",
                  "fontSize": 30,
                  "color": "rgba(46, 50, 56, 1)",
                  "align": "center",
                  "valign": "middle",
                  "padding": "0,0,0,0"
                }
              ]
            },
            {
              "_$id": "u3s3laty",
              "_$var": true,
              "_$type": "List",
              "name": "gameList",
              "x": 32,
              "y": 100,
              "width": 686,
              "height": 480,
              "_mouseState": 2,
              "mouseThrough": true,
              "hitTestPrior": true,
              "left": 32,
              "right": 32,
              "top": 100,
              "bottom": 0,
              "itemTemplate": {
                "_$ref": "nr4te0pb",
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
                  "_$id": "nr4te0pb",
                  "_$prefab": "0d53ea82-3faf-4a32-91ad-2cdbf37d5b1f",
                  "name": "gameItem",
                  "active": true,
                  "x": 0,
                  "y": 0
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "_$id": "vf3pgulg",
      "_$var": true,
      "_$type": "Box",
      "name": "topBox",
      "width": 750,
      "height": 100,
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
          "_$id": "x84n0e5r",
          "_$var": true,
          "_$type": "Image",
          "name": "backBtn",
          "x": 20,
          "y": 20,
          "width": 64,
          "height": 64,
          "left": 20,
          "top": 20,
          "skin": "res://094a71dd-4d5e-4c20-8e13-62e5453f0f89",
          "useSourceSize": true,
          "color": "#ffffff"
        },
        {
          "_$id": "zyflwrqt",
          "_$var": true,
          "_$type": "Label",
          "name": "title",
          "x": 214,
          "y": 30,
          "width": 323,
          "height": 40,
          "centerX": 0,
          "centerY": 0,
          "text": "聊天",
          "font": "SimHei",
          "fontSize": 34,
          "color": "#FFFFFF",
          "align": "center",
          "valign": "middle",
          "padding": "0,0,0,0"
        }
      ]
    }
  ]
}