var BaseLayer = require("../Base/BaseLayer");

cc.Class({
    extends: BaseLayer,

    properties: {
        contentNode : { default:null, type:cc.Node },
        itemPrefab : { default: null, type: cc.Prefab, },
        leftMenuBtnListNode : { default: null, type: cc.Node, },
        leftMenuBtnPrefab : { default: null, type: cc.Prefab, },

        //绘制组件
        graphics : { default: null, visible:false },
        //上一次的触摸位置
        lastPos : { default: null, visible:false },
        //鼠标移动的距离
        moveWidth : { default: 0, visible:false },
        moveHeight : { default: 0, visible:false },

        //当前按钮列表的类型
        unitListType:{ default:"", visible:false },

        //
        buildlayer : { default: null, visible:false },
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

        this.node.on('selectUnit', function (event) {
            this.selectUnit(event.target,event.getUserData());
            //cc.log("selectUnit event : " + event.getUserData()[GameDefine.ROCKET_UNIT_CONFIG_FIELDS.resname]);
        },this);
    },

    init (params) {
        this._super(params);

        this.loadUnitItem(1);

        this.leftMenuBtnListNode.active = false;
        //生成类型按钮
        for(var i = 1 ; i < GameDefine.ROCKET_UNIT_TYPE_NAME.length ; i ++){
            var node = cc.instantiate(this.leftMenuBtnPrefab);
            this.leftMenuBtnListNode.addChild(node);
            var label = node.getChildByName("label").getComponent(cc.Label);
            label.string = GameDefine.ROCKET_UNIT_TYPE_NAME[i];
            node.name = ""+i;

            //添加按钮回调
            node.on ('click',this.leftMenuBtnsCB,this);
        }

        this.buildlayer = this.node.getChildByName("buildLayer").getComponent("BuildLayer");

        //添加按钮回调
        var leftMenuBtn = this.node.getChildByName("BtnMenuleft");
        leftMenuBtn.on ('click',this.leftMenuBtnCB,this);

    },

    selectUnit(target,config){
        var worldpos = target.parent.convertToWorldSpaceAR(target.getPosition());
        var layerpos = this.buildlayer.node.convertToNodeSpaceAR(worldpos);

        cc.log("selectUnit : " + config[GameDefine.ROCKET_UNIT_CONFIG_FIELDS.resname] + "  " + JSON.stringify(layerpos));
        this.buildlayer.createUnit(config,layerpos.x,layerpos.y);
    },

    //按照类型刷新左侧道具列表
    //param type : GameDefine.ROCKET_UNIT_TYPE
    loadUnitItem(type){
        if(this.unitListType == type+""){
            return;
        }
        this.unitListType = type+"";
        this.contentNode.destroyAllChildren();
        for(var key in GAME_CONFIG_DATA.RocketUnitConfig) {

            var _config = GAME_CONFIG_DATA.RocketUnitConfig[key];
            if(_config[GameDefine.ROCKET_UNIT_CONFIG_FIELDS.type] == type+""){
                var node = cc.instantiate(this.itemPrefab);
                this.contentNode.addChild(node);
    
                var itemnode = node.getComponent("RocketItemListNode");
                itemnode.init(key);
            }
        }
    },
    // update (dt) {},

    leftMenuBtnsCB(button){
        var type = button.node.name;
        cc.log("cleck button : " + type);
        this.loadUnitItem(type);
    },

    leftMenuBtnCB(button){
        cc.log("cleck button leftMenuBtn " );
        this.leftMenuBtnListNode.active = !this.leftMenuBtnListNode.active ;
    },

    TouchStartEvent(event){
        this.buildlayer.TouchStartEvent(event);
    },
    TouchMoveEvent(event){
        this.buildlayer.TouchMoveEvent(event);
    },
    TouchEndEvent(event){
        this.buildlayer.TouchEndEvent(event);
    },
});
