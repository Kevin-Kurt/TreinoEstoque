export default {
  data: () => ({
    change: false,
  }),

  methods: {
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("expires");
      localStorage.removeItem("user");
      this.$router.push("/auth");
    },

    goToSettings() {
      if (this.$route.path != "/settings") {
        this.$router.push("/settings");
      }
    },

    goToProfile() {
      if (this.$route.path != "/profile") {
        this.$router.push("/profile");
      }
    },
  },

  computed: {
    user() {
      return JSON.parse(localStorage.getItem("user"));
    },

    image() {
      var env_url = process.env.VUE_APP_BASE_URL;
      return env_url + this.user.image;
    },
  },

  watch: {
    user() {
      this.change = !this.change;
    },
  },
};
