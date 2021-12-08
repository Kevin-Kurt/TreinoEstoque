import Configurations from "../components/Configurations/Configurations";

export default {
  name: "SettingsPage",

  data: () => ({
    user: {},
    tabs: 0,
    show: false,
  }),

  created() {
    this.user = JSON.parse(localStorage.getItem("user"));
  },

  components: {
    Configurations,
  },

  methods: {
    showMessage() {
      this.$emit("show", "Alterações Salvas");
    },
  },
};
