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

<<<<<<< HEAD
axios.defaults.baseURL = "https://obstvombaum.jcloud.ik-server.com"
=======
axios.defaults.baseURL = "https://cors-anywhere.herokuapp.com/http://env-9201482.jcloud.ik-server.com"
>>>>>>> eb1eef2956b30c6a4aecf47be9aceb2a5b4361db

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

