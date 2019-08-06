var BaseLayer = require("../Base/BaseLayer");

cc.Class({
    extends: BaseLayer,

    properties: {
        graphics : { default: null, visible:false },
        lastPos : { default: null, visible:false },
        moveWidth : { default: 0, visible:false },
        moveHeight : { default: 0, visible:false },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        
    },


    init (params) {
        this.graphics = this.node.getComponent(cc.Graphics);
        cc.log("init build layer");
        this.drawLine();
    },

    //绘制背景线
    drawLine(){
        this.graphics.clear ();
        this.node.width = GameDefine.BULID_LAYER_WIDTH[0] * GameDefine.BUILD_UNIT_SIZE;
        this.node.height = GameDefine.BULID_LAYER_HEIGHT[0] * GameDefine.BUILD_UNIT_SIZE;

        var _w = this.scene.node.width / 2 + this.node.x;
        var _h = this.scene.node.height / 2 + this.node.y;

        for (var i = 0 ;i <= GameDefine.BULID_LAYER_WIDTH[0] ; i ++){
            this.graphics.moveTo(
                (i * GameDefine.BUILD_UNIT_SIZE - this.node.width / 2) * this.node.scale + _w,
                -this.node.height / 2 * this.node.scale + _h
                );

            this.graphics.lineTo(
                (i * GameDefine.BUILD_UNIT_SIZE - this.node.width / 2) * this.node.scale + _w,
                this.node.height / 2 * this.node.scale + _h
                );
        }
        for (var i = 0 ;i <= GameDefine.BULID_LAYER_HEIGHT[0] ; i ++){
            this.graphics.moveTo(
                - this.node.width / 2 * this.node.scale + _w,
                (i * GameDefine.BUILD_UNIT_SIZE - this.node.height / 2) * this.node.scale + _h
                );

            this.graphics.lineTo(
                this.node.width / 2 * this.node.scale + _w,
                (i * GameDefine.BUILD_UNIT_SIZE - this.node.height / 2) * this.node.scale + _h
                );
        }
        this.graphics.stroke ();
    },

    //移动操作
    refrestLayerPos(){
        //设置layer坐标
        this.node.x =  this.node.x + this.moveWidth;
        this.node.y =  this.node.y + this.moveHeight;
        this.moveWidth = 0;
        this.moveHeight = 0;

        //边界控制
        var _maxx = this.node.width * this.node.scale / 2 - this.scene.node.width / 2 + 200
        if(_maxx > 0){
            if (this.node.x > _maxx){
                this.node.x = _maxx
            }
            else if (this.node.x < -_maxx){
                this.node.x = -_maxx
            }
        }
        
        var _maxy = this.node.height * this.node.scale / 2 - this.scene.node.height / 2 + 200
        
        if(_maxy > 0){
            if (this.node.y > _maxy){
                this.node.y = _maxy
            }
            else if (this.node.y < -_maxy){
                this.node.y = -_maxy
            }
        }


        //重新绘制辅助线
        this.drawLine();
    },

    // update (dt) {},
    TouchStartEvent(event){
        this.lastPos = event.getLocation();
    },
    TouchMoveEvent(event){
        this.moveWidth = this.moveWidth + (event.getLocation().x - this.lastPos.x);
        this.moveHeight = this.moveHeight + (event.getLocation().y - this.lastPos.y);
        //cc.log("TouchMoveEvent : " + event.getLocation() + "");
        this.lastPos = event.getLocation();
        this.refrestLayerPos();
    },
    TouchEndEvent(event){

        
    },
});
