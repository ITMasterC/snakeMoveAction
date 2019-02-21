"use strict";
cc._RF.push(module, '7e4ca6llkZGqY4JGBZhB5zE', 'bodyPrefab');
// Script/prefab/bodyPrefab.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        snakeName: null,
        bodyIndex: 0,

        preBodyIndex: 0, //上一个节点在数组中的index

        sprite: cc.Sprite,

        spriteList: {
            default: [],
            type: [cc.SpriteFrame]
        }
    },

    init: function init(index) {
        this.bodyIndex = index;

        this.node.opacity = 255;
    },

    onSetPreBodyIndex: function onSetPreBodyIndex(index) {
        this.preBodyIndex = index;
        this.node.setLocalZOrder(99 - this.preBodyIndex);
    },

    onLoad: function onLoad() {
        //根据选择皮肤的编号进行更换
        this.sprite.spriteFrame = this.spriteList[window.selectIndex];
        this.prePoint = null;

        this.number = 180 / Math.PI;
        this.newPosX = 0;
        this.newPosY = 0;
    }
});

cc._RF.pop();