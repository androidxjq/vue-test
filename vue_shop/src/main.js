import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'
import './assets/fonts/iconfont.css'
import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
axios.interceptors.request.use(
  config => {
    // 需要授权的 API ，必须在请求头中使用 `Authorization` 字段提供 `token` 令牌
    config.headers.Authorization = window.sessionStorage.getItem('token')
    console.log(config)
    return config
  },
  error => {
    // Do something with request error
    return Promise.reject(error)
  }
)
Vue.prototype.$http = axios
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
