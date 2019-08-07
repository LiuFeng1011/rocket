cc.Class({
    extends: cc.Component,

    properties: {
        graphics : { default: null, visible:false },
        // lastPos : { default: null, visible:false },
        // moveWidth : { default: 0, visible:false },
        // moveHeight : { default: 0, visible:false },
        movePos : { default: new cc.Vec2(0.0, 0.0), visible:false },
        //界面移动超出边界的范围
        border : { default: 200, visible:false },

        //当前选择的部件
        selectUnitNode : { default: null, visible:false },

        //部件列表
        unitListNode : { default: null, visible:false },

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.graphics = this.node.getComponent(cc.Graphics);

        this.unitListNode =  new cc.Node('unitListNode');
        this.unitListNode.parent = this.node;
        cc.log("init build layer");
        this.drawLine();
    },


    //绘制背景线
    drawLine(){
        this.graphics.clear ();
        this.node.width = GameDefine.BULID_LAYER_WIDTH[0] * GameDefine.BUILD_UNIT_SIZE;
        this.node.height = GameDefine.BULID_LAYER_HEIGHT[0] * GameDefine.BUILD_UNIT_SIZE;

        var _w = this.node.parent.width / 2 + this.node.x;
        var _h = this.node.parent.height / 2 + this.node.y;

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
        this.node.setPosition(this.node.getPosition().add(this.movePos));
        this.movePos.subSelf(this.movePos);

        //边界控制
        var _maxx = this.node.width * this.node.scale / 2 - this.node.parent.width / 2 + this.border;
        if(_maxx > 0){
            this.node.x = GameCommon.getNum(this.node.x,0,-_maxx,_maxx);
        }
        
        var _maxy = this.node.height * this.node.scale / 2 - this.node.parent.height / 2 + this.border;
        
        if(_maxy > 0){
            this.node.y = GameCommon.getNum(this.node.y,0,-_maxy,_maxy);
        }


        //重新绘制辅助线
        this.drawLine();
    },

    refreshSelecetUnitPos(eventpos){

        if(false){
            //跟随触点移动
            var worldpos = eventpos ;//eventpos.add(new cc.Vec2(this.node.parent.width / 2,this.node.parent.height / 2));
            var layerpos = this.node.convertToNodeSpaceAR(worldpos);
    
            this.selectUnitNode.x = layerpos.x - layerpos.x % GameDefine.BUILD_UNIT_SIZE;
            this.selectUnitNode.y = layerpos.y - layerpos.y % GameDefine.BUILD_UNIT_SIZE;
    
        }else{
            //坐标增量移动
            if(Math.abs(this.movePos.x) > 60){
                this.selectUnitNode.x = this.selectUnitNode.x + this.movePos.x - (this.movePos.x % GameDefine.BUILD_UNIT_SIZE);
                this.movePos.x = this.movePos.x % GameDefine.BUILD_UNIT_SIZE;
            }
            if(Math.abs(this.movePos.y) > 60){
                this.selectUnitNode.y = this.selectUnitNode.y + this.movePos.y - (this.movePos.y % GameDefine.BUILD_UNIT_SIZE);
                this.movePos.y = this.movePos.y % GameDefine.BUILD_UNIT_SIZE;
            }
        }
    },
    //清除所有对象
    clearUnitList(){
        this.unitListNode.removeAllChildren();
        this.selectUnitNode = null;
    },

    createUnit(config,posx,posy){
        this.addUnit(config,posx,posy,true);
    },
    //param movetarget 是否设置为移动对象
    addUnit(config,posx,posy,movetarget){
        var self = this;
        cc.loader.loadRes("Prefabs/RocketUnit/"+config[GameDefine.ROCKET_UNIT_CONFIG_FIELDS.resname], function (err, prefab) {
            var node = cc.instantiate(prefab);
            self.unitListNode.addChild(node);
            node.x = posx - posx % GameDefine.BUILD_UNIT_SIZE;
            node.y = posy - posy % GameDefine.BUILD_UNIT_SIZE;
            if(movetarget){
                self.selectUnitNode = node;
            }
            //添加事件监听
            node.on(cc.Node.EventType.TOUCH_START, function (event) {
                self.unitTouchCB(event);
            }, this);
        });
    },

    unitTouchCB(event){
        cc.log("unitTouchCB : " + event.target.name);
        this.selectUnitNode = event.target ;
    },

    // update (dt) {},
    TouchStartEvent(event){
        this.lastPos = event.getLocation();
    },
    TouchMoveEvent(event){
        // this.moveWidth = this.moveWidth + (event.getLocation().x - this.lastPos.x);
        // this.moveHeight = this.moveHeight + (event.getLocation().y - this.lastPos.y);
        // this.lastPos = event.getLocation();
        if(this.selectUnitNode != null){
            this.movePos.addSelf(event.getDelta().mul(2.0-this.node.scale));

            //移动选中的部件
            this.refreshSelecetUnitPos(event.getLocation());
        }else{
            this.movePos.addSelf(event.getDelta());
            //缩放
            if(event.getTouches().length > 1){
                var lastdistance = event.getTouches()[0].getPreviousLocation().sub(event.getTouches()[1].getPreviousLocation()).mag();
                var thisdistance = event.getTouches()[0].getLocation().sub(event.getTouches()[1].getLocation()).mag();
                var dis = thisdistance - lastdistance;

                var scaledis = dis / 1080;

                this.node.scale = GameCommon.getNum(this.node.scale,scaledis,0.5,1.5);

            }else{
                //移动界面
                this.refrestLayerPos();
            }
        }

    },
    TouchEndEvent(event){

        this.selectUnitNode = null;
    },
});
