import AuthService from '../services/auth.service';

const person = JSON.parse(localStorage.getItem('person'));
const initialState = person
  ? { status: { loggedIn: true }, person }
  : { status: { loggedIn: false }, person: null };

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    login({ commit }, person) {
      return AuthService.login(person).then(
        person => {
          commit('loginSuccess', person);
          return Promise.resolve(person);
        },
        error => {
          commit('loginFailure');
          return Promise.reject(error);
        }
      );
    },
    logout({ commit }) {
      AuthService.logout();
      commit('logout');
    },
    register({ commit }, person) {
      return AuthService.register(person).then(
        response => {
          commit('registerSuccess');
          return Promise.resolve(response.data);
        },
        error => {
          commit('registerFailure');
          return Promise.reject(error);
        }
      );
    }
  },
  mutations: {
    loginSuccess(state, person) {
      state.status.loggedIn = true;
      state.person = person;
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.person = null;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.person = null;
    },
    registerSuccess(state) {
      state.status.loggedIn = false;
    },
    registerFailure(state) {
      state.status.loggedIn = false;
    }
  }
};