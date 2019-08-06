
cc.Class({
    extends: cc.Component,

    properties: {
        unitconfig:{ default:0, visible:false },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    init(configid){
        this.unitconfig = GAME_CONFIG_DATA.RocketUnitConfig[configid];
        var self = this;
        //加载预制体
        cc.loader.loadRes("Prefabs/RocketUnit/"+this.unitconfig[GameDefine.ROCKET_UNIT_CONFIG_FIELDS.resname], function (err, prefab) {
            var node = cc.instantiate(prefab);

            self.node.addChild(node);
            self.addFin(node);
        });

        this.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            this.TouchStartEvent(event);
        }, this);
    },

    addFin(node){
        //对图标进行缩放
        var widthrate = (this.node.width - 20) / node.width;
        var heightrate = (this.node.height - 20) / node.height;

        var scale = 1;
        if (widthrate < heightrate ){
            scale = widthrate;
        }else{
            scale = heightrate;
        }
        node.scale = scale;

        node.y = (- node.height / 2 ) * scale 
    },

    TouchStartEvent(event){

        cc.log("touch unit : " + JSON.stringify(this.unitconfig));

    },
    // update (dt) {},
});
