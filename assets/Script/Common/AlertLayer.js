var BaseLayer = require("../Base/BaseLayer");

cc.Class({
    extends: BaseLayer,

    properties: {
        contentLabel : {default: null, visible:false },
        showtime : 0,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    init (params) {
        this._super(params);
        this.contentLabel = this.node.getChildByName("contentLabel").getComponent(cc.Label);
        this.contentLabel.string = params;


        var cancelBtn = this.node.getChildByName("mask");
        cancelBtn.on ('click',this.cancelBtnCB,this);
    },
    update (dt) {
        this._super(dt);
        this.showtime = this.showtime + dt;
    },

    cancelBtnCB(button){
        if(this.showtime < 1) return;
        
        this.scene.delLayer(this);
    },
});
