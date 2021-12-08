import Avatar from "../Avatar/Avatar";

export default {
  name: "Navigation",

  beforeDestroy() {
    if (typeof window !== "undefined") {
      window.removeEventListener("resize", this.onResize, { passive: true });
    }
  },

  mounted() {
    this.onResize();
    window.addEventListener("resize", this.onResize, { passive: true });
  },

  data: () => ({
    isMobile: false,
    drawer: false,
    group: null,
    mini: true,
    user: {},
    headers: [
      {
        icon: "mdi-chart-bar",
        title: "Dashboard",
        url: "dashboard",
        access: [0, 1, 2, 4],
      },
      {
        icon: "mdi-view-dashboard",
        title: "Dashboard Service Care",
        url: "servicecare",
        access: [0, 1, 2, 4],
      },
      {
        icon: "mdi-account-group-outline",
        title: "Clientes",
        url: "clients",
        access: [0, 1],
      },
      {
        icon: "mdi-bicycle",
        title: "Tipos de Bicicleta",
        url: "bikeTypes",
        access: [0],
      },
      {
        icon: "mdi-bicycle-basket",
        title: "Bicicletas",
        url: "bikes",
        access: [0],
      },
      {
        icon: "mdi-store",
        title: "Unidades de Negócio",
        url: "stores",
        access: [0],
      },
      {
        icon: "mdi-account-group",
        title: "Funcionários",
        url: "employees",
        access: [0],
      },
      {
        icon: "mdi-ballot",
        title: "Serviços",
        url: "services",
        access: [0],
      },
      {
        icon: "mdi-card-bulleted",
        title: "Ordens de Restauração",
        url: "restoreorder",
        access: [0, 1, 2],
      },
      {
        icon: "mdi-card-bulleted-outline",
        title: "Ordens de Montagem",
        url: "mountingorder",
        access: [0, 1, 2],
      },
      {
        icon: "mdi-card-bulleted-settings-outline",
        title: "Ordens de Serviço",
        url: "serviceorder",
        access: [0, 1, 2],
      },
      {
        icon: "mdi-barn",
        title: "Estoque",
        url: "inventory",
        access: [0],
      },
      {
        icon: "mdi-car",
        title: "Carros",
        url: "cars",
        access: [0, 4],
      },
      {
        icon: "mdi-car-connected",
        title: "Transportes",
        url: "collects",
        access: [0, 4],
      },
    ],
  }),

  created() {
    this.user = JSON.parse(localStorage.getItem("user"));
  },

  components: {
    Avatar,
  },

  methods: {
    hasAccess(val) {
      const result = val.find((type) => this.user.userType == type);

      if (result == undefined) {
        return false;
      } else {
        return true;
      }
    },

    onResize() {
      this.isMobile = window.innerWidth < 960;
    },
  },
};
