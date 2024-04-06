{
  "_$ver": 1,
  "_$id": "gwkb1cqw",
  "_$runtime": "res://c0d7ba47-c3dc-4cfd-9f26-b41d55b23e6c",
  "_$preloads": [
    "res://1dfa73c9-5561-45a3-b0dc-cde689b21628",
    "res://a7633dac-b486-419d-beef-8c862e916092",
    "res://9aa44f33-0a30-4a79-bb13-511c7b65b3b4"
  ],
  "_$type": "Scene",
  "left": 0,
  "right": 0,
  "top": 0,
  "bottom": 0,
  "name": "Scene2D",
  "_$child": [
    {
      "_$id": "mtgco55w",
      "_$var": true,
      "_$type": "Box",
      "name": "topBox",
      "width": 750,
      "height": 100,
      "left": 0,
      "right": 0,
      "top": 0,
      "_$child": [
        {
          "_$id": "w7gc410c",
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
          "_$id": "2b8ygfu7",
          "_$var": true,
          "_$type": "Label",
          "name": "title",
          "x": 341,
          "y": 33,
          "width": 68,
          "height": 35,
          "centerX": 0,
          "centerY": 0,
          "text": "搜索",
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
      "_$id": "x835xvsw",
      "_$prefab": "eb88ad76-9dcc-448d-8cde-0b7d3b01add0",
      "_$var": true,
      "name": "searchBox",
      "active": true,
      "x": 32,
      "y": 100,
      "visible": true,
      "left": 32,
      "right": 32,
      "top": 100
    },
    {
      "_$id": "j33ffdkv",
      "_$var": true,
      "_$type": "Box",
      "name": "searchTipBox",
      "y": 200,
      "width": 750,
      "height": 1268,
      "mouseEnabled": true,
      "left": 0,
      "right": 0,
      "top": 200,
      "bottom": 0,
      "_$child": [
        {
          "_$id": "icznsq75",
          "_$var": true,
          "_$type": "Box",
          "name": "historyBox",
          "x": 32,
          "width": 686,
          "height": 260,
          "mouseEnabled": true,
          "left": 32,
          "right": 32,
          "top": 0,
          "_$child": [
            {
              "_$id": "q0jtfyfj",
              "_$type": "Label",
              "name": "Label",
              "width": 120,
              "height": 31,
              "left": 0,
              "top": 0,
              "text": "历史搜索",
              "fontSize": 30,
              "color": "#FFFFFF",
              "fitContent": "yes",
              "valign": "top",
              "leading": 2,
              "padding": "0,0,0,0"
            },
            {
              "_$id": "3v49sjid",
              "_$var": true,
              "_$type": "Image",
              "name": "clearHistory",
              "x": 638,
              "width": 48,
              "height": 48,
              "right": 0,
              "top": 0,
              "skin": "res://2f1645cc-55e2-439e-bc28-1c0aa5b51ce0",
              "useSourceSize": true,
              "color": "#ffffff"
            },
            {
              "_$id": "lcpwlum1",
              "_$var": true,
              "_$type": "Panel",
              "name": "historyPanel",
              "y": 50,
              "width": 686,
              "height": 210,
              "mouseEnabled": true,
              "left": 0,
              "right": 0,
              "top": 50,
              "bottom": 0,
              "scrollType": 3,
              "_$comp": [
                {
                  "_$type": "343b66e3-e3aa-49b5-bf6c-fb0f0fd184a1",
                  "scriptPath": "../src/core/logic/FlowList.ts",
                  "item": {
                    "_$uuid": "257bcc2c-8a45-4b50-92f1-f62bc0741cdf",
                    "_$type": "Prefab"
                  },
                  "spaceX": 10,
                  "spaceY": 10,
                  "isAuto": false
                }
              ]
            }
          ]
        },
        {
          "_$id": "ur8k92td",
          "_$var": true,
          "_$type": "Box",
          "name": "recommendBox",
          "x": 32,
          "y": 300,
          "width": 686,
          "height": 500,
          "mouseEnabled": true,
          "left": 32,
          "right": 32,
          "top": 300,
          "_$child": [
            {
              "_$id": "l7vlkqdv",
              "_$type": "Label",
              "name": "Label",
              "width": 120,
              "height": 31,
              "left": 0,
              "top": 0,
              "text": "猜你想搜",
              "fontSize": 30,
              "color": "#FFFFFF",
              "fitContent": "yes",
              "valign": "top",
              "leading": 2,
              "padding": "0,0,0,0"
            },
            {
              "_$id": "r3yipzwy",
              "_$var": true,
              "_$type": "Image",
              "name": "refreshRecommend",
              "x": 638,
              "width": 48,
              "height": 48,
              "right": 0,
              "top": 0,
              "skin": "res://06c723fd-b2ae-4944-9407-67add8c34136",
              "useSourceSize": true,
              "color": "#ffffff"
            },
            {
              "_$id": "we658hp2",
              "_$var": true,
              "_$type": "List",
              "name": "recommendList",
              "y": 50,
              "width": 686,
              "height": 300,
              "mouseEnabled": true,
              "left": 0,
              "right": 0,
              "top": 50,
              "itemTemplate": {
                "_$ref": "zez2a24j",
                "_$tmpl": "itemRender"
              },
              "repeatX": 2,
              "repeatY": 1,
              "spaceX": 50,
              "_$child": [
                {
                  "_$id": "zez2a24j",
                  "_$type": "Box",
                  "name": "Box",
                  "width": 300,
                  "height": 50,
                  "_$child": [
                    {
                      "_$id": "y89uy0fv",
                      "_$type": "Label",
                      "name": "desc",
                      "width": 300,
                      "height": 50,
                      "left": 0,
                      "right": 0,
                      "top": 0,
                      "bottom": 0,
                      "text": "测试",
                      "fontSize": 24,
                      "color": "#FFFFFF",
                      "valign": "middle",
                      "overflow": "hidden",
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
    },
    {
      "_$id": "63aivkat",
      "_$var": true,
      "_$type": "Box",
      "name": "resultBox",
      "y": 200,
      "width": 750,
      "height": 1268,
      "visible": false,
      "mouseEnabled": true,
      "left": 0,
      "right": 0,
      "top": 200,
      "bottom": 0,
      "_$child": [
        {
          "_$id": "nvaxjflh",
          "_$type": "Box",
          "name": "tabBox",
          "width": 750,
          "height": 80,
          "left": 0,
          "right": 0,
          "top": 0,
          "_$child": [
            {
              "_$id": "m6zm8yeo",
              "_$var": true,
              "_$type": "Label",
              "name": "allSort",
              "x": 100,
              "y": 10,
              "width": 50,
              "height": 36,
              "mouseEnabled": true,
              "top": 10,
              "centerX": -250,
              "text": "全部",
              "fontSize": 24,
              "color": "rgba(153, 153, 153, 1)",
              "align": "center",
              "valign": "middle",
              "leading": 2,
              "padding": "0,0,0,0"
            },
            {
              "_$id": "jq3r7cba",
              "_$var": true,
              "_$type": "Label",
              "name": "userSort",
              "x": 350,
              "y": 10,
              "width": 50,
              "height": 36,
              "mouseEnabled": true,
              "top": 10,
              "centerX": 0,
              "text": "用户",
              "fontSize": 24,
              "color": "rgba(153, 153, 153, 1)",
              "align": "center",
              "valign": "middle",
              "leading": 2,
              "padding": "0,0,0,0"
            },
            {
              "_$id": "1g6ueyii",
              "_$var": true,
              "_$type": "Label",
              "name": "gameSort",
              "x": 600,
              "y": 10,
              "width": 50,
              "height": 36,
              "mouseEnabled": true,
              "top": 10,
              "centerX": 250,
              "text": "游戏",
              "fontSize": 24,
              "color": "rgba(153, 153, 153, 1)",
              "align": "center",
              "valign": "middle",
              "leading": 2,
              "padding": "0,0,0,0"
            },
            {
              "_$id": "znmh1okr",
              "_$type": "Image",
              "name": "Image",
              "x": 32,
              "y": 76,
              "width": 686,
              "height": 2,
              "left": 32,
              "right": 32,
              "bottom": 2,
              "skin": "res://aa64395f-9919-4479-86dc-3462d852ad35",
              "color": "#ffffff"
            },
            {
              "_$id": "gn3cdzkx",
              "_$var": true,
              "_$type": "Image",
              "name": "selectTab",
              "x": 57,
              "y": 78,
              "width": 100,
              "height": 4,
              "anchorY": 1,
              "bottom": 2,
              "skin": "res://cb4c8543-174d-492f-a463-68852ca3e983",
              "color": "#ffffff"
            }
          ]
        },
        {
          "_$id": "8nmat8ot",
          "_$var": true,
          "_$type": "Box",
          "name": "tipNull",
          "x": 225,
          "y": 200,
          "width": 300,
          "height": 240,
          "top": 200,
          "centerX": 0,
          "_$child": [
            {
              "_$id": "1lmwfdkm",
              "_$type": "Image",
              "name": "Image",
              "x": 86,
              "width": 128,
              "height": 128,
              "top": 0,
              "centerX": 0,
              "skin": "res://ec8a2ca8-2ae6-4e25-a4f8-201101b886eb",
              "useSourceSize": true,
              "color": "#ffffff"
            },
            {
              "_$id": "4dl00g7h",
              "_$type": "Label",
              "name": "Label",
              "x": 90,
              "y": 212,
              "width": 120,
              "height": 28,
              "bottom": 0,
              "centerX": 0,
              "text": "暂无数据",
              "fontSize": 30,
              "color": "rgba(46, 50, 56, 1)",
              "align": "center",
              "valign": "middle",
              "leading": 2,
              "padding": "0,0,0,0"
            }
          ]
        },
        {
          "_$id": "d3s6ydst",
          "_$var": true,
          "_$type": "Panel",
          "name": "resultList",
          "y": 80,
          "width": 750,
          "height": 1188,
          "mouseEnabled": true,
          "top": 80,
          "bottom": 0,
          "scrollType": 2,
          "_$comp": [
            {
              "_$type": "343b66e3-e3aa-49b5-bf6c-fb0f0fd184a1",
              "scriptPath": "../src/core/logic/FlowList.ts",
              "item": {
                "_$uuid": "9aa44f33-0a30-4a79-bb13-511c7b65b3b4",
                "_$type": "Prefab"
              },
              "spaceX": 10,
              "spaceY": 10,
              "isAuto": false
            },
            {
              "_$type": "9aa8e3ac-f8d8-47eb-8c32-0c3e44fdf023",
              "scriptPath": "../src/core/logic/MultiListRefresh.ts",
              "listTopLimit": -65,
              "listBottomLimit": 65
            }
          ]
        }
      ]
    }
  ]
}