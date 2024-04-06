{
  "_$ver": 1,
  "_$id": "xvoqyyml",
  "_$runtime": "res://1396d044-783e-4558-a4c6-bd88c8283563",
  "_$type": "Scene",
  "left": 0,
  "right": 0,
  "top": 0,
  "bottom": 0,
  "name": "Scene2D",
  "_$comp": [
    {
      "_$type": "52a1f43c-8458-4cd2-af95-4a61b3d4cef8",
      "scriptPath": "../src/core/logic/FloatWindow.ts",
      "maskBox": {
        "_$ref": "radko84q"
      },
      "dragBox": {
        "_$ref": "86pwqr3m"
      },
      "dragImage": {
        "_$ref": "lim5l1bu"
      }
    }
  ],
  "_$child": [
    {
      "_$id": "radko84q",
      "_$type": "Box",
      "name": "bg",
      "width": 750,
      "height": 1468,
      "zOrder": 10,
      "mouseEnabled": true,
      "left": 0,
      "right": 0,
      "top": 0,
      "bottom": 0
    },
    {
      "_$id": "86pwqr3m",
      "_$var": true,
      "_$type": "Box",
      "name": "dragBox",
      "x": 245,
      "y": 662,
      "width": 260,
      "height": 144,
      "zOrder": 100,
      "mouseEnabled": true,
      "_$child": [
        {
          "_$id": "lim5l1bu",
          "_$type": "Image",
          "name": "topBg",
          "width": 260,
          "height": 72,
          "mouseEnabled": true,
          "left": 0,
          "right": 0,
          "top": 0,
          "skin": "res://edac4e8b-7a6a-4980-a390-c4a0bea42125",
          "sizeGrid": "30,20,0,20,0",
          "color": "#ffffff",
          "_$child": [
            {
              "_$id": "1bsyth42",
              "_$var": true,
              "_$type": "Label",
              "name": "title",
              "width": 260,
              "height": 72,
              "left": 0,
              "right": 0,
              "top": 0,
              "bottom": 0,
              "text": "菜单",
              "font": "SimHei",
              "fontSize": 24,
              "color": "rgba(247, 244, 235, 1)",
              "align": "center",
              "valign": "middle",
              "leading": 2,
              "padding": "0,0,0,0"
            }
          ]
        },
        {
          "_$id": "mr02k9ti",
          "_$var": true,
          "_$type": "List",
          "name": "menuList",
          "y": 72,
          "width": 260,
          "height": 72,
          "mouseEnabled": true,
          "left": 0,
          "right": 0,
          "top": 72,
          "bottom": 0,
          "itemTemplate": {
            "_$ref": "t6p5dbjq",
            "_$tmpl": "itemRender"
          },
          "repeatX": 1,
          "repeatY": 1,
          "_$child": [
            {
              "_$id": "t6p5dbjq",
              "_$type": "Box",
              "name": "Box",
              "width": 260,
              "height": 72,
              "_$child": [
                {
                  "_$id": "x0b0iw90",
                  "_$type": "Image",
                  "name": "bg",
                  "width": 260,
                  "height": 72,
                  "left": 0,
                  "right": 0,
                  "top": 0,
                  "bottom": 0,
                  "skin": "res://091c4615-f116-4cdf-b851-8609beadbe7d",
                  "sizeGrid": "0,20,30,20,0",
                  "color": "#ffffff"
                },
                {
                  "_$id": "bl0eo2dl",
                  "_$type": "Label",
                  "name": "desc",
                  "width": 260,
                  "height": 72,
                  "left": 0,
                  "right": 0,
                  "top": 0,
                  "bottom": 0,
                  "text": "-",
                  "font": "SimHei",
                  "fontSize": 24,
                  "color": "#FFFFFF",
                  "align": "center",
                  "valign": "middle",
                  "leading": 2,
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