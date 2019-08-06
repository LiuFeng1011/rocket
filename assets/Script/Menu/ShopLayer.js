var BaseLayer = require("../Base/BaseLayer");

cc.Class({
    extends: BaseLayer,

    properties: {
        button_rebuy:{ default:null, type:cc.Button },
        button_item1:{ default:null, type:cc.Button },
        button_item2:{ default:null, type:cc.Button },
        button_item3:{ default:null, type:cc.Button },
        button_item4:{ default:null, type:cc.Button },

        button_iteminfo1:{ default:null, type:cc.Button },
        button_iteminfo2:{ default:null, type:cc.Button },
        button_iteminfo3:{ default:null, type:cc.Button },
        button_iteminfo4:{ default:null, type:cc.Button },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

        this.button_rebuy.node.on ('click',this.callback_rebuy,this);
        this.button_item1.node.on ('click',this.callback_item1,this);
        this.button_item2.node.on ('click',this.callback_item2,this);
        this.button_item3.node.on ('click',this.callback_item3,this);
        this.button_item4.node.on ('click',this.callback_item4,this);

        this.button_iteminfo1.node.on ('click',this.callback_iteminfo1,this);
        this.button_iteminfo2.node.on ('click',this.callback_iteminfo2,this);
        this.button_iteminfo3.node.on ('click',this.callback_iteminfo3,this);
        this.button_iteminfo4.node.on ('click',this.callback_iteminfo4,this);
    },

    // update (dt) {},

    //=============按钮回调===============
    
    callback_rebuy:function(button)
    {
        var  des = button.node.name;
        cc.log(des);
    },
    callback_item1:function(button)
    {
        var  des = button.node.name;
        cc.log(des);
    },
    callback_item2:function(button)
    {
        var  des = button.node.name;
        cc.log(des);
    },
    callback_item3:function(button)
    {
        var  des = button.node.name;
        cc.log(des);
    },
    callback_item4:function(button)
    {
        var  des = button.node.name;
        cc.log(des);
    },


    callback_iteminfo1:function(button)
    {
        this.scene.addLayer("shopitemInfoLayer",1);
    },
    callback_iteminfo2:function(button)
    {
        this.scene.addLayer("shopitemInfoLayer",2);
    },
    callback_iteminfo3:function(button)
    {
        this.scene.addLayer("shopitemInfoLayer",3);
    },
    callback_iteminfo4:function(button)
    {
        this.scene.addLayer("shopitemInfoLayer",4);
    },
});
