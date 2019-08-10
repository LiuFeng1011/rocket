var BaseLayer = require("../Base/BaseLayer");

cc.Class({
    extends: BaseLayer,

    properties: {
        
        contentNode : { default:null, type:cc.Node },
        itemPrefab : { default: null, type: cc.Prefab, },
        createLayer : {default: null, visible:false },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },
    init (params) {
        this._super(params);

        this.createLayer = params;
        this.reloadList();
    },

    reloadList(){
        this.contentNode.destroyAllChildren();

        cc.log("rocket list data : " + JSON.stringify(GameLocalData._rocketsListData.rocketsList));
        for(var key in GameLocalData._rocketsListData.rocketsList){
            cc.log("load data skey : " + key);
            if(key == "undefined" ){
                continue;
            }

            var data = GameLocalData._rocketsListData.rocketsList[key];

            var node = cc.instantiate(this.itemPrefab);
            this.contentNode.addChild(node);

            var loadnode = node.getComponent("CreateLayerLoadItem");
            cc.log("load data : " + data.skey);
            loadnode.init(data.skey,data.stamp,this,this.delBtnCB,this.loadBtnCB);
        }
    },

    // update (dt) {},

    delBtnCB(skey){
        cc.log("delBtnCB : " + skey);
        delete GameLocalData._rocketsListData.rocketsList[skey];
        GameLocalData.SaveData(GameLocalData._rocketsListData);
        this.reloadList();

    },
    loadBtnCB(skey){
        cc.log("loadBtnCB : " + skey);

        this.createLayer.reLoadRocket(skey);

        this.scene.delLayer(this);
    },
});
