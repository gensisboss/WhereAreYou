{
  "_$ver": 1,
  "_$id": "ki3b5khq",
  "_$runtime": "res://8e20ecd0-4de8-4d9d-b5a5-12e27fd2437e",
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
      "_mouseState": 2,
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
      "y": 668,
      "width": 750,
      "height": 800,
      "_mouseState": 2,
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
          "height": 736,
          "_mouseState": 2,
          "left": 0,
          "right": 0,
          "top": 64,
          "bottom": 0,
          "skin": "res://95fd48ce-edc4-4631-8f5a-75221cdac5b2",
          "color": "#ffffff",
          "_$child": [
            {
              "_$id": "83hdojtw",
              "_$type": "Box",
              "name": "Box",
              "width": 750,
              "height": 736,
              "_mouseState": 2,
              "left": 0,
              "right": 0,
              "top": 0,
              "bottom": 0,
              "_$child": [
                {
                  "_$id": "7d8azpfg",
                  "_$type": "Box",
                  "name": "Box",
                  "x": 32,
                  "width": 218,
                  "height": 218,
                  "mask": {
                    "_$ref": "w3a936w7"
                  },
                  "left": 32,
                  "top": 0,
                  "_$child": [
                    {
                      "_$id": "2zokry31",
                      "_$type": "Image",
                      "name": "Image",
                      "width": 218,
                      "height": 218,
                      "left": 0,
                      "right": 0,
                      "top": 0,
                      "bottom": 0,
                      "skin": "res://1bc40a1b-991d-4616-99e6-7e4663ae49f5",
                      "color": "#ffffff"
                    },
                    {
                      "_$id": "9trruc8w",
                      "_$var": true,
                      "_$type": "Image",
                      "name": "logoIcon",
                      "width": 218,
                      "height": 218,
                      "skin": "res://c13c1b8e-c516-4a0f-98ad-e356f45f0365",
                      "color": "#ffffff",
                      "_$comp": [
                        {
                          "_$type": "39241472-3194-43d3-92ea-5927320caa2f",
                          "scriptPath": "../src/core/logic/TransformIcon.ts",
                          "parentNode": {
                            "_$ref": "7d8azpfg"
                          },
                          "minScale": 1,
                          "maxScale": 2,
                          "dragSpeed": 2,
                          "flexScale": 0.1,
                          "flexPosition": 300
                        }
                      ]
                    },
                    {
                      "_$id": "yvxz97fl",
                      "_$type": "Image",
                      "name": "Image(1)",
                      "x": 16,
                      "y": 160,
                      "width": 186,
                      "height": 48,
                      "alpha": 0.5,
                      "bottom": 10,
                      "centerX": 0,
                      "skin": "res://e9dfb62d-a090-40df-a1dc-5a15d28357ce",
                      "sizeGrid": "20,20,20,20,0",
                      "color": "#ffffff"
                    },
                    {
                      "_$id": "w3a936w7",
                      "_$type": "Sprite",
                      "name": "Sprite",
                      "width": 218,
                      "height": 218,
                      "texture": {
                        "_$uuid": "bce77b87-49f6-4f62-a43a-68b2bcb5e98f",
                        "_$type": "Texture"
                      },
                      "_gcmds": [
                        {
                          "_$type": "DrawRoundRectCmd",
                          "x": 0,
                          "y": 0,
                          "width": 1,
                          "height": 1,
                          "lt": 10,
                          "rt": 10,
                          "lb": 10,
                          "rb": 10,
                          "percent": true,
                          "lineWidth": 1,
                          "lineColor": "#000000",
                          "fillColor": "#FFFFFF"
                        }
                      ]
                    },
                    {
                      "_$id": "qjon57ll",
                      "_$type": "Label",
                      "name": "Label",
                      "x": 1,
                      "y": 160,
                      "width": 216,
                      "height": 48,
                      "bottom": 10,
                      "centerX": 0,
                      "text": "拖拽调整",
                      "font": "SimHei",
                      "fontSize": 20,
                      "color": "rgba(252, 220, 42, 1)",
                      "align": "center",
                      "valign": "middle",
                      "padding": "0,0,0,0",
                      "underlineColor": "rgba(252, 220, 42, 1)"
                    }
                  ]
                },
                {
                  "_$id": "ycen00ec",
                  "_$var": true,
                  "_$type": "TextInput",
                  "name": "nameInput",
                  "x": 274,
                  "y": 5,
                  "width": 444,
                  "height": 64,
                  "_mouseState": 2,
                  "right": 32,
                  "top": 5,
                  "text": "",
                  "font": "SimHei",
                  "fontSize": 28,
                  "color": "#FFFFFF",
                  "valign": "middle",
                  "overflow": "scroll",
                  "padding": "2,20,2,20",
                  "skin": "res://8b43682c-5d43-4622-aabc-aa621f15f2f8",
                  "sizeGrid": "20,20,20,20,0",
                  "maxChars": 10,
                  "prompt": "点击输入名称",
                  "promptColor": "#A9A9A9",
                  "_$child": [
                    {
                      "_$id": "o48fr270",
                      "_$var": true,
                      "_$type": "Label",
                      "name": "nameNum",
                      "x": 372,
                      "width": 72,
                      "height": 64,
                      "right": 0,
                      "top": 0,
                      "bottom": 0,
                      "text": "0/10",
                      "font": "SimHei",
                      "fontSize": 22,
                      "color": "rgba(153, 153, 153, 1)",
                      "align": "center",
                      "valign": "middle",
                      "padding": "0,0,0,0"
                    }
                  ]
                },
                {
                  "_$id": "qxvhwekq",
                  "_$var": true,
                  "_$type": "TextInput",
                  "name": "descInput",
                  "x": 274,
                  "y": 80,
                  "width": 444,
                  "height": 138,
                  "_mouseState": 2,
                  "right": 32,
                  "top": 80,
                  "text": "",
                  "font": "SimHei",
                  "fontSize": 24,
                  "color": "#FFFFFF",
                  "valign": "middle",
                  "overflow": "scroll",
                  "padding": "20,20,20,20",
                  "skin": "res://8b43682c-5d43-4622-aabc-aa621f15f2f8",
                  "sizeGrid": "20,20,20,20,0",
                  "maxChars": 50,
                  "prompt": "点击输入作品描述",
                  "promptColor": "#A9A9A9",
                  "multiline": true,
                  "_$child": [
                    {
                      "_$id": "km0g7hii",
                      "_$var": true,
                      "_$type": "Label",
                      "name": "descNum",
                      "x": 372,
                      "y": 86,
                      "width": 72,
                      "height": 52,
                      "right": 0,
                      "bottom": 0,
                      "text": "0/50",
                      "font": "SimHei",
                      "fontSize": 22,
                      "color": "rgba(153, 153, 153, 1)",
                      "align": "center",
                      "valign": "middle",
                      "padding": "0,0,0,0"
                    }
                  ]
                },
                {
                  "_$id": "jngxkqxp",
                  "_$type": "Image",
                  "name": "timeBg",
                  "x": 32,
                  "y": 254,
                  "width": 686,
                  "height": 320,
                  "_mouseState": 2,
                  "left": 32,
                  "right": 32,
                  "top": 254,
                  "skin": "res://0f9930d5-0841-4795-8d48-bddf1f88401d",
                  "sizeGrid": "20,20,20,20,0",
                  "color": "#999999",
                  "_$child": [
                    {
                      "_$id": "ctwgm3x3",
                      "_$type": "Label",
                      "name": "timeTitle",
                      "x": 32,
                      "y": 28,
                      "width": 120,
                      "height": 28,
                      "left": 32,
                      "top": 28,
                      "text": "游戏时长：",
                      "font": "SimHei",
                      "fontSize": 24,
                      "color": "#FFFFFF",
                      "padding": "0,0,0,0"
                    },
                    {
                      "_$id": "112axf8v",
                      "_$type": "Image",
                      "name": "Image",
                      "x": 84,
                      "y": 135,
                      "width": 518,
                      "height": 50,
                      "visible": false,
                      "centerX": 0,
                      "centerY": 0,
                      "skin": "res://14ee121d-34aa-4cbd-b91b-eb1a499a71ca",
                      "sizeGrid": "30,30,30,30,0",
                      "color": "#ffffff"
                    },
                    {
                      "_$id": "s9rp80k5",
                      "_$var": true,
                      "_$type": "List",
                      "name": "minuteList",
                      "x": 218,
                      "y": 35,
                      "width": 50,
                      "height": 250,
                      "_mouseState": 2,
                      "centerX": -100,
                      "centerY": 0,
                      "itemTemplate": {
                        "_$ref": "da3frj0q",
                        "_$tmpl": "itemRender"
                      },
                      "repeatX": 1,
                      "repeatY": 9,
                      "scrollType": 2,
                      "_$child": [
                        {
                          "_$id": "da3frj0q",
                          "_$type": "Box",
                          "name": "Box",
                          "width": 50,
                          "height": 50,
                          "_$child": [
                            {
                              "_$id": "gxzvbdfb",
                              "_$type": "Label",
                              "name": "time",
                              "width": 50,
                              "height": 50,
                              "left": 0,
                              "right": 0,
                              "top": 0,
                              "bottom": 0,
                              "text": "00",
                              "font": "SimHei",
                              "fontSize": 30,
                              "color": "#FFFFFF",
                              "align": "center",
                              "valign": "middle",
                              "padding": "0,0,0,0"
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "_$id": "ppaxs122",
                      "_$var": true,
                      "_$type": "List",
                      "name": "secondList",
                      "x": 418,
                      "y": 35,
                      "width": 50,
                      "height": 250,
                      "_mouseState": 2,
                      "centerX": 100,
                      "centerY": 0,
                      "itemTemplate": {
                        "_$ref": "e45bo173",
                        "_$tmpl": "itemRender"
                      },
                      "repeatX": 1,
                      "repeatY": 20,
                      "scrollType": 2,
                      "_$child": [
                        {
                          "_$id": "e45bo173",
                          "_$type": "Box",
                          "name": "Box",
                          "width": 50,
                          "height": 50,
                          "_$child": [
                            {
                              "_$id": "5ehkjshg",
                              "_$type": "Label",
                              "name": "time",
                              "width": 50,
                              "height": 50,
                              "left": 0,
                              "right": 0,
                              "top": 0,
                              "bottom": 0,
                              "text": "00",
                              "font": "SimHei",
                              "fontSize": 30,
                              "color": "#FFFFFF",
                              "align": "center",
                              "valign": "middle",
                              "padding": "0,0,0,0"
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "_$id": "xj8aaj2k",
                      "_$type": "Label",
                      "name": "Label",
                      "x": 165,
                      "y": 146,
                      "width": 56,
                      "height": 28,
                      "centerX": -150,
                      "centerY": 0,
                      "text": "分:",
                      "font": "SimHei",
                      "fontSize": 28,
                      "color": "rgba(255, 209, 34, 1)",
                      "align": "center",
                      "valign": "middle",
                      "padding": "0,0,0,0"
                    },
                    {
                      "_$id": "02v10tw2",
                      "_$type": "Label",
                      "name": "Label(1)",
                      "x": 365,
                      "y": 146,
                      "width": 56,
                      "height": 28,
                      "centerX": 50,
                      "centerY": 0,
                      "text": "秒:",
                      "font": "SimHei",
                      "fontSize": 28,
                      "color": "rgba(255, 209, 34, 1)",
                      "align": "center",
                      "valign": "middle",
                      "padding": "0,0,0,0"
                    }
                  ]
                }
              ]
            },
            {
              "_$id": "md1oplnp",
              "_$var": true,
              "_$type": "Button",
              "name": "publishBtn",
              "x": 55,
              "y": 606,
              "width": 640,
              "height": 80,
              "_mouseState": 2,
              "bottom": 50,
              "centerX": 0,
              "stateNum": 2,
              "selected": true,
              "skin": "res://7da052d1-2549-47d9-a8be-5fc7ac1ca648",
              "sizeGrid": "15,30,15,30,0",
              "label": "发布",
              "labelFont": "SimHei",
              "labelSize": 30,
              "labelBold": true,
              "labelColors": "#000000,#000000,#000000"
            }
          ]
        }
      ]
    },
    {
      "_$id": "u8wvpgw6",
      "_$var": true,
      "_$type": "Box",
      "name": "effectBox",
      "width": 750,
      "height": 1468,
      "visible": false,
      "_mouseState": 2,
      "left": 0,
      "right": 0,
      "top": 0,
      "bottom": 0,
      "bgColor": "rgba(0, 0, 0, 0.39215686274509803)",
      "_$child": [
        {
          "_$id": "skpb5kc1",
          "_$type": "Image",
          "name": "Image",
          "x": 95,
          "y": 434,
          "width": 560,
          "height": 600,
          "_mouseState": 2,
          "centerX": 0,
          "centerY": 0,
          "skin": "res://ce850797-5e1f-43d4-890b-e9b36828b6ea",
          "sizeGrid": "50,50,50,50,0",
          "color": "#ffffff",
          "_$child": [
            {
              "_$id": "ctbf5fl0",
              "_$var": true,
              "_$type": "Animation",
              "name": "publishEffect",
              "x": 160,
              "y": 100,
              "width": 240,
              "height": 240,
              "source": "res://0e6404a1-2bb2-409a-875c-4a4e35a37c18",
              "interval": 50,
              "loop": false,
              "index": 0
            },
            {
              "_$id": "7zqe5s6u",
              "_$var": true,
              "_$type": "Button",
              "name": "publishSuccessBtn",
              "x": 120,
              "y": 470,
              "width": 320,
              "height": 80,
              "_mouseState": 2,
              "bottom": 50,
              "centerX": 0,
              "stateNum": 1,
              "skin": "res://9a30bc19-9bd1-4149-bc30-dab294c18a5e",
              "sizeGrid": "15,30,15,30,0",
              "label": "返回",
              "labelFont": "SimHei",
              "labelSize": 30,
              "labelBold": true,
              "labelColors": "#000000,#000000,#000000"
            },
            {
              "_$id": "qxm32uxl",
              "_$type": "Label",
              "name": "Label",
              "x": 204,
              "y": 381,
              "width": 152,
              "height": 39,
              "bottom": 180,
              "centerX": 0,
              "text": "发布成功",
              "fontSize": 38,
              "color": "#FFFFFF",
              "fitContent": "yes",
              "padding": "0,0,0,0"
            }
          ]
        }
      ]
    }
  ]
}