// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        contentLabel : { default:null, type:cc.Label },

        stateLabel : { default:null, type:cc.Label },

        index:{ default:0, visible:false },

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
    },

    init(index){
        this.index = index;
        this.stateLabel.string = "未完成";
        this.contentLabel.string = "成就["+index+"]";


        this.node.on('click', this.btnCB, this);

    },

    // update (dt) {},


    btnCB(event){
        cc.log("click achievement item : " + this.index);
    },
});
