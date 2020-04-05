import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import vuetify from './plugins/vuetify';
import store from './store';
// import VeeValidate from 'vee-validate';
import axios from 'axios'
import VueAxios from './plugins/axios'

axios.defaults.baseURL = "https://cors-anywhere.herokuapp.com/http://env-9201482.jcloud.ik-server.com"

// const config = {
//   aria: true,
//   classNames: {},
//   classes: false,
//   delay: 0,
//   dictionary: null,
//   errorBagName: 'errors', // change if property conflicts
//   events: 'input|blur',
//   fieldsBagName: 'fields',
//   i18n: null, // the vue-i18n plugin instance
//   i18nRootKey: 'validations', // the nested key under which the validation messages will be located
//   inject: true,
//   locale: 'en',
//   validity: false,
//   useConstraintAttrs: true
// };

// Vue.use(VeeValidate);

Vue.use(VueAxios)

Vue.config.productionTip = false;
Vue.prototype.$http = axios;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
