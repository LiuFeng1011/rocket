module.exports = {
    callback : null,
    target : null,
    loadTXT : function(path,cb,target){
        var self = this;
        this.callback = cb;
        this.target = target;
        cc.loader.loadRes(path,function(err,data){
            if (err) {
                cc.log(err);
            }else{
                data = data + "";
                var strsArray=new Array();
                strsArray=data.split(new RegExp('\\r\\n|\\r|\\n'));

                var dataArray={};
                for(var i = 0 ; i < strsArray.length ; i ++){
                    var linearr = strsArray[i].split("\t");
                    dataArray[linearr[0]] = linearr;
                }
                if(self.target != null){

                    self.callback.call(self.target,dataArray);
                }
            }
        });
    }
};