const Layout = () => import("../../External/Layout/Layout.vue");
const Login = () => import("./Login/Login.vue");
const Cadastrar = () => import("./Cadastrar/Cadastrar.vue");

const AuthRoutes = {
  component: Layout,
  children: [
    {
      path: "",
      name: "Login",
      component: Login,
      meta: {
        requiresAuth: false,
        requiresAdmin: false,
      },
    },
    {
      path: "cadastrar",
      name: "Cadastrar",
      component: Cadastrar,
      meta: {
        requiresAuth: false,
        requiresAdmin: false,
      },
    },
   
    { path: "*", redirect: "/auth" },
  ],
};

export default AuthRoutes;
