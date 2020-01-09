import Vue from 'vue'
import App from './App.vue'

import router from './router/index.js'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '../src/style/base.css'

//导入全局过滤器
import './filters/index.js'

Vue.use(ElementUI)


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
