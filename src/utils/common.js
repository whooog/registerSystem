
export default {
    //判断是否为空
    isEmpty(val) {
        return val === 'undefined' || val === undefined || val === null || val === '' || val.length < 1 || (val instanceof Object && Object.keys(val).length < 1);
    },
}
