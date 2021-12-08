import ApiService from "../../../../../services/ApiService";
import ManageService from "../ManageService/ManageService";
import AboutService from "../AboutService/AboutService";
import ReadjustValue from "../ReadjustValue/ReadjustValue";
import ExcelModal from "../ExcelModal/ExcelModal";
import HeaderCard from "../../../../../components/HeaderCard/HeaderCard.vue";

export default {
  data: () => ({
    showFilters: false,
    dialog: false,
    editDialog: false,
    aboutDialog: false,
    readjustDialog: false,
    excelDialog: false,
    deleteDialog: false,
    filterDialog: false,
    dialogKey: false,
    loading: false,
    isLoading: false,
    services: [],
    currentService: {},
    formatedDate: null,
    page: 1,
    totalPages: 1,
    pageSize: 10,
    sizes: [10, 30, 90, 180],
    apiService: new ApiService(),
    filter: {
      page: 1,
      pageSize: 10,
      Name: null,
      Type: "",
    },
    serviceType: "",
    serviceName: null,
    error: false,
    headers: [
      {
        text: "ID",
        class: "item",
        align: "center",
        sortable: false,
        value: "id",
      },
      { text: "Serviço", class: "item", value: "name", align: "center" },
      { text: "Tipo", class: "item", value: "type", align: "center" },
      { text: "Valor", class: "item", value: "value", align: "center" },
      {
        text: "Ações",
        class: "item",
        value: "actions",
        align: "center",
        sortable: false,
      },
    ],
    headerProps: {
      sortByText: "Ordenar por",
    },
  }),

  async created() {
    await this.updateTable();
  },

  components: {
    ManageService,
    AboutService,
    ReadjustValue,
    ExcelModal,
    HeaderCard,
  },

  methods: {
    addService() {
      this.dialogKey = !this.dialogKey;
      this.dialog = true;
    },

    editService(service) {
      this.currentService = service;
      this.dialogKey = !this.dialogKey;
      this.editDialog = true;
    },

    deleteService(service) {
      this.currentService = service;
      this.dialogKey = !this.dialogKey;
      this.deleteDialog = true;
    },

    closeDialog() {
      this.dialog = false;
      this.readjustDialog = false;
      this.editDialog = false;
      this.excelDialog = false;

      this.updateTable();
    },

    closeNoLoading() {
      this.dialog = false;
      this.readjustDialog = false;
      this.editDialog = false;
      this.excelDialog = false;
    },

    openAbout(service) {
      this.currentService = service;
      this.dialogKey = !this.dialogKey;
      this.aboutDialog = true;
    },

    filterTable() {
      this.loading = true;
      this.filter.pageSize = this.pageSize;
      this.filter.page = 1;
      this.filter.Type = this.serviceType;
      this.filter.Name = this.serviceName;

      this.updateTable();
      this.filterDialog = false;
    },

    async updateTable() {
      this.loading = true;
      this.isLoading = true;
      await this.apiService
        .post(`service/list`, this.filter)
        .then((response) => {
          this.totalPages = response.pager.totalPages;
          this.services = response.services;
          this.loading = false;
          this.isLoading = false;
        });
    },

    async remove() {
      this.loading = true;

      await this.apiService
        .delete(`service/delete`, this.currentService)
        .then(() => {
          this.updateTable();
          this.loading = false;
          this.deleteDialog = false;
        })
        .catch(() => {
          this.loading = false;
          this.deleteDialog = false;
        });
    },

    reset() {
      (this.serviceType = ""),
        (this.serviceName = null),
        (this.filter = {
          page: 1,
          pageSize: 10,
          Name: null,
          Type: "",
        });
      this.updateTable();
      this.filterDialog = false;
    },
  },

  watch: {
    pageSize() {
      this.filter.pageSize = this.pageSize;
      this.updateTable();
    },

    page() {
      this.filter.page = this.page;
      this.updateTable();
    },
  },
};
