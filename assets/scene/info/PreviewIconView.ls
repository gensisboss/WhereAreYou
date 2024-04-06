{
  "_$ver": 1,
  "_$id": "b2wto46y",
  "_$runtime": "res://236e0799-bc02-47dd-b518-105cdc2761ae",
  "_$type": "Scene",
  "left": 0,
  "right": 0,
  "top": 0,
  "bottom": 0,
  "name": "Scene2D",
  "_$child": [
    {
      "_$id": "j5kv9eyn",
      "_$type": "Box",
      "name": "Box",
      "width": 750,
      "height": 1468,
      "left": 0,
      "right": 0,
      "top": 0,
      "bottom": 0,
      "bgColor": "rgba(0, 0, 0, 0.39215686274509803)"
    },
    {
      "_$id": "tua0orkm",
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
          "_$id": "eyyncv6b",
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
          "_$id": "ctwcp5a3",
          "_$var": true,
          "_$type": "Label",
          "name": "title",
          "x": 307,
          "y": 33,
          "width": 136,
          "height": 35,
          "centerX": 0,
          "centerY": 0,
          "text": "预览头像",
          "font": "SimHei",
          "fontSize": 34,
          "color": "#FFFFFF",
          "fitContent": "yes",
          "align": "center",
          "valign": "middle",
          "leading": 2,
          "padding": "0,0,0,0"
        }
      ]
    },
    {
      "_$id": "r0g34unl",
      "_$var": true,
      "_$type": "Box",
      "name": "previewBox",
      "y": 100,
      "width": 750,
      "height": 1368,
      "mouseEnabled": true,
      "_$child": [
        {
          "_$id": "ta7y0mv4",
          "_$var": true,
          "_$type": "Image",
          "name": "previewIcon",
          "width": 0,
          "height": 0,
          "color": "#ffffff",
          "_$comp": [
            {
              "_$type": "39241472-3194-43d3-92ea-5927320caa2f",
              "scriptPath": "../src/core/logic/TransformIcon.ts",
              "parentNode": {
                "_$ref": "r0g34unl"
              },
              "minScale": 1,
              "maxScale": 5,
              "dragSpeed": 2,
              "flexScale": 0.1,
              "flexPosition": 300
            }
          ]
        }
      ]
    },
    {
      "_$id": "2whyoiqg",
      "_$var": true,
      "_$type": "Box",
      "name": "btnBox",
      "y": 1168,
      "width": 750,
      "height": 300,
      "mouseEnabled": true,
      "left": 0,
      "right": 0,
      "bottom": 0,
      "_$child": [
        {
          "_$id": "4e69drk0",
          "_$var": true,
          "_$type": "Label",
          "name": "auditInfo",
          "x": 125,
          "y": 32,
          "width": 500,
          "height": 28,
          "bottom": 240,
          "centerX": 0,
          "text": "审核中......",
          "font": "SimHei",
          "fontSize": 28,
          "color": "rgba(252, 91, 42, 1)",
          "align": "center",
          "valign": "middle",
          "leading": 2,
          "padding": "0,0,0,0"
        },
        {
          "_$id": "4wgq5ri3",
          "_$var": true,
          "_$type": "Button",
          "name": "changeBtn",
          "x": 175,
          "y": 128,
          "width": 400,
          "height": 72,
          "mouseEnabled": true,
          "bottom": 100,
          "centerX": 0,
          "stateNum": 2,
          "skin": "res://7da052d1-2549-47d9-a8be-5fc7ac1ca648",
          "sizeGrid": "30,30,30,30,0",
          "label": "确定",
          "labelSize": 30,
          "labelBold": true,
          "labelColors": "#ffffff,#ffffff,#ffffff",
          "labelVAlign": "middle"
        }
      ]
    }
  ]
}