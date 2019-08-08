//游戏中所有的界面继承自此类，所有界面的弹出与关闭均有basescene统一管理
//！！！所有的layer都需要制作成预制体
//所有的layer放在统一路径中，方便统一加载
var BaseLayer = cc.Class({
    extends: cc.Component,

    properties: {
        //layer pop到场景中时有basescene赋值，用于统一管理
        layerid:{ default:0, visible:false },
        //layer所在的场景 basescene类
        scene:{ default:null, visible:false },
        //layer的动画类型
        layerActionType:{ default: GameDefine.LAYER_ACTION_TYPE.DEFAULT,type: GameDefine.LAYER_ACTION_TYPE},
        //是否阻止触摸事件
        stopTouch:{ default:false, visible:false },
        
        //动画
        showTime:{ default:0, visible:false },
        showMaxTime:{ default:0.2, visible:false },
        hideTime:{ default:0, visible:false },
        hideMaxTime:{ default:0.2, visible:false },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    init (params) {
        cc.log("baselayer start : " + this.layerid );
        var closeBtnNode = this.node.getChildByName('BackButton');
        if (closeBtnNode != null){
            closeBtnNode.on ('click',this.callback_back,this);
        }else{
            cc.log("closeBtnNode is null : " + this.node.name );
        }
        if(this.layerActionType != GameDefine.LAYER_ACTION_TYPE.DEFAULT){
            this.UIShow();
        }
        
    },

    update (dt) {
        if(this.layerActionType != GameDefine.LAYER_ACTION_TYPE.DEFAULT){
            this.showAction(dt);
            this.hideAction(dt);
        }

    },

    //scene移除layer时会调用此方法
    _close(){

        if(this.layerActionType != GameDefine.LAYER_ACTION_TYPE.DEFAULT){
            this.UIHide();
        }else{
            this.node.destroy();
        }
        
        cc.log("base layer colse!");
    },


    //=============按钮回调===============
    callback_back:function(button)
    {
        var  des = button.node.name;
        cc.log(des);

        this.scene.delLayer(this);
    },

    //=============动画==============
    UIShow(){
        this.showTime = 0;
        this.node.opacity = 0;
        this.node.active = true;
        //this.node.setPositionY(500);
    },
    UIHide(){
        this.hideTime = this.hideMaxTime;
        //this.node.setPositionY(0);
    },
    showAction(dt){
        if(this.showTime >= this.showMaxTime )return;
        this.showTime += dt;

        if(this.showTime >= this.showMaxTime ) {
            this.node.scale = cc.v2(1,1);
            this.node.opacity =  255;
            return;
        }

        var rate = Math.min(this.showTime / this.showMaxTime,1);
        this.node.opacity = rate * 255;

        var form = this.Formula(rate,6);
        // this.node.setPositionY(300 - 300 * form);
        //this.node.scale = cc.v2(form,form);
    },
    hideAction(dt){
        if(this.hideTime <= 0) return;
        this.hideTime -= dt;

        var rate = Math.max(this.hideTime / this.hideMaxTime,0);
        this.node.opacity = rate * 255;
        var form = this.Formula(rate,6);
        // this.node.setPositionY(-300  + 300 * this.Formula(rate,5));
        //this.node.scale = cc.v2(form,form);
        if(this.hideTime <= 0){
            this.Hide();
            this.node.active = false;
        }
    },
    Formula(t,force){
        return t;
        // return -Math.sin(t*force )/(t*force )+1;
    },
    Hide(){
        this.node.destroy();
    },

});
