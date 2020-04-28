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
      uuid: "5ea3e90c0a975a6638cf46d5",
      token: "",
      image: "",
      offerUuid: [],
    },
    offer: {
      uuid: [],
      image: [],
    },
    createOffer: {
      uuid: [],
      image: []
    }
  },
  getters: {},
  mutations: {},
  actions: {}

});