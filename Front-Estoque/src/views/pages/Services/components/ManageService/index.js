import ApiService from "../../../../../services/ApiService";

export default {
  props: {
    title: String,
    service: Object,
  },

  created() {
    this.searchParts();

    if (this.service) {
      this.isEditing = true;
      this.currentService = this.service;
      if (typeof this.currentService.value == "number") {
        this.currentService.value = this.currentService.value.toFixed(2);
      }
      this.service.parts.map((part) => {
        this.selectedParts.push({
          id: part.partId,
          nome: part.name,
          codInterno: part.internalCode,
          amount: part.amount,
        });
      });
    }
  },

  data: () => ({
    loading: true,
    step: 1,
    valid: true,
    secondValid: true,
    menu: false,
    error: false,
    errorMessage: "",
    isEditing: false,
    searchServiceInput: "",
    currentService: {
      id: 0,
      name: "",
      type: "",
      price: "",
    },
    nameRules: [
      (v) => !!v || "Nome requerido",
      (v) => (v && v.length <= 128) || "Nome deve ter no máximo 128 caracteres",
    ],
    priceRules: [(v) => !!v || "Valor requerido"],
    types: ["Pintura", "Troca", "Elétrica"],
    apiService: new ApiService(),
    selectedParts: [],
    parts: [],
  }),

  computed: {
    currentTitle() {
      switch (this.step) {
        case 1:
          return "Informações";
        default:
          return this.isEditing ? "Atualização efetuada" : "Cadastro efetuado";
      }
    },
  },

  methods: {
    next() {
      if (this.step === 1) {
        if (this.$refs.form.validate()) {
          this.submit();
        }
      } else {
        this.close();
      }
    },

    close() {
      this.$emit("close");
    },

    closeWithoutLoading() {
      this.$emit("closeNoLoading");
    },

    removeItem(index) {
      this.selectedParts.splice(index, 1);
    },

    async searchParts() {
      this.loading = true;
      await this.apiService.get("service/products").then((response) => {
        this.parts = response;
        this.loading = false;
      });
    },

    async submit() {
      this.currentService.value = this.currentService.value.replace("R", "");
      this.currentService.value = this.currentService.value.replace("$", "");
      this.currentService.value = this.currentService.value.replace(",", ".");

      let parts = [];

      this.selectedParts.map((part) => {
        parts.push({
          Name: part.nome,
          InternalCode: part.codInterno,
          PartId: part.id,
          Amount: part.amount === 0 || part.amount == null ? 1 : part.amount,
        });
      });

      const service = {
        Id: this.currentService.id,
        Name: this.currentService.name,
        Value: this.currentService.value,
        Type: this.currentService.type,
        Description: this.currentService.description,
        Parts: parts,
      };

      let url = "service/add";

      if (this.isEditing) {
        url = "service/edit";
      }

      await this.apiService
        .post(url, service)
        .then(() => {
          this.step += 1;
        })
        .catch((err) => {
          this.errorMessage = err.body.message;
          this.error = true;

          setTimeout(() => {
            this.error = false;
          }, 4000);
        });
    },
  },

  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    },
  },
};
