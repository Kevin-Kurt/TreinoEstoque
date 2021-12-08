const Layout = () => import("../../External/Layout/Layout.vue");
const Registration = () => import("./Product/Registration.vue");
const Inventory = () => import("./Inventory/Inventory.vue")

const RegistrationRoutes = {
    component: Layout,
    children: [
      {
        path: "/registration",
        name: "Registration",
        component: Registration,
        meta: {
          requiresAuth: true,
          requiresAdmin: true,
        },
      },
      {
        path: "inventory",
        name: "Inventory",
        component: Inventory,
        meta: {
          requiresAuth: true,
          requiresAdmin: true,
        },
      }, 
    ],
};
export default RegistrationRoutes;