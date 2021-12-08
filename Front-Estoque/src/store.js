import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    barColor: "rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)",
    barImage:
      "https://demos.creative-tim.com/material-dashboard-pro/assets/img/sidebar-1.jpg",
    token: null,
    expires: null,
    drawer: true,
    user: null,
  },
  mutations: {
    SET_BAR_IMAGE(state, payload) {
      state.barImage = payload;
    },
    SET_DRAWER(state, payload) {
      state.drawer = payload;
    },
    SET_SCRIM(state, payload) {
      state.barColor = payload;
    },
    SET_EXPIRES_TOKEN(state, payload) {
      localStorage.removeItem("expires");
      localStorage.setItem("expires", payload);
      state.expires = payload;
    },
    SET_LOGGED_USER(state, payload) {
      localStorage.removeItem("user");
      localStorage.setItem("user", payload);
      state.user = payload;
    },
    SET_LANGUAGE(state, payload) {
      localStorage.removeItem("lang");
      localStorage.setItem("lang", payload);
      state.lang = payload;
    },
    SET_CURRENT_TOKEN(state, payload) {
      localStorage.removeItem("token");
      localStorage.setItem("token", payload);
      let d = new Date("2021-12-17T03:24:00").toUTCString();
      document.cookie = "access_token=" + payload + ";" + d + ";path=/";
      state.token = payload;
    },
  },
  getters: {
    getUser: (state) => {
      return state.user;
    },
  },
  actions: {},
});
