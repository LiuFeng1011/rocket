//此场景用于展示logo动画以及初始化一些数据
var BaseScene = require("../Base/BaseScene");
var GameConfigManager = require("../Base/GameConfigManager");

cc.Class({
    extends: BaseScene,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

        GameConfigManager.loadConfig();

        // this.scheduleOnce(function() {
        //     this.changeScene("menu");
        // }, 1);      
    },


    update (dt) {
        if(this.state == 0 && GameConfigManager.loadFinished()){
            this.changeScene("menu");
        }
    },

    
});
