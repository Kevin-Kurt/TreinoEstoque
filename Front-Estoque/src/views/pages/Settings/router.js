import Layout from "../../Internal/Layout/Layout.vue";
import SettingsPage from "./SettingsPage/SettingsPage.vue";

const SettingRoutes = {
  component: Layout,
  children: [
    {
      name: "settings",
      path: "/",
      component: SettingsPage,
      meta: {
        requiresAuth: true,
        requiresAdmin: true,
      },
    },
  ],
};

export default SettingRoutes;
