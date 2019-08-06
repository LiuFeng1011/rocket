var BaseLayer = require("../Base/BaseLayer");

cc.Class({
    extends: BaseLayer,

    properties: {
        contentNode : { default:null, type:cc.Node },
        itemPrefab : { default: null, type: cc.Prefab, },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

        for(var i = 0 ; i < 20 ; i ++){

            var node = cc.instantiate(this.itemPrefab);
            this.contentNode.addChild(node);

            var itemnode = node.getComponent("AchievementItemNode");
            itemnode.init(i);
        }
    },

    // update (dt) {},
});
