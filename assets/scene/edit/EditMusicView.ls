{
  "_$ver": 1,
  "_$id": "ki3b5khq",
  "_$runtime": "res://0790d68c-60bd-4ebd-b43f-44a9f0317e5e",
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
      "_$type": "Box",
      "name": "dragBox",
      "y": 1168,
      "width": 750,
      "height": 300,
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
          "_$id": "irgjidlf",
          "_$type": "Image",
          "name": "Image",
          "y": 64,
          "width": 750,
          "height": 236,
          "mouseEnabled": true,
          "left": 0,
          "right": 0,
          "top": 64,
          "bottom": 0,
          "skin": "res://95fd48ce-edc4-4631-8f5a-75221cdac5b2",
          "color": "#ffffff",
          "_$child": [
            {
              "_$id": "bj29qb9h",
              "_$type": "Box",
              "name": "musicBox",
              "width": 750,
              "height": 120,
              "left": 0,
              "right": 0,
              "top": 0,
              "_$child": [
                {
                  "_$id": "czorivjh",
                  "_$type": "Animation",
                  "name": "musicAni",
                  "x": 60,
                  "y": 20,
                  "width": 70,
                  "height": 70,
                  "source": "res://8d310237-3559-4815-9f18-e6cc4cae13ba",
                  "interval": 50,
                  "autoPlay": true,
                  "index": 4
                },
                {
                  "_$id": "irq5b5ge",
                  "_$var": true,
                  "_$type": "Label",
                  "name": "musicName",
                  "x": 150,
                  "y": 16,
                  "width": 492,
                  "height": 28,
                  "left": 150,
                  "centerY": -30,
                  "text": "音乐昵称",
                  "font": "SimHei",
                  "fontSize": 24,
                  "color": "#FFFFFF",
                  "valign": "top",
                  "leading": 2,
                  "padding": "0,0,0,0"
                },
                {
                  "_$id": "7sv2xu6x",
                  "_$var": true,
                  "_$type": "Label",
                  "name": "musicDesc",
                  "x": 150,
                  "y": 41,
                  "width": 492,
                  "height": 59,
                  "left": 150,
                  "centerY": 10,
                  "text": "音乐描述",
                  "font": "SimHei",
                  "fontSize": 20,
                  "color": "rgba(153, 153, 153, 1)",
                  "valign": "middle",
                  "wordWrap": true,
                  "leading": 2,
                  "padding": "0,0,0,0"
                }
              ]
            },
            {
              "_$id": "o5id6ff3",
              "_$type": "Box",
              "name": "bottomBox",
              "y": 126,
              "width": 750,
              "height": 100,
              "mouseEnabled": true,
              "left": 0,
              "right": 0,
              "bottom": 10,
              "_$child": [
                {
                  "_$id": "afxgoald",
                  "_$var": true,
                  "_$type": "Image",
                  "name": "cancelBtn",
                  "x": 55,
                  "y": 14,
                  "width": 300,
                  "height": 72,
                  "mouseEnabled": true,
                  "centerX": -170,
                  "centerY": 0,
                  "skin": "res://a0f7a109-4e04-4afe-8182-9e89ee68043b",
                  "sizeGrid": "20,20,20,20,0",
                  "color": "#FFFFFF",
                  "_$child": [
                    {
                      "_$id": "5rm1az0z",
                      "_$type": "Label",
                      "name": "Label",
                      "width": 300,
                      "height": 72,
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
                  "_$id": "eetik27u",
                  "_$var": true,
                  "_$type": "Image",
                  "name": "sureBtn",
                  "x": 395,
                  "y": 14,
                  "width": 300,
                  "height": 72,
                  "mouseEnabled": true,
                  "centerX": 170,
                  "centerY": 0,
                  "skin": "res://9a30bc19-9bd1-4149-bc30-dab294c18a5e",
                  "sizeGrid": "20,20,20,20,0",
                  "color": "#FFFFFF",
                  "_$child": [
                    {
                      "_$id": "xhkc7yj7",
                      "_$type": "Label",
                      "name": "Label",
                      "width": 300,
                      "height": 72,
                      "left": 0,
                      "right": 0,
                      "top": 0,
                      "bottom": 0,
                      "text": "使用",
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
  ]
}