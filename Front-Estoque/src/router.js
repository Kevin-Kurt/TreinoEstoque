import Vue from "vue";
import Router from "vue-router";
import AuthRoutes from "./views/pages/Auth/routes";
import RegistrationRoutes from "./views/pages/Registration/routes"
import moment from "moment";



Vue.use(Router);

const router = new Router({
  base: process.env.BASE_URL,
  linkActiveClass: "active",
  linkExactActiveClass: "exact-active",
  mode: "history",
  routes: [
    {
      path: "/auth",
      ...AuthRoutes,
    },
    {
      path: "/registration",
      ...RegistrationRoutes,
    },
    {
      path: "/",
      redirect: "/auth",
    },
       
  ],

});

router.beforeEach(async (to, from, next) => {
  let token = localStorage.getItem("token");
  let expiresToken = localStorage.getItem("expires");
  let user = JSON.parse(localStorage.getItem("user"));

  if (to.meta.requiresAuth) {
    if (token) {
      if (moment().isBefore(moment(expiresToken))) {
        if (user.userType == 0 && to.meta.requiresAdmin) {
          next();
        } else if (user.userType == 1 && to.meta.requiresAttendent) {
          next();
        } else if (user.userType == 2 && to.meta.requiresTechnician) {
          next();
        } else if (user.userType == 4 && to.meta.requiresDriver) {
          next();
        } else {
          if (from.path != "/auth") {
            next("/auth");
          }
          alert("Acesso Restrito");
        }
      } else {
        next("/auth");
      }
    } else {
      next("/auth");
    }
  } else {
    next();
  }
});

export default router;
