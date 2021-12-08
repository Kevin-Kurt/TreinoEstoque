import ApiService from "../../../../../services/ApiService";

export default {
  name: "ExcelModal",

  data: () => ({
    loading: false,
    apiService: new ApiService(),
  }),

  computed: {
    download() {
      return process.env.VUE_APP_BASE_URL + "ExcelModels/Modelo.xlsx";
    },
  },

  methods: {
    setExcelFile(event) {
      this.loading = true;
      let file;

      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () => {
        file = reader.result;
        this.apiService
          .post("service/excel", { file: file })
          .then(() => {
            this.$emit("update");
            this.loading = false;
            this.$emit("close");
          })
          .catch(() => {
            this.loading = false;
          });
      };
    },

    openFilePicker() {
      document.querySelector("#excelInput").click();
    },
  },
};
