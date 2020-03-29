import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import vuetify from './plugins/vuetify';
import axios from 'axios'
import VueAxios from './plugins/axios'

Vue.use(VueAxios)

Vue.config.productionTip = false;
Vue.prototype.$http = axios;

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
