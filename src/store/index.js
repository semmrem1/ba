import Vue from 'vue';
import Vuex from 'vuex';

import { auth } from './auth.module';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth
  },
  state: {
    user: {
      uuid: "5e9ac90c0a975a3a277cc343",
      token: "",
      image: "",
      offerUuid: [],
    },
    offer: {
      uuid: [],
      image: ""
    }
  },
  getters: {},
  mutations: {},
  actions: {}

});