cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            default: null,
            type: cc.Label
        },
        // defaults, set visually when attaching this script to the Canvas
        text: 'Hello, World!'
    },

    // use this for initialization
    onLoad: function () {
        this.label.string = this.text;


        
        cc.log("hello world");
    },
    start: function () {
        var ctx = this.node.getComponent(cc.Graphics);
        //ctx.rect(20,20,250,200);
        ctx.moveTo(20,20);
        ctx.lineTo(20,100);
        ctx.lineTo(100,200);
        ctx.lineTo(100,20);
        

        ctx.fill();
    },
    // called every frame
    update: function (dt) {

    },
});
