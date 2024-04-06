{
  "_$ver": 1,
  "_$id": "xvoqyyml",
  "_$runtime": "res://d1e1c356-6d40-4083-9151-2ee58d55581a",
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
      "width": 686,
      "height": 620,
      "anchorX": 0.5,
      "anchorY": 0.5,
      "mouseEnabled": true,
      "_$child": [
        {
          "_$id": "lim5l1bu",
          "_$type": "Image",
          "name": "dragBg",
          "width": 686,
          "height": 620,
          "mouseEnabled": true,
          "left": 0,
          "right": 0,
          "top": 0,
          "bottom": 0,
          "skin": "res://ce850797-5e1f-43d4-890b-e9b36828b6ea",
          "sizeGrid": "80,80,80,80,0",
          "color": "#ffffff"
        },
        {
          "_$id": "ev9y6ewb",
          "_$var": true,
          "_$type": "Box",
          "name": "starBox",
          "x": 93,
          "y": 10,
          "width": 500,
          "height": 300,
          "centerX": 0,
          "centerY": -150,
          "_$child": [
            {
              "_$id": "zdzv5qyu",
              "_$type": "Animation",
              "name": "star0",
              "x": 50,
              "y": 150,
              "width": 100,
              "height": 100,
              "anchorX": 1,
              "anchorY": 1,
              "scaleX": 0.6,
              "scaleY": 0.6,
              "source": "res://e910b94e-12fe-40c7-9552-32e53c88d3ad",
              "interval": 200,
              "loop": false,
              "index": 0
            },
            {
              "_$id": "ya06moi9",
              "_$type": "Animation",
              "name": "star1",
              "x": 230,
              "y": 100,
              "width": 100,
              "height": 100,
              "anchorX": 1,
              "anchorY": 1,
              "scaleX": 0.8,
              "scaleY": 0.8,
              "source": "res://e910b94e-12fe-40c7-9552-32e53c88d3ad",
              "interval": 200,
              "loop": false,
              "index": 0
            },
            {
              "_$id": "jgndv7px",
              "_$type": "Animation",
              "name": "star2",
              "x": 420,
              "y": 150,
              "width": 100,
              "height": 100,
              "anchorX": 1,
              "anchorY": 1,
              "scaleX": 0.6,
              "scaleY": 0.6,
              "source": "res://e910b94e-12fe-40c7-9552-32e53c88d3ad",
              "interval": 200,
              "loop": false,
              "index": 0
            }
          ]
        },
        {
          "_$id": "ge963eoe",
          "_$var": true,
          "_$type": "Button",
          "name": "resultBg",
          "x": -2,
          "y": 306,
          "width": 690,
          "height": 148,
          "mouseEnabled": true,
          "centerX": 0,
          "centerY": 70,
          "stateNum": 2,
          "skin": "res://6391f7ff-bf5e-4616-b1e2-140d79e9aba6",
          "label": "",
          "labelSize": 20,
          "labelVAlign": "middle",
          "_$child": [
            {
              "_$id": "y7vl1lel",
              "_$var": true,
              "_$type": "Button",
              "name": "result",
              "x": 185,
              "y": 18,
              "width": 320,
              "height": 112,
              "mouseEnabled": true,
              "centerX": 0,
              "centerY": 0,
              "stateNum": 2,
              "skin": "res://5ce92bf4-10c5-404d-aa3b-6fccec98a5c6",
              "label": "",
              "labelSize": 20,
              "labelVAlign": "middle"
            }
          ]
        },
        {
          "_$id": "7gfs65pz",
          "_$type": "Box",
          "name": "bottomBox",
          "y": 470,
          "width": 686,
          "height": 120,
          "mouseEnabled": true,
          "left": 0,
          "right": 0,
          "bottom": 30,
          "_$child": [
            {
              "_$id": "2tyel4ba",
              "_$var": true,
              "_$type": "Button",
              "name": "backBtn",
              "x": 149,
              "y": 16,
              "width": 88,
              "height": 88,
              "mouseEnabled": true,
              "centerX": -150,
              "centerY": 0,
              "stateNum": 2,
              "skin": "res://028a40f7-87e7-4215-96cc-9a5b72b8bf13",
              "sizeGrid": "0,0,0,0,0",
              "label": "",
              "labelSize": 20,
              "labelVAlign": "middle"
            },
            {
              "_$id": "ztfjsbz6",
              "_$var": true,
              "_$type": "Button",
              "name": "restartBtn",
              "x": 419,
              "y": 16,
              "width": 88,
              "height": 88,
              "mouseEnabled": true,
              "centerX": 120,
              "centerY": 0,
              "stateNum": 2,
              "skin": "res://d3691f82-ed7d-4765-9d2d-45186d1d59b9",
              "sizeGrid": "0,0,0,0,0",
              "label": "",
              "labelSize": 20,
              "labelVAlign": "middle"
            }
          ]
        }
      ]
    }
  ]
}