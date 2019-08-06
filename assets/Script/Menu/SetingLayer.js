
var BaseLayer = require("../Base/BaseLayer");
cc.Class({
    extends: BaseLayer,

    properties: {

        button_music: { default: null, type: cc.Button },
        button_sound: { default: null, type: cc.Button },
        button_rotate: { default: null, type: cc.Button },
        button_fps: { default: null, type: cc.Button },

        button_infinitefuel: { default: null, type: cc.Button },
        button_nodrag: { default: null, type: cc.Button },
        button_unbreakable: { default: null, type: cc.Button },
        button_nogravity: { default: null, type: cc.Button },


        label_music: { default: null, type: cc.Label },
        label_sound: { default: null, type: cc.Label },
        label_rotate: { default: null, type: cc.Label },
        label_fps: { default: null, type: cc.Label },

        label_infinitefuel: { default: null, type: cc.Label },
        label_nodrag: { default: null, type: cc.Label },
        label_unbreakable: { default: null, type: cc.Label },
        label_nogravity: { default: null, type: cc.Label },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        this.button_music.node.on('click', this.callback_music, this);
        this.button_sound.node.on('click', this.callback_sound, this);
        this.button_rotate.node.on('click', this.callback_rotate, this);
        this.button_fps.node.on('click', this.callback_fps, this);

        this.button_infinitefuel.node.on('click', this.callback_infinitefuel, this);
        this.button_nodrag.node.on('click', this.callback_nodrag, this);
        this.button_unbreakable.node.on('click', this.callback_unbreakable, this);
        this.button_nogravity.node.on('click', this.callback_nogravity, this);

        this.InitBtnLabel(false);
    },

    InitBtnLabel(issave) {
        cc.log("seting data : " + JSON.stringify(GameLocalData._setingData));
        if (GameLocalData._setingData.music > 0) {
            this.label_music.string = "音乐 : ON";
        } else {
            this.label_music.string = "音乐 : OFF";
        }

        if (GameLocalData._setingData.sound > 0) {
            this.label_sound.string = "声音 : ON";
        } else {
            this.label_sound.string = "声音 : OFF";
        }

        if (GameLocalData._setingData.rotate > 0) {
            this.label_rotate.string = "屏幕旋转 : ON";
        } else {
            this.label_rotate.string = "屏幕旋转 : OFF";
        }

        if (GameLocalData._setingData.fps == 60) {
            this.label_fps.string = "FPS : 60";
        } else {
            this.label_fps.string = "FPS : 30";
        }


        if (GameLocalData._setingData.infinitefuel == 1) {
            this.label_infinitefuel.string = "无限燃料 : ON";
        } else {
            this.label_infinitefuel.string = "无限燃料 : OFF";
        }
        if (GameLocalData._setingData.nodrag == 1) {
            this.label_nodrag.string = "不受阻力 : ON";
        } else {
            this.label_nodrag.string = "不受阻力 : OFF";
        }
        if (GameLocalData._setingData.unbreakable == 1) {
            this.label_unbreakable.string = "坚不可摧 : ON";
        } else {
            this.label_unbreakable.string = "坚不可摧 : OFF";
        }
        if (GameLocalData._setingData.nogravity == 1) {
            this.label_nogravity.string = "无重力 : ON";
        } else {
            this.label_nogravity.string = "无重力 : OFF";
        }
        if (issave) {
            GameLocalData.SaveData(GameLocalData._setingData);
        }
    },
    // update (dt) {},

    callback_music: function (button) {
        if (GameLocalData._setingData.music > 0) {
            GameLocalData._setingData.music = 0;
        } else {
            GameLocalData._setingData.music = 100;
        }
        this.InitBtnLabel(true);
    },
    callback_sound: function (button) {
        if (GameLocalData._setingData.sound > 0) {
            GameLocalData._setingData.sound = 0;
        } else {
            GameLocalData._setingData.sound = 100;
        }
        this.InitBtnLabel(true);
    },
    callback_rotate: function (button) {
        if (GameLocalData._setingData.rotate > 0) {
            GameLocalData._setingData.rotate = 0;
        } else {
            GameLocalData._setingData.rotate = 1;
        }
        this.InitBtnLabel(true);
    },
    callback_fps: function (button) {
        if (GameLocalData._setingData.fps == 60) {
            GameLocalData._setingData.fps = 30;
        } else {
            GameLocalData._setingData.fps = 60;
        }
        this.InitBtnLabel(true);
    },
    callback_infinitefuel: function (button) {
        if (GameLocalData._setingData.infinitefuel == 1) {
            GameLocalData._setingData.infinitefuel = 0;
        } else {
            GameLocalData._setingData.infinitefuel = 1;
        }
        this.InitBtnLabel(true);
    },
    callback_nodrag: function (button) {
        if (GameLocalData._setingData.nodrag == 1) {
            GameLocalData._setingData.nodrag = 0;
        } else {
            GameLocalData._setingData.nodrag = 1;
        }
        this.InitBtnLabel(true);
    },
    callback_unbreakable: function (button) {
        if (GameLocalData._setingData.unbreakable == 1) {
            GameLocalData._setingData.unbreakable = 0;
        } else {
            GameLocalData._setingData.unbreakable = 1;
        }
        this.InitBtnLabel(true);
    },
    callback_nogravity: function (button) {
        if (GameLocalData._setingData.nogravity == 1) {
            GameLocalData._setingData.nogravity = 0;
        } else {
            GameLocalData._setingData.nogravity = 1;
        }
        this.InitBtnLabel(true);
    },
});
