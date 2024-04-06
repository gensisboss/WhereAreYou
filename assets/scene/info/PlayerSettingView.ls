{
  "_$ver": 1,
  "_$id": "sxmy9d10",
  "_$runtime": "res://30d8b89f-54ac-4422-9ebe-cf48d724e1aa",
  "_$preloads": [
    "res://a4fe0a56-e10f-4bbb-8518-59d5eb389713"
  ],
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
          "text": "设置",
          "font": "SimHei",
          "fontSize": 34,
          "color": "#FFFFFF",
          "align": "center",
          "valign": "middle",
          "leading": 2,
          "padding": "0,0,0,0"
        }
      ]
    },
    {
      "_$id": "f9oqq79r",
      "_$type": "Panel",
      "name": "listPanel",
      "y": 100,
      "width": 750,
      "height": 1368,
      "mouseEnabled": true,
      "left": 0,
      "right": 0,
      "top": 100,
      "bottom": 0,
      "scrollType": 2,
      "_$comp": [
        {
          "_$type": "7d1869da-8c5a-43de-a676-87d6973c547e",
          "scriptPath": "../src/core/logic/FringeAdapter.ts",
          "topAdpter": true,
          "heightAdpter": true,
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
          "_$id": "gq00jek7",
          "_$var": true,
          "_$type": "Box",
          "name": "content",
          "width": 750,
          "height": 1368,
          "mouseEnabled": true,
          "left": 0,
          "right": 0,
          "top": 0,
          "_$child": [
            {
              "_$id": "xw8xcv8o",
              "_$var": true,
              "_$type": "Panel",
              "name": "listBox",
              "width": 750,
              "height": 1218,
              "zOrder": 1,
              "mouseEnabled": true,
              "left": 0,
              "right": 0,
              "top": 0,
              "bottom": 150,
              "_$comp": [
                {
                  "_$type": "343b66e3-e3aa-49b5-bf6c-fb0f0fd184a1",
                  "scriptPath": "../src/core/logic/FlowList.ts",
                  "item": {
                    "_$uuid": "bad8f231-704b-4ab5-8119-a3e56513afeb",
                    "_$type": "Prefab"
                  },
                  "spaceX": 10,
                  "spaceY": 0,
                  "isAuto": false
                }
              ]
            },
            {
              "_$id": "cno075uy",
              "_$var": true,
              "_$type": "Button",
              "name": "loginOutBtn",
              "x": 56,
              "y": 1188,
              "width": 640,
              "height": 80,
              "visible": false,
              "mouseEnabled": true,
              "bottom": 100,
              "centerX": 1,
              "stateNum": 1,
              "skin": "res://389b096e-8e18-43d1-aa73-d6765721dc18",
              "sizeGrid": "15,30,15,30,0",
              "label": "退出登录",
              "labelSize": 30,
              "labelBold": true,
              "labelColors": "#000000,#000000,#000000",
              "labelVAlign": "middle"
            }
          ]
        }
      ]
    }
  ]
}