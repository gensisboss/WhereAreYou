{
  "_$ver": 1,
  "_$id": "niqaw6jk",
  "_$runtime": "res://7cf20a05-7d10-4082-b299-ae37c33cd933",
  "_$type": "Scene",
  "left": 0,
  "right": 0,
  "top": 0,
  "bottom": 0,
  "name": "Scene2D",
  "_$child": [
    {
      "_$id": "mmc12wc5",
      "_$var": true,
      "_$type": "Box",
      "name": "middleBox",
      "width": 750,
      "height": 1468,
      "_mouseState": 2,
      "left": 0,
      "right": 0,
      "top": 0,
      "bottom": 0,
      "bgColor": "rgba(0, 0, 0, 1)",
      "_$child": [
        {
          "_$id": "vgl0opq3",
          "_$var": true,
          "_$type": "Box",
          "name": "listBox",
          "x": -750,
          "width": 1500,
          "height": 1468,
          "_mouseState": 2,
          "top": 0,
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
              "_$id": "qjrsxqid",
              "_$var": true,
              "_$type": "List",
              "name": "gameFollwList",
              "width": 750,
              "height": 1468,
              "_mouseState": 2,
              "left": 0,
              "centerY": 0,
              "itemTemplate": {
                "_$ref": "kqk1wx4r",
                "_$tmpl": "itemRender"
              },
              "repeatX": 1,
              "repeatY": 1,
              "elasticEnabled": true,
              "scrollType": 2,
              "_$child": [
                {
                  "_$id": "kqk1wx4r",
                  "_$prefab": "d6a37fa3-64ea-4125-b05d-df84de94aeac",
                  "name": "playGameItem",
                  "active": true,
                  "x": 0,
                  "y": 0
                }
              ]
            },
            {
              "_$id": "syjheced",
              "_$var": true,
              "_$type": "List",
              "name": "gameRecommendList",
              "x": 750,
              "width": 750,
              "height": 1468,
              "_mouseState": 2,
              "right": 0,
              "centerY": 0,
              "itemTemplate": {
                "_$ref": "1z8dred0",
                "_$tmpl": "itemRender"
              },
              "repeatX": 1,
              "repeatY": 1,
              "elasticEnabled": true,
              "scrollType": 2,
              "_$child": [
                {
                  "_$id": "1z8dred0",
                  "_$prefab": "d6a37fa3-64ea-4125-b05d-df84de94aeac",
                  "name": "playGameItem",
                  "active": true,
                  "x": 0,
                  "y": 0
                }
              ]
            },
            {
              "_$id": "tmcp7ow6",
              "_$var": true,
              "_$type": "Box",
              "name": "tipFollowNull",
              "y": 484,
              "width": 750,
              "height": 500,
              "visible": false,
              "left": 0,
              "right": 750,
              "centerY": 0,
              "_$child": [
                {
                  "_$id": "7dl3b7gn",
                  "_$type": "Image",
                  "name": "tipIcon",
                  "x": 303,
                  "y": 128,
                  "width": 144,
                  "height": 144,
                  "centerX": 0,
                  "centerY": -50,
                  "skin": "res://75fc9909-26fa-4eae-91dd-da6b32e097cf",
                  "useSourceSize": true,
                  "color": "#ffffff"
                },
                {
                  "_$id": "jevxw3au",
                  "_$type": "Label",
                  "name": "tipDesc",
                  "x": 186,
                  "y": 287,
                  "width": 379,
                  "height": 27,
                  "centerX": 0,
                  "centerY": 50,
                  "text": "暂无数据",
                  "font": "SimHei",
                  "fontSize": 26,
                  "color": "rgba(51, 51, 51, 1)",
                  "fitContent": "height",
                  "bold": true,
                  "align": "center",
                  "padding": "0,0,0,0"
                }
              ]
            },
            {
              "_$id": "ahbyxa7u",
              "_$var": true,
              "_$type": "Box",
              "name": "tipRecommnedNull",
              "x": 750,
              "y": 484,
              "width": 750,
              "height": 500,
              "visible": false,
              "left": 750,
              "right": 0,
              "centerY": 0,
              "_$child": [
                {
                  "_$id": "8b75uv0s",
                  "_$type": "Image",
                  "name": "tipIcon",
                  "x": 303,
                  "y": 128,
                  "width": 144,
                  "height": 144,
                  "centerX": 0,
                  "centerY": -50,
                  "skin": "res://241aefb0-db51-4732-aa09-c6467cf20d1d",
                  "useSourceSize": true,
                  "color": "#ffffff"
                },
                {
                  "_$id": "txn6ydt9",
                  "_$type": "Label",
                  "name": "tipDesc",
                  "x": 186,
                  "y": 287,
                  "width": 379,
                  "height": 27,
                  "centerX": 0,
                  "centerY": 50,
                  "text": "暂无数据",
                  "font": "SimHei",
                  "fontSize": 26,
                  "color": "rgba(51, 51, 51, 1)",
                  "fitContent": "height",
                  "bold": true,
                  "align": "center",
                  "padding": "0,0,0,0"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "_$id": "ms1uaz9j",
      "_$var": true,
      "_$type": "Box",
      "name": "topBox",
      "width": 750,
      "height": 100,
      "_mouseState": 2,
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
          "_$id": "qjuc8nwz",
          "_$type": "Image",
          "name": "topImage",
          "y": -100,
          "width": 750,
          "height": 472,
          "left": 0,
          "right": 0,
          "top": -100,
          "skin": "res://65309c8a-cc8c-40be-9f47-5d7c9cb55fdc",
          "color": "#ffffff"
        },
        {
          "_$id": "npywkk2m",
          "_$var": true,
          "_$type": "Button",
          "name": "rankBtn",
          "x": 638,
          "y": 90,
          "width": 80,
          "height": 80,
          "visible": false,
          "_mouseState": 2,
          "right": 32,
          "centerY": 80,
          "stateNum": 2,
          "skin": "res://f6cd0a0e-c28b-4faf-8ef3-23fad588cb59",
          "label": "",
          "labelSize": 20
        },
        {
          "_$id": "qy3dfpns",
          "_$var": true,
          "_$type": "Label",
          "name": "followBtn",
          "x": 155,
          "width": 200,
          "height": 100,
          "top": 0,
          "bottom": 0,
          "centerX": -120,
          "text": "关注",
          "font": "SimHei",
          "fontSize": 32,
          "color": "#FFFFFF",
          "align": "right",
          "valign": "middle",
          "padding": "0,0,0,0"
        },
        {
          "_$id": "fhlz1t0r",
          "_$var": true,
          "_$type": "Label",
          "name": "recomendBtn",
          "x": 395,
          "width": 200,
          "height": 100,
          "top": 0,
          "bottom": 0,
          "centerX": 120,
          "text": "推荐",
          "font": "SimHei",
          "fontSize": 32,
          "color": "#FFFFFF",
          "valign": "middle",
          "padding": "0,0,0,0"
        },
        {
          "_$id": "4cnnqrjs",
          "_$type": "Image",
          "name": "Image",
          "x": 32,
          "y": 20,
          "width": 160,
          "height": 60,
          "visible": false,
          "left": 32,
          "centerY": 0,
          "skin": "res://b09a3648-14c8-4d21-a369-6f09ad32a04a",
          "sizeGrid": "10,20,10,20,0",
          "color": "#ffffff",
          "_$child": [
            {
              "_$id": "ot8j5vyi",
              "_$type": "Image",
              "name": "Image",
              "x": 10,
              "y": 6,
              "width": 48,
              "height": 48,
              "left": 10,
              "centerY": 0,
              "skin": "res://9c9463ca-77f2-41a8-931c-2a33dd54b453",
              "color": "#ffffff"
            },
            {
              "_$id": "w5fcjhnh",
              "_$var": true,
              "_$type": "Label",
              "name": "diamonds",
              "x": 60,
              "width": 100,
              "height": 60,
              "left": 60,
              "right": 0,
              "top": 0,
              "bottom": 0,
              "text": "9999",
              "font": "SimHei",
              "fontSize": 32,
              "color": "#FFFFFF",
              "align": "center",
              "valign": "middle",
              "padding": "0,0,0,0"
            }
          ]
        }
      ]
    },
    {
      "_$id": "0tipd5gg",
      "_$var": true,
      "_$type": "Box",
      "name": "pageBox",
      "width": 750,
      "height": 1468,
      "zOrder": 1,
      "left": 0,
      "right": 0,
      "top": 0,
      "bottom": 0
    },
    {
      "_$id": "o541a6fn",
      "_$var": true,
      "_$type": "Box",
      "name": "bottomBox",
      "x": 131,
      "y": 1306,
      "width": 488,
      "height": 112,
      "zOrder": 2,
      "_mouseState": 2,
      "bottom": 50,
      "centerX": 0,
      "_$child": [
        {
          "_$id": "954tngiy",
          "_$type": "Image",
          "name": "downImage",
          "x": -131,
          "y": -210,
          "width": 750,
          "height": 372,
          "bottom": -50,
          "centerX": 0,
          "skin": "res://4c26bf56-8d5e-4e13-9d7a-124654a7098b",
          "color": "#ffffff"
        },
        {
          "_$id": "qwhc90ro",
          "_$type": "Image",
          "name": "bg",
          "width": 488,
          "height": 112,
          "left": 0,
          "right": 0,
          "top": 0,
          "bottom": 0,
          "skin": "res://b23a29f2-19bf-4da6-897d-2e3257351969",
          "useSourceSize": true,
          "color": "#ffffff"
        },
        {
          "_$id": "008wn7dt",
          "_$var": true,
          "_$type": "HBox",
          "name": "tabBox",
          "width": 488,
          "height": 112,
          "left": 0,
          "right": 0,
          "top": 0,
          "bottom": 0,
          "space": 0,
          "_$child": [
            {
              "_$id": "l01uslmq",
              "_$var": true,
              "_$type": "Box",
              "name": "homeBox",
              "x": 32,
              "width": 112,
              "height": 112,
              "left": 32,
              "centerY": 0,
              "_$child": [
                {
                  "_$id": "v4bt8yzm",
                  "_$type": "Image",
                  "name": "normal",
                  "width": 112,
                  "height": 112,
                  "centerX": 0,
                  "centerY": 0,
                  "skin": "res://d00e2c73-e8c4-4a16-844b-63a8f4509f7e",
                  "useSourceSize": true,
                  "color": "#ffffff"
                },
                {
                  "_$id": "8mqu4w2x",
                  "_$type": "Image",
                  "name": "select",
                  "x": 1,
                  "width": 112,
                  "height": 112,
                  "visible": false,
                  "centerX": 1,
                  "centerY": 0,
                  "skin": "res://9f892817-cf0a-4c56-bd7a-25765a55ebc5",
                  "useSourceSize": true,
                  "color": "#ffffff"
                },
                {
                  "_$id": "ytudv4mj",
                  "_$type": "Image",
                  "name": "point",
                  "x": 77,
                  "y": 12,
                  "width": 18,
                  "height": 18,
                  "visible": false,
                  "centerX": 30,
                  "centerY": -35,
                  "skin": "res://d2cb422b-6d12-45a6-a333-b957a9c9fbeb",
                  "color": "#ffffff"
                }
              ]
            },
            {
              "_$id": "ob9ig6hw",
              "_$var": true,
              "_$type": "Box",
              "name": "createBox",
              "x": 188,
              "width": 112,
              "height": 112,
              "centerX": 0,
              "centerY": 0,
              "_$child": [
                {
                  "_$id": "tk7kujdl",
                  "_$type": "Image",
                  "name": "normal",
                  "width": 112,
                  "height": 112,
                  "centerX": 0,
                  "centerY": 0,
                  "skin": "res://00a9d189-ea3d-4d63-9a47-8cdab57a557d",
                  "useSourceSize": true,
                  "color": "#ffffff"
                },
                {
                  "_$id": "xugc6mxc",
                  "_$type": "Image",
                  "name": "select",
                  "width": 112,
                  "height": 112,
                  "visible": false,
                  "centerX": 0,
                  "centerY": 0,
                  "skin": "res://88e2efea-5d20-459b-afbc-796942922ff4",
                  "useSourceSize": true,
                  "color": "#ffffff"
                },
                {
                  "_$id": "ssbq9gd2",
                  "_$type": "Image",
                  "name": "point",
                  "x": 77,
                  "y": 12,
                  "width": 18,
                  "height": 18,
                  "visible": false,
                  "centerX": 30,
                  "centerY": -35,
                  "skin": "res://d2cb422b-6d12-45a6-a333-b957a9c9fbeb",
                  "color": "#ffffff"
                }
              ]
            },
            {
              "_$id": "oq4f6aji",
              "_$var": true,
              "_$type": "Box",
              "name": "myBox",
              "x": 344,
              "width": 112,
              "height": 112,
              "right": 32,
              "centerY": 0,
              "_$child": [
                {
                  "_$id": "htd20i3y",
                  "_$type": "Image",
                  "name": "normal",
                  "width": 112,
                  "height": 112,
                  "centerX": 0,
                  "centerY": 0,
                  "skin": "res://ab4d7fe8-2d7f-47aa-a30e-ff865b71289e",
                  "useSourceSize": true,
                  "color": "#ffffff"
                },
                {
                  "_$id": "7z7ko2to",
                  "_$type": "Image",
                  "name": "select",
                  "x": 1,
                  "width": 112,
                  "height": 112,
                  "visible": false,
                  "centerX": 1,
                  "centerY": 0,
                  "skin": "res://efabe1f3-d578-478a-9883-654fc60e1db2",
                  "useSourceSize": true,
                  "color": "#ffffff"
                },
                {
                  "_$id": "vhv37zc7",
                  "_$type": "Image",
                  "name": "point",
                  "x": 77,
                  "y": 12,
                  "width": 18,
                  "height": 18,
                  "visible": false,
                  "centerX": 30,
                  "centerY": -35,
                  "skin": "res://d2cb422b-6d12-45a6-a333-b957a9c9fbeb",
                  "color": "#ffffff"
                }
              ]
            }
          ]
        },
        {
          "_$id": "3q5v00u8",
          "_$var": true,
          "_$type": "Box",
          "name": "createTip",
          "x": 144,
          "y": -94,
          "width": 200,
          "height": 200,
          "visible": false,
          "centerX": 0,
          "centerY": -50,
          "_$child": [
            {
              "_$id": "x3osh11z",
              "_$type": "Image",
              "name": "Image",
              "x": -56,
              "y": 37,
              "width": 312,
              "height": 66,
              "centerX": 0,
              "centerY": -30,
              "skin": "res://d3d41643-fbdf-4129-a060-f3a274ea2562",
              "useSourceSize": true,
              "color": "#ffffff",
              "_$child": [
                {
                  "_$id": "qe9ceuhn",
                  "_$type": "Label",
                  "name": "Label",
                  "width": 312,
                  "height": 55,
                  "left": 0,
                  "right": 0,
                  "top": 0,
                  "text": "创作你的第一款游戏",
                  "font": "SimHei",
                  "fontSize": 24,
                  "color": "rgba(0, 0, 0, 1)",
                  "align": "center",
                  "valign": "middle",
                  "padding": "0,0,0,0"
                }
              ]
            },
            {
              "_$id": "j41em9ng",
              "_$type": "Animation",
              "name": "createGuide",
              "x": 45,
              "y": 90,
              "width": 100,
              "height": 100,
              "source": "res://06a4ff8d-250d-49b7-9ebc-4380463c99bd",
              "interval": 50,
              "autoPlay": true,
              "index": 5
            }
          ]
        }
      ]
    }
  ]
}