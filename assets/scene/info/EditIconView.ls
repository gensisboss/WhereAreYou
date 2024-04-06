{
  "_$ver": 1,
  "_$id": "b2wto46y",
  "_$runtime": "res://40f651e9-e34a-4749-940f-a4ecfe53907e",
  "_$type": "Scene",
  "left": 0,
  "right": 0,
  "top": 0,
  "bottom": 0,
  "name": "Scene2D",
  "_$child": [
    {
      "_$id": "r0g34unl",
      "_$type": "Box",
      "name": "Box",
      "y": 100,
      "width": 750,
      "height": 1368,
      "_mouseState": 2,
      "left": 0,
      "right": 0,
      "top": 100,
      "bottom": 0,
      "_$child": [
        {
          "_$id": "fr4mwyn8",
          "_$var": true,
          "_$type": "Box",
          "name": "headBox",
          "x": 116,
          "y": 423,
          "width": 522,
          "height": 522,
          "centerX": 2,
          "centerY": 0,
          "_$child": [
            {
              "_$id": "ta7y0mv4",
              "_$var": true,
              "_$type": "Image",
              "name": "headIcon",
              "x": 5.684341886080802e-14,
              "width": 523,
              "height": 537,
              "color": "#ffffff",
              "_$comp": [
                {
                  "_$type": "39241472-3194-43d3-92ea-5927320caa2f",
                  "scriptPath": "../src/core/logic/TransformIcon.ts",
                  "parentNode": {
                    "_$ref": "fr4mwyn8"
                  },
                  "minScale": 1,
                  "maxScale": 10,
                  "dragSpeed": 2,
                  "flexScale": 0.1,
                  "flexPosition": 100
                }
              ]
            }
          ]
        },
        {
          "_$id": "n5iqo72p",
          "_$var": true,
          "_$type": "Box",
          "name": "maskBox",
          "width": 750,
          "height": 1368,
          "_mouseState": 1,
          "mouseThrough": true,
          "left": 0,
          "right": 0,
          "top": 0,
          "bottom": 0
        },
        {
          "_$id": "49zczxwd",
          "_$var": true,
          "_$type": "Button",
          "name": "sureBtn",
          "x": 175,
          "y": 1176,
          "width": 400,
          "height": 72,
          "_mouseState": 2,
          "bottom": 120,
          "centerX": 0,
          "stateNum": 1,
          "skin": "res://389b096e-8e18-43d1-aa73-d6765721dc18",
          "label": "确定",
          "labelSize": 30,
          "labelBold": true,
          "labelColors": "#000000,#000000,#000000"
        },
        {
          "_$id": "94oahlot",
          "_$var": true,
          "_$type": "Label",
          "name": "tip",
          "x": 182,
          "y": 1036,
          "width": 387,
          "height": 32,
          "bottom": 300,
          "centerX": 0,
          "text": "可双指缩放,单指移动调整图片位置",
          "font": "SimHei",
          "fontSize": 24,
          "color": "rgba(255, 255, 255, 0.4)",
          "align": "center",
          "valign": "middle",
          "padding": "0,0,0,0"
        },
        {
          "_$id": "uo7qrtmp",
          "_$var": true,
          "_$type": "Image",
          "name": "maskheadIcon",
          "x": 61,
          "y": 367,
          "width": 630,
          "height": 634,
          "zOrder": 10,
          "_mouseState": 1,
          "mouseThrough": true,
          "centerX": 1,
          "centerY": 0,
          "skin": "res://9110c8ab-2b8f-4e8b-b52e-965c01e699c1",
          "useSourceSize": true,
          "sizeGrid": "200,200,200,200,0",
          "color": "#ffffff"
        },
        {
          "_$id": "o9im3tut",
          "_$var": true,
          "_$type": "Image",
          "name": "maskbgIcon",
          "x": 22,
          "y": 484,
          "width": 708,
          "height": 400,
          "zOrder": 10,
          "_mouseState": 1,
          "mouseThrough": true,
          "centerX": 1,
          "centerY": 0,
          "skin": "res://32c9c59e-7d10-456d-8699-da5addbadb2c",
          "sizeGrid": "200,200,200,200,0",
          "color": "#ffffff"
        }
      ]
    },
    {
      "_$id": "va7wq7su",
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
          "_$id": "j0u51euk",
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
          "_$id": "z7s9xnjk",
          "_$var": true,
          "_$type": "Label",
          "name": "title",
          "x": 307,
          "y": 33,
          "width": 136,
          "height": 35,
          "centerX": 0,
          "centerY": 0,
          "text": "编辑头像",
          "font": "SimHei",
          "fontSize": 34,
          "color": "#FFFFFF",
          "fitContent": "yes",
          "align": "center",
          "valign": "middle",
          "padding": "0,0,0,0"
        }
      ]
    }
  ]
}