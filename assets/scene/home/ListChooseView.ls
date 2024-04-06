{
  "_$ver": 1,
  "_$id": "ki3b5khq",
  "_$runtime": "res://85791e58-aa20-40b9-a1ab-6381f8bdc764",
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
      "delay": true
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
      "y": 1202,
      "width": 750,
      "height": 264,
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
          "height": 200,
          "mouseEnabled": true,
          "left": 0,
          "right": 0,
          "top": 64,
          "bottom": 0,
          "skin": "res://95fd48ce-edc4-4631-8f5a-75221cdac5b2",
          "color": "#ffffff",
          "_$child": [
            {
              "_$id": "weqwll8r",
              "_$var": true,
              "_$type": "List",
              "name": "chooseList",
              "width": 750,
              "height": 100,
              "mouseEnabled": true,
              "left": 0,
              "right": 0,
              "top": 0,
              "itemTemplate": {
                "_$ref": "t81kvcrs",
                "_$tmpl": "itemRender"
              },
              "repeatX": 1,
              "repeatY": 1,
              "_$child": [
                {
                  "_$id": "t81kvcrs",
                  "_$type": "Box",
                  "name": "Box",
                  "width": 750,
                  "height": 100,
                  "_$child": [
                    {
                      "_$id": "18ob1btn",
                      "_$type": "Label",
                      "name": "tip",
                      "width": 750,
                      "height": 100,
                      "left": 0,
                      "right": 0,
                      "top": 0,
                      "bottom": 0,
                      "text": "选项",
                      "font": "SimHei",
                      "fontSize": 30,
                      "color": "#FFFFFF",
                      "bold": true,
                      "align": "center",
                      "valign": "middle",
                      "leading": 2,
                      "padding": "0,0,0,0"
                    }
                  ]
                }
              ]
            },
            {
              "_$id": "m96c91z3",
              "_$var": true,
              "_$type": "Label",
              "name": "cancelBtn",
              "y": 100,
              "width": 750,
              "height": 100,
              "bottom": 0,
              "text": "取消",
              "font": "SimHei",
              "fontSize": 30,
              "color": "#FFFFFF",
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