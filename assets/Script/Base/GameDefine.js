
window.GameDefine={
    GAME_VERSION:"0.0.1",
    GAME_NAME:"Rocket",

    //编辑界面每个单位的尺寸
    BUILD_UNIT_SIZE : 60,

    //编辑界面大小 需要乘以单位尺寸
    BULID_LAYER_WIDTH : [30,60],
    BULID_LAYER_HEIGHT : [80,160],

    //游戏中地图最大的放大尺寸
    GAME_SCENE_MAX_SCALE : 4000,

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

    CREATE_CTRL_BTN_TYPE : cc.Enum({
        start:0,// 0.开始
        save:1,// 1.保存
        load:2,// 2.负载
        clear:3,// 3.清除
        exit:4,// 4.退出
    }),
    CREATE_CTRL_BTN_NAME : [
        "开始",
        "保存",
        "负载",
        "清除",
        "退出",
    ],

    /*行星数据*/
	planetData:[

        {
			type:"sun",
            pr:1, //距离太阳距离 km
            r:6955,//星球半径 km
            cycle:7577280,//公转周期 87.70d s
		},
        {
			type:"mercury",
            pr:579100, //距离太阳距离 km
            r:48.80,//星球半径 km
            cycle:7577280,//公转周期 87.70d s
		},{
			type:"Venus",
			pr:1082000,
            r:121.036,
            cycle:19414166,//公转周期 224.701d s
		},{
			type:"earth",
			pr:1496000,
            r:127.563,
            cycle:31556926,//公转周期 365.2422d s
		},{
			type:"Mars",
			pr:2279400,
            r:67.94,
            cycle:59355072,//公转周期 686.98d s
		},{
			type:"Jupiter",
			pr:7783300,
            r:1429.84,
            cycle:374335689,//公转周期 s
		},{
			type:"Saturn",
			pr:14294000,
            r:1205.36,
            cycle:935913052,//公转周期 s
		},{
			type:"Uranus",
			pr:28709900,
            r:511.18,
            cycle:2661041808,//公转周期 s
		},{
			type:"Neptune",
			pr:45040000,
            r:495.32,
            cycle:5212306713,//公转周期 s
		}],
}