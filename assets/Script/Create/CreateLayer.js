var BaseLayer = require("../Base/BaseLayer");

cc.Class({
    extends: BaseLayer,

    properties: {
        contentNode : { default:null, type:cc.Node },
        itemPrefab : { default: null, type: cc.Prefab, },
        leftMenuBtnListNode : { default: null, type: cc.Node, },
        leftMenuBtnPrefab : { default: null, type: cc.Prefab, },

        //当前按钮列表的类型
        unitListType:{ default:"", visible:false },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

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

        //添加按钮回调
        var leftMenuBtn = this.node.getChildByName("BtnMenuleft");
        leftMenuBtn.on ('click',this.leftMenuBtnCB,this);

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
});
