(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/prefab/bodyPrefab.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '7e4ca6llkZGqY4JGBZhB5zE', 'bodyPrefab', __filename);
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
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=bodyPrefab.js.map
        