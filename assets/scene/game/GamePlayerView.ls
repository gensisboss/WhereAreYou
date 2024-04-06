{
  "_$ver": 1,
  "_$id": "zkbbjoq7",
  "_$runtime": "res://9ecc6150-d4f0-4a08-894c-feb5070c68e8",
  "_$type": "Scene",
  "left": 0,
  "right": 0,
  "top": 0,
  "bottom": 0,
  "name": "Scene2D",
  "autoDestroyAtClosed": true,
  "_$child": [
    {
      "_$id": "5jt5wyy2",
      "_$var": true,
      "_$type": "Box",
      "name": "topBox",
      "width": 750,
      "height": 200,
      "zOrder": 1,
      "_mouseState": 2,
      "mouseThrough": true,
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
          "_$id": "d6bm1bbe",
          "_$var": true,
          "_$type": "Button",
          "name": "backBtn",
          "x": 40,
          "y": 30,
          "width": 72,
          "height": 72,
          "_mouseState": 2,
          "left": 40,
          "top": 30,
          "stateNum": 1,
          "skin": "res://814d06e6-ff5a-41b5-a23a-6de59dcd6428",
          "sizeGrid": "0,0,0,0,0",
          "label": "",
          "labelSize": 20
        },
        {
          "_$id": "kq66jbjx",
          "_$type": "Box",
          "name": "starBg",
          "x": 530,
          "y": 30,
          "width": 200,
          "height": 64,
          "_mouseState": 1,
          "mouseThrough": true,
          "right": 20,
          "top": 30,
          "_$child": [
            {
              "_$id": "sl1kfa86",
              "_$var": true,
              "_$type": "List",
              "name": "starList",
              "x": 105,
              "y": 32,
              "width": 170,
              "height": 44,
              "anchorX": 0.5,
              "anchorY": 0.5,
              "_mouseState": 2,
              "right": 10,
              "centerY": 0,
              "itemTemplate": {
                "_$ref": "lo9q21bg",
                "_$tmpl": "itemRender"
              },
              "repeatX": 3,
              "repeatY": 1,
              "elasticEnabled": true,
              "spaceX": 16,
              "_$child": [
                {
                  "_$id": "lo9q21bg",
                  "_$type": "Box",
                  "name": "Box",
                  "width": 44,
                  "height": 44,
                  "zOrder": 1,
                  "_mouseState": 2,
                  "_$child": [
                    {
                      "_$id": "4pfwk6x5",
                      "_$type": "Button",
                      "name": "star",
                      "y": 2,
                      "width": 44,
                      "height": 42,
                      "_mouseState": 2,
                      "left": 0,
                      "right": 0,
                      "top": 2,
                      "bottom": 0,
                      "stateNum": 2,
                      "skin": "res://bd3a4b0a-e135-499a-8731-1a596eaf1dd1",
                      "sizeGrid": "0,0,0,0,0",
                      "label": "",
                      "labelSize": 20
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "_$id": "ex0ntimr",
          "_$var": true,
          "_$type": "Image",
          "name": "timeBg",
          "x": 150,
          "y": 30,
          "width": 198,
          "height": 72,
          "_mouseState": 1,
          "mouseThrough": true,
          "left": 150,
          "top": 30,
          "skin": "res://56551a13-6d9f-4f1e-8c6f-c53f5bd74eef",
          "sizeGrid": "20,20,20,100,0",
          "color": "#ffffff",
          "_$child": [
            {
              "_$id": "s6k3i7zq",
              "_$var": true,
              "_$type": "Label",
              "name": "timeDown",
              "x": 60,
              "y": 10,
              "width": 138,
              "height": 52,
              "left": 60,
              "right": 0,
              "top": 10,
              "bottom": 10,
              "text": "00:60",
              "font": "SimHei",
              "fontSize": 32,
              "color": "#FFFFFF",
              "align": "center",
              "valign": "middle",
              "padding": "0,0,0,0"
            },
            {
              "_$id": "mb92lqbj",
              "_$var": true,
              "_$type": "Image",
              "name": "timeCircle",
              "x": 35,
              "y": 36,
              "width": 60,
              "height": 60,
              "anchorX": 0.5,
              "anchorY": 0.5,
              "left": 5,
              "centerY": 0,
              "skin": "res://c67541ff-f5da-44c8-b089-993a4ed2e374",
              "color": "#ffffff"
            }
          ]
        },
        {
          "_$id": "b27csmxk",
          "_$var": true,
          "_$type": "TextInput",
          "name": "gameTarget",
          "y": 120,
          "width": 750,
          "height": 80,
          "_mouseState": 1,
          "mouseThrough": true,
          "bottom": 0,
          "centerX": 0,
          "text": "游戏目标",
          "font": "SimHei",
          "fontSize": 32,
          "color": "#FFFFFF",
          "align": "center",
          "valign": "middle",
          "overflow": "scroll",
          "padding": "0,0,0,0",
          "stroke": 5,
          "skin": "res://6777b910-bb0a-4b62-801e-009581d1ae29",
          "maxChars": 0,
          "prompt": "",
          "promptColor": "#A9A9A9",
          "editable": false
        }
      ]
    },
    {
      "_$id": "95ad6llp",
      "_$var": true,
      "_$type": "Box",
      "name": "middleBox",
      "width": 750,
      "height": 1468,
      "_mouseState": 2,
      "left": 0,
      "right": 0,
      "top": 0,
      "bottom": 0,
      "bgColor": "rgba(0, 0, 0, 1)",
      "_$child": [
        {
          "_$id": "21nffmbx",
          "_$var": true,
          "_$type": "Box",
          "name": "gameBox",
          "width": 750,
          "height": 1468,
          "_mouseState": 2,
          "left": 0,
          "top": 0,
          "_$child": [
            {
              "_$id": "va32occu",
              "_$var": true,
              "_$type": "Image",
              "name": "gameIcon",
              "width": 640,
              "height": 1136,
              "skin": "res://26fd2082-3f7b-4009-841f-7a709adb90bb",
              "useSourceSize": true,
              "color": "#ffffff",
              "_$comp": [
                {
                  "_$type": "39241472-3194-43d3-92ea-5927320caa2f",
                  "scriptPath": "../src/core/logic/TransformIcon.ts",
                  "parentNode": {
                    "_$ref": "21nffmbx"
                  },
                  "minScale": 1,
                  "maxScale": 5,
                  "dragSpeed": 3,
                  "flexScale": 0.1,
                  "flexPosition": 300
                }
              ]
            },
            {
              "_$id": "osajqqi2",
              "_$var": true,
              "_$type": "Box",
              "name": "chooseBox",
              "width": 200,
              "height": 200,
              "zOrder": 1
            },
            {
              "_$id": "luihxipj",
              "_$var": true,
              "_$type": "VBox",
              "name": "toolBox",
              "x": 600,
              "y": 584,
              "width": 150,
              "height": 300,
              "zOrder": 2,
              "_mouseState": 2,
              "right": 0,
              "centerY": 0,
              "space": 10,
              "align": "center",
              "_$child": [
                {
                  "_$id": "gsz0z2dv",
                  "_$var": true,
                  "_$type": "Box",
                  "name": "helpBox",
                  "x": 15,
                  "width": 120,
                  "height": 120,
                  "_mouseState": 2,
                  "_$child": [
                    {
                      "_$id": "wqljbrxx",
                      "_$type": "Button",
                      "name": "icon",
                      "x": 24,
                      "y": 4,
                      "width": 72,
                      "height": 72,
                      "_mouseState": 2,
                      "centerX": 0,
                      "centerY": -20,
                      "stateNum": 2,
                      "skin": "res://5383da68-8888-41fd-896b-fc7b08b2bcdf",
                      "label": "",
                      "labelSize": 20,
                      "labelColors": "#ff0000,#ff0000,#ff0000",
                      "labelPadding": "70,0,0,0"
                    },
                    {
                      "_$id": "a8yum6cj",
                      "_$type": "Image",
                      "name": "Image",
                      "y": 84,
                      "width": 120,
                      "height": 36,
                      "_mouseState": 2,
                      "bottom": 0,
                      "centerX": 0,
                      "skin": "res://32ba330e-d39c-46d9-bb4c-ef501cd84731",
                      "useSourceSize": true,
                      "color": "#ffffff",
                      "_$child": [
                        {
                          "_$id": "t9h0kq8w",
                          "_$var": true,
                          "_$type": "Label",
                          "name": "helpNum",
                          "x": 20,
                          "width": 100,
                          "height": 36,
                          "left": 20,
                          "right": 0,
                          "top": 0,
                          "bottom": 0,
                          "text": "放大镜",
                          "font": "SimHei",
                          "fontSize": 20,
                          "color": "rgba(255, 255, 255, 1)",
                          "align": "center",
                          "valign": "middle",
                          "padding": "0,0,0,0"
                        },
                        {
                          "_$id": "xh2c6vcc",
                          "_$type": "Button",
                          "name": "Button",
                          "width": 36,
                          "height": 36,
                          "_mouseState": 2,
                          "left": 0,
                          "centerY": 0,
                          "stateNum": 2,
                          "selected": true,
                          "skin": "res://a8febe84-e5e9-4747-8fe4-0eff5e038f93",
                          "label": "",
                          "labelSize": 20
                        }
                      ]
                    }
                  ]
                },
                {
                  "_$id": "r7x2jflw",
                  "_$var": true,
                  "_$type": "Box",
                  "name": "timeBox",
                  "x": 15,
                  "y": 130,
                  "width": 120,
                  "height": 120,
                  "_mouseState": 2,
                  "_$child": [
                    {
                      "_$id": "bxrwoj5i",
                      "_$type": "Button",
                      "name": "icon",
                      "x": 24,
                      "y": 4,
                      "width": 72,
                      "height": 72,
                      "_mouseState": 2,
                      "centerX": 0,
                      "centerY": -20,
                      "stateNum": 2,
                      "skin": "res://2759a51b-7f33-4e1c-86fc-85271287f77f",
                      "label": "",
                      "labelSize": 20
                    },
                    {
                      "_$id": "fqldx5w4",
                      "_$type": "Image",
                      "name": "Image",
                      "y": 84,
                      "width": 120,
                      "height": 36,
                      "_mouseState": 2,
                      "bottom": 0,
                      "centerX": 0,
                      "skin": "res://32ba330e-d39c-46d9-bb4c-ef501cd84731",
                      "useSourceSize": true,
                      "color": "#ffffff",
                      "_$child": [
                        {
                          "_$id": "ofcstuo7",
                          "_$var": true,
                          "_$type": "Label",
                          "name": "timeNum",
                          "x": 20,
                          "width": 100,
                          "height": 36,
                          "left": 20,
                          "right": 0,
                          "top": 0,
                          "bottom": 0,
                          "text": "沙漏",
                          "font": "SimHei",
                          "fontSize": 20,
                          "color": "rgba(255, 255, 255, 1)",
                          "align": "center",
                          "valign": "middle",
                          "padding": "0,0,0,0"
                        },
                        {
                          "_$id": "pl6uhyio",
                          "_$type": "Button",
                          "name": "Button",
                          "width": 36,
                          "height": 36,
                          "_mouseState": 2,
                          "left": 0,
                          "centerY": 0,
                          "stateNum": 2,
                          "selected": true,
                          "skin": "res://a8febe84-e5e9-4747-8fe4-0eff5e038f93",
                          "label": "",
                          "labelSize": 20
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              "_$id": "sqrpu2ui",
              "_$var": true,
              "_$type": "Box",
              "name": "maskBox",
              "width": 640,
              "height": 1136,
              "visible": false,
              "zOrder": 10,
              "bgColor": "rgba(0, 0, 0, 0.7843137254901961)",
              "_$child": [
                {
                  "_$id": "jz6u5slt",
                  "_$var": true,
                  "_$type": "Image",
                  "name": "gameTip",
                  "width": 640,
                  "height": 1136,
                  "zOrder": 1,
                  "mask": {
                    "_$ref": "sewh3u1k"
                  },
                  "left": 0,
                  "right": 0,
                  "top": 0,
                  "bottom": 0,
                  "skin": "res://26fd2082-3f7b-4009-841f-7a709adb90bb",
                  "color": "#ffffff",
                  "_$child": [
                    {
                      "_$id": "sewh3u1k",
                      "_$var": true,
                      "_$type": "Sprite",
                      "name": "tipMask",
                      "x": 284,
                      "y": 609,
                      "width": 200,
                      "height": 200,
                      "anchorX": 0.5,
                      "anchorY": 0.5,
                      "_gcmds": [
                        {
                          "_$type": "DrawCircleCmd",
                          "x": 0.5,
                          "y": 0.5,
                          "radius": 0.5,
                          "percent": true,
                          "lineWidth": 1,
                          "lineColor": "rgba(255, 255, 255, 1)",
                          "fillColor": "rgba(255, 255, 255, 1)"
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
          "_$id": "e57qbb50",
          "_$var": true,
          "_$type": "Box",
          "name": "clickBox",
          "x": 205,
          "y": 165,
          "width": 72,
          "height": 72,
          "anchorX": 0.5,
          "anchorY": 0.5,
          "visible": false,
          "zOrder": 10,
          "_$child": [
            {
              "_$id": "wo00n883",
              "_$type": "Image",
              "name": "right",
              "width": 72,
              "height": 72,
              "visible": false,
              "skin": "res://7ba61fa3-6dbf-4450-a833-bdbecbc8ebbc",
              "useSourceSize": true,
              "color": "#ffffff"
            },
            {
              "_$id": "spnftfch",
              "_$type": "Image",
              "name": "wrong",
              "width": 72,
              "height": 72,
              "visible": false,
              "skin": "res://84e78b6a-6049-431d-88d3-105fa00c006c",
              "useSourceSize": true,
              "color": "#ffffff"
            }
          ]
        },
        {
          "_$id": "465yp6g7",
          "_$type": "Image",
          "name": "numBg",
          "x": -9,
          "y": 1172,
          "width": 218,
          "height": 96,
          "mouseThrough": true,
          "left": -9,
          "bottom": 200,
          "skin": "res://3d5fb376-93b0-44a1-90ca-7e6a517c710b",
          "sizeGrid": "20,20,20,0,0",
          "color": "#ffffff",
          "_$child": [
            {
              "_$id": "6zqsc5n1",
              "_$var": true,
              "_$type": "Label",
              "name": "findNum",
              "width": 218,
              "height": 96,
              "mouseThrough": true,
              "left": 0,
              "right": 0,
              "top": 0,
              "bottom": 0,
              "text": "0/12",
              "font": "SimHei",
              "fontSize": 50,
              "color": "rgba(255, 209, 34, 1)",
              "bold": true,
              "align": "center",
              "valign": "middle",
              "padding": "0,0,0,0"
            }
          ]
        }
      ]
    }
  ]
}