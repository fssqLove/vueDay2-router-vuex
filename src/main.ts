import Vue from 'vue'
import App from './App.vue'
// import router from './router'
import router from './krouter'
import store from './kStore'
import { create } from './utils/create.js'

Vue.config.productionTip = false
Vue.prototype.$create = create;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
