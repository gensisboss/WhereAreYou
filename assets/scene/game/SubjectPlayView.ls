{
  "_$ver": 1,
  "_$id": "niqaw6jk",
  "_$runtime": "res://8cd7f3a8-789b-4d15-9bb2-f50a781341bf",
  "_$type": "Scene",
  "left": 0,
  "right": 0,
  "top": 0,
  "bottom": 0,
  "name": "Scene2D",
  "_$child": [
    {
      "_$id": "mmc12wc5",
      "_$var": true,
      "_$type": "Box",
      "name": "middleBox",
      "width": 750,
      "height": 1468,
      "_mouseState": 2,
      "left": 0,
      "top": 0,
      "bgColor": "rgba(0, 0, 0, 1)",
      "_$child": [
        {
          "_$id": "qjrsxqid",
          "_$var": true,
          "_$type": "List",
          "name": "gameList",
          "width": 750,
          "height": 1468,
          "_mouseState": 2,
          "centerX": 0,
          "centerY": 0,
          "itemTemplate": {
            "_$ref": "kqk1wx4r",
            "_$tmpl": "itemRender"
          },
          "repeatX": 1,
          "repeatY": 1,
          "elasticEnabled": true,
          "scrollType": 2,
          "_$child": [
            {
              "_$id": "kqk1wx4r",
              "_$prefab": "d6a37fa3-64ea-4125-b05d-df84de94aeac",
              "name": "playGameItem",
              "active": true,
              "x": 0,
              "y": 0
            }
          ]
        }
      ]
    },
    {
      "_$id": "ms1uaz9j",
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
          "_$id": "jno4p7er",
          "_$var": true,
          "_$type": "Image",
          "name": "backBtn",
          "x": 20,
          "y": 20,
          "width": 64,
          "height": 64,
          "left": 20,
          "top": 20,
          "skin": "res://814d06e6-ff5a-41b5-a23a-6de59dcd6428",
          "color": "#ffffff"
        }
      ]
    }
  ]
}