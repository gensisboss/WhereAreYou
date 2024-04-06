{
  "_$ver": 1,
  "_$id": "xvoqyyml",
  "_$runtime": "res://5298a181-f883-45a2-a714-72786e1a4802",
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
      "height": 500,
      "anchorX": 0.5,
      "anchorY": 0.5,
      "mouseEnabled": true,
      "_$child": [
        {
          "_$id": "lim5l1bu",
          "_$type": "Image",
          "name": "dragBg",
          "width": 686,
          "height": 500,
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
          "_$id": "jsp82uxj",
          "_$var": true,
          "_$type": "Image",
          "name": "toolIcon",
          "x": 268,
          "y": 75,
          "width": 150,
          "height": 150,
          "centerX": 0,
          "centerY": -100,
          "skin": "res://e634b633-00a9-490a-bdf3-66c7a12bcddc",
          "color": "#ffffff"
        },
        {
          "_$id": "b4xthrt3",
          "_$var": true,
          "_$type": "Label",
          "name": "toolTip",
          "x": 203,
          "y": 265,
          "width": 281,
          "height": 71,
          "centerX": 0,
          "centerY": 50,
          "text": "好可惜，还差一点，是否使用沙漏增加",
          "font": "SimHei",
          "fontSize": 28,
          "color": "#FFFFFF",
          "ubb": true,
          "html": true,
          "align": "center",
          "valign": "top",
          "wordWrap": true,
          "leading": 2,
          "padding": "0,0,0,0"
        },
        {
          "_$id": "7gfs65pz",
          "_$type": "Box",
          "name": "bottomBox",
          "y": 350,
          "width": 686,
          "height": 120,
          "mouseEnabled": true,
          "left": 0,
          "right": 0,
          "bottom": 30,
          "_$child": [
            {
              "_$id": "xterx7wm",
              "_$var": true,
              "_$type": "Button",
              "name": "cancelBtn",
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
              "_$id": "36xqdyuf",
              "_$var": true,
              "_$type": "Button",
              "name": "sureBtn",
              "x": 419,
              "y": 16,
              "width": 88,
              "height": 88,
              "mouseEnabled": true,
              "centerX": 120,
              "centerY": 0,
              "stateNum": 2,
              "skin": "res://f204e145-844a-4274-848a-125677607a8a",
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