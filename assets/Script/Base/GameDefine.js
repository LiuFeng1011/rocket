
window.GameDefine={
    GAME_VERSION:"0.0.1",
    GAME_NAME:"Rocket",

    BUILD_UNIT_SIZE : 60,
    BULID_LAYER_WIDTH : [30,60],
    BULID_LAYER_HEIGHT : [80,160],

    LAYER_ACTION_TYPE : cc.Enum({
        DEFAULT : 0,
        SCALE : 1,
    }),

    ROCKET_UNIT_CONFIG_FIELDS : cc.Enum({
        id:0,
        name:1,
        type:2,
        resname:3,
        size:4,
        des:5,
        mass:6,
        fuel_mass:7,
        thrust:8,
        torque:9,
        electricity:10,
        separating:11,
        efficiency:12,
        groundspeed:13,
        fuel_consume:14,
        electricity_consume:15,
        electricity_produce:16,
    }),

    ROCKET_UNIT_TYPE : cc.Enum({
        base:1,// 1.基本
        daxinglingjian:2,// 2.大型零件
        zhongxinglingjian:3,// 3.中型零件
        chaodaxinglingjian:4,// 4.超大型零件
        juxinglingjian:5,// 5.巨型零件
        qidonglixue:6,// 6.气动力学
        diandong:7,// 7.电动
        xiaoyong:8,// 8.效用
    }),

    ROCKET_UNIT_TYPE_NAME : [
        "default",
        "基本",
        "大型零件",
        "中型零件",
        "超大型零件",
        "巨型零件",
        "气动力学",
        "电动",
        "效用"
    ],

}