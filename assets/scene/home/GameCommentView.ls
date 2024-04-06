{
  "_$ver": 1,
  "_$id": "ki3b5khq",
  "_$runtime": "res://526d8901-78a5-4104-97c1-918189cf5017",
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
        "_$ref": "1lhm53xq"
      },
      "tweenType": "Bottom",
      "tweenTime": 300,
      "dragBox": {
        "_$ref": "60rov9my"
      },
      "dragImage": {
        "_$ref": "0kmjtddb"
      },
      "auto": true,
      "delay": false
    }
  ],
  "_$child": [
    {
      "_$id": "1lhm53xq",
      "_$var": true,
      "_$type": "Box",
      "name": "bg",
      "width": 750,
      "height": 1468,
      "_mouseState": 2,
      "left": 0,
      "right": 0,
      "top": 0,
      "bottom": 0,
      "bgColor": "rgba(0, 0, 0, 0.5882352941176471)"
    },
    {
      "_$id": "60rov9my",
      "_$type": "Box",
      "name": "dragBox",
      "y": 332,
      "width": 750,
      "height": 1136,
      "_mouseState": 2,
      "_$child": [
        {
          "_$id": "0kmjtddb",
          "_$var": true,
          "_$type": "Image",
          "name": "drag",
          "width": 750,
          "height": 64,
          "left": 0,
          "right": 0,
          "top": 0,
          "skin": "res://1226946c-2a44-4080-89c4-83629126c7d1",
          "useSourceSize": true,
          "color": "#ffffff"
        },
        {
          "_$id": "0qtvl0le",
          "_$type": "Image",
          "name": "Image",
          "y": 64,
          "width": 750,
          "height": 1072,
          "_mouseState": 2,
          "left": 0,
          "right": 0,
          "top": 64,
          "bottom": 0,
          "skin": "res://95fd48ce-edc4-4631-8f5a-75221cdac5b2",
          "color": "#ffffff",
          "_$child": [
            {
              "_$id": "jhlac61t",
              "_$var": true,
              "_$type": "Panel",
              "name": "commentList",
              "width": 750,
              "height": 952,
              "_mouseState": 2,
              "left": 0,
              "right": 0,
              "top": 0,
              "bottom": 120,
              "scrollType": 2,
              "elasticEnabled": true,
              "_$comp": [
                {
                  "_$type": "343b66e3-e3aa-49b5-bf6c-fb0f0fd184a1",
                  "scriptPath": "../src/core/logic/FlowList.ts",
                  "item": {
                    "_$uuid": "b3ef5b39-308f-43b2-94b9-56747b6fe679",
                    "_$type": "Prefab"
                  },
                  "spaceX": 30,
                  "spaceY": 0,
                  "isAuto": false
                }
              ]
            },
            {
              "_$id": "33bi4o7d",
              "_$var": true,
              "_$type": "Box",
              "name": "tipNull",
              "y": 105,
              "width": 750,
              "height": 662,
              "visible": false,
              "left": 0,
              "right": 0,
              "centerY": -100,
              "_$child": [
                {
                  "_$id": "glsaf7qv",
                  "_$type": "Image",
                  "name": "tipIcon",
                  "x": 303,
                  "y": 209,
                  "width": 144,
                  "height": 144,
                  "centerX": 0,
                  "centerY": -50,
                  "skin": "res://8ce4caa0-8d00-4bff-9c45-6b17d1e8cccf",
                  "useSourceSize": true,
                  "color": "#ffffff"
                },
                {
                  "_$id": "j8eco2ft",
                  "_$type": "Label",
                  "name": "tipDesc",
                  "x": 186,
                  "y": 368,
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
        },
        {
          "_$id": "83hdojtw",
          "_$type": "Box",
          "name": "bottomBox",
          "y": 996,
          "width": 750,
          "height": 120,
          "_mouseState": 2,
          "left": 0,
          "right": 0,
          "bottom": 20,
          "_$child": [
            {
              "_$id": "ypr01bsf",
              "_$type": "Image",
              "name": "Image",
              "x": 24,
              "y": 24,
              "width": 702,
              "height": 72,
              "_mouseState": 2,
              "left": 24,
              "right": 24,
              "top": 24,
              "bottom": 24,
              "skin": "res://12d66fee-8472-445b-9c19-86c46cbc873c",
              "sizeGrid": "10,20,10,20,0",
              "color": "#ffffff",
              "_$child": [
                {
                  "_$id": "ycen00ec",
                  "_$var": true,
                  "_$type": "TextInput",
                  "name": "sendInput",
                  "x": 10,
                  "width": 592,
                  "height": 72,
                  "_mouseState": 2,
                  "left": 10,
                  "right": 100,
                  "top": 0,
                  "bottom": 0,
                  "text": "",
                  "fontSize": 28,
                  "color": "#FFFFFF",
                  "valign": "middle",
                  "overflow": "scroll",
                  "padding": "2,6,2,6",
                  "maxChars": 0,
                  "prompt": "发送消息",
                  "promptColor": "#A9A9A9"
                }
              ]
            },
            {
              "_$id": "6snmuljm",
              "_$var": true,
              "_$type": "Image",
              "name": "sendBtn",
              "x": 652,
              "y": 36,
              "width": 48,
              "height": 48,
              "right": 50,
              "centerY": 0,
              "skin": "res://07f7cace-ee4f-4651-87e0-fdb5e800d4e1",
              "useSourceSize": true,
              "color": "#ffffff"
            }
          ]
        }
      ]
    }
  ]
}