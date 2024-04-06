{
  "_$ver": 1,
  "_$id": "k1sz6218",
  "_$runtime": "res://ab4b8038-9e83-41b1-badd-e9f12d8881f8",
  "_$type": "Scene",
  "left": 0,
  "right": 0,
  "top": 0,
  "bottom": 0,
  "name": "Scene2D",
  "_$child": [
    {
      "_$id": "cgnyghvd",
      "_$type": "Panel",
      "name": "panel",
      "width": 750,
      "height": 1468,
      "zOrder": 1,
      "_mouseState": 2,
      "mouseThrough": true,
      "left": 0,
      "right": 0,
      "top": 0,
      "bottom": 0,
      "bgColor": "rgba(23, 26, 31, 1)",
      "scrollType": 2,
      "elasticEnabled": true,
      "_$child": [
        {
          "_$id": "rfq885wy",
          "_$var": true,
          "_$type": "Box",
          "name": "createBox",
          "y": 120,
          "width": 750,
          "height": 200,
          "left": 0,
          "right": 0,
          "top": 120,
          "_$child": [
            {
              "_$id": "zm7rjdo7",
              "_$type": "Image",
              "name": "Image",
              "x": 32,
              "width": 686,
              "height": 200,
              "left": 32,
              "right": 32,
              "top": 0,
              "bottom": 0,
              "skin": "res://de5e07b9-b537-4be6-bfae-93ea726526fe",
              "sizeGrid": "20,20,20,20,0",
              "color": "#ffffff"
            },
            {
              "_$id": "qxrypfq2",
              "_$type": "Image",
              "name": "Image(1)",
              "x": 343,
              "y": 49,
              "width": 64,
              "height": 63,
              "centerX": 0,
              "centerY": -20,
              "skin": "res://3e13b0df-a33c-4a60-8a36-076b25d721a5",
              "useSourceSize": true,
              "color": "#ffffff"
            },
            {
              "_$id": "fbl6d2nk",
              "_$type": "Label",
              "name": "Label",
              "x": 315,
              "y": 121,
              "width": 120,
              "height": 28,
              "centerX": 0,
              "centerY": 35,
              "text": "创作",
              "font": "SimHei",
              "fontSize": 24,
              "color": "rgba(255, 255, 255, 1)",
              "bold": true,
              "align": "center",
              "valign": "middle",
              "padding": "0,0,0,0"
            }
          ]
        },
        {
          "_$id": "q3xnbplm",
          "_$var": true,
          "_$type": "Box",
          "name": "modeBox",
          "y": 349.9999999999999,
          "width": 750,
          "height": 500,
          "visible": false,
          "_mouseState": 2,
          "left": 0,
          "right": 0,
          "_$child": [
            {
              "_$id": "yfmvdefx",
              "_$var": true,
              "_$type": "List",
              "name": "modeList",
              "x": 32,
              "y": 60,
              "width": 686,
              "height": 440,
              "_mouseState": 2,
              "left": 32,
              "right": 32,
              "top": 60,
              "bottom": 0,
              "itemTemplate": {
                "_$ref": "zmidwvk0",
                "_$tmpl": "itemRender"
              },
              "repeatX": 3,
              "repeatY": 2,
              "spaceX": 30,
              "spaceY": 20,
              "scrollType": 1,
              "_$child": [
                {
                  "_$id": "zmidwvk0",
                  "_$type": "Box",
                  "name": "Box",
                  "width": 208,
                  "height": 208,
                  "mask": {
                    "_$ref": "hw3l3na1"
                  },
                  "_$child": [
                    {
                      "_$id": "8xm9ey7g",
                      "_$type": "Image",
                      "name": "icon",
                      "width": 208,
                      "height": 208,
                      "skin": "res://bce77b87-49f6-4f62-a43a-68b2bcb5e98f",
                      "color": "#ffffff"
                    },
                    {
                      "_$id": "hw3l3na1",
                      "_$type": "Sprite",
                      "name": "Sprite",
                      "width": 208,
                      "height": 208,
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
                    }
                  ]
                }
              ]
            },
            {
              "_$id": "i1ce9xze",
              "_$type": "Label",
              "name": "Label",
              "x": 40,
              "width": 120,
              "height": 28,
              "left": 40,
              "top": 0,
              "text": "创作风格",
              "font": "SimHei",
              "fontSize": 30,
              "color": "#FFFFFF",
              "bold": true,
              "padding": "0,0,0,0"
            }
          ]
        },
        {
          "_$id": "gnoctjdj",
          "_$var": true,
          "_$type": "Box",
          "name": "draftBox",
          "y": 880,
          "width": 750,
          "height": 80,
          "visible": false,
          "_mouseState": 2,
          "left": 0,
          "right": 0,
          "top": 880,
          "_$comp": [
            {
              "_$type": "d51408a1-2b90-4f6e-a214-277b6e48e284",
              "scriptPath": "../src/core/logic/Fold.ts",
              "flodBg": {
                "_$ref": "mgvdzy1b"
              },
              "flodType": "verticle",
              "flodBtn": {
                "_$ref": "pzunn3sl"
              },
              "menuBox": {
                "_$ref": "bo0c3c7t"
              },
              "tweenTime": 500,
              "maxWidth": 280,
              "minWidth": 80
            }
          ],
          "_$child": [
            {
              "_$id": "mgvdzy1b",
              "_$type": "Image",
              "name": "Image(1)",
              "x": 32,
              "width": 686,
              "height": 80,
              "left": 32,
              "right": 32,
              "top": 0,
              "skin": "res://3ff89430-c7e8-49bb-a8df-2967ed0e5f6e",
              "sizeGrid": "20,20,20,20,0",
              "color": "#ffffff"
            },
            {
              "_$id": "41k5d76z",
              "_$type": "Image",
              "name": "Image",
              "x": 50,
              "width": 80,
              "height": 80,
              "left": 50,
              "top": 0,
              "skin": "res://a91d8b9f-7fe2-4538-8d73-7b5288720a65",
              "color": "#ffffff"
            },
            {
              "_$id": "11zxc9mx",
              "_$var": true,
              "_$type": "Label",
              "name": "draftName",
              "x": 150,
              "y": 25,
              "width": 102,
              "height": 29,
              "left": 150,
              "top": 25,
              "text": "草稿箱",
              "font": "SimHei",
              "fontSize": 28,
              "color": "#FFFFFF",
              "fitContent": "height",
              "bold": true,
              "valign": "middle",
              "padding": "0,0,0,0"
            },
            {
              "_$id": "pzunn3sl",
              "_$type": "Button",
              "name": "draftBtn",
              "x": 680,
              "y": 40,
              "width": 60,
              "height": 60,
              "anchorX": 0.5,
              "anchorY": 0.5,
              "_mouseState": 2,
              "right": 40,
              "top": 10,
              "stateNum": 2,
              "skin": "res://ce05c1ee-7adf-47f2-8980-71b8f6fbb5ea",
              "label": "",
              "labelSize": 20
            },
            {
              "_$id": "bo0c3c7t",
              "_$type": "Box",
              "name": "Box",
              "y": 80,
              "width": 750,
              "height": 0,
              "visible": false,
              "_mouseState": 2,
              "left": 0,
              "right": 0,
              "top": 80,
              "bottom": 0,
              "_$child": [
                {
                  "_$id": "cwv4vze7",
                  "_$var": true,
                  "_$type": "List",
                  "name": "draftList",
                  "x": 42,
                  "y": 20,
                  "width": 666,
                  "height": 212,
                  "_mouseState": 2,
                  "left": 42,
                  "right": 42,
                  "top": 20,
                  "bottom": 0,
                  "itemTemplate": {
                    "_$ref": "fyqcijb9",
                    "_$tmpl": "itemRender"
                  },
                  "repeatX": 4,
                  "repeatY": 1,
                  "spaceX": 20,
                  "spaceY": 20,
                  "_$child": [
                    {
                      "_$id": "fyqcijb9",
                      "_$prefab": "53789319-eb99-410a-b4da-3d55eefcc07b",
                      "name": "game",
                      "active": true,
                      "x": 0,
                      "y": 0,
                      "width": 150,
                      "height": 150
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