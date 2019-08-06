var BaseLocalData = {};
module.exports = BaseLocalData;

BaseLocalData.SavaLocalData = function (data) {
    var jsondata = JSON.stringify(data);
    console.log("save data:"+jsondata);
    cc.sys.localStorage.setItem(data.name, jsondata);
};

/*
 * 读取基础数据
 * 还回json格式数据
 */
BaseLocalData.GetLocalData = function (name) {
    // var baseData1 = JSON.stringify(baseData); //将json格式转换成string
    // cc.sys.localStorage.setItem("baseData", baseData1); //将数据存储在本地
    var jsondata = cc.sys.localStorage.getItem(name); //从本地读取数据
    console.log("GetLocalData : " + name + " : " + jsondata);
    if (jsondata == null || jsondata == "") return null;
    var data = JSON.parse(jsondata); //将string转换成json
    return data;
};
/*
 * 删除数据
 */
BaseLocalData.deleteItem = function (name) {
    cc.sys.localStorage.removeItem(name);
};