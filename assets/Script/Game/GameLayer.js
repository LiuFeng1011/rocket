var BaseLayer = require("../Base/BaseLayer");

cc.Class({
    extends: BaseLayer,

    properties: {
        graphics : { default: null, visible:false },
        planetGraphics : { default: null, type: cc.Graphics },
        planetNodeList : { default: null, type: cc.Node, },
        planetNameLabelList : { default: null, type: cc.Node, },
        planetNameLabelPrefab : { default: null, type: cc.Prefab, },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

        this.graphics = this.node.getComponent(cc.Graphics);
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
        for(var i = 0 ;i < GameDefine.planetData.length ; i ++){
            var node = new cc.Node(GameDefine.planetData[i].type);
            this.planetNodeList.addChild(node);

            var planetNode = new cc.Node("planet");
            node.addChild(planetNode);
            planetNode.x = GameDefine.planetData[i].pr;

            node.angle = this.getPlanetRotation(i);

            var node = cc.instantiate(this.planetNameLabelPrefab);
            this.planetNameLabelList.addChild(node);
            var namelabel = node.getComponent(cc.Label);
            namelabel.string = GameDefine.planetData[i].type;
        }
        this.planetNodeList.scale = 0.013;
        // this.updatePlanetNameLabel(0);
    },
    update (dt) {

        this.updatePlanetNameLabel(dt);
    },
    //实时刷新名字位置
    updatePlanetNameLabel(dt){
        this.graphics.clear ();
        this.planetGraphics.clear ();
        
        for(var i = 0 ; i < this.planetNodeList.children.length ; i++){
            var node = this.planetNodeList.children[i].children[0];
            var label = this.planetNameLabelList.children[i];

            var worldpos = node.parent.convertToWorldSpaceAR(node.getPosition());
            var layerpos = this.planetNameLabelList.convertToNodeSpaceAR(worldpos);
            label.position  = layerpos;

            //行星距离屏幕中心点的距离
            var _dis = layerpos.mag();
            //星球中心点 - 半径*node的缩放 《 2000 即有部分绘制内容在屏幕内
            if(_dis - GameDefine.planetData[i].r * this.planetNodeList.scale  < 2000){
                //绘制出的星球半径 如果显示出星球 就不显示轨迹
                var r = GameDefine.planetData[i].r * this.planetNodeList.scale;
                if(r > 2){
                    this.planetGraphics.circle( layerpos.x, layerpos.y, r);
                    cc.log("r :  " + r);
                    continue;
                }
                
            } 
            
            //计算需要绘制的行星路径的半径
            var r  = layerpos.subSelf(this.planetNodeList.position).mag();
            if (r < 10 ){
                continue;
            }

            //圆中心的位置
            var pos = cc.v2(this.planetNodeList.x + this.node.width/ 2,this.planetNodeList.y + this.node.height / 2);

            //计算圆心到原点的距离，确保只绘制经过屏幕一定范围内的路径
            if(Math.abs(pos.mag() - r) < 2000){
                this.graphics.circle(
                    this.planetNodeList.x + this.node.width / 2,
                    this.planetNodeList.y + this.node.height / 2, r);
            }

        }
        this.graphics.stroke();
        this.planetGraphics.stroke ();
        this.planetGraphics.fill ();
    },

    //获取行星当前的角度
    getPlanetRotation(planet_index){
        var now = GameCommon.getCurrentTime();
        //计算当前年剩余时间
        var t = now % GameDefine.planetData[planet_index].cycle;

        //计算当前圈的百分比
        var rate = t / GameDefine.planetData[planet_index].cycle 

        return rate * 360;
        
    },


    TouchStartEvent(event){
        
    },
    TouchMoveEvent(event){
        //缩放
        if(event.getTouches().length > 1){
            var lastdistance = event.getTouches()[0].getPreviousLocation().sub(event.getTouches()[1].getPreviousLocation()).mag();
            var thisdistance = event.getTouches()[0].getLocation().sub(event.getTouches()[1].getLocation()).mag();

            var scaledis = this.planetNodeList.scale * 0.03;
            var symbol = 1;
            if (thisdistance < lastdistance){
                symbol = -1;
            }

            
            var lastpos = this.planetNodeList.convertToNodeSpaceAR(cc.v2(this.node.width / 2,this.node.height / 2));
            this.planetNodeList.scale = GameCommon.getNum(this.planetNodeList.scale,scaledis * symbol,0.01,100000);

            var worldpos = this.planetNodeList.convertToWorldSpaceAR(lastpos).sub(cc.v2(this.node.width / 2,this.node.height / 2));
            //this.planetNodeList.setPosition(this.planetNodeList.getPosition().add(this.planetNodeList.getPosition().scale(cc.v2(scaledis* symbol, scaledis* symbol))));
            
            this.planetNodeList.setPosition(this.planetNodeList.getPosition().sub(worldpos));


        }else{
            //移动界面
            this.planetNodeList.setPosition(this.planetNodeList.getPosition().add(event.getDelta()));
            
        }

    },
    TouchEndEvent(event){

    },
});
