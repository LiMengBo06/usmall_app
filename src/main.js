// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

// 引入重置样式
import "./assets/css/reset.css"

// vuex： 安装 目录 引入 挂到根实例
import store from "./store"

// 引入过滤器
import "./filters"

// 引入公共组件
import "./components"

// 引入ui
import ElementUI from "element-ui"
import 'element-ui/lib/theme-chalk/index.css'
Vue.prototype.$pre = "http://localhost:3000"
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
