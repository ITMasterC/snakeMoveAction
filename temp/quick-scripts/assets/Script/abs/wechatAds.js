(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/abs/wechatAds.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '904da7xWwdOFoewuxxqOu7a', 'wechatAds', __filename);
// Script/abs/wechatAds.js

"use strict";

module.exports = {
    startBanner: null,

    gameBanner: null,
    rewardedVideoAd: null, //游戏中的广告视频
    skinRewardVideo: null, //皮肤商城中的广告视频

    rewardType: null //观看广告获得奖品的类型 1 - 彩蛋；2 - 复活； 3 - 钻石； 4 - 皮肤 ；
};

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
        //# sourceMappingURL=wechatAds.js.map
        