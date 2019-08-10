
cc.Class({
    extends: cc.Component,

    properties: {
        skey : { default: null, visible:false  },
        nameLabel : { default: null, type: cc.Label },
        dateLabel : { default: null, type: cc.Label },
        delnode : { default: null, type: cc.Node },
        loadnode : { default: null, type: cc.Node },

        target : { default: null, visible:false  },
        delcallback : { default: null, visible:false  },
        loadcallback : { default: null, visible:false  },

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    init(name,stamp,target,delcallback,loadcallback){
        this.skey = name;
        this.nameLabel.string = name ;
        this.dateLabel.string = GameCommon.getStringTime(stamp);

        this.delnode.on('click', this.delCB, this);
        this.loadnode.on('click', this.loadCB, this);

        this.target = target;
        this.delcallback = delcallback;
        this.loadcallback = loadcallback;
    },
    delCB(btn){
        cc.log("click del btn : " + this.skey);
        this.delcallback.call(this.target,this.skey);
    },
    loadCB(btn){
        
        this.loadcallback.call(this.target,this.skey);
    },


    // update (dt) {},
});
