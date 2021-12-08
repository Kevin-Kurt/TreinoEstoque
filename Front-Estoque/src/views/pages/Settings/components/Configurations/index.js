import ApiService from "../../../../../services/ApiService";

export default {
  name: "Configurations",

  data: () => ({
    valid: true,
    toleranceDays: "",
    price: "",
    loading: false,
    apiService: new ApiService(),
    configs: {},
  }),

  created() {
    this.searchConfigs();
  },

  methods: {
    async searchConfigs() {
      await this.apiService.get("config/get").then((response) => {
        this.configs = response;
      });
    },

    reset() {
      this.$refs.form.reset();
    },

    submit() {
      if (this.$refs.form.validate()) {
        this.updateConfig();
      }
    },

    async updateConfig() {
      this.loading = true;

      await this.apiService
        .post("config/edit", this.configs)
        .then(() => {
          this.$refs.form.resetValidation();
          this.loading = false;
          this.$toast.success("Alterações Salvas");
        })
        .catch(() => {
          this.loading = false;
        });
    },
  },
};
