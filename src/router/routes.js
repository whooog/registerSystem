import loginPage from '../pages/login/loginPage.vue'
import Home from '../pages/home/home.vue'
import Index from '../pages/index/index.vue'
import Scene from '../pages/scene/scene.vue'
import newsList from '../pages/news/newsList.vue'
import Page404 from '../pages/page404/index.vue'
import Child from '../pages/child/child.vue'
const routes = [{
        path: '/login',
        component: resolve => require(['@/pages/login/login'], resolve)
    },
    {
        path: '/loginPage',
        component: loginPage
    },
    {
        name: 'home',
        path: '/home',
        component: Home,
        children: [{
            name: 'index',
            path: 'index',
            component: Index,
        }, {
            name: 'newsList',
            path: 'newsList',
            component: newsList
        }, {
            name: 'scene',
            path: 'scene',
            component: Scene
        },{
            path: '/',
            redirect: 'index'
        }]
    },
    {
        path:"/child",
        component: Child
    },
    {
        path: '/entryInfo',
        component: resolve => require(['@/pages/index/entryInfo'], resolve)
    },
    {
        path: '/pioneerGame',
        component: resolve => require(['@/pages/index/pioneerGame'], resolve),
    },
    {
        path: '/addTrafficInfo',
        component: resolve => require(['@/pages/index/addTrafficInfo'], resolve)
    },
    // 新增分管创业工作校领导
    {
        path: '/addLeaderInfo',
        component: resolve => require(['@/pages/index/addLeaderInfo'], resolve)
    },
    // 新增项目信息
    {
        path: '/addProjectInfo',
        component: resolve => require(['@/pages/index/addProjectInfo'], resolve)
    },
    // 新增住宿
    {
        path: '/addHotel',
        component: resolve => require(['@/pages/index/addHotel'], resolve)
    },
    // 新增住宿详情
    {
        path: '/addHotelDetail',
        component: resolve => require(['@/pages/index/addHotelDetail'], resolve)
    },
    {
        path: '/',
        component: Home,
    },

    {
        path: '*',
        component: Page404 //404页面
    }
]

export default routes
