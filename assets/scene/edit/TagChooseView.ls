{
  "_$ver": 1,
  "_$id": "ki3b5khq",
  "_$runtime": "res://fb6bf325-e560-4ca2-9db7-439112e943dc",
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
      "mouseEnabled": true,
      "left": 0,
      "right": 0,
      "top": 0,
      "bottom": 0,
      "bgColor": "rgba(0, 0, 0, 0.5882352941176471)"
    },
    {
      "_$id": "60rov9my",
      "_$var": true,
      "_$type": "Box",
      "name": "dragBox",
      "y": 968,
      "width": 750,
      "height": 500,
      "mouseEnabled": true,
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
          "height": 436,
          "mouseEnabled": true,
          "left": 0,
          "right": 0,
          "top": 64,
          "bottom": 0,
          "skin": "res://95fd48ce-edc4-4631-8f5a-75221cdac5b2",
          "color": "#ffffff",
          "_$child": [
            {
              "_$id": "vzrri9y2",
              "_$type": "Label",
              "name": "Label",
              "x": 315,
              "width": 120,
              "height": 28,
              "top": 0,
              "centerX": 0,
              "text": "添加标签",
              "font": "SimHei",
              "fontSize": 30,
              "color": "#FFFFFF",
              "valign": "top",
              "leading": 2,
              "padding": "0,0,0,0"
            },
            {
              "_$id": "weqwll8r",
              "_$var": true,
              "_$type": "List",
              "name": "tagList",
              "x": 32,
              "y": 50,
              "width": 686,
              "height": 269,
              "mouseEnabled": true,
              "left": 32,
              "right": 32,
              "top": 50,
              "itemTemplate": {
                "_$ref": "jf21ilg7",
                "_$tmpl": "itemRender"
              },
              "repeatX": 5,
              "repeatY": 5,
              "spaceX": 12,
              "spaceY": 12,
              "scrollType": 2,
              "_$child": [
                {
                  "_$id": "jf21ilg7",
                  "_$type": "Box",
                  "name": "Box",
                  "width": 128,
                  "height": 55,
                  "mouseEnabled": true,
                  "_$child": [
                    {
                      "_$id": "36xkzel7",
                      "_$type": "Button",
                      "name": "desc",
                      "width": 128,
                      "height": 55,
                      "mouseEnabled": true,
                      "stateNum": 2,
                      "skin": "res://8c547fa1-f2df-4cc4-b98f-2541463a8386",
                      "label": "标签",
                      "labelSize": 20,
                      "labelColors": "#ffffff,#ffffff,#ffffff",
                      "labelVAlign": "middle"
                    }
                  ]
                }
              ]
            },
            {
              "_$id": "9j9urg5o",
              "_$var": true,
              "_$type": "Button",
              "name": "sureBtn",
              "x": 225,
              "y": 336,
              "width": 300,
              "height": 50,
              "mouseEnabled": true,
              "bottom": 50,
              "centerX": 0,
              "stateNum": 1,
              "skin": "res://389b096e-8e18-43d1-aa73-d6765721dc18",
              "sizeGrid": "20,20,20,20,0",
              "label": "确定",
              "labelFont": "SimHei",
              "labelSize": 24,
              "labelColors": "#000000,#000000,#000000",
              "labelVAlign": "middle"
            }
          ]
        }
      ]
    }
  ]
}