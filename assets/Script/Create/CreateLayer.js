var BaseLayer = require("../Base/BaseLayer");

cc.Class({
    extends: BaseLayer,

    properties: {
        contentNode : { default:null, type:cc.Node },
        itemPrefab : { default: null, type: cc.Prefab, },

        //两侧按钮列表
        leftMenuBtnListNode : { default: null, type: cc.Node, },
        rightMenuBtnListNode : { default: null, type: cc.Node, },

        //按钮预制体
        leftMenuBtnPrefab : { default: null, type: cc.Prefab, },
        rightMenuBtnPrefab : { default: null, type: cc.Prefab, },

        //绘制组件
        graphics : { default: null, visible:false },
        //上一次的触摸位置
        lastPos : { default: null, visible:false },
        //鼠标移动的距离
        moveWidth : { default: 0, visible:false },
        moveHeight : { default: 0, visible:false },

        //当前按钮列表的类型
        unitListType:{ default:"", visible:false },

        //组装层
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
        //生成左侧类型按钮列表 配置表中的类型是从1开始
        for(var i = 1 ; i < GameDefine.ROCKET_UNIT_TYPE_NAME.length ; i ++){
            var node = cc.instantiate(this.leftMenuBtnPrefab);
            this.leftMenuBtnListNode.addChild(node);
            var label = node.getChildByName("label").getComponent(cc.Label);
            label.string = GameDefine.ROCKET_UNIT_TYPE_NAME[i];
            node.name = ""+i;

            //添加按钮回调
            node.on ('click',this.leftMenuBtnsCB,this);
        }


        this.rightMenuBtnListNode.active = false;
        //生成右侧按钮列表
        for(var i = 0 ; i < GameDefine.CREATE_CTRL_BTN_NAME.length ; i ++){
            var node = cc.instantiate(this.rightMenuBtnPrefab );
            this.rightMenuBtnListNode.addChild(node);
            var label = node.getChildByName("label").getComponent(cc.Label);
            label.string = GameDefine.CREATE_CTRL_BTN_NAME[i];
            node.name = ""+i;

            //添加按钮回调
            node.on ('click',this.rightMenuBtnsCB,this);
        }

        this.buildlayer = this.node.getChildByName("buildLayer").getComponent("BuildLayer");

        //添加按钮回调
        var leftMenuBtn = this.node.getChildByName("BtnMenuleft");
        leftMenuBtn.on ('click',this.leftMenuBtnCB,this);

        var rightMenuBtn = this.node.getChildByName("BtnMenuRight");
        rightMenuBtn.on ('click',this.rightMenuBtnCB,this);
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
        
        this.loadUnitItem(type);
        this.leftMenuBtnCB(null);
    },
    rightMenuBtnsCB(button){
        var type = button.node.name;
        switch(parseInt(type)){
            
            case GameDefine.CREATE_CTRL_BTN_TYPE.start  :
                this.scene.changeScene("game");
                break;
            case GameDefine.CREATE_CTRL_BTN_TYPE.save  :
                    this.scene.addLayer("createSaveLayer",this);
                break;
            case GameDefine.CREATE_CTRL_BTN_TYPE.load  :
                this.scene.addLayer("createLoadLayer",this);
                break;
            case GameDefine.CREATE_CTRL_BTN_TYPE.clear  :
                    this.buildlayer.clearUnitList();
                break;
            case GameDefine.CREATE_CTRL_BTN_TYPE.exit  :
                this.scene.changeScene("logo");
                break;

        }
        
        this.rightMenuBtnCB(null);
    },

    //保存火箭数据
    saveRocketData(name){
        var rocketData = GameLocalData._rocketsListData.getNewRocket(name);
        var unitListNode = this.buildlayer.unitListNode;
        for (var i = 0 ; i < unitListNode.childrenCount ; i ++){
            var rocketItemListNode = unitListNode.children[i].getComponent("RocketUnit");
            if (rocketItemListNode == null){
                cc.log("this unit list hase a other object : " + unitListNode.children[i].name);
                continue;
            }
            rocketData.addUnit(
                unitListNode.children[i].x,
                unitListNode.children[i].y,
                parseInt(rocketItemListNode.config[GameDefine.ROCKET_UNIT_CONFIG_FIELDS.id]));
        }

        GameLocalData._rocketsListData.addRocket(rocketData);
        GameLocalData.SaveData(GameLocalData._rocketsListData);


        this.scene.addLayer("alertLayer","保存成功:"+name);
    },

    //加载火箭
    reLoadRocket(name){
        this.buildlayer.loadRocket(name);

    },

    leftMenuBtnCB(button){
        this.leftMenuBtnListNode.active = !this.leftMenuBtnListNode.active ;
    },
    rightMenuBtnCB(button){
        this.rightMenuBtnListNode.active = !this.rightMenuBtnListNode.active ;
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
