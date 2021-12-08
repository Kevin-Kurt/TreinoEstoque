import Vue from "vue";
import Vuetify from "vuetify/lib";
import i18n from "@/i18n";

Vue.use(Vuetify);

const theme = {
  primary: "#8DC63F",
  secondary: "#2D3038",
  terciary: "#E9E9E9",
  quaternary: "#D3D3D3",
  accent: "#F5F5F5",
  info: "#FFFFFF",
  success: "#23CE6B",
  error: "#FE4A49",
};

export default new Vuetify({
  lang: {
    t: (key, ...params) => i18n.t(key, params),
  },
  theme: {
    themes: {
      dark: theme,
      light: theme,
    },
  },
});
