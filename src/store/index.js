import Vue from 'vue';
import Vuex from 'vuex';

import { auth } from './auth.module';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth
  },
  state: {
    loggedIn: {
      auth: false
    },
    user: {
      uuid: localStorage.getItem("userUuid"),
      role: "",
      personType: "",
      token: "",
      image: null,
      offerUuid: [],
    },
    header:{
      key: "Authorization",
      type: "Bearer",
      value: "Bearer "+localStorage.getItem("token"),
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

