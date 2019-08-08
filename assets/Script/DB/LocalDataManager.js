
var LocalData = require("LocalData");

function SetingData () {
    this.music = 100;
    this.sound = 100;
    this.rotate=1;
    this.fps=60;

    this.infinitefuel=0;
    this.nodrag=0;
    this.unbreakable=0;
    this.nogravity=0;

    this.name = "_setingData";
}

function RocketData (skey){
    this.unitList = [];
    this.skey = skey;
    this.minHeight = 0;
    this.stamp = GameCommon.getCurrentTime();
    this.addUnit = function(x,y,configid){
        var _data = {};
        _data.x = x;
        _data.y = y;
        _data.configid = configid;
        if (this.minHeight > y ){
            this.minHeight = y;
        }
        this.unitList.push(_data);
    };
}

function RocketsListData(){
    this.rocketsList = {};
    this.addRocket = function(data){
        this.rocketsList[data.skey] = data;
        
    };
    this.getNewRocket = function(name){
        return new RocketData(name);
    };

    this.name = "_rocketsListData";
}


var LocalDataManager={
    _setingData:new SetingData(),//玩家设置数据
    _rocketsListData:new RocketsListData(),//玩家的全部火箭数据

    Init(){
        this.LoadData(this._setingData.name);
        this.LoadData(this._rocketsListData.name);
    },

    //加载数据
    LoadData(name) {
        var data =  LocalData.GetLocalData(name);
        if(data != null)//设置信息
        {
            Object.assign(this[name],data);
        }
    },

    //存储数据
    SaveData(data) {
        LocalData.SavaLocalData(data);
    },

    //删除数据
    CleanData(name){
        LocalData.deleteItem(name);
    },

}

module.exports = LocalDataManager;