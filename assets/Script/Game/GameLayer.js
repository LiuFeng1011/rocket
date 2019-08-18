var BaseLayer = require("../Base/BaseLayer");

cc.Class({
    extends: BaseLayer,

    properties: {
        //星球路径绘制组件
        graphics : { default: null, visible:false },
        //星球绘制组件
        planetGraphics : { default: null, type: cc.Graphics },

        //星球node 
        planetNodeList : { default: null, type: cc.Node, },
        //星球名称的node
        planetNameLabelList : { default: null, type: cc.Node, },
        planetNameLabelPrefab : { default: null, type: cc.Prefab, },

        //所有星球node
        planetList : {default: {},visible:false},

        //发射台预制体
        groundPrefab : { default: null, type: cc.Prefab, },

        //当前视窗锁定的星球
        lockPlanet : { default: null, visible:false },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

        this.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            this.TouchStartEvent(event);
        }, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            this.TouchMoveEvent(event);
        }, this);
        this.node.on(cc.Node.EventType.TOUCH_END, function (event) {
            this.TouchEndEvent(event);
        }, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, function (event) {
            this.TouchEndEvent(event);
        }, this);
    },

    init (params) {
        this._super(params);
        this.graphics = this.node.getComponent(cc.Graphics);
        //创建星球
        for(var i = 0 ;i < GameDefine.planetData.length ; i ++){
            var node = new cc.Node(GameDefine.planetData[i].type);
            this.planetNodeList.addChild(node);

            // var planetNode = new cc.Node("planet");
            // node.addChild(planetNode);
            // planetNode.x = GameDefine.planetData[i].pr;
            //node.angle = this.getPlanetRotation(i);

            var namenode = cc.instantiate(this.planetNameLabelPrefab);
            this.planetNameLabelList.addChild(namenode);
            var namelabel = namenode.getComponent(cc.Label);
            namelabel.string = GameDefine.planetData[i].type;

            var planet = {}
            planet.node = node;
            planet.namenode = namenode;
            planet.data = GameDefine.planetData[i];
            this.planetList[GameDefine.planetData[i].type] = planet;
        }
        //初始化 界面缩放比例
        this.planetNodeList.scale = GameDefine.GAME_SCENE_MAX_SCALE;

        this.updatePlanetData(0);

        //初始化视角位置
        var earthnode = this.planetList["earth"].node;
        var _pos = earthnode.getPosition().add(cc.v2(0,this.planetList["earth"].data.r));
        this.planetNodeList.setPosition(cc.v2(-_pos.x * this.planetNodeList.scale,-_pos.y * this.planetNodeList.scale));
        
        //创建发台
        var groundnode = cc.instantiate(this.groundPrefab);
        earthnode.addChild(groundnode);
        groundnode.setPosition(cc.v2(0,this.planetList["earth"].data.r));
        groundnode.scale = 0.01;

    },
    update (dt) {

        this.lockPlanet = null;
        //更新数据
        this.updatePlanetData(dt);
        this.updateLockPosition();
        //绘制星球和轨迹
        this.draw();
    },
    setLockNode(lastpos,node){
        this.lockPlanet = {};
        this.lockPlanet.node = node;
        this.lockPlanet.lastpos = lastpos;
    },

    //锁定视窗位置
    updateLockPosition(){
        if (this.lockPlanet == null){
            return;
        }
        //计算世界坐标偏移量 差量计算有精度损失 不用此方法
        // var lastworldpos = this.planetNodeList.convertToWorldSpaceAR(this.lockPlanet.lastpos);
        // var worldpos = this.planetNodeList.convertToWorldSpaceAR(this.lockPlanet.node.getPosition());

        // var _movepos = this.lockPlanet.node.getPosition().sub(this.lockPlanet.lastpos);

        // _movepos = _movepos.mul(this.planetNodeList.scale);
        // cc.log(_movepos.toString());szsaAszZA    Z÷
        // var _pos = worldpos.sub(lastworldpos);
        var _pos = this.lockPlanet.lastpos.add(this.lockPlanet.node.getPosition());
        // var _pos = this.lockPlanet.node.getPosition().add(cc.v2(0,127.563));
        this.planetNodeList.setPosition(cc.v2(-_pos.x * this.planetNodeList.scale,-_pos.y * this.planetNodeList.scale));

    },
    //实时刷新名字位置
    updatePlanetData(dt){
        for(var key in this.planetList){
            var planet = this.planetList[key];
        // for(var i = 0 ; i < this.planetNodeList.children.length ; i++){
            // var node = this.planetNodeList.children[i].children[0];
            //更新星球位置
            var node = planet.node;
            var r = this.getPlanetRotation(planet.data);
            var lastpos = node.convertToNodeSpaceAR(cc.v2(this.scene.canvas.node.width / 2,this.scene.canvas.node.height / 2));
            
            //计算x，y坐标
            var x = Math.sin(r / 180 * Math.PI ) * planet.data.pr;
            var y = Math.cos(r / 180 * Math.PI ) * planet.data.pr;
            node.x = x;
            node.y = y;

            var worldpos = node.parent.convertToWorldSpaceAR(node.getPosition());
            var layerpos = this.planetNameLabelList.convertToNodeSpaceAR(worldpos);
            
            //行星距离屏幕中心点的距离
            var _dis = layerpos.mag();
            if(_dis - planet.data.r * this.planetNodeList.scale  < 1000){
                var r = planet.data.r * this.planetNodeList.scale;
                if(r > 40){
                    this.setLockNode(lastpos,node);
                    continue;
                }
                
            }
        }
    },

    draw(){

        this.graphics.clear ();
        this.planetGraphics.clear ();

        for(var key in this.planetList){
            var planet = this.planetList[key];
            var node = planet.node;

            var worldpos = node.parent.convertToWorldSpaceAR(node.getPosition());
            var layerpos = this.planetNameLabelList.convertToNodeSpaceAR(worldpos);
            
            //更新星球名字标签的位置zaz
            var namenode = planet.namenode;

            namenode.position  = layerpos;

            //行星距离屏幕中心点的距离
            var _dis = layerpos.mag();
            //星球中心点 - 半径*node的缩放 < 2000 即有部分绘制内容在屏幕内
            if(_dis - planet.data.r * this.planetNodeList.scale  < 2000){
                //绘制出的星球半径 如果显示出星球 就不显示轨迹
                var r = planet.data.r * this.planetNodeList.scale;
                if(r > 5){
                    this.planetGraphics.circle( worldpos.x, worldpos.y, r);
                    continue;
                }
                
            } 

            var circler = planet.data.pr * this.planetNodeList.scale ;
            //计算需要绘制的行星路径的半径
            //var r  = layerpos.sub(this.planetNodeList.position).mag();
            if (circler < 10 ){
                continue;
            }
            //圆中心的位置
            var pos = cc.v2(this.planetNodeList.x + this.scene.canvas.node.width/ 2,this.planetNodeList.y + this.scene.canvas.node.height / 2);

            //计算圆心到原点的距离，确保只绘制经过屏幕一定范围内的路径
            if(Math.abs(pos.mag() - circler) < 2000){
                this.graphics.circle(
                    this.planetNodeList.x + this.scene.canvas.node.width / 2,
                    this.planetNodeList.y + this.scene.canvas.node.height / 2, circler);
            }
        }


        this.graphics.stroke();
        this.planetGraphics.stroke ();
        this.planetGraphics.fill ();
    },

    //获取行星当前的角度
    getPlanetRotation(planetData){
        var now = GameCommon.getCurrentTime();
        //计算当前年剩余时间
        var t = now % planetData.cycle;

        //计算当前圈的百分比
        var rate = t / planetData.cycle 

        return rate * 360;
        
    },


    TouchStartEvent(event){
        
    },
    TouchMoveEvent(event){
        //缩放
        if(event.getTouches().length > 1){
            var lastdistance = event.getTouches()[0].getPreviousLocation().sub(event.getTouches()[1].getPreviousLocation()).mag();
            var thisdistance = event.getTouches()[0].getLocation().sub(event.getTouches()[1].getLocation()).mag();

            //缩放速度
            var scaledis = this.planetNodeList.scale * 0.03;
            //判断放大还是缩小
            var symbol = 1;
            if (thisdistance < lastdistance){
                symbol = -1;
            }

            var lastpos = this.planetNodeList.convertToNodeSpaceAR(cc.v2(this.scene.canvas.node.width / 2,this.scene.canvas.node.height / 2));
            this.planetNodeList.scale = GameCommon.getNum(this.planetNodeList.scale,scaledis * symbol,0.0002,GameDefine.GAME_SCENE_MAX_SCALE);


            // if (this.lockPlanet != null){
            //     return;
            // }
            var worldpos = this.planetNodeList.convertToWorldSpaceAR(lastpos).sub(cc.v2(this.scene.canvas.node.width / 2,this.scene.canvas.node.height / 2));
            //this.planetNodeList.setPosition(this.planetNodeList.getPosition().add(this.planetNodeList.getPosition().scale(cc.v2(scaledis* symbol, scaledis* symbol))));
            
            this.planetNodeList.setPosition(this.planetNodeList.getPosition().sub(worldpos));

            cc.log("scale : " + this.planetNodeList.scale);
        }else{
            //移动界面
            this.planetNodeList.setPosition(this.planetNodeList.getPosition().add(event.getDelta()));
            
        }

    },
    TouchEndEvent(event){

    },
});
