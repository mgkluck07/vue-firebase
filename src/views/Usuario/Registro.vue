<template>
  <v-layout justify-center align-center>
    <v-flex xs12 sm8 md6 lg5 xl4>
      <v-slide-y-transition mode="out-in" @enter="enter">
        <v-card v-if="vista==1" :key="1" class="elevation-6">
          <v-toolbar color="primary" dark card>
            <v-toolbar-title>Registrate</v-toolbar-title>
          </v-toolbar>
          <v-card-text class="subheading text-xs-center">Registrarte con tu red social preferida</v-card-text>
          <v-card-text>
            <v-layout justify-center>
              <a @click="siguiente(1, 'facebook.com')" class="mx-3">
                <v-avatar tile :size="40">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/c/c2/F_icon.svg"
                    alt="Facebook"
                  />
                </v-avatar>
              </a>
              <a @click="siguiente(1, 'google.com')" class="mx-3">
                <v-avatar tile :size="40">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                    alt="Google"
                  />
                </v-avatar>
              </a>
            </v-layout>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-text class="subheading text-xs-center">Registrarte con tu email y contraseña</v-card-text>
          <v-card-text>
            <v-text-field
              autofocus
              @blur="$v.f1.email.$touch()"
              :error-messages="erroresEmail"
              v-model="f1.email"
              label="Email"
            ></v-text-field>
            <v-text-field
              @blur="$v.f1.password.$touch()"
              :error-messages="erroresPassword"
              v-model="f1.password"
              label="Password"
              type="password"
            ></v-text-field>
            <v-text-field
              @keyup.enter="siguiente(1, 'password')"
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
                @click="siguiente(1, 'password')"
              >Siguiente</v-btn>
            </v-layout>
          </v-card-text>
          <v-card-actions>
            <v-btn :to="{name: 'login'}" flat color="secondary">¿Ya tienes cuenta? Logueate</v-btn>
          </v-card-actions>
        </v-card>
        <v-card v-if="vista == 2" :key="2" class="elevation-6">
          <v-toolbar color="primary" dark card>
            <v-toolbar-title>Ingresa tu nombre y apellido</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-text-field
              autofocus
              @blur="$v.f2.nombre.$touch()"
              :error-messages="erroresNombre"
              v-model="f2.nombre"
              label="Nombre"
            ></v-text-field>
            <v-text-field
              @keyup.enter="siguiente(2)"
              @blur="$v.f2.apellido.$touch()"
              :error-messages="erroresApellido"
              v-model="f2.apellido"
              label="Apellido"
            ></v-text-field>
          </v-card-text>
          <v-card-text>
            <v-layout>
              <v-flex xs6>
                <v-layout justify-start>
                  <v-btn @click="vista--">Atras</v-btn>
                </v-layout>
              </v-flex>
              <v-flex xs6>
                <v-layout justify-end>
                  <v-btn
                    :depressed="$v.f2.$invalid"
                    :disabled="$v.f2.$invalid"
                    color="secondary"
                    @click="siguiente(2)"
                  >Siguiente</v-btn>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
        <v-card v-if="vista == 3" :key="3" class="elevation-6">
          <v-toolbar color="primary" dark card>
            <v-toolbar-title>Selecciona tu fecha de nacimiento</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-layout justify-center>
              <v-date-picker
                ref="calendario"
                :max="fechaMaxima"
                v-model="fechaNacimiento"
                reactive
                locale="es-ar"
                class="elevation-3"
              ></v-date-picker>
            </v-layout>
          </v-card-text>
          <v-card-text>
            <v-layout>
              <v-flex xs6>
                <v-layout justify-start>
                  <v-btn @click="vista--">Atrás</v-btn>
                </v-layout>
              </v-flex>
              <v-flex xs6>
                <v-layout justify-end>
                  <v-btn
                    :depressed="$v.fechaNacimiento.$invalid"
                    :disabled="$v.fechaNacimiento.$invalid"
                    @click="registrar"
                    color="secondary"
                  >Registrarse</v-btn>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-slide-y-transition>
    </v-flex>
  </v-layout>
</template>

