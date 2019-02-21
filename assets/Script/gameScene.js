
var com = require('common');
cc.Class({
    extends: cc.Component,

    properties: {
        canvas: cc.Node,
        HeroPrefab:{
            default:null,
            type: cc.Prefab
        },      
        testSprite: cc.Node,
        heroSprite: cc.Node,
        leftBodyNode: cc.Node,
        rightBodyNode: cc.Node,  
        cameraNode:{
            default: null,
            type: cc.Node
        },
         //身体预制资源
         bodyPrefab:{
            default: null,
            type: cc.Prefab
        },
    },
    onLoad: function() {       
        this.winSize = cc.director.getWinSize();
      
        //全局变量控制主场景的action
        window.revivePropNum = 0;
        window.isShowRevive = false;
        window.Global_isResurgenced = false;
        window.Global_isCrashWithSquare = false;
        window.Global_isTurnRightCrash = false;
        window.Global_isTurnLeftCrash = false;
        window.Global_speed = 4;

        var self = this;



        self.beforHeroPosition = cc.p(0,0);//用判断身体游动


        //初始化全局变量
        window.Global_scene = this;
        self.heroPosY = cc.director.getWinSize().height/7;//头节点应处的位置
        window.Global_createrSomethingY = cc.director.getWinSize().height/2 + window.Global_suqareWidth*0.5;
        
        //Hero相关数据
        self.heroDead = false;
        //初始化hero
        self.initHero();
        //移动hero
        self.moveHero(self);
        self.positionY = cc.director.getWinSize().height/2 - 4*this.heroPosY - this.Hero.width/2;

        //速度等级
        self.level = 1;
        //点击移动时候的hero的y坐标
        self.touchMoveHeroPodY = 0;
        //
        self.callBackTrue = 0;
        self.timer = 5;
        
        
        
        //刚体的碰撞
        self.physicsManager = cc.director.getPhysicsManager();
        self.physicsManager.enabled = true;
        self.physicsManager.enabledContactListener = true;
        self.physicsManager.enabled = true;

        self.stopActions = [];

        self.flagNode = null;

    
        //开始游戏
        self.startGame();

        //移动的方向
        self.disX = 0;
        //鼠标按下是否移动的标志
        self.touchFlag = 0;
        //移动的前一个坐标
        self.prePosX = 0;
    },    

    start: function(){
        window.Global_thisNode = this;
        this.flagCount = 0;
        this.bodyIndex = 0;
    },
    //增加身体长度奖励
    onGotBodyReward: function(count){
        this.Hero.getComponent('hero').setHeroLength(count);
        this.onAddBodyToLast(count);
    },

/**************hero start*********************/
    initHero: function(){
         this.Hero = cc.instantiate(this.HeroPrefab);
         this.Hero.getComponent('hero').init(this);
         this.Hero.parent = this.heroSprite;
         this.Hero.setLocalZOrder(101);
         this.Hero.setPosition(cc.p(0, cc.director.getWinSize().height/2 - 4*this.heroPosY - this.Hero.width/2));
         this.Hero.active = false;
               
         this.beforHeroPosition = this.Hero.getPosition();
    },

    onTouchCallBack: function(){
        this.touchFlag++;
        if(this.touchFlag == 2){
            this.Hero.getComponent('hero').onRecoveryRotation();
            this.Hero.getComponent('hero').onSetHeroSpeed(cc.v2(0,window.Global_VelocityForY));
            this.touchFlag = 0;
        }
    },

    moveHero: function(self){
        //开始点击
        self.canvas.on(cc.Node.EventType.TOUCH_START, function(event){
            //将鼠标按下后的第一个坐标位置存入数组
            window.Global_moveTouchPosition.push(event.target.convertTouchToNodeSpaceAR(event.touch));
            self.prePosX = event.target.convertTouchToNodeSpaceAR(event.touch).x;
            //开启鼠标按下的定时器
            if(!cc.director.getScheduler().isScheduled(self.onTouchCallBack, self)){
                self.schedule(self.onTouchCallBack, 0.03);
            }
        }, self.node);

        //鼠标移动 - 更新目地坐标
        self.canvas.on(cc.Node.EventType.TOUCH_MOVE, function(event){
            var s = 0;
            window.Global_heroMoving = true;

            
            //坐标数组为空时加入当前touch坐标
            if(window.Global_moveTouchPosition.length == 0){
                window.Global_moveTouchPosition.push(event.target.convertTouchToNodeSpaceAR(event.touch));
            }
            //判断鼠标移动方向和碰撞方向的关系决定是否将移动坐标存入坐标数组
            if(window.Global_isTurnLeftCrash){
                var s = event.target.convertTouchToNodeSpaceAR(event.touch).x - window.Global_moveTouchPosition[0].x;
                if(s > 0){
                    window.Global_moveTouchPosition.push(event.target.convertTouchToNodeSpaceAR(event.touch));
                }
            }else if(window.Global_isTurnRightCrash){
                s = event.target.convertTouchToNodeSpaceAR(event.touch).x - window.Global_moveTouchPosition[0].x;
                if(s < 0){
                    window.Global_moveTouchPosition.push(event.target.convertTouchToNodeSpaceAR(event.touch));
                }
            }else{
                window.Global_moveTouchPosition.push(event.target.convertTouchToNodeSpaceAR(event.touch));
            }
            s = event.target.convertTouchToNodeSpaceAR(event.touch).x - window.Global_moveTouchPosition[0].x;
            if(Math.abs(s) < 2){
                window.Global_heroMoving = false;
            }       
            //依据数组中的坐标依次移动hero， 移动之后去除该坐标
            if(window.Global_moveTouchPosition.length > 1){
                s = window.Global_moveTouchPosition[1].x - window.Global_moveTouchPosition[0].x;
                self.prePosX = window.Global_moveTouchPosition[0].x;
                if(window.Global_isTurnLeftCrash){
                    if(s < 0) return;
                }else if(window.Global_isTurnRightCrash){
                    if(s > 0) return;
                }
                if(Math.abs(s) < 1){
                    //cc.log("-----------onSetHeroSpeed---")
                    self.Hero.getComponent('hero').onSetHeroSpeed(cc.v2(0,window.Global_VelocityForY));
                }else{   
                    //改变蛇头的角度
                    //self.Hero.getComponent('hero').onChangeRotation(s);
                }
                window.Global_tttt.push(s);
                self.disX = s; 
                window.Global_moveTouchPosition.shift();

                //cc.log(Math.abs(s));
                var flagDisX = Math.abs(s*32);
                let multiple = 28;
                if(flagDisX > 3 && flagDisX < 15){
                    multiple = 29;
                }else if(flagDisX < 30){
                    multiple = 31;
                }else{
                    multiple = 32;
                }

                if(window.adsControl.canUseSdkbox()){
                    var winSizeWidth = myNative.callNativeFun("NativeOcClass", "onGetWinSizeWisth");
                    if(winSizeWidth > 1300){
                        multiple -= Math.floor(winSizeWidth/100);
                    }
                }

                //设置力来移动
                var distance = Math.abs(s*multiple);
                var y = 0.1;
                if(s < 0){
                    y = -0.1;
                }
                var velocity = cc.v2(s*multiple, y);
                velocity.normalizeSelf();
                velocity.mulSelf(distance*2);
                self.Hero.getComponent('hero').onSetHeroSpeed(velocity);

                
                self.disX = s;
            }else{
                self.disX = 0;
            }
            self.touchFlag = 0;
        }, self.node);
        //鼠标松开事件， 停止移动
        self.canvas.on(cc.Node.EventType.TOUCH_END, function(event){
            if(window.Global_moveTouchPosition.length > 0){
                for(var i = 0; i < window.Global_moveTouchPosition.length;){
                    var s = window.Global_moveTouchPosition[0].x - self.prePosX;
                    //设置力来移动
                    var distance = Math.abs(s*30);
                    var y = 0.1;
                    if(s < 0){
                        y = -0.1;
                    }
                    var velocity = cc.v2(s*30, y);
                    velocity.normalizeSelf();
                    velocity.mulSelf(distance*2);
                    self.Hero.getComponent('hero').onSetHeroSpeed(velocity);
                    self.prePosX = window.Global_moveTouchPosition[0].x;
                    window.Global_moveTouchPosition.shift();
                }
            }else{
                self.Hero.getComponent('hero').onSetHeroSpeed(cc.v2(0,window.Global_VelocityForY));
            }
            //console.log(window.Global_moveTouchPosition.length);
            window.Global_moveTouchPosition = [];
            window.Global_heroMoving = false;
            //关闭鼠标按下的定时器
            if(cc.director.getScheduler().isScheduled(self.onTouchCallBack,self)){   
                self.unschedule(self.onTouchCallBack);
            }
           
        }, self.node);
    },

    onSetPosition: function(pos, isRightToLeft){
        this.canMovePosition = this.Hero.parent.convertToNodeSpaceAR(pos);
        if(isRightToLeft){
            this.canMovePosition.x += this.Hero.width/2;
        }else{
            this.canMovePosition.x -= this.Hero.width/2;
        }
    },

    onSetHeroPosition: function(num){
        this.Hero.setPositionX(this.Hero.getPositionX() + num);
    },

    onGetHeroPosition: function(){
        return this.Hero.getPosition();
    },
/************ hero end *************/

/*****************body start******************/
    //在最后一个位置添加count节长度
    onAddBodyToLast: function(count){
        var length = window.Global_heroBodyArr.length;
        for( var i = 0; i < length; ++i){
            window.Global_heroBodyArr[i].setLocalZOrder(99-i);
        }
        var len = window.Global_heroLength;
        if(window.Global_heroLength < 30){
                //hero本身的长度为0时， 在hero的位置添加
                for(var i = 0; i < count; ++i){
                    if(len == 0){
                        var node = this.onAddBodyFromPool(i-1)
                        //node.setPosition(cc.p(0, cc.director.getWinSize().height/2 - 4*this.heroPosY - this.Hero.width/2));
                        window.Global_heroBodyArr.push(node);
                        //console.log(node.getPosition());
                        window.Global_heroBodyArr[len+i].setPosition(cc.p(0, cc.director.getWinSize().height/2 - 4*this.heroPosY - this.Hero.width/2));
                    }else{
                        var bodyLastPosition = window.Global_heroBodyArr[len - 1].getPosition();
                        var node = this.onAddBodyFromPool(len+i);
                        window.Global_heroBodyArr.push(node);
                        window.Global_heroBodyArr[len+i].setPosition(cc.p(bodyLastPosition.x, bodyLastPosition.y));
                    }
                }
            //身体跟着移动
            window.Global_heroLength = window.Global_heroBodyArr.length;
        }else{
            //身体跟着移动
            window.Global_heroLength += count;
        }
        if(len == 0){
            window.Global_heroPositionsArray = [];
        }
        window.Global_oldHeroLength = window.Global_heroLength;
    },
    //添加body节点到场景
    onAddBodyFromPool: function(index){
        let body = null;
        body = cc.instantiate(this.bodyPrefab);
        body.parent = this.testSprite;
        body.getComponent('bodyPrefab').init(index);
        body.getComponent('bodyPrefab').onSetPreBodyIndex(index);
        return body;
    },
    //开始游戏
    startGame: function(){
        window.shareForIntensify = false;
        window.shareForDie = false;
        window.noToShare = false;
        window.Global_createPositionY = window.Global_createrSomethingY;

        this.Hero.active = true;
        //测试添加身体节点到场景
        this.onAddBodyToLast(20);

        if(window.isAgain){
            this.startFlag = true;
        }else{
            this.startFlag = false;
        }
    },

    lateUpdate:function(dt){
        if(this.Hero.getPositionX() > cc.director.getWinSize().width/2 -this.Hero.width/2 || 
        this.Hero.getPositionX() < -cc.director.getWinSize().width/2 +this.Hero.width/2 ){
            //改变蛇头的角度
            this.Hero.getComponent('hero').onRecoveryRotation();
        }
        if(this.Hero.getPositionY() > this.positionY + 1 && this.Hero.getPositionY() < this.positionY + 20 ){   
            window.Global_VelocityXNUM = 61.4;
        }else if(this.Hero.getPositionY() < this.positionY -1 && this.Hero.getPositionY() > this.positionY - 5){     
            window.Global_VelocityXNUM = 61.8;
        }else if(this.Hero.getPositionY() <= this.positionY - 30){
            window.Global_VelocityXNUM = 90;
        }else if(this.Hero.getPositionY() >= this.positionY + 20){
            window.Global_VelocityXNUM = 45;
        }
        window.Global_VelocityForY = (window.shareForCrash ? window.getCrashSpeed : window.Global_speed) * window.Global_VelocityXNUM;
        if(this.disX == 0 || window.Global_moveTouchPosition.length < 1){
            this.Hero.getComponent('hero').onSetHeroSpeed(cc.v2(0,window.Global_VelocityForY));
        }
    },
    
    update: function(dt) {
        window.Global_VelocityXNUM = 61.5;
        if(this.Hero.getPositionY() < this.positionY -10) return;
    
        this.heroSprite.y += window.Global_speed;
        this.leftBodyNode.y += window.Global_speed;
        this.rightBodyNode.y += window.Global_speed;
        this.cameraNode.y += window.Global_speed;

    },
});
