import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: localStorage.getItem('user') || '',
    userType: localStorage.getItem('userType') || '',
    token: localStorage.getItem('token') || '',
    loggedIn: localStorage.getItem('loggedIn') === 'true',
    error: {
      show: false,
      message: '',
    },
    success: {
      show: false,
      message: '',
    },
    warning: {
      show: false,
      message: '',
    },
  },
  mutations: {
    SET_USERNAME(state, user) {
      state.user = user;
      localStorage.setItem('user', user);
    },
    SET_TOKEN(state, token) {
        state.token = token;
        localStorage.setItem('token', token);
    },
    SET_LOGGED_IN(state, loggedIn) {
        state.loggedIn = loggedIn;
        localStorage.setItem('loggedIn', loggedIn); // Save login status to local storage
    },
    SET_USER_TYPE(state, userType) {
      state.userType = userType;
      localStorage.setItem('userType', userType);
    },
    SET_SESSION_NULL(state) {
        state.user = null;
        state.token = null;
        state.loggedIn = false;
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('loggedIn');
    },
    SET_USER_OBJECT(state, payload) {
      const { userType, user } = payload;
      state.user = user.Username;
      state.userType = userType;
    },
    SET_ERROR: (state, payload) => {
      state.error.show = payload.show;
      state.error.message = payload.message;
    },
    SET_SUCCESS: (state, payload) => {
      state.success.show = payload.show;
      state.success.message = payload.message;
    },
    SET_WARNING: (state, payload) => {
      state.warning.show = payload.show;
      state.warning.message = payload.message;
    },
  },
  actions: {
    loginSetData({ commit }, payload) {
        const { user, token, userType } = payload;
        commit('SET_TOKEN', token);
        commit('SET_USERNAME', user);
        commit('SET_LOGGED_IN', true);
        commit('SET_USER_TYPE', userType);
    },
    logOutDelData({ commit }) {
        commit('SET_SESSION_NULL');
    },
    async setUserObj({ commit }, payload) {
      const { userType, username } = payload;
      const response = await fetch(`http://localhost:8000/user/${userType}/username/${username}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const user = await response.json();
      commit('SET_USER_OBJECT', { user, userType: userType});
    },
    showError: ({ commit }, payload) => {
      commit('SET_ERROR', { show: true, message: payload });
      setTimeout(() => {
        commit('SET_ERROR', { show: false, message: '' });
      }, 4000);
    },
    showSuccess: ({ commit }, payload) => {
      commit('SET_SUCCESS', { show: true, message: payload });
      setTimeout(() => {
        commit('SET_SUCCESS', { show: false, message: '' });
      }, 4000);
    },
    showWarning: ({ commit }, payload) => {
      commit('SET_WARNING', { show: true, message: payload });
      setTimeout(() => {
        commit('SET_WARNING', { show: false, message: '' });
      }, 5000);
    },
  },
  getters: {
    showSuccess: state => state.success.show,
    successMessage: state => state.success.message,
    showWarning: state => state.warning.show,
    warningMessage: state => state.warning.message,
    showError: state => state.error.show,
    errorMessage: state => state.error.message,
    isLoggedIn(state) {
        if (state.token) {
            return true;
        }
        return false;
    },
    getUser(state) {
        return state.user;
    },
    getUserType(state) {
      return state.userType.toLowerCase();
    }
  },
});