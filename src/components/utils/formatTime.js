export function FormatTime(t,date){
        var date=new Date(date);
        var o = {   
            "M+" : date.getMonth()+1,                 //月份   
            "d+" : date.getDate(),                    //日   
            "h+" : date.getHours(),                   //小时   
            "m+" : date.getMinutes(),                 //分   
            "s+" : date.getSeconds(),                 //秒   
            "q+" : Math.floor((date.getMonth()+3)/3), //季度   
            "S"  : date.getMilliseconds()             //毫秒   
        };   
        if(/(y+)/.test(t)){
            t=t.replace(RegExp.$1,(date.getFullYear()+"").substr(4-RegExp.$1.length)); 
        };    
        for(var k in o){
            if(new RegExp("("+ k +")").test(t)){
                t=t.replace(RegExp.$1,(RegExp.$1.length===1)?(o[k]):(("00"+ o[k]).substr((""+o[k]).length))); 
            }; 
        }
        return t; 
};


/**
 * 
console.log(FormatTime("yyyy-MM-dd hh:mm:ss",123567899));    //1970-01-02 18:19:27
console.log(FormatTime("yy-MM-dd hh:mm:ss",123456));    //70-01-01 08:02:03
console.log(FormatTime("M-d hh:mm",777777777));    //1-10 08:02
console.log(FormatTime("yy-MM-dd hh:mm",88888888888));    //72-10-26 03:21
console.log(FormatTime("MM-dd hh:mm",9999999999999));    //11-21 01:46
 *  
 * */


 