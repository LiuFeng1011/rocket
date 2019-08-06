
var TXTTools = require("TXTTools");

module.exports = {
    configCount : 1,
    loadConfig : function(){
        window.GAME_CONFIG_DATA = {};
        TXTTools.loadTXT("Config/RocketUnitConfig",this.loadRocketUnitConfigCB,this);
    },
    loadRocketUnitConfigCB: function(confdata){
        this.configCount = this.configCount - 1;
        GAME_CONFIG_DATA.RocketUnitConfig = confdata;

        cc.log("loadRocketUnitConfigCB:"+JSON.stringify(confdata));
    },
    loadFinished: function(){
        return this.configCount <= 0;
    },


};
