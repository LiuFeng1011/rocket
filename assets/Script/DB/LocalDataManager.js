
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

var LocalDataManager={
    _setingData:new SetingData(),

    Init(){
        this.LoadData(this._setingData.name);
    },

    //加载数据
    LoadData(name) {
        var data =  LocalData.GetLocalData(name);
        if(data != null)//设置信息
        {
            this[name] = data;
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