
window.GameCommon={

    //给变量赋值
    getNum(source,value,min,max){
        source = source + value;
        if(source < min){
            source = min;
        }else if(source > max){
            source = max;
        }
        return source;
    },

    //判断是否同一天
    isCurrentDay:function (_time)
    {
        let myDate = new Date(_time);
        let currentData = new Date();

        if(myDate.getFullYear()==currentData.getFullYear()&&
            myDate.getMonth()==currentData.getMonth() &&
            myDate.getDate()==currentData.getDate())
        {
            return true;
        }
        return false;
    },   
    
    //获取当前时间
    getCurrentTime:function () {
        return new Date().getTime();
    },
    //判断是否为桶一周
    isSameWeek:function(old,now){
        var oneDayTime = 1000*60*60*24;
        var old_count =parseInt(old/oneDayTime);
        var now_other =parseInt(now/oneDayTime);
       // cc.log("判断是否为桶一周::"+parseInt((old_count+3)/7)+":::"+parseInt((now_other+3)/7));
        return parseInt((old_count+3)/7) == parseInt((now_other+3)/7);
    },
    
    getStringTime:function(time){
        var date = new Date(time);
        let Y = date.getFullYear() + '-';
        let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        let D = date.getDate() + ' ';
        let h = date.getHours() + ':';
        let m = date.getMinutes() + ':';
        let s = date.getSeconds();
        return (Y+M+D+h+m+s);
    },
}