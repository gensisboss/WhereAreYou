{
  "_$ver": 1,
  "_$id": "b2wto46y",
  "_$runtime": "res://73e8eb65-ab15-4707-861d-ae49801c62bb",
  "_$type": "Scene",
  "left": 0,
  "right": 0,
  "top": 0,
  "bottom": 0,
  "name": "Scene2D",
  "_$child": [
    {
      "_$id": "wh3bcfqe",
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
          "_$id": "sduaubux",
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
          "_$id": "4mhalzek",
          "_$type": "Label",
          "name": "title",
          "x": 260,
          "y": 30,
          "width": 231,
          "height": 40,
          "centerX": 0,
          "centerY": 0,
          "text": "选择兴趣",
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
      "_$id": "r0g34unl",
      "_$type": "Box",
      "name": "Box",
      "y": 100,
      "width": 750,
      "height": 1368,
      "mouseEnabled": true,
      "left": 0,
      "right": 0,
      "top": 100,
      "bottom": 0,
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
          "_$id": "x9rn8rll",
          "_$var": true,
          "_$type": "Label",
          "name": "tipNum",
          "x": 32,
          "y": 20,
          "width": 154,
          "height": 28,
          "left": 32,
          "top": 20,
          "text": "已选择类型",
          "font": "SimHei",
          "fontSize": 30,
          "color": "#FFFFFF",
          "ubb": true,
          "html": true,
          "valign": "top",
          "leading": 2,
          "padding": "0,0,0,0"
        },
        {
          "_$id": "3xz6ktj6",
          "_$var": true,
          "_$type": "Box",
          "name": "tabBg",
          "x": 32,
          "y": 100,
          "width": 686,
          "height": 600,
          "mouseEnabled": true,
          "left": 32,
          "right": 32,
          "top": 100,
          "_$child": [
            {
              "_$id": "6lt4u83q",
              "_$var": true,
              "_$type": "List",
              "name": "tabList",
              "width": 686,
              "height": 600,
              "mouseEnabled": true,
              "left": 0,
              "right": 0,
              "top": 0,
              "bottom": 0,
              "itemTemplate": {
                "_$ref": "fuaga2te",
                "_$tmpl": "itemRender"
              },
              "repeatX": 4,
              "repeatY": 3,
              "spaceX": 16,
              "spaceY": 24,
              "_$child": [
                {
                  "_$id": "fuaga2te",
                  "_$type": "Box",
                  "name": "Box",
                  "width": 160,
                  "height": 72,
                  "_$child": [
                    {
                      "_$id": "yzzxnpls",
                      "_$type": "Image",
                      "name": "Image",
                      "width": 160,
                      "height": 72,
                      "left": 0,
                      "right": 0,
                      "top": 0,
                      "bottom": 0,
                      "skin": "res://f4fb321e-d6fe-450d-af02-dcd69d0bdc40",
                      "sizeGrid": "10,20,10,20,0",
                      "color": "#ffffff"
                    },
                    {
                      "_$id": "yvsisurc",
                      "_$type": "Image",
                      "name": "select",
                      "width": 160,
                      "height": 72,
                      "left": 0,
                      "right": 0,
                      "top": 0,
                      "bottom": 0,
                      "skin": "res://b053a107-c80c-40c4-b76d-c7c876d993ec",
                      "sizeGrid": "10,20,10,20,0",
                      "color": "#ffffff"
                    },
                    {
                      "_$id": "smuipvp4",
                      "_$type": "Label",
                      "name": "desc",
                      "width": 160,
                      "height": 72,
                      "left": 0,
                      "right": 0,
                      "top": 0,
                      "bottom": 0,
                      "text": "-",
                      "fontSize": 24,
                      "color": "rgba(255, 255, 255, 1)",
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