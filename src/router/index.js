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
    // mode: 'history',   // 打包注释
    routes
})

router.beforeEach((to, from, next) => {
    // console.log(from)
    let path = to.path
    if ((path == '/pioneerGame') && localStorage.get('gameToken') == '') {
        path = '/loginPage'
        store.commit("changeTabActive",path)
        next({path: path})
    }else if (path == '/entryInfo' && localStorage.get('signUpToken') == ''){
        path = '/login'
        store.commit("changeTabActive",path)
        next({path: path})
    }else {
        store.commit("changeTabActive", path)
        next()
    }

})

export default router
