{
  "_$ver": 1,
  "_$id": "sxmy9d10",
  "_$runtime": "res://886ecb42-5540-4e41-80ea-471672718d9f",
  "_$type": "Scene",
  "left": 0,
  "right": 0,
  "top": 0,
  "bottom": 0,
  "name": "Scene2D",
  "_$child": [
    {
      "_$id": "4iqks98c",
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
          "_$id": "3zizo2cp",
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
          "_$id": "cjpm318c",
          "_$type": "Label",
          "name": "title",
          "x": 344,
          "y": 30,
          "width": 63,
          "height": 40,
          "centerX": 0,
          "centerY": 0,
          "text": "社交",
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
      "_$id": "hzogiigp",
      "_$var": true,
      "_$type": "Box",
      "name": "listBox",
      "y": 100,
      "width": 750,
      "height": 1368,
      "zOrder": 1,
      "_mouseState": 2,
      "top": 100,
      "bottom": 0,
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
          "_$id": "efn9d9m4",
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
              "_$id": "upj8hp4z",
              "_$var": true,
              "_$type": "Label",
              "name": "friendSort",
              "x": 25,
              "y": 10,
              "width": 200,
              "height": 50,
              "_mouseState": 2,
              "top": 10,
              "centerX": -250,
              "text": "好友",
              "font": "SimHei",
              "fontSize": 24,
              "color": "rgba(153, 153, 153, 1)",
              "align": "center",
              "valign": "middle",
              "padding": "0,0,0,0"
            },
            {
              "_$id": "nief4nu2",
              "_$var": true,
              "_$type": "Label",
              "name": "followSort",
              "x": 275,
              "y": 10,
              "width": 200,
              "height": 50,
              "_mouseState": 2,
              "top": 10,
              "centerX": 0,
              "text": "关注",
              "font": "SimHei",
              "fontSize": 24,
              "color": "rgba(153, 153, 153, 1)",
              "align": "center",
              "valign": "middle",
              "padding": "0,0,0,0"
            },
            {
              "_$id": "fhkohish",
              "_$var": true,
              "_$type": "Label",
              "name": "fanSort",
              "x": 525,
              "y": 10,
              "width": 200,
              "height": 50,
              "_mouseState": 2,
              "top": 10,
              "centerX": 250,
              "text": "粉丝",
              "font": "SimHei",
              "fontSize": 24,
              "color": "rgba(153, 153, 153, 1)",
              "align": "center",
              "valign": "middle",
              "padding": "0,0,0,0"
            },
            {
              "_$id": "8jqvf1c4",
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
              "_$id": "um4q2p8v",
              "_$var": true,
              "_$type": "Image",
              "name": "selectTab",
              "x": 57,
              "y": 78,
              "width": 100,
              "height": 4,
              "anchorY": 1,
              "bottom": 2,
              "skin": "res://cb4c8543-174d-492f-a463-68852ca3e983",
              "color": "#ffffff"
            }
          ]
        },
        {
          "_$id": "9f7db5dz",
          "_$prefab": "eb88ad76-9dcc-448d-8cde-0b7d3b01add0",
          "_$var": true,
          "name": "searchBox",
          "active": true,
          "x": 32,
          "y": 100,
          "visible": true,
          "left": 32,
          "right": 32,
          "top": 100
        },
        {
          "_$id": "wary3i7w",
          "_$var": true,
          "_$type": "Box",
          "name": "tipNull",
          "x": 225,
          "y": 300,
          "width": 300,
          "height": 240,
          "top": 300,
          "centerX": 0,
          "_$child": [
            {
              "_$id": "pjpvh7pm",
              "_$type": "Image",
              "name": "Image",
              "x": 86,
              "width": 128,
              "height": 128,
              "top": 0,
              "centerX": 0,
              "skin": "res://ec8a2ca8-2ae6-4e25-a4f8-201101b886eb",
              "useSourceSize": true,
              "color": "#ffffff"
            },
            {
              "_$id": "pswlc7fw",
              "_$type": "Label",
              "name": "Label",
              "x": 90,
              "y": 212,
              "width": 120,
              "height": 28,
              "bottom": 0,
              "centerX": 0,
              "text": "暂无数据",
              "font": "SimHei",
              "fontSize": 30,
              "color": "rgba(46, 50, 56, 1)",
              "align": "center",
              "valign": "middle",
              "padding": "0,0,0,0"
            }
          ]
        },
        {
          "_$id": "ymttspea",
          "_$var": true,
          "_$type": "List",
          "name": "userList",
          "y": 200,
          "width": 750,
          "height": 1168,
          "visible": false,
          "_mouseState": 2,
          "mouseThrough": true,
          "hitTestPrior": true,
          "left": 0,
          "right": 0,
          "top": 200,
          "bottom": 0,
          "itemTemplate": {
            "_$ref": "xrllbqab",
            "_$tmpl": "itemRender"
          },
          "repeatX": 1,
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
              "_$id": "xrllbqab",
              "_$prefab": "a7633dac-b486-419d-beef-8c862e916092",
              "name": "userItem",
              "active": true,
              "x": 0,
              "y": 0
            }
          ]
        }
      ]
    }
  ]
}