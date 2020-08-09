<template>
  <v-layout justify-center align-center>
    <v-flex xs12 sm8 md6 lg5 xl4>
      <v-card v-if="email" class="elevation-6">
        <v-toolbar color="primary" dark card>
          <v-toolbar-title>Nueva Contraseña</v-toolbar-title>
        </v-toolbar>
        <v-card-text class="subheding">Ingresa una nueva contraseña para {{ email }}</v-card-text>
        <v-card-text>
          <v-text-field
            @blur="$v.f1.password.$touch()"
            :error-messages="erroresPassword"
            v-model="f1.password"
            label="Password"
            type="password"
          ></v-text-field>
          <v-text-field
            @keyup.enter="siguiente(1)"
            @blur="$v.f1.repetirPassword.$touch()"
            :error-messages="erroresRepetirPassword"
            v-model="f1.repetirPassword"
            label="Repetir Password"
            type="password"
          ></v-text-field>
        </v-card-text>
        <v-card-text>
          <v-layout justify-end>
            <v-btn
              :depressed="$v.f1.$invalid"
              :disabled="$v.f1.$invalid"
              color="secondary"
              @click="cambiarPassword"
            >Aceptar</v-btn>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import {
  required,
  minLength,
  maxLength,
  sameAs,
} from "vuelidate/lib/validators";
import { auth } from "@/firebase";
import { mapMutations, mapGetters } from "vuex";
export default {
  data() {
    return {
      email: "",
      f1: {
        password: "",
        repetirPassword: "",
      },
      actionCode: '',
    };
  },
  validations: {
    f1: {
      password: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(20),
      },
      repetirPassword: {
        sameAs: sameAs("password"),
      },
    },
  },
  methods: {
    ...mapMutations([
      "mostrarExito",
      "mostrarError",
      "mostrarOcupado",
      "ocultarOcupado",
      "mostrarInformacion",
    ]),
    ...mapMutations("sesion", ["actualizarUsuario"]),
    async validar() {
      let mode = this.$route.query.mode;
      this.actionCode = this.$route.query.oobCode;

      switch (mode) {
        case "verifyEmail":
          this.mostrarOcupado({
            titulo: "Verificando código",
            mensaje: "Validando su codigo...",
          });
          try {
            await auth.applyActionCode(this.actionCode);
            this.mostrarExito(
              "Email verificado con exito. Ingresa tus credenciales para continuar."
            );
            this.$router.push({ name: "login" });
          } catch (error) {
            this.mostrarError("No fue posible validar tu direccion de email.");
          } finally {
            this.ocultarOcupado();
          }
          break;
        case "resetPassword":
          this.mostrarOcupado({
            titulo: "Verificando código",
            mensaje: "Validando  código para restablecimiento de contraseña...",
          });
          try {
            this.email = await auth.verifyPasswordResetCode(this.actionCode);
            this.mostrarInformacion(
              `Ingresa una nueva contraseña para ${this.email}`
            );
          } catch (error) {
            this.mostrarError(
              "No fue posible leer el código de restablecimiento de contraseña."
            );
          } finally {
            this.ocultarOcupado();
          }
          break;
      }
    },
    async cambiarPassword() {
      this.mostrarOcupado({titulo: 'Estableciendo nueva contraseña', mensaje: 'Cambiando contraseña...'});
      try {
        await auth.confirmPasswordReset(this.actionCode,this.f1.password);
        await auth.signInWithEmailAndPassword(
          this.email,
          this.f1.password
        );
      } catch (error) {
        this.mostrarError('No fue posible cambiar la contraseña.');
      } finally {
        this.ocultarOcupado();
      }
    },
  },
  computed: {
    ...mapGetters("sesion", ["saludo"]),
    erroresPassword() {
      let errores = [];
      if (!this.$v.f1.password.$dirty) {
        return errores;
      }
      if (!this.$v.f1.password.required) {
        errores.push("Ingresa una contraseña");
      }
      if (!this.$v.f1.password.minLength) {
        errores.push("Ingresa una contraseña de al menos 6 caracteres.");
      }
      if (!this.$v.f1.password.maxLength) {
        errores.push("Ingresa una contraseña de menos a 20 caracteres.");
      }
      return errores;
    },
    erroresRepetirPassword() {
      let errores = [];
      if (!this.$v.f1.repetirPassword.$dirty) {
        return errores;
      }
      if (!this.$v.f1.repetirPassword.sameAs) {
        errores.push("Las contraseñas no coinciden");
      }
      return errores;
    },
  },
  created() {
    this.validar();
  },
};
</script>
