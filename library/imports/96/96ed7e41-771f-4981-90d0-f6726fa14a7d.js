"use strict";
cc._RF.push(module, '96ed75Bdx9JgZDQ9nJvoUp9', 'globalData');
// Script/globalData.js

'use strict';

window.Global_suqareWidth = null; //方块的宽度
window.Global_heroLength = 0; //hero的长度
window.Global_heroBodyArr = []; //身体数组
window.Global_scene = null; //主场景节点
window.Global_squareSpeed = 0; //window.Global_speed/59.52;//方块下落的速度
window.Global_isCrashing = false;
window.Global_oldHeroLength = 0;
window.Global_createrSomethingY = 0; //物品生成处的Y坐标
window.Global_createPositionY = 0;
window.Global_startGame = false;
window.Global_heroRadius = 0; //hero的半径
window.Global_heroMoveUpSpeed = 5; //hero的移动加速度
window.Global_winSize = cc.director.getWinSize();
window.Global_winSizeWidth = cc.director.getWinSize().width / 2;
window.Global_winSizeHeight = cc.director.getWinSize().height / 2;
//window.Global_heroSlowDownSpeed = 5;         //hero减速时的加速度

window.Global_preGetScore = 0; //本局游戏得分

window.Global_isGameOver = 0;
window.Global_isSideCrash = 0;

//方块刚体的位置微调
window.Global_bodyW = null;
window.Global_bodyH = 0;
window.Global_bodyX = 0;
window.Global_bodyY = 0;

//鼠标移动的坐标顺序
window.Global_moveTouchPosition = [];

window.Global_heroMoving = false;

//每次move的距离
window.Global_moveDistance = 0;

//身体节点前一帧的坐标
window.Global_bodyPositionsArr = new Array();
//不动状态下的两个body之间的Y间距
window.Global_bodyDistanceY = 0;
//hero的运动坐标轨迹
window.Global_heroPositionsArray = new Array();
//hero的运动坐标轨迹
window.Global_heroPositionsYArray = new Array();
//节点的旧坐标
window.Global_oldPoint = null;

window.Global_tttt = new Array();

//广告类型
window.Global_homeAds = 'home';
window.Global_gameOverAds = 'gameover';
window.Global_rewardAds = 'rewarded';
window.Global_topAds = 'top_banner';
//是不是在移动端运行
window.Global_isMobile = false;

//全局变量控制主场景的action
window.Global_isCrashWithSquare = false;
window.Global_isTurnRightCrash = false;
window.Global_isTurnLeftCrash = false;

window.Global_thisNode = null;

//复活后无敌状态
window.Global_isInvincible = false;
//单局是否已经复活过
window.Global_isResurgenced = false;

//选择弹窗的显示状态
window.Global_adsNodeIsShowing = false;

//根节点下的hero的坐标
window.Global_RootHeroPos = cc.p(0, 0);

//正常状态下Y方向hero的受力
window.Global_VelocityXNUM = 61.5;
window.Global_VelocityForY = window.Global_speed * 61.5;
window.Global_speed = 4; //330;             //柱子、食物下降的速度

//in crash down
window.Global_isInCrashDown = false;

//规避ios碰撞失效现象
window.isCrashTime = 0;

//吃到的egg的flag 0-2
window.eggFlag = 0;

//是否死亡前分享过游戏
window.shareForDie = false;
//选择不分享
window.noToShare = false;

//冲撞效果分享
window.shareForCrash = false;
//冲撞加持下的速度
window.getCrashSpeed = 7;

//冲撞效果分享
window.shareForIntensify = false;

//是否获取新手礼包
window.getAward = false;
window.getAwardNum = 101;

//头结点的颜色
window.headColor = new cc.Color(255, 255, 255);

//皮肤商城中选中的皮肤
window.selectIndex = 0;

//点击继续游戏时不弹出玩法提示
window.isAgain = false;

//单局游戏内是否已经看视频领取过钻石奖励
window.isGotDiamond = false;

//是否是第一次加载游戏
window.isFirstLoad = true;

//是否正在显示复活选择界面
window.isShowRevive = false;

//拥有的复活道具
window.revivePropNum = 0;

//记录用户登录的code
window.code = null;

//单局游戏复活分享到的群id数组
window.reviveOpenGID = new Array();

//护盾状态 TODO
window.shieldState = false;
window.Global_isCool = false;
window.Global_old_speed = 0;

cc._RF.pop();