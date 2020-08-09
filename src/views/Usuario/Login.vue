<template>
  <v-layout justify-center align-center>
    <v-flex xs12 sm8 md6 lg5 xl4>
      <v-slide-y-transition mode="out-in">
        <v-card class="elevation-6">
          <v-toolbar color="primary" dark card>
            <v-toolbar-title>Ingresa tus credenciales</v-toolbar-title>
          </v-toolbar>
          <v-card-text class="subheading text-xs-center">
            Ingresa con tu red social preferida
          </v-card-text>
          <v-card-text>
            <v-layout justify-center>
              <a @click="ingresar('facebook')" class="mx-3">
                <v-avatar tile :size="40">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/c/c2/F_icon.svg" alt="Facebook">
                </v-avatar>
              </a>
              <a @click="ingresar('google')" class="mx-3">
                <v-avatar tile :size="40">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google">
                </v-avatar>
              </a>
            </v-layout>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-text class="subheading text-xs-center">
            Ingresa con tu email y contraseña
          </v-card-text>
          <v-card-text>
            <v-text-field
              autofocus
              label="Email"
              type="email"
              v-model="formulario.email"
              :error-messages="erroresEmail"
              @blur="$v.formulario.email.$touch()"
            ></v-text-field>
            <v-text-field
              label="Password"
              @keyup.enter="ingresar('email')"
              type="password"
              v-model="formulario.password"
              :error-messages="erroresPassword"
              @blur="$v.formulario.password.$touch()"
            ></v-text-field>
          </v-card-text>
          <v-card-text>
            <v-layout justify-end>
              <v-btn
                @click="ingresar('email')"
                :depressed="$v.formulario.$invalid"
                :disabled="$v.formulario.$invalid"
                color="secondary"
              >Ingresar</v-btn>
            </v-layout>
          </v-card-text>
          <v-card-actions>
            <v-btn
              @click="solicitudPassword = true"
              flat
              color="secondary"
            >¿Olvidaste tu contraseña?</v-btn>
          </v-card-actions>
          <v-card-actions>
            <v-btn :to="{name: 'registro'}" flat color="secondary">¿No tienes cuenta? Registrate</v-btn>
          </v-card-actions>
        </v-card>
      </v-slide-y-transition>
      <v-dialog v-model="solicitudPassword" max-width="400" persistent>
        <v-card>
          <v-toolbar color="primary" dark card>
            <v-toolbar-title>Reestablecer contraseña</v-toolbar-title>
          </v-toolbar>
          <v-card-text
            class="subheading"
          >Ingresa la dirección de e-mail con la cual te registrastre.</v-card-text>
          <v-card-text>
            <v-text-field
              autofocus
              label="Email"
              type="email"
              v-model="emailEnvio"
              :error-messages="erroresEmailEnvio"
              @blur="$v.emailEnvio.$touch()"
            ></v-text-field>
          </v-card-text>
          <v-card-text>
            <v-layout>
              <v-flex xs6>
                <v-layout justify-start>
                  <v-btn @click="solicitudPassword = false">Cancelar</v-btn>
                </v-layout>
              </v-flex>
              <v-flex xs6>
                <v-layout justify-end>
                  <v-btn
                    color="secondary"
                    @click="enviarSolicitudPassword"
                    :depressed="$v.emailEnvio.$invalid"
                    :disabled="$v.emailEnvio.$invalid"
                  >Enviar</v-btn>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-flex>
  </v-layout>
</template>

