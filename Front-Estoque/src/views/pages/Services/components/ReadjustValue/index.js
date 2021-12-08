import ApiService from "../../../../../services/ApiService";

export default {
  name: "ReadjustValue",

  data: () => ({
    value: null,
    apiService: new ApiService(),
    loading: false,
    type: "Porcentagem",
  }),

  methods: {
    closeWithoutLoading() {
      this.$emit("closeNoLoading");
    },

    save() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        let isPercentage = false;

        if (this.type == "Porcentagem") {
          this.value = this.value / 100;
          isPercentage = true;
        }

        const model = {
          IsPercentage: isPercentage,
          Value: this.value,
        };

        this.apiService
          .post("service/readjust", model)
          .then(() => {
            this.loading = false;
            this.$emit("close");
          })
          .catch(() => {
            this.loading = false;
          });
      }
    },
  },
};
