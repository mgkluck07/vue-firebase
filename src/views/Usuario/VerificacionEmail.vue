<template>
  <v-layout align-center justify-center>
    <v-flex xs12 sm8 md6 lg5 xl4>
      <v-card>
        <v-toolbar color="primary" dark card>
          <v-toolbar-title>Confirma tu direccion de correo</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <span class="subheading">Te hemos enviado un correo de verificacion.</span>
        </v-card-text>
        <v-card-text>
          <v-btn color="secondary" @click="reenviarEmail">Reenviar Email</v-btn>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { auth } from "@/firebase";
import { mapMutations } from "vuex";
export default {
  methods: {
    ...mapMutations(["mostrarExito", "mostrarError"]),
    async reenviarEmail() {
      try {
        await auth.currentUser.sendEmailVerification();
        this.mostrarExito("Te hemos enviado un nuevo correo de verificación.");
        this.$router.push({ name: "home" });
      } catch (error) {
        this.mostrarError(
          "Ocurrio un error enviando el email der verificación."
        );
      }
    },
  },
};
</script>
