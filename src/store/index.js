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
      uuid: "5ead92e50a975a30d776c500",
      personType: "",
      token: "",
      image: null,
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

