import { auth, db } from "@/firebase";
import router from "@/router";
export default {
  namespaced: true,
  state: {
    usuario: null,
  },
  mutations: {
    actualizarUsuario(state, usuario) {
      state.usuario = usuario;
    },
    actualizarNombres(state, payload) {
      if(!state.usuario) { return }
      state.usuario.nombre = payload.nombre;
      state.usuario.apellido = payload.apellido;
    },
    actualizarDescripcion(state, payload) {
      if(!state.usuario) { return }
      state.usuario.descripcion = payload.descripcion;
    },
  },
  actions: {
    cerrarSesion({ commit }) {
      auth.signOut();
      commit("actualizarUsuario", null);
    },
    async iniciarSesion({ commit, getters }, uid) {
      try {
        console.log(uid);
        let doc = await db
          .collection("usuarios")
          .doc(uid)
          .get();
        if (doc.exists) {
          commit("actualizarUsuario", doc.data());
          switch (router.currentRoute.name) {
            case "login":
              commit("mostrarExito", getters.saludo, { root: true });
              router.push({ name: "home" });
              break;
            case "acciones-email":
              commit("mostrarExito", `${getters.saludo}, tu contraseña ha sido cambiada correctamente.`, { root: true });
              router.push({ name: "home" });
              break;
          }
        } else {
          router.push({ name: "registro" });
        }
      } catch (error) {
        commit("mostrarError", "Ocurrió un error consultando tu información.", {
          root: true,
        });
      }
    },
  },
  getters: {
    saludo(state) {
      if (!state.usuario) {
        return null;
      }
      let vocal = state.usuario.sexo && state.usuario.sexo == "F" ? "a" : "o";
      return `¡Bienvenid${vocal} ${state.usuario.nombre}!`;
    },
  },
};
