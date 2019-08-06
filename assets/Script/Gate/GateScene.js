var BaseScene = require("../Base/BaseScene");
var LocalDataManager = require("../DB/LocalDataManager");

cc.Class({
    extends: BaseScene,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        window.GameLocalData = LocalDataManager;
        GameLocalData.Init();
        
        this.scheduleOnce(function() {
            this.changeScene("logo");
        }, 1);        
    },

    // update (dt) {},
});
