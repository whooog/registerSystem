import Vue from 'vue'
import App from './App.vue'
// 导入vant
import Vant,{ Locale } from 'vant'
// 引入组件库
import VueEasytable from "vue-easytable";
import zhCN from 'vant/es/locale/lang/zh-CN';
// 导入路由
import router from './router/index'
// 导入vuex
import store from './store/index'
// 移动端适配
import 'lib-flexible'

import moment from 'moment'
import _ from 'lodash'

import Common from './utils/common.js'
import httpRequest from './request/http.js'
import api from './request/api.js'
// 全局样式
import 'vant/lib/index.css';
import "vue-easytable/libs/theme-default/index.css";
import './assets/style/variable.scss'
import './assets/iconfont/iconfont.css'
import './assets/style/index.scss'

Vue.config.productionTip = false

Vue.prototype.$common = Common
Vue.prototype.$httpRequest = httpRequest
Vue.prototype.$api = api
Vue.prototype.$moment = moment
Vue.prototype.$lodash = _

Vue.use(Vant)
Locale.use('zh-CN', zhCN)

Vue.use(VueEasytable);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
