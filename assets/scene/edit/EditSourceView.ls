{
  "_$ver": 1,
  "_$id": "ki3b5khq",
  "_$runtime": "res://d3b2a72a-9473-46ad-9c51-efaa408b71ab",
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
      "y": 526,
      "width": 750,
      "height": 942,
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
          "_$id": "irgjidlf",
          "_$type": "Image",
          "name": "Image",
          "y": 64,
          "width": 750,
          "height": 878,
          "_mouseState": 2,
          "left": 0,
          "right": 0,
          "top": 64,
          "bottom": 0,
          "skin": "res://95fd48ce-edc4-4631-8f5a-75221cdac5b2",
          "color": "#ffffff",
          "_$child": [
            {
              "_$id": "wo9lq6k1",
              "_$var": true,
              "_$type": "Image",
              "name": "icon",
              "x": 125,
              "y": 28,
              "width": 500,
              "height": 666,
              "mask": {
                "_$ref": "kytgc8fa"
              },
              "top": 28,
              "centerX": 0,
              "skin": "res://26fd2082-3f7b-4009-841f-7a709adb90bb",
              "color": "#ffffff",
              "_$child": [
                {
                  "_$id": "kytgc8fa",
                  "_$type": "Sprite",
                  "name": "Sprite",
                  "width": 500,
                  "height": 666,
                  "texture": {
                    "_$uuid": "bce77b87-49f6-4f62-a43a-68b2bcb5e98f",
                    "_$type": "Texture"
                  },
                  "_gcmds": [
                    {
                      "_$type": "DrawRoundRectCmd",
                      "x": 0,
                      "y": 0,
                      "width": 1,
                      "height": 1,
                      "lt": 10,
                      "rt": 10,
                      "lb": 10,
                      "rb": 10,
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
              "_$id": "jmjgtthl",
              "_$var": true,
              "_$type": "Button",
              "name": "sureBtn",
              "x": 178,
              "y": 726,
              "width": 394,
              "height": 72,
              "_mouseState": 2,
              "bottom": 80,
              "centerX": 0,
              "stateNum": 2,
              "selected": true,
              "skin": "res://7da052d1-2549-47d9-a8be-5fc7ac1ca648",
              "sizeGrid": "15,30,15,30,0",
              "label": "确定",
              "labelFont": "SimHei",
              "labelSize": 30,
              "labelBold": true,
              "labelColors": "#000000,#000000,#000000"
            }
          ]
        }
      ]
    }
  ]
}