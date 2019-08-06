var BaseLayer = require("../Base/BaseLayer");

cc.Class({
    extends: BaseLayer,

    properties: {

        contentLabel : { default:null, type:cc.Label },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
    },

    // update (dt) {},
    init (params) {
        
        this._super(params);
        this.contentLabel.string = "content : " + params;

    },
});
