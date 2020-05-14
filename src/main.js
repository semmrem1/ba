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
import Loading from 'vue-loading-overlay';

import 'vue-loading-overlay/dist/vue-loading.css';

axios.defaults.baseURL = "https://obstvombaum.jcloud.ik-server.com"

Vue.use(VueAxios)
Vue.use(Vuex);
Vue.use(Loading);

Vue.config.productionTip = false;
Vue.prototype.$http = axios;
Vue.prototype.moment = moment


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

