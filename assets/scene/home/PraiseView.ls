{
  "_$ver": 1,
  "_$id": "xvoqyyml",
  "_$runtime": "res://072a8126-c0b7-4d7b-b2eb-f63e387d46b5",
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
          "skin": "res://2e59dc89-c34a-4e32-a56f-1747e1c84b4e",
          "color": "#ffffff"
        },
        {
          "_$id": "9s2kw10s",
          "_$type": "Image",
          "name": "Image",
          "x": 228,
          "y": 20,
          "width": 128,
          "height": 128,
          "top": 20,
          "centerX": 0,
          "skin": "res://17d3281c-d63e-466b-afd1-27215c67dee4",
          "useSourceSize": true,
          "color": "#ffffff"
        },
        {
          "_$id": "1bsyth42",
          "_$var": true,
          "_$type": "Label",
          "name": "confirmTip",
          "y": 180,
          "width": 584,
          "height": 40,
          "left": 0,
          "right": 0,
          "top": 180,
          "text": "你获得的很多赞",
          "font": "SimHei",
          "fontSize": 32,
          "color": "rgba(247, 244, 235, 1)",
          "align": "center",
          "valign": "middle",
          "leading": 2,
          "padding": "0,0,0,0"
        },
        {
          "_$id": "7gfs65pz",
          "_$type": "Box",
          "name": "bottomBox",
          "y": 246,
          "width": 584,
          "height": 130,
          "mouseEnabled": true,
          "left": 0,
          "right": 0,
          "bottom": 0,
          "_$child": [
            {
              "_$id": "ddr5cz4z",
              "_$var": true,
              "_$type": "Image",
              "name": "sureBtn",
              "x": 32,
              "y": 25,
              "width": 520,
              "height": 80,
              "mouseEnabled": true,
              "centerX": 0,
              "centerY": 0,
              "skin": "res://9a30bc19-9bd1-4149-bc30-dab294c18a5e",
              "sizeGrid": "20,20,20,20,0",
              "color": "#FFFFFF",
              "_$child": [
                {
                  "_$id": "ugjpaz2u",
                  "_$type": "Label",
                  "name": "Label",
                  "width": 520,
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