<script>
import {
  required,
  email,
  minLength,
  maxLength,
} from "vuelidate/lib/validators";
import { mapMutations, mapGetters } from "vuex";
import { firebase,auth } from "@/firebase";
export default {
  data() {
    return {
      formulario: {
        email: "",
        password: "",
      },
      solicitudPassword: false,
      emailEnvio: "",
    };
  },
  validations: {
    formulario: {
      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(20),
      },
    },
    emailEnvio: {
      required,
      email,
    },
  },
  methods: {
    ...mapMutations([
      "mostrarOcupado",
      "ocultarOcupado",
      "mostrarExito",
      "mostrarAdvertencia",
      "mostrarError",
    ]),
    ...mapMutations("sesion", ["actualizarUsuario"]),
    ingresar(metodo){
      switch (metodo) {
        case 'email':
          this.ingresarEmail();
          break;
        case 'facebook':
          this.ingresarFacebook();
          break;
        case 'google':
          this.ingresarGoogle();
          break;
      }
    },
    async ingresarFacebook() {
      let provider = new firebase.auth.FacebookAuthProvider();
      provider.setCustomParameters({
        'display': 'popup'
      });
      auth.languageCode = 'es_AR';
      try {
        await auth.signInWithPopup(provider);
      } catch (error) {
        this.mostrarError('Ocurrió un error validando tu cuenta.');
      }
    },
    async ingresarGoogle() {
      let provider = new firebase.auth.GoogleAuthProvider();
      provider.setCustomParameters({
        'display': 'popup'
      });
      auth.languageCode = 'es_AR';
      try {
        await auth.signInWithPopup(provider);
      } catch (error) {
        this.mostrarError('Ocurrió un error validando tu cuenta.');
      }
    },
    async ingresarEmail() {
      if (this.$v.formulario.$invalid) {
        this.$v.formulario.$touch();
        return;
      }

      let ocupado = {
        titulo: "Validando credenciales",
        mensajee: "Estamos validando tu informacion ...",
      };

      this.mostrarOcupado(ocupado);

      try {
        await auth.signInWithEmailAndPassword(
          this.formulario.email,
          this.formulario.password
        );
      } catch (error) {
        console.log(error.code);
        switch (error.code) {
          case "auth/invalid-email":
            this.mostrarAdvertencia("Usuario no válido revisa tu contraseña");
            break;

          case "auth/wrong-password":
            this.mostrarAdvertencia("Usuario no válido revisa tu contraseña");
            break;

          case "auth/user-not-found":
            this.mostrarAdvertencia("El usuario no existe");
            break;

          default:
            this.mostrarError("Ocurrio un error validando tu información.");
            break;
        }
      } finally {
        this.ocultarOcupado();
      }
    },
    async enviarSolicitudPassword() {
      this.solicitudPassword = false;
      this.mostrarOcupado({
        titulo: "Enviando Solicitud",
        mensaje: "Enviando solicitud de restablecimiento de contraseña.",
      });
      try {
        await auth.sendPasswordResetEmail(this.emailEnvio);
        this.mostrarExito(
          "Se ha enviado la solicitud de restablecimiento de contraseña."
        );
      } catch (error) {
        this.mostrarError("Ocurrio un error enviando la solicitud.");
      } finally {
        this.ocultarOcupado();
      }
    },
  },
  computed: {
    ...mapGetters("sesion", ["saludo"]),
    erroresEmail() {
      let errores = [];
      if (!this.$v.formulario.email.$dirty) {
        return errores;
      }
      if (!this.$v.formulario.email.required) {
        errores.push("Ingresa un email");
      }
      if (!this.$v.formulario.email.email) {
        errores.push("Ingresa un email valido");
      }
      return errores;
    },
    erroresPassword() {
      let errores = [];
      if (!this.$v.formulario.password.$dirty) {
        return errores;
      }
      if (!this.$v.formulario.password.required) {
        errores.push("Ingresa una contraseña");
      }
      if (!this.$v.formulario.password.minLength) {
        errores.push("Ingresa una contraseña de al menos 6 caracteres.");
      }
      if (!this.$v.formulario.password.maxLength) {
        errores.push("Ingresa una contraseña de menos a 20 caracteres.");
      }
      return errores;
    },
    erroresEmailEnvio() {
      let errores = [];
      if (!this.$v.emailEnvio.$dirty) {
        return errores;
      }
      if (!this.$v.emailEnvio.required) {
        errores.push("Ingresa un email");
      }
      if (!this.$v.emailEnvio.email) {
        errores.push("Ingresa un email valido");
      }
      return errores;
    },
  },
};
</script>
