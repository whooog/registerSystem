import Home from '../pages/home/home.vue'
import Index from '../pages/index/index.vue'
import newsList from '../pages/news/newsList.vue'
import Page404 from '../pages/page404/index.vue'
const routes = [{
        path: '/login',
        component: resolve => require(['@/pages/login/login'], resolve)
    },
    {
        path: '/loginPage',
        component: resolve => require(['@/pages/login/loginPage'], resolve)
    },
    {
        name: 'home',
        path: '/home',
        component: Home,
        children: [
        {
            name: 'index',
            path: 'index',
            component: Index,
        },
        {
            name: 'newsList',
            path: 'newsList',
            component: newsList
        },
        {
            name: 'loginPage',
            path: 'loginPage',
            component: resolve => require(['@/pages/login/loginPage'], resolve)
        },
        {
            name: 'pioneerGame',
            path: 'pioneerGame',
            component: resolve => require(['@/pages/signUp/pioneerGame'], resolve),
        },
        {
            path: '/',
            redirect: 'index'
        }]
    },
    {
        path:"/advisoryList",
        component: resolve => require(['@/pages/news/advisoryList'], resolve)
    },
    {
        path:"/newsDetail",
        component: resolve => require(['@/pages/news/newsDetail'], resolve)
    },
    // 添加洽谈信息
    {
        path: '/addEntryInfo',
        component: resolve => require(['@/pages/signUp/addEntryInfo'], resolve)
    },
    // 洽谈信息详情
    {
        path: '/entryInfo',
        component: resolve => require(['@/pages/signUp/entryInfo'], resolve)
    },
    {
        path: '/pioneerGame',
        component: resolve => require(['@/pages/signUp/pioneerGame'], resolve),
    },
    {
        path: '/addTrafficInfo',
        component: resolve => require(['@/pages/signUp/addTrafficInfo'], resolve)
    },
    // 新增分管创业工作校领导
    {
        path: '/addLeaderInfo',
        component: resolve => require(['@/pages/signUp/addLeaderInfo'], resolve)
    },
    // 新增项目信息
    {
        path: '/addProjectInfo',
        component: resolve => require(['@/pages/signUp/addProjectInfo'], resolve)
    },
    // 新增住宿
    {
        path: '/addHotel',
        component: resolve => require(['@/pages/signUp/addHotel'], resolve)
    },
    // 新增住宿详情
    {
        path: '/addHotelDetail',
        component: resolve => require(['@/pages/signUp/addHotelDetail'], resolve)
    },
    // 用餐
    {
        path: '/dining',
        component: resolve => require(['@/pages/signUp/dining'], resolve)
    },
    // {
    //     path: '/',
    //     component: Home,
    // },
    {
        path: '/',
        redirect: '/home/index'
    },
    {
        path: '*',
        component: Page404 //404页面
    }
]

export default routes
