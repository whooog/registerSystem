export default {
    /**
     * 存储本地数据
     * @param {*} method 方法
     * @param {*} key 存储key
     * @param {*} value 存储value
     */
    get(key){
        let temp = window.localStorage.getItem(key);
        if (temp) {
            return temp
        } else {
            return ''
        }
    },
    set(key, value){
        window.localStorage.setItem(key, value);
    },
    remove(key){
        window.localStorage.removeItem(key);
    },
    clear(){
        window.localStorage.clear();
    }
}
