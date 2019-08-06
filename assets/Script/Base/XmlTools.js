/**
 * Created by liufeng on 17/5/5.
 */


module.exports = {
    callback : null,
    target : null,
    loadXML : function(path,cb,target){
        var self = this;
        this.callback = cb;
        this.target = target;
        cc.loader.loadRes(path,function(err,res){
            if (err) {
                cc.log(err);
            }else{
                
                loadXMLString(0,res);
                if(self.target != null){

                    self.callback.call(self.target);
                }
            }
        });
    }
};

var loadXMLString = function(startindex,xml){

    if(startindex >=  xml.length ){
        return;
    }
    var str = "" ;

    var type = 0;//0  1标题 2标签 3注释 4内容
    for(var i = startindex ; i < xml.length ; i ++){
        if(i+1 >=  xml.length ){
            return;
        }
        if(type == 0){
            if(xml[i] == "<" && xml[i+1] == "?"){
                type = 1;
                i++;
                continue;
            }else if(xml[i] == "<" && xml[i+1] == "!"){
                type = 3;
                i+=3;
                continue;
            }else if(xml[i] == "<"){
                type = 4;
                continue;
            }
        }

        if(type == 0) continue;

        if(type == 1){
            if(xml[i] == "?" && xml[i+1] == ">"){
                startindex = i+2;
                break;
            }
        }else if(type == 3){
            if(xml[i] == "-" && xml[i+1] == "-" && xml[i+2] == ">"){
                startindex = i+3;
                break;
            }
        }else{
            if(xml[i] == ">"){
                startindex = i+1;
                //DELETE
                str = "";
                break;
            }else if(xml[i] == "/" && xml[i+1] == ">"){
                startindex = i+2;
                break;
            }
            str += xml[i];
        }
    }
    addLine(str);
    cc.log("type : " + type + " str======:"+str);
    loadXMLString(startindex,xml);
}

//一条数据
var addLine = function(str){
    if(str == ""){
        return;
    }

    var strs = new Array(); //定义一数组
    strs = str.split(" ");
    var datautil = {};

    for(var i = 1 ; i < strs.length ; i ++){
        var values = strs[i].split("=");
        var name = values[0];
        if(name == "")break;
        var value = values[1].substring(1,values[1].length-1);
        datautil[name] = value;
    }

    if(!(strs[0] in GameCommon.GAME_CONFIG_DATA)){
        GameCommon.GAME_CONFIG_DATA[strs[0]] = {};
    }

    GameCommon.GAME_CONFIG_DATA[strs[0]][datautil["id"]] = datautil;

}