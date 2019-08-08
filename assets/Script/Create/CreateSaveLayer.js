var BaseLayer = require("../Base/BaseLayer");

cc.Class({
    extends: BaseLayer,

    properties: {
        editBox : {default: null, visible:false },
        buttonenter : {default: null, visible:false },
        buttoncancel : {default: null, visible:false },
        createLayer : {default: null, visible:false },

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    init (params) {
        this._super(params);
        this.editBox = this.node.getChildByName("editBox").getComponent(cc.EditBox);

        var enterMenuBtn = this.node.getChildByName("ButtonEnter");
        enterMenuBtn.on ('click',this.enterMenuBtnCB,this);

        this.createLayer = params;
    },



    enterMenuBtnCB(button){
        var name = this.editBox.string;
        if(name == ""){
            this.scene.addLayer("alertLayer","给你的火箭起个名字吧");
            return;
        };
        
        if(GameLocalData._rocketsListData.rocketsList[name] != null){

            this.scene.addLayer("alertLayer","已经有其他火箭叫这个名字了，换一个吧");
            return;
        }

        this.scene.delLayer(this);
        this.createLayer.saveRocketData(name);

    },
    // update (dt) {},
});
