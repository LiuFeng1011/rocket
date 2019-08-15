var BaseScene = require("../Base/BaseScene");

cc.Class({
    extends: BaseScene,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this._super();
        cc.director.getPhysicsManager().enabled = true;
    },

    init () {

        this.addLayer("gameLayer",0);
    },

    // update (dt) {},
});
