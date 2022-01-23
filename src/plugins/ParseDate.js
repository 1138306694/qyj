//filter/index.js内容

import Vue from 'vue'

Vue.filter('date', function (dateTime, fmt) {
    var dateTime = new Date(dateTime);
    let o = {
        "M+": dateTime.getMonth() + 1,               //月份
        "d+": dateTime.getDate(),                    //日
        "h+": dateTime.getHours(),                   //小时
        "m+": dateTime.getMinutes(),                 //分
        "s+": dateTime.getSeconds(),                 //秒
        "q+": Math.floor((dateTime.getMonth() + 3) / 3), //季度
        "S": dateTime.getMilliseconds()             //毫秒
    };

    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (dateTime.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
})
