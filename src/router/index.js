import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '../store/index'
import localStorage from "../utils/localStorage";

// 解决重复点击路由报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    // console.log(from)
    let path = to.path
    console.log(to.path)
    if ((path == '/pioneerGame' || path == '/home/pioneerGame') && localStorage.get('gameToken') == '') {
        switch (path) {
            case "/pioneerGame":
                path = '/loginPage'
                break;
            case "/home/pioneerGame":
                path = '/home/loginPage'
                break;
        }
        store.commit("changeTabActive",path)
        next({path: path})
    }else if (path == '/entryInfo' &&  localStorage.get('signUpToken') == ''){
        // 跳转报名登录页
        path = '/login'
        store.commit("changeTabActive",path)
        next({path: path})
    }else {
        store.commit("changeTabActive", path)
        next()
    }

})

export default router
