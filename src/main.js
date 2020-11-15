import Vue from 'vue'
import App from './App.vue'
import router from './router'

import store from './store'

import toast from './components/common/toast'

import FastClick from 'fastclick'
// import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()

Vue.use(toast)

// 实现图片懒加载插件
// Vue.use(VueLazyLoad)
// 需要将:src => v-lazy

// 解决移动端300s延迟
FastClick.attach(document.body)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
