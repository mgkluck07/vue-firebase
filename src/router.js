import Vue from "vue";
import Router from "vue-router";
// import store from '@/store'

import Home from "./views/Home.vue";
import NotFound from "./views/NotFound.vue";

import Login from "./views/Usuario/Login.vue";
import Perfil from "./views/Usuario/Perfil.vue";
import Registro from "./views/Usuario/Registro.vue";

import VerificacionEmail from "./views/Usuario/VerificacionEmail.vue";
import AccionesEmail from "./views/Usuario/AccionesEmail.vue";
import Obra from "./views/teatro/Obra.vue";
import Presentacion from "./views/teatro/Presentacion.vue";

import { auth } from "@/firebase";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/registro",
      name: "registro",
      component: Registro,
    },
    {
      path: "/verificacion-email",
      name: "verificacion-email",
      component: VerificacionEmail,
    },
    {
      path: "/acciones-email",
      name: "acciones-email",
      component: AccionesEmail,
    },
    {
      path: "/perfil",
      name: "perfil",
      component: Perfil,
      meta: {
        autenticado: true,
      },
      /* beforeEnter: (to, from, next) => {
        if(store.state.sesion.usuario){
          next()
        }else{
          next({name:'login'})
        }
      } */
    },
    {
      path: "/obras/:oid",
      name: "obra",
      component: Obra,
    },
    {
      path: "/:oid/:tid/:fecha",
      name: "presentacion",
      component: Presentacion,
    },
    {
      path: "/404",
      name: "404",
      component: NotFound,
    },
    {
      path: "*",
      component: NotFound,
    },
  ],
});

router.beforeEach((to, from, next) => {
  let user = auth.currentUser;
  if (to.matched.some((record) => record.meta.autenticado)) {
    if (user) {
      if (
        user.providerData[0].providerId == "password" &&
        !user.emailVerified
      ) {
        next({ name: "verificacion-email" });
      } else {
        next();
      }
    } else {
      next({
        name: "login",
      });
    }
  } else {
    next();
  }
});

export default router;
