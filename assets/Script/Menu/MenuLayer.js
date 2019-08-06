
var BaseLayer = require("../Base/BaseLayer");
cc.Class({
    extends: BaseLayer,

    properties: {
        
        button_achievement:{ default:null, type:cc.Button },
        button_shop:{ default:null, type:cc.Button },
        button_create:{ default:null, type:cc.Button },
        button_reingame:{ default:null, type:cc.Button },
        button_guide:{ default:null, type:cc.Button },
        button_seting:{ default:null, type:cc.Button },
        button_exit:{ default:null, type:cc.Button },

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        //初始化按钮监听
        this.button_achievement.node.on ('click',this.callback_achievement,this);
        this.button_shop.node.on        ('click',this.callback_shop,this);
        this.button_create.node.on      ('click',this.callback_create,this);
        this.button_reingame.node.on    ('click',this.callback_reingame,this);
        this.button_guide.node.on       ('click',this.callback_guide,this);
        this.button_seting.node.on      ('click',this.callback_seting,this);
        this.button_exit.node.on        ('click',this.callback_exit,this);

    },

    // update (dt) {},
    //=============按钮回调===============
    callback_achievement:function(button)
    {
        var  des = button.node.name;
        cc.log(des);
        this.scene.addLayer("achievementLayer",1);
    },
    callback_shop:function(button)
    {
        var  des = button.node.name;
        cc.log(des);
        this.scene.addLayer("shoplayer",1);
    },

    callback_create:function(button)
    {
        var  des = button.node.name;
        cc.log(des);
        
        this.scene.changeScene("create");
    },

    callback_reingame:function(button)
    {
        var  des = button.node.name;
        cc.log(des);
        
    },

    callback_guide:function(button)
    {
        var  des = button.node.name;
        cc.log(des);
        
        this.scene.addLayer("guideLayer",1);
    },

    callback_seting:function(button)
    {
        var  des = button.node.name;
        cc.log(des);
        
        this.scene.addLayer("setingLayer",1);
    },

    callback_exit:function(button)
    {
        var  des = button.node.name;
        cc.log(des);
        
    },
});
