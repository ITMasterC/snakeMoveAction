(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/common.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '20a5eBQKR5PLb09ChObI+Cj', 'common', __filename);
// Script/common.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {}
});
//场景数据
module.exports = {
    //资源对象池
    foodPool: null,
    squarePool: null,
    pillarPool: null,
    bodyPool: null,

    eggPool: null,

    //
    gameOverNode: null
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
        //# sourceMappingURL=common.js.map
        