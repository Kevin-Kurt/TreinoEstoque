import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/base";
import "./plugins/chartist";
import "./plugins/vee-validate";
import "./plugins/vue-world-map";
import vuetify from "./plugins/vuetify";
import i18n from "./i18n";
import VueResource from "vue-resource";
import VueTheMask from "vue-the-mask";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

Vue.use(VueTheMask);
Vue.config.productionTip = false;

const ignoreWarnMessage =
  "The .native modifier for v-on is only valid on components but it was used on <div>.";
Vue.config.warnHandler = function (msg, vm, trace) {
  // `trace` is the component hierarchy trace
  if (msg === ignoreWarnMessage) {
    msg = null;
    vm = null;
    trace = null;
  }
};

const options = {
  transition: "Vue-Toastification__bounce",
  maxToasts: 20,
  newestOnTop: true,
  position: "top-right",
  timeout: 5000,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: true,
  hideProgressBar: false,
  icon: true,
};

Vue.use(Toast, options);

Vue.use(VueResource);
Vue.$globalEvent = new Vue();

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: (h) => h(App),
  mounted() {
    Vue.$globalEvent.$on("httpError", (item) => {
      this.$toast.error(item.body.message);
    });
  },
}).$mount("#app");
