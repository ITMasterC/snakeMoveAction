"use strict";
cc._RF.push(module, '7779cdu+PFHGLQvvzYdTdpf', 'hero');
// Script/hero.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        num: {
            default: null,
            type: cc.Label
        },

        scene: {
            default: null,
            serializable: false
        },

        sprite: cc.Sprite,

        spriteList: {
            default: [],
            type: [cc.SpriteFrame]
        }
    },

    onLoad: function onLoad() {
        this.num.string = 4;
        window.Global_heroRadius = this.node.width * 0.75; //hero的半径

        //碰撞事件 - 测试
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;

        this.body = this.node.getComponent(cc.RigidBody);
        this.node.getComponent('cc.PhysicsCircleCollider').radius = this.node.getChildByName('heroSprite').getComponent(cc.Sprite).node.width * 0.1;

        this.flag = 8;

        //根据选择皮肤的编号进行更换
        this.sprite.spriteFrame = this.spriteList[window.selectIndex];
    },


    // 施加一个冲量到刚体上指定的点上，这个点是世界坐标系下的一个点
    onSetImpules: function onSetImpules(impulse, point) {
        var speed = this.onGetSpeedFromWorldPoint(this.node.getPosition());
        //改变方向的时候的加速处理
        if (speed.x > 0 && impulse.x < 0 || speed.x < 0 && impulse.x > 0) {
            this.body.applyLinearImpulse(cc.p(0, 0), point);
        }
        if (Math.abs(speed.x) > 450) return;
        this.body.applyLinearImpulse(impulse, point);
    },

    //改变头部就角度
    onChangeRotation: function onChangeRotation(num) {
        //spriteNode
        var rotation = this.node.getChildByName('heroSprite').getComponent(cc.Sprite).node.rotation;
        if (rotation < 0) {
            if (num > 0) {
                this.node.getChildByName('heroSprite').getComponent(cc.Sprite).node.rotation += num * 2;
            }
        } else if (rotation > 0) {
            if (num < 0) {
                this.node.getChildByName('heroSprite').getComponent(cc.Sprite).node.rotation += num * 2;
            }
        }
        if (Math.abs(this.node.getChildByName('heroSprite').getComponent(cc.Sprite).node.rotation) >= 60) return;
        this.node.getChildByName('heroSprite').getComponent(cc.Sprite).node.rotation += num;
    },
    //摆正头部
    onRecoveryRotation: function onRecoveryRotation() {
        var rotation = this.node.getChildByName('heroSprite').getComponent(cc.Sprite).node.rotation;
        if (rotation > 5) {
            this.node.getChildByName('heroSprite').getComponent(cc.Sprite).node.rotation -= 5;
        } else if (rotation < -5) {
            this.node.getChildByName('heroSprite').getComponent(cc.Sprite).node.rotation += 5;
        } else {
            this.node.getChildByName('heroSprite').getComponent(cc.Sprite).node.rotation = 0;
        }
    },

    //获取hero在某点的速度
    onGetSpeedFromWorldPoint: function onGetSpeedFromWorldPoint(point) {
        var speed = this.body.getLinearVelocityFromWorldPoint(point);
        return speed;
    },

    onSetHeroSpeed: function onSetHeroSpeed(speed) {
        this.body.linearVelocity = cc.v2(speed.x, window.Global_VelocityForY);
        //cc.log(this.body.linearVelocity );
        var rotation = speed.x / 100 * 2;
        this.onChangeRotation(rotation);
        //cc.log(window.Global_VelocityForY);
    },

    init: function init(node) {
        this.scene = node;
        this.node.getComponent('cc.CircleCollider').radius = window.Global_suqareWidth / 5.715;
    },
    /**************************  刚体的碰撞事件处理 ***************************/
    // 只在两个碰撞体开始接触时被调用一次
    onBeginContact: function onBeginContact(contact, selfCollider, otherCollider) {
        this.isCrashing = true;
        this.flag = 6;
    },

    // 只在两个碰撞体结束接触时被调用一次
    onEndContact: function onEndContact(contact, selfCollider, otherCollider) {
        if (Number(this.num.string) == 0) {
            this.scene.onShowSelectAction();
        }
        window.Global_isCrashWithSquare = false;

        this.isCrashing = false;
        this.crashNode = null;
    },

    // 每次将要处理碰撞体接触逻辑时被调用
    onPreSolve: function onPreSolve(contact, selfCollider, otherCollider) {
        //与障碍物发生侧碰
        //cc.log(crashFlag);
        if (crashFlag.x > 0.85) {
            //向右
            //cc.log("isCrash-----------");
            if (this.isCrashing) {
                this.isCrashing = false;
            }
        } else if (crashFlag.x < -0.85) {
            //向左
            if (this.isCrashing) {
                this.isCrashing = false;
            }
        }
    },

    //获取当前HERO的长度
    getHeroLength: function getHeroLength() {
        var length = Number(this.num.string);
        return length;
    },

    //获取当前HERO的长度
    setHeroLength: function setHeroLength(number) {
        this.num.string = String(Number(this.num.string) + number);
    },

    //获取hero在根节点坐标系下的坐标
    onGetHeroPosInRoot: function onGetHeroPosInRoot() {
        // 先获取自身的位置
        var point = this.node.getPosition();
        // 再获取其所在的世界坐标系的位置
        var wordPoint = this.node.parent.convertToWorldSpaceAR(point);
        // 转换到目标结点系的相应位置
        var resultPoint = this.node.parent.parent.convertToNodeSpaceAR(wordPoint);
        window.Global_RootHeroPos = resultPoint;
        return resultPoint;
    },

    start: function start() {
        //this.node.opacity = 0;

        this.count = 0;
        window.Global_heroRadius *= 1.4;
        //是否已经发出去游戏结束
        this.patchGameOver = false;
        this.crashNode = null;

        //颜色改变计数器
        this.colorTimes = 0;
    },


    update: function update(dt) {
        if (window.Global_isInvincible) {
            this.colorTimes += 0.1;
            var flag = Math.floor(this.colorTimes) % 3;
            var color = {};
            if (flag == 0) {
                color = new cc.Color(255, 0, 0);
            } else if (flag == 1) {
                color = new cc.Color(0, 255, 0);
            } else {
                color = new cc.Color(0, 0, 255);
            }
            this.sprite.node.color = color;
            window.headColor = color;
        } else if (this.sprite.node.color != new cc.Color(255, 255, 255)) {
            this.sprite.node.color = new cc.Color(255, 255, 255);
            this.colorTimes = 0;
            window.headColor = new cc.Color(255, 255, 255);
        }
        if (window.Global_moveTouchPosition.length == 0 || !window.Global_heroMoving) {
            this.onRecoveryRotation();
        }
        //根据痕迹进行移动
        if (window.Global_isCrashWithSquare && window.Global_heroBodyArr.length > 0) if (window.Global_heroPositionsArray.length > window.Global_heroRadius * (window.Global_heroBodyArr.length + 1) || window.Global_heroBodyArr[0].getPosition() != window.Global_heroPositionsArray[Math.floor(1 * window.Global_heroRadius)]) {

            for (var i = 0; i < window.Global_heroBodyArr.length; ++i) {
                var index = Math.floor((i + 1) * window.Global_heroRadius);
                if (window.Global_heroPositionsArray[index]) {
                    var x = window.Global_heroPositionsArray[index];
                    window.Global_heroBodyArr[i].setPosition(x);
                }
                if (window.Global_heroPositionsArray.length > window.Global_heroRadius * (window.Global_heroBodyArr.length + 1)) {
                    window.Global_heroPositionsArray.pop();
                }
            }
        }
    },
    lateUpdate: function lateUpdate() {
        //每隔一个像素记录一次hero的位置
        if (window.Global_oldPoint && (window.Global_oldPoint.x != this.onGetHeroPosInRoot.x || window.Global_oldPoint.y != this.onGetHeroPosInRoot().y)) {
            var speedX = Math.abs(window.Global_oldPoint.x - this.onGetHeroPosInRoot().x);
            var speedY = Math.abs(window.Global_oldPoint.y - this.onGetHeroPosInRoot().y);
            var speed = speedX > speedY ? speedX : speedY;

            var pos = this.onGetHeroPosInRoot();
            //X方向坐标的改变
            for (var i = 0; i < speed; ++i) {
                var x = i * Math.cos(Math.atan2(pos.y - window.Global_oldPoint.y, pos.x - window.Global_oldPoint.x)) + window.Global_oldPoint.x;
                var y = i * Math.sin(Math.atan2(pos.y - window.Global_oldPoint.y, pos.x - window.Global_oldPoint.x)) + window.Global_oldPoint.y;

                if (!window.Global_isCrashWithSquare || speedX != 0) window.Global_heroPositionsArray.unshift(cc.p(x, y));
            }
            if (!window.Global_isCrashWithSquare || speedX != 0 || this.count == 2) {
                this.count = 0;
                window.Global_heroPositionsArray.unshift(this.onGetHeroPosInRoot());
            }
            window.Global_oldPoint = this.onGetHeroPosInRoot();
            this.count++;
        }
        if (!window.Global_oldPoint) {
            window.Global_oldPoint = this.onGetHeroPosInRoot();
        }

        //根据痕迹进行移动
        if (!window.Global_isCrashWithSquare && window.Global_heroBodyArr.length > 0) if (window.Global_heroPositionsArray.length > window.Global_heroRadius * (window.Global_heroBodyArr.length + 1) || window.Global_heroBodyArr[0].getPosition() != window.Global_heroPositionsArray[Math.floor(1 * window.Global_heroRadius)]) {
            for (var i = 0; i < window.Global_heroBodyArr.length; ++i) {
                var index = Math.floor((i + 1) * window.Global_heroRadius);

                if (window.Global_heroPositionsArray[index]) {
                    var x = window.Global_heroPositionsArray[index];
                    window.Global_heroBodyArr[i].setPosition(x);
                }
                if (window.Global_heroPositionsArray.length > window.Global_heroRadius * (window.Global_heroBodyArr.length + 1)) {
                    window.Global_heroPositionsArray.pop();
                }
            }
        }
    }
});

cc._RF.pop();