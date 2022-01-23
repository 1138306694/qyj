import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './plugins/ParseDate'

//导入全局样式表
import './assets/css/global.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import qs from 'qs'
import message from "element-ui/packages/message";
import resultJg from "element-ui/packages/result"


Vue.prototype.$qs = qs;
Vue.use(ElementUI);
axios.interceptors.request.use(config=>{

  if(config.url.indexOf('http://localhost:8880/user/login') === -1 && config.url.indexOf("http://localhost:8880/user/verCode") === -1){
    config.headers.token = window.sessionStorage.getItem('token');
  }
  return config
})

Vue.prototype.$http = axios;
Vue.prototype.$message = message;
Vue.prototype.$result = resultJg;
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

