export default {
    //判断是否为空
    isEmpty(val) {
        return val === 'undefined' || val === undefined || val === null || val === '' || val.length < 1 || (val instanceof Object && Object.keys(val).length < 1);
    },
    //获取当前时间戳
    getNowTimeStamp(isSec = true){
        return isSec ? Date.parse(new Date()) / 1000 : Date.parse(new Date());
    },
    //时间转换为时间戳(时间格式用"-"隔开)
    dateToTimeStamp(date){
        if(!date) return;
        if(date.split('-').length > 0) {
            date = new Date(date.replace(/-/g, '/'));
        }
        return date.getTime();
    },
    //将时间戳转为时间
    timeStampToDate(timestamp){
        if(timestamp > 0) {
            let date = new Date(timestamp.length > 10 ? timestamp : (timestamp * 1000));//时间戳为10位需*1000，时间戳为13位的话不需乘1000
            let Y = date.getFullYear() + '-';
            let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
            let D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
            D += ' ';
            // let h,m,s;
            // if(date.getHours() < 10) {
            //     h = "0" + date.getHours() + ':';
            // } else {
            //     h = date.getHours() + ':';
            // }
            // if(date.getMinutes() < 10) {
            //     m = "0" + date.getMinutes() + ':';
            // } else {
            //     m = date.getMinutes() + ':';
            // }
            // if(date.getSeconds() < 10) {
            //     s = "0" + date.getSeconds();
            // } else {
            //     s = date.getSeconds();
            // }
            return Y + M + D;
        }else {
            return timestamp;
        }
    },

    checkPhone(phone){
        let reg = new RegExp(/^1[3456789]\d{9}$/);
        let regResult = reg.test(phone);
        return regResult;
    },


}
