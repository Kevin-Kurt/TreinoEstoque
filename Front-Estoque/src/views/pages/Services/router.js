import Layout from "../../Internal/Layout/Layout.vue";
import ServicePage from "./ServicesPage/ServicesPage.vue";

const ServiceRoutes = {
  component: Layout,
  children: [
    {
      name: "services",
      path: "/",
      component: ServicePage,
      meta: {
        requiresAuth: true,
        requiresAdmin: true,
      },
    },
  ],
};

export default ServiceRoutes;
