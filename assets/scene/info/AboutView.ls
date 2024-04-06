{
  "_$ver": 1,
  "_$id": "ss02jkp3",
  "_$runtime": "res://23c25a52-2e0d-4e55-b1d6-1d0e79dcbffd",
  "_$type": "Scene",
  "left": 0,
  "right": 0,
  "top": 0,
  "bottom": 0,
  "name": "Scene2D",
  "autoDestroyAtClosed": true,
  "_$child": [
    {
      "_$id": "0j8d1dml",
      "_$type": "Box",
      "name": "infoBox",
      "y": 100,
      "width": 750,
      "height": 1368,
      "_mouseState": 2,
      "top": 100,
      "bottom": 0,
      "_$child": [
        {
          "_$id": "64mdm5qg",
          "_$type": "Image",
          "name": "Image",
          "x": 319,
          "y": 100,
          "width": 112,
          "height": 112,
          "top": 100,
          "centerX": 0,
          "skin": "res://fa2db8fe-3b02-4ddd-a194-8348d8b898f3",
          "useSourceSize": true,
          "color": "#ffffff"
        },
        {
          "_$id": "1e5ihx4r",
          "_$var": true,
          "_$type": "List",
          "name": "contentList",
          "y": 320,
          "width": 750,
          "height": 574,
          "_mouseState": 2,
          "left": 0,
          "right": 0,
          "top": 320,
          "itemTemplate": {
            "_$ref": "33tvjxxf",
            "_$tmpl": "itemRender"
          },
          "repeatX": 1,
          "repeatY": 4,
          "elasticEnabled": true,
          "spaceX": 16,
          "_$child": [
            {
              "_$id": "33tvjxxf",
              "_$type": "Box",
              "name": "Box",
              "width": 750,
              "height": 96,
              "_mouseState": 2,
              "_$child": [
                {
                  "_$id": "9regbvbj",
                  "_$type": "Label",
                  "name": "title",
                  "x": 32,
                  "y": 18,
                  "width": 141,
                  "height": 60,
                  "left": 32,
                  "centerY": 0,
                  "text": "-",
                  "font": "SimHei",
                  "fontSize": 28,
                  "color": "rgba(255, 255, 255, 1)",
                  "valign": "middle",
                  "padding": "0,0,0,0",
                  "underlineColor": "rgba(255, 255, 255, 1)"
                },
                {
                  "_$id": "7ryvf1hs",
                  "_$type": "Label",
                  "name": "desc",
                  "x": 266,
                  "y": 18,
                  "width": 394,
                  "height": 60,
                  "_mouseState": 2,
                  "right": 90,
                  "centerY": 0,
                  "text": "",
                  "font": "SimHei",
                  "fontSize": 24,
                  "color": "rgba(204, 204, 204, 1)",
                  "align": "right",
                  "overflow": "ellipsis",
                  "wordWrap": true,
                  "padding": "2,6,2,6"
                },
                {
                  "_$id": "p9pcd6pg",
                  "_$type": "Image",
                  "name": "copy",
                  "x": 668,
                  "y": 23,
                  "width": 50,
                  "height": 50,
                  "right": 32,
                  "centerY": 0,
                  "skin": "res://f99c9dee-16c1-4e72-b397-93ea1be2e87e",
                  "useSourceSize": true,
                  "color": "#ffffff"
                }
              ]
            }
          ]
        },
        {
          "_$id": "d98neadm",
          "_$var": true,
          "_$type": "Label",
          "name": "version",
          "y": 1140,
          "width": 750,
          "height": 28,
          "left": 0,
          "right": 0,
          "bottom": 200,
          "text": "-",
          "font": "SimHei",
          "fontSize": 22,
          "color": "rgba(128, 128, 128, 1)",
          "align": "center",
          "valign": "middle",
          "padding": "0,0,0,0"
        }
      ]
    },
    {
      "_$id": "csz6tbb6",
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
          "_$id": "w57mofu6",
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
          "_$id": "fwbk3bus",
          "_$type": "Label",
          "name": "title",
          "x": 260,
          "y": 30,
          "width": 231,
          "height": 40,
          "centerX": 0,
          "centerY": 0,
          "text": "关于产品",
          "font": "SimHei",
          "fontSize": 34,
          "color": "#FFFFFF",
          "align": "center",
          "valign": "middle",
          "padding": "0,0,0,0"
        }
      ]
    }
  ]
}