<script>
import {
  required,
  email,
  minLength,
  maxLength,
  sameAs,
} from "vuelidate/lib/validators";
import { nombreCompuesto } from "@/utilidades/validaciones";
import { firebase, auth, db } from "@/firebase";
import { mapMutations, mapGetters } from "vuex";
export default {
  data() {
    return {
      metodo: "password",
      vista: 1,
      f1: {
        email: "",
        password: "",
        repetirPassword: "",
      },
      f2: {
        nombre: "",
        apellido: "",
      },
      fechaNacimiento: null,
      fechaMaxima: null,
    };
  },
  validations: {
    f1: {
      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(20),
      },
      repetirPassword: {
        sameAs: sameAs("password"),
      },
    },
    f2: {
      nombre: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(20),
        nombreCompuesto,
      },
      apellido: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(20),
        nombreCompuesto,
      },
    },
    fechaNacimiento: {
      required,
    },
  },
  created() {
    let fechaActual = new Date();
    this.fechaMaxima = new Date(
      fechaActual.setFullYear(fechaActual.getFullYear() - 13)
    )
      .toISOString()
      .substr(0, 10);

    if(auth.currentUser && !this.$store.state.sesion.usuario){
      this.metodo = auth.currentUser.providerData[0].providerId;
      this.vista = 2;
      this.mostrarInformacion('Completa los datos de registro.');
    }
  },
  methods: {
    ...mapMutations([
      "mostrarOcupado",
      "ocultarOcupado",
      "mostrarExito",
      "mostrarError",
      "mostrarAdvertencia",
      "mostrarInformacion"
    ]),
    ...mapMutations("sesion", ["actualizarUsuario"]),
    siguiente(vista, metodo) {
      switch (vista) {
        case 1:
          if (this.$v.f1.$invalid && metodo == "password") {
            this.$v.f1.$touch();
            return;
          } else {
            this.metodo = metodo;
            this.vista++;
          }
          break;
        case 2:
          if (this.$v.f2.$invalid) {
            this.$v.f2.$touch();
            return;
          } else {
            this.vista++;
          }
          break;
      }
    },
    async registrar() {
      if (this.$v.fechaNacimiento.$invalid) {
        return;
      }
      switch (this.metodo) {
        case "password":
          this.registrarEmail();
          break;
        case "facebook.com":
          this.registrarFacebook();
          break;
        case "google.com":
          this.registrarGoogle();
          break;
      }
    },
    async registrarEmail() {
      try {
        this.mostrarOcupado({
          titulo: "Creando registro",
          mensaje: "Estamos registrando tu informacion...",
        });

        let uid = null;

        if(auth.currentUser){
          uid = auth.currentUser.uid;
        } else {
          let cred = await auth.createUserWithEmailAndPassword(
            this.f1.email,
            this.f1.password
          );
          uid = cred.user.id;
        }

        await this.guardarUsuario(uid);

        await auth.currentUser.sendEmailVerification();
        this.mostrarExito(this.saludo);
        this.$router.push({ name: "verificacion-email" });
      } catch (error) {
        switch (error.code) {
          case "auth/email-already-in-use":
            this.mostrarAdvertencia(
              "Ya se ha registrado esta direccion de email."
            );
            break;

          default:
            this.mostrarError(
              "Ocurrio un error registrando tu cuenta, intentalo mas tarde."
            );
            break;
        }
      } finally {
        this.ocultarOcupado();
      }
    },
    async registrarFacebook() {
      let provider = new firebase.auth.FacebookAuthProvider();
      provider.setCustomParameters({
        display: "popup",
      });
      auth.languageCode = "es_AR";
      try {
        let uid = null;
        if(auth.currentUser){
          uid = auth.currentUser.uid;
        } else {
          let cred = await auth.signInWithPopup(provider);
          uid = cred.user.id;
        }
        await this.guardarUsuario(uid);
        this.mostrarExito(this.saludo);
        this.$router.push({ name: "home" });
      } catch (error) {
        this.mostrarError("Ocurrió un error registrando tu cuenta.");
      }
    },
    async registrarGoogle() {
      let provider = new firebase.auth.GoogleAuthProvider();
      provider.setCustomParameters({
        display: "popup",
      });
      auth.languageCode = "es_AR";
      try {
        let uid = null;
        if(auth.currentUser){
          uid = auth.currentUser.uid;
        } else {
          let cred = await auth.signInWithPopup(provider);
          uid = cred.user.id;
        }
        await this.guardarUsuario(uid);
        this.mostrarExito(this.saludo);
        this.$router.push({ name: "home" });
      } catch (error) {
        this.mostrarError("Ocurrió un error registrando tu cuenta.");
      }
    },
    enter() {
      if (this.vista == 3) {
        this.$refs.calendario.actrivePicker = "YEAR";
      }
    },
    async guardarUsuario(uid) {
      let usuario = {
        uid,
        userName: "newton",
        nombre: this.f2.nombre,
        apellido: this.f2.apellido,
        fechaNacimiento: new Date(this.fechaNacimiento),
        sexo: "M",
        biografia: "https://es.wikipedia.org/wiki/Isaac_Newton",
        fotoPerfil:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Sir_Isaac_Newton_%281643-1727%29.jpg/800px-1727%29.jpg",
      };

      await db.collection("usuarios").doc(usuario.uid).set(usuario);

      this.actualizarUsuario(usuario);
    },
  },
  computed: {
    ...mapGetters("sesion", ["saludo"]),
    erroresEmail() {
      let errores = [];
      if (!this.$v.f1.email.$dirty) {
        return errores;
      }
      if (!this.$v.f1.email.required) {
        errores.push("Ingresa un email");
      }
      if (!this.$v.f1.email.email) {
        errores.push("Ingresa un email valido");
      }
      return errores;
    },
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
    erroresNombre() {
      let errores = [];
      if (!this.$v.f2.nombre.$dirty) {
        return errores;
      }
      if (!this.$v.f2.nombre.required) {
        errores.push("Ingresa un nombre");
      }
      if (!this.$v.f2.nombre.minLength) {
        errores.push("Ingresa un nombre de al menos 3 caracteres.");
      }
      if (!this.$v.f2.nombre.maxLength) {
        errores.push("Ingresa un nombre de menos a 20 caracteres.");
      }
      if (!this.$v.f2.nombre.nombreCompuesto) {
        errores.push("Ingresa un nombre válido.");
      }
      return errores;
    },
    erroresApellido() {
      let errores = [];
      if (!this.$v.f2.apellido.$dirty) {
        return errores;
      }
      if (!this.$v.f2.apellido.required) {
        errores.push("Ingresa un apellido");
      }
      if (!this.$v.f2.apellido.minLength) {
        errores.push("Ingresa un apellido de al menos 3 caracteres.");
      }
      if (!this.$v.f2.apellido.maxLength) {
        errores.push("Ingresa un apellido de menos a 20 caracteres.");
      }
      if (!this.$v.f2.apellido.nombreCompuesto) {
        errores.push("Ingresa un apellido válido.");
      }
      return errores;
    },
  },
};
</script>
