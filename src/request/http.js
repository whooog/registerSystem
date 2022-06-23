/**axios封装
 * 请求拦截、相应拦截、错误统一处理
 */
const baseUrl = 'http://match.xiyudata.com/'
import axios from 'axios';
import { Toast } from 'vant';
import router from '../router/index'
import localStorage from '../utils/localStorage'
// 环境的切换
axios.defaults.baseURL = process.env.VUE_APP_BASE_API;

// 请求超时时间
axios.defaults.timeout = 10000;

// post请求头
let headers = {
    // "Content-Type": 'application/json',
}

// 请求拦截器
axios.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        return Promise.error(error);
    })
// 响应拦截器
axios.interceptors.response.use(
    response => {
        // console.log("response",response)
        // console.log(JSON.stringify(response))
        const status = response.data.status
        if(status === 200){
            return Promise.resolve(response.data);
        }else if(status === 401||status === 403){
            // Notify({ type: 'primary', message:  response.data.msg});
            Toast(response.data.msg)

            // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
            router.replace({
                path: '/login'
            });
        }else{
            // Notify({ type: 'primary', message:  response.data.msg});
            Toast(response.data.msg)
        }
    },
    // 服务器状态码不是200的情况
    error => {
        console.log("error",error)
    }
);
export default {
    /**
     * get方法，对应get请求
     * @param {String} url [请求的url地址]
     * @param {Object} params [请求时携带的参数]
     * @param {String} tokenType [token类型]
     * gameToken    创新大赛token
     * signUpToken  投资机构人员报名token
     */
    get(url, params,tokenType) {
        url = url && url.startsWith('http') ? url : `${baseUrl}${url}`;
        switch (tokenType) {
            case 'gameToken':
                headers.Authorization = localStorage.get('gameToken')
                break;
            case 'signUpToken':
                headers.Authorization = localStorage.get('signUpToken')
                break;
        }
        return new Promise((resolve, reject) => {
            axios({
                method:'get',
                url: url,
                params: params || {},
                headers: headers
            })
                .then(res => {
                    resolve(res.data);
                })
                .catch(err => {
                    reject(err.data)
                })
        });
    },

    /**
     * post方法，对应post请求
     * @param {String} url [请求的url地址]
     * @param {Object} params [请求时携带的参数]
     * @param {String} tokenType [token类型]
     * gameToken    创新大赛token
     * signUpToken  投资机构人员报名token
     */
    post(url, params, tokenType) {
        url = url && url.startsWith('http') ? url : `${baseUrl}${url}`;
        switch (tokenType) {
            case 'gameToken':
                headers.Authorization = localStorage.get('gameToken')
                break;
            case 'signUpToken':
                headers.Authorization = localStorage.get('signUpToken')
                break;
        }
        return new Promise((resolve, reject) => {
            axios({
                method: 'post',
                url: url,
                data: params || {},
                headers: headers
            }).then(res => {
                resolve(res.data);
             }).catch(err => {
                reject(err.data)
            })
        });
    },

    /**
     * put方法，对应put请求
     * @param {String} url [请求的url地址]
     * @param {Object} params [请求时携带的参数]
     */
    put(url, params) {
        // console.log(params)
        return new Promise((resolve, reject) => {
            axios.put(url, params)
                .then(res => {
                    resolve(res.data);
                })
                .catch(err => {
                    reject(err.data)
                })
        });
    },


    /**
     * delete方法，对应delete请求
     * @param {String} url [请求的url地址]
     * @param {Object} params [请求时携带的参数]
     */
    delet(url, params) {
        // console.log(params)
        return new Promise((resolve, reject) => {
            axios.delete(url, params)
                .then(res => {
                    resolve(res.data);
                })
                .catch(err => {
                    reject(err.data)
                })
        });
    }
}




