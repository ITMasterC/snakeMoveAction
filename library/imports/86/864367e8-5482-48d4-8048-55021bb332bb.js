"use strict";
cc._RF.push(module, '86436foVIJI1IBIVQIbszK7', 'courseNode');
// Script/prefab/courseNode.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        clickLabel: cc.Label,
        tipLabel: cc.Label,
        handSprite: cc.Sprite
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this.winSize = cc.director.getWinSize();
        this.node.active = true;
        this.onStartMoveSnake();
        this.node.width = this.winSize.width;
        this.node.height = this.winSize.height;
        //console.log(this.node);
    },
    start: function start() {
        this.clickNumber = 0;
    },


    //提示1 - 拖动开始游戏
    onStartMoveSnake: function onStartMoveSnake() {
        if (!this.handSprite.node.active) {
            this.handSprite.node.active = true;
        }
        this.handSprite.node.setPositionX(-this.winSize.width / 6);
        this.clickLabel.string = "左右滑动控制小蛇";
        this.tipLabel.string = "";

        //动作列表
        var action1 = cc.moveBy(1.5, this.winSize.width / 3, 0);
        var action2 = cc.moveBy(1.5, -this.winSize.width / 3, 0);
        //顺序执行容器
        var seq = cc.sequence(action1, action2);
        //反复执行动作
        var rep = cc.repeatForever(seq);
        this.handSprite.node.runAction(rep);
    },

    //提示2 - 指示血量
    onShowSnakeBlood: function onShowSnakeBlood() {
        this.handSprite.node.stopAllActions();
        this.handSprite.node.rotation = 90;
        this.clickLabel.string = "点击屏幕继续";
        this.tipLabel.string = "小蛇的生命值";

        //改变手指的位置
        this.handSprite.node.setPosition(cc.p(-this.handSprite.node.width, this.winSize.height / 2 - 4 * this.winSize.height / 7 + window.Global_heroRadius / 2));

        //手指的指向动画
        var action1 = cc.moveBy(0.5, 10, 0);
        var action2 = cc.moveBy(0.5, -10, 0);
        //顺序执行容器
        var seq = cc.sequence(action1, action2);
        //反复执行动作
        var rep = cc.repeatForever(seq);
        this.handSprite.node.runAction(rep);
    },

    //提示3 - 方块血量
    onShowSquareBlood: function onShowSquareBlood() {
        this.handSprite.node.stopAllActions();
        this.handSprite.node.rotation = 0;

        this.clickLabel.string = "点击屏幕继续";
        this.tipLabel.string = "障碍物的生命值";

        //改变手指的位置
        this.handSprite.node.setPosition(cc.p(this.winSize.width / 2 - window.Global_suqareWidth / 2, this.winSize.height / 2 - window.Global_suqareWidth - this.handSprite.node.height / 2));

        //手指的指向动画
        var action1 = cc.moveBy(0.5, 0, 10);
        var action2 = cc.moveBy(0.5, 0, -10);
        //顺序执行容器
        var seq = cc.sequence(action1, action2);
        //反复执行动作
        var rep = cc.repeatForever(seq);
        this.handSprite.node.runAction(rep);
    },

    //提示4 - 相撞血量减少
    onShowCrashResult: function onShowCrashResult() {
        this.handSprite.node.stopAllActions();
        this.handSprite.node.active = false;
        this.clickLabel.string = "点击屏幕继续";
        this.tipLabel.string = "小蛇与方块相撞时生命同时减少";
    },

    //提示5 - 方块消失 小蛇死亡条件
    onShowResult: function onShowResult() {
        this.clickLabel.string = "点击屏幕开始你的游戏之旅";
        this.tipLabel.string = "当方块生命值为0时消失\n当小蛇的生命值为0时死亡";
    },

    //第六次点击销毁当前节点， 开始游戏
    onDestroy: function onDestroy() {
        this.node.active = false;
        cc.sys.localStorage.setItem("isFirstPlay", 1);
        this.node.dispatchEvent(new cc.Event.EventCustom('courseNodeDestroy', true));
    },

    //点击屏幕事件
    onClickCallback: function onClickCallback() {
        //获取用户本地数据 -- 是否是第一次玩游戏
        var isFirstPlay = cc.sys.localStorage.getItem("isFirstPlay");
        if (!isFirstPlay) {
            isFirstPlay = 0;
        }
        if (!isFirstPlay) {
            this.clickNumber++;
            switch (this.clickNumber) {
                case 1:
                    this.onShowSnakeBlood();
                    break;
                case 2:
                    this.onShowSquareBlood();
                    break;
                case 3:
                    this.onShowCrashResult();
                    break;
                case 4:
                    this.onShowResult();
                    break;
                case 5:
                    this.onDestroy();
                    break;
            }
        } else {
            this.onDestroy();
        }
    }

    // update (dt) {},
});

cc._RF.pop();