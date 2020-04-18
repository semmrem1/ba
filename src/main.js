import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import vuetify from './plugins/vuetify';
import store from './store';
import axios from 'axios'
import Vuex from 'vuex';
import VueAxios from './plugins/axios'
import moment from 'moment'

axios.defaults.baseURL = "https://cors-anywhere.herokuapp.com/http://env-9201482.jcloud.ik-server.com"

Vue.use(VueAxios)
Vue.use(Vuex);

Vue.config.productionTip = false;
Vue.prototype.$http = axios;
Vue.prototype.moment = moment

// const token = localStorage.getItem('token')
// if (token) {
//   Vue.prototype.$http.defaults.headers.common['Authorization'] = token
// }

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')