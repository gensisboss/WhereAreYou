{
  "_$ver": 1,
  "_$id": "ss02jkp3",
  "_$runtime": "res://7c9a3368-43cf-4b26-9e70-6a909afe9d6b",
  "_$type": "Scene",
  "left": 0,
  "right": 0,
  "top": 0,
  "bottom": 0,
  "name": "Scene2D",
  "autoDestroyAtClosed": true,
  "_$child": [
    {
      "_$id": "csz6tbb6",
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
          "text": "编辑个人资料",
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
      "_$id": "9flql3f0",
      "_$var": true,
      "_$type": "Box",
      "name": "infoBox",
      "y": 100,
      "width": 750,
      "height": 400,
      "left": 0,
      "right": 0,
      "top": 100,
      "_$child": [
        {
          "_$id": "jnivxetr",
          "_$prefab": "2b2bf7b0-babc-40cd-9e91-27a5bfd58c51",
          "_$var": true,
          "name": "head",
          "active": true,
          "x": 295,
          "y": 120,
          "visible": true,
          "bottom": 120,
          "centerX": 0,
          "width": 160,
          "height": 160
        },
        {
          "_$id": "2tvfjc20",
          "_$type": "Label",
          "name": "tip",
          "x": 282,
          "y": 322,
          "width": 187,
          "height": 28,
          "bottom": 50,
          "centerX": 0,
          "text": "点击更换头像",
          "font": "SimHei",
          "fontSize": 22,
          "color": "rgba(128, 128, 128, 1)",
          "align": "center",
          "valign": "middle",
          "leading": 2,
          "padding": "0,0,0,0"
        }
      ]
    },
    {
      "_$id": "0j8d1dml",
      "_$type": "Box",
      "name": "infoBox",
      "y": 500,
      "width": 750,
      "height": 968,
      "mouseEnabled": true,
      "top": 500,
      "bottom": 0,
      "_$child": [
        {
          "_$id": "1e5ihx4r",
          "_$var": true,
          "_$type": "List",
          "name": "editList",
          "x": 55,
          "width": 640,
          "height": 242,
          "mouseEnabled": true,
          "top": 0,
          "centerX": 0,
          "itemTemplate": {
            "_$ref": "33tvjxxf",
            "_$tmpl": "itemRender"
          },
          "repeatX": 1,
          "repeatY": 2,
          "elasticEnabled": true,
          "spaceX": 16,
          "_$child": [
            {
              "_$id": "33tvjxxf",
              "_$type": "Box",
              "name": "Box",
              "width": 640,
              "height": 120,
              "mouseEnabled": true,
              "_$child": [
                {
                  "_$id": "9regbvbj",
                  "_$type": "Label",
                  "name": "title",
                  "x": 10,
                  "y": 46,
                  "width": 57,
                  "height": 28,
                  "left": 10,
                  "centerY": 0,
                  "text": "账号",
                  "font": "SimHei",
                  "fontSize": 28,
                  "color": "rgba(255, 255, 255, 1)",
                  "valign": "top",
                  "leading": 2,
                  "padding": "0,0,0,0",
                  "underlineColor": "rgba(255, 255, 255, 1)"
                },
                {
                  "_$id": "w3h3hegy",
                  "_$type": "TextInput",
                  "name": "desc",
                  "x": 90,
                  "y": 46,
                  "width": 500,
                  "height": 28,
                  "mouseEnabled": true,
                  "right": 50,
                  "centerY": 0,
                  "text": "",
                  "fontSize": 26,
                  "color": "rgba(204, 204, 204, 1)",
                  "align": "right",
                  "valign": "middle",
                  "overflow": "ellipsis",
                  "leading": 2,
                  "padding": "2,6,2,6",
                  "type": "text",
                  "maxChars": 10,
                  "prompt": "请输入描述信息",
                  "promptColor": "rgba(128, 128, 128, 1)"
                },
                {
                  "_$id": "p9pcd6pg",
                  "_$type": "Image",
                  "name": "edit",
                  "x": 582,
                  "y": 36,
                  "width": 48,
                  "height": 48,
                  "right": 10,
                  "centerY": 0,
                  "skin": "res://cb0d8329-2f82-4b33-b193-2a7571c0a215",
                  "useSourceSize": true,
                  "color": "#ffffff"
                },
                {
                  "_$id": "rwwgiq63",
                  "_$type": "Panel",
                  "name": "list",
                  "x": 490,
                  "y": 46,
                  "width": 100,
                  "height": 28,
                  "mouseEnabled": true,
                  "right": 50,
                  "centerY": 0,
                  "scrollType": 1,
                  "_$comp": [
                    {
                      "_$type": "343b66e3-e3aa-49b5-bf6c-fb0f0fd184a1",
                      "scriptPath": "../src/core/logic/FlowList.ts",
                      "item": {
                        "_$uuid": "62f19bdc-5618-44c4-b019-65fadf7ec419",
                        "_$type": "Prefab"
                      },
                      "spaceX": 5,
                      "spaceY": 10,
                      "isAuto": false
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "_$id": "rwfseoet",
          "_$type": "Label",
          "name": "Label",
          "x": 65,
          "y": 470,
          "width": 620,
          "height": 28,
          "centerX": 0,
          "centerY": 0,
          "text": "简介",
          "font": "SimHei",
          "fontSize": 28,
          "color": "rgba(255, 255, 255, 1)",
          "valign": "top",
          "leading": 2,
          "padding": "0,0,0,0"
        },
        {
          "_$id": "ln2qatvp",
          "_$var": true,
          "_$type": "TextInput",
          "name": "sloganInput",
          "x": 55,
          "y": 300,
          "width": 640,
          "height": 398,
          "mouseEnabled": true,
          "top": 300,
          "bottom": 270,
          "centerX": 0,
          "text": "",
          "font": "SimHei",
          "fontSize": 26,
          "color": "rgba(204, 204, 204, 1)",
          "valign": "top",
          "overflow": "scroll",
          "wordWrap": true,
          "leading": 18,
          "padding": "20,20,20,20",
          "skin": "res://0d175ee6-9e77-4aa0-9496-27e56c72ac7a",
          "sizeGrid": "20,20,20,20,0",
          "type": "text",
          "maxChars": 50,
          "prompt": "点击可直接编辑简介",
          "promptColor": "rgba(128, 128, 128, 1)",
          "multiline": true,
          "_$child": [
            {
              "_$id": "7k1kvb42",
              "_$var": true,
              "_$type": "Label",
              "name": "sloganNum",
              "x": 540,
              "y": 360,
              "width": 90,
              "height": 28,
              "right": 10,
              "bottom": 10,
              "text": "0/50",
              "fontSize": 24,
              "color": "rgba(46, 50, 56, 1)",
              "align": "right",
              "valign": "top",
              "leading": 2,
              "padding": "0,0,0,0"
            }
          ]
        },
        {
          "_$id": "21tpkct0",
          "_$var": true,
          "_$type": "Button",
          "name": "saveBtn",
          "x": 55,
          "y": 788,
          "width": 640,
          "height": 80,
          "mouseEnabled": true,
          "bottom": 100,
          "centerX": 0,
          "stateNum": 1,
          "skin": "res://389b096e-8e18-43d1-aa73-d6765721dc18",
          "sizeGrid": "15,30,15,30,0",
          "label": "保存",
          "labelFont": "SimHei",
          "labelSize": 30,
          "labelBold": true,
          "labelColors": "#000000,#000000,#000000",
          "labelVAlign": "middle"
        }
      ]
    }
  ]
}