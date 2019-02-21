(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/abs/globalAds.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'f83c91vVcxFq4Sk+wlvsTti', 'globalAds', __filename);
// Script/abs/globalAds.js

'use strict';

window.adsControl = {
    _adType: [],

    admobInit: function admobInit() {
        var self = this;
        sdkbox.PluginAdMob.setListener({
            adViewDidReceiveAd: function adViewDidReceiveAd(name) {
                self.showInfo('adViewDidReceiveAd name=' + name);
            },
            adViewDidFailToReceiveAdWithError: function adViewDidFailToReceiveAdWithError(name, msg) {
                self.showInfo('adViewDidFailToReceiveAdWithError name=' + name + ' msg=' + msg);
            },
            adViewWillPresentScreen: function adViewWillPresentScreen(name) {
                self.showInfo('adViewWillPresentScreen name=' + name);
            },
            adViewDidDismissScreen: function adViewDidDismissScreen(name) {
                self.showInfo('adViewDidDismissScreen name=' + name);
                window.Notification.emit('rewardIsDone', 5);
            },
            adViewWillDismissScreen: function adViewWillDismissScreen(name) {
                self.showInfo('adViewWillDismissScreen=' + name);
            },
            adViewWillLeaveApplication: function adViewWillLeaveApplication(name) {
                self.showInfo('adViewWillLeaveApplication=' + name);
            }
        });
        //初始化Admob
        sdkbox.PluginAdMob.init();

        // just for test
        var plugin = sdkbox.PluginAdMob;
        if ("undefined" != typeof plugin.deviceid && plugin.deviceid.length > 0) {
            this.showInfo('deviceid=' + plugin.deviceid);
            // plugin.setTestDevices(plugin.deviceid);
        }
        this.cacheInterstitial();
    },

    cacheInterstitial: function cacheInterstitial() {
        //console.log("------------cacheInterstitial-");
        //缓存广告数据
        sdkbox.PluginAdMob.cache('gameover');
        sdkbox.PluginAdMob.cache('home');
        sdkbox.PluginAdMob.cache('top_banner');
        sdkbox.PluginAdMob.cache('rewarded');
    },

    showAds: function showAds(adType) {
        //console.log("------------cacheInterstitial-");
        //显示广告
        sdkbox.PluginAdMob.show(adType);
        this._adType.push(adType);
    },

    checkAbsIsAvailabel: function checkAbsIsAvailabel(adType) {
        //检查广告的可用性
        return sdkbox.PluginAdMob.isAvailable(adType);
    },

    hideAds: function hideAds() {
        //console.log("------------hideInterstitial-");
        for (i = 0; i < this._adType.length; ++i) {
            sdkbox.PluginAdMob.hide(this._adType[i]);
        }this._adType = [];
    },

    showInfo: function showInfo(msg) {
        //console.log(msg);
    },

    canUseSdkbox: function canUseSdkbox() {
        if (cc.sys.os == cc.sys.OS_IOS && !CC_WECHATGAME && !cc.sys.isBrowser) {
            return true;
        } else {
            return false;
        }
    }
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
        //# sourceMappingURL=globalAds.js.map
        