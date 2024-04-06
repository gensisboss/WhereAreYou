{
  "_$ver": 1,
  "_$id": "xvoqyyml",
  "_$runtime": "res://4c2d652a-c64c-4e25-b506-e0c6c399c479",
  "_$type": "Scene",
  "left": 0,
  "right": 0,
  "top": 0,
  "bottom": 0,
  "name": "Scene2D",
  "_$comp": [
    {
      "_$type": "2c062f61-fa69-49f2-8a12-68537201c3b8",
      "scriptPath": "../src/core/logic/DragDialog.ts",
      "maskBox": {
        "_$ref": "f356hs3a"
      },
      "tweenType": "Center",
      "tweenTime": 300,
      "dragBox": {
        "_$ref": "86pwqr3m"
      },
      "dragImage": {
        "_$ref": "lim5l1bu"
      },
      "auto": false,
      "delay": false
    }
  ],
  "_$child": [
    {
      "_$id": "f356hs3a",
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
      "_$id": "86pwqr3m",
      "_$var": true,
      "_$type": "Box",
      "name": "dragBox",
      "x": 375,
      "y": 734,
      "width": 584,
      "height": 376,
      "anchorX": 0.5,
      "anchorY": 0.5,
      "mouseEnabled": true,
      "_$child": [
        {
          "_$id": "lim5l1bu",
          "_$type": "Image",
          "name": "dragBg",
          "width": 584,
          "height": 376,
          "mouseEnabled": true,
          "left": 0,
          "right": 0,
          "top": 0,
          "bottom": 0,
          "skin": "res://ce850797-5e1f-43d4-890b-e9b36828b6ea",
          "color": "#ffffff"
        },
        {
          "_$id": "1bsyth42",
          "_$var": true,
          "_$type": "Label",
          "name": "confirmTip",
          "x": 32,
          "y": 1,
          "width": 520,
          "height": 255,
          "left": 32,
          "right": 32,
          "top": 1,
          "bottom": 120,
          "text": "这里是描述文字",
          "font": "SimHei",
          "fontSize": 30,
          "color": "rgba(247, 244, 235, 1)",
          "align": "center",
          "valign": "middle",
          "wordWrap": true,
          "leading": 2,
          "padding": "0,0,0,0"
        },
        {
          "_$id": "c7h6cklg",
          "_$var": true,
          "_$type": "Image",
          "name": "closeBtn",
          "x": 520,
          "y": 20,
          "width": 44,
          "height": 44,
          "right": 20,
          "top": 20,
          "skin": "res://8585de3f-e3de-41b4-8797-a978497cdf6e",
          "color": "#ffffff"
        },
        {
          "_$id": "7gfs65pz",
          "_$type": "Box",
          "name": "bottomBox",
          "y": 256,
          "width": 584,
          "height": 120,
          "mouseEnabled": true,
          "left": 0,
          "right": 0,
          "bottom": 0,
          "_$child": [
            {
              "_$id": "2lcwcnd6",
              "_$var": true,
              "_$type": "Image",
              "name": "cancelBtn",
              "x": 38,
              "y": 20,
              "width": 208,
              "height": 80,
              "mouseEnabled": true,
              "centerX": -150,
              "centerY": 0,
              "skin": "res://a0f7a109-4e04-4afe-8182-9e89ee68043b",
              "sizeGrid": "20,20,20,20,0",
              "color": "#FFFFFF",
              "_$child": [
                {
                  "_$id": "0o5u92s9",
                  "_$type": "Label",
                  "name": "Label",
                  "width": 208,
                  "height": 80,
                  "left": 0,
                  "right": 0,
                  "top": 0,
                  "bottom": 0,
                  "text": "取消",
                  "font": "SimHei",
                  "fontSize": 28,
                  "color": "rgba(252, 220, 42, 1)",
                  "align": "center",
                  "valign": "middle",
                  "leading": 2,
                  "padding": "0,0,0,0"
                }
              ]
            },
            {
              "_$id": "ddr5cz4z",
              "_$var": true,
              "_$type": "Image",
              "name": "sureBtn",
              "x": 264,
              "y": 20,
              "width": 296,
              "height": 80,
              "mouseEnabled": true,
              "centerX": 120,
              "centerY": 0,
              "skin": "res://9a30bc19-9bd1-4149-bc30-dab294c18a5e",
              "sizeGrid": "20,20,20,20,0",
              "color": "#FFFFFF",
              "_$child": [
                {
                  "_$id": "ugjpaz2u",
                  "_$type": "Label",
                  "name": "Label",
                  "width": 296,
                  "height": 80,
                  "left": 0,
                  "right": 0,
                  "top": 0,
                  "bottom": 0,
                  "text": "确定",
                  "font": "SimHei",
                  "fontSize": 28,
                  "color": "rgba(24, 26, 32, 1)",
                  "bold": true,
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