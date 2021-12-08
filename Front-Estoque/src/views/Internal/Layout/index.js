import Navigation from "../Navigation/Navigation";

export default {
  name: "Authenticated",

  data: () => ({
    showSuccess: false,
    update: false,
    message: "",
  }),

  components: {
    Navigation,
  },

  methods: {
    updateProfile() {
      this.update = !this.update;
    },

    showSuccessAlert(message) {
      this.message = message;

      this.showSuccess = true;

      setTimeout(() => {
        this.showSuccess = false;
      }, 5000);
    },
  },
};
