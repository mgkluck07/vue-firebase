<template>
  <v-layout text-xs-center align-start justify-center class="mt-5">
    <v-card v-if="usuario" class="elevation-6" max-width="250">
      <v-btn
        color="secondary"
        class="elevation-1 pa-2"
        fab
        small
        absolute
        top
        right
        @click="edit = !edit"
        v-if="perfilPropio"
      >
        <v-fade-transition mode="out-in">
          <v-icon v-if="!edit" :key="1">edit</v-icon>
          <v-icon v-else :key="2">close</v-icon>
        </v-fade-transition>
      </v-btn>
      <v-card-text>
        <v-layout justify-center>
          <v-btn @click="editarNombres" v-if="edit" small color="secondary" flat icon>
            <v-icon>edit</v-icon>
          </v-btn>
          <div class="ma-2">{{ usuario.nombre }} {{ usuario.apellido }}</div>
        </v-layout>
        <v-img class="ma-2 fotoPerfil" :src="usuario.fotoPerfil" alt></v-img>
        <v-layout justify-center>
          <v-btn @click="editarDescripcion" v-if="edit" color="secondary" small flat icon>
            <v-icon>edit</v-icon>
          </v-btn>
          <div class="ma-2 descripcion">
            <span v-if="usuario.descripcion">{{ usuario.descripcion }}</span>
            <span v-else>Agrega una descripción</span>
          </div>
        </v-layout>
        <v-layout justify-center>
          <v-btn @click="editarBiografia" v-if="edit" color="secondary" small flat icon>
            <v-icon>edit</v-icon>
          </v-btn>
          <div class="ma-2">
            <a v-if="usuario.biografia" class="ma-2 link" :href="usuario.biografia" target="_blank">Biografía</a>
            <span v-else>Ingresa tu biografia</span>
          </div>
        </v-layout>
      </v-card-text>
    </v-card>
    <v-dialog v-model="editNames" max-width="400">
      <v-card>
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
            @keyup.enter="guardar"
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
                <v-btn @click="editNames = false">Cancelar</v-btn>
              </v-layout>
            </v-flex>
            <v-flex xs6>
              <v-layout justify-end>
                <v-btn
                  :depressed="$v.f2.$invalid"
                  :disabled="$v.f2.$invalid"
                  color="secondary"
                  @click="guardar"
                >Guardar</v-btn>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="editDescription" max-width="400">
      <v-card>
        <v-toolbar color="primary" dark card>
          <v-toolbar-title>Ingresa una descripción</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-textarea
            autofocus
            @blur="$v.descripcion.$touch()"
            :error-messages="erroresDescripcion"
            v-model="descripcion"
            label="Agregar una descripción"
            counter="300"
          ></v-textarea>
        </v-card-text>
        <v-card-text>
          <v-layout>
            <v-flex xs6>
              <v-layout justify-start>
                <v-btn @click="editDescription = false">Cancelar</v-btn>
              </v-layout>
            </v-flex>
            <v-flex xs6>
              <v-layout justify-end>
                <v-btn
                  :depressed="$v.descripcion.$invalid"
                  :disabled="$v.descripcion.$invalid"
                  color="secondary"
                  @click="guardarDescripcion"
                >Guardar</v-btn>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="editBio" max-width="400">
      <v-card>
        <v-toolbar color="primary" dark card>
          <v-toolbar-title>Ingresa tu biografiá</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-text-field
            autofocus
            @keyup.enter="guardar"
            @blur="$v.biografia.$touch()"
            :error-messages="erroresBiografia"
            v-model="biografia"
            label="Agregar tu biografia"
          ></v-text-field>
        </v-card-text>
        <v-card-text>
          <v-layout>
            <v-flex xs6>
              <v-layout justify-start>
                <v-btn @click="editBio = false">Cancelar</v-btn>
              </v-layout>
            </v-flex>
            <v-flex xs6>
              <v-layout justify-end>
                <v-btn
                  :depressed="$v.biografia.$invalid"
                  :disabled="$v.biografia.$invalid"
                  color="secondary"
                  @click="guardarBiografia"
                >Guardar</v-btn>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { required, minLength, maxLength, url } from "vuelidate/lib/validators";
import { nombreCompuesto } from "@/utilidades/validaciones";
import { mapMutations } from "vuex";
import { db,auth } from "@/firebase";
export default {
  computed: {
    perfilPropio() {
      return this.usuario && this.usuario.uid == auth.currentUser.uid;
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
    erroresDescripcion() {
      let errores = [];
      if (!this.$v.descripcion.$dirty) {
        return errores;
      }
      if (!this.$v.descripcion.required) {
        errores.push("Ingresa una descripción");
      }
      if (!this.$v.descripcion.maxLength) {
        errores.push("Ingresa una descripción de menos de 300 caracteres.");
      }
      return errores;
    },
    erroresBiografia() {
      let errores = [];
      if (!this.$v.biografia.$dirty) {
        return errores;
      }
      if (!this.$v.biografia.required) {
        errores.push("Ingresa tu biografia");
      }
      if (!this.$v.biografia.url) {
        errores.push("Tu biografia debe ser una url.");
      }
      return errores;
    },
  },
  data() {
    return {
      edit: false,
      editNames: false,
      editDescription: false,
      editBio: false,
      f2: {
        nombre: "",
        apellido: "",
      },
      descripcion: "",
      biografia: "",
      usuario: null,
    };
  },
  validations: {
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
    descripcion: {
      required,
      maxLength: maxLength(300),
    },
    biografia: {
      required,
      url,
    },
  },
  created() {
    this.consultarUsuario();
  },
  watch: {
    '$route' () {
      this.consultarUsuario();
    },
  },
  methods: {
    ...mapMutations(["mostrarExito","mostrarError", "mostrarOcupado", "ocultarOcupado"]),
    ...mapMutations("sesion", ["actualizarNombres", "actualizarDescripcion", "actualizarBiografia"]),
    async consultarUsuario() {
      let userNameParametro = this.$route.params.userName.toLowerCase();

      this.mostrarOcupado({titulo: 'Consultando información',mensaje: 'Cargando datos...'});

      try {
        let userNameDoc = await db.collection('userNames').doc(userNameParametro).get();
        if(userNameDoc.exists){
          let userName = userNameDoc.data();
          let usuarioDoc = await db.collection('usuarios').doc(userName.uid).get();
          if(usuarioDoc.exists){
            this.usuario = usuarioDoc.data();
          } else {
            this.$router.push({name: '404'});
          }
        } else {
          this.$router.push({name: '404'});
        }
      } catch (error) {
        this.$router.push({name: '404'});
      } finally {
        this.ocultarOcupado();
      }
    },
    editarNombres() {
      this.f2.nombre = this.usuario.nombre;
      this.f2.apellido = this.usuario.apellido;
      this.editNames = true;
    },
    async guardar() {
      if (
        this.f2.nombre == this.usuario.nombre &&
        this.f2.apellido == this.usuario.apellido
      ) {
        this.editNames = false;
        return;
      }
      this.mostrarOcupado({
        titulo: "Actualizando información",
        mensaje: "Estamos guardando tu nombre y apellido",
      });
      try {
        let usuario = { nombre: this.f2.nombre, apellido: this.f2.apellido };
        await db.collection("usuarios").doc(this.usuario.uid).update(usuario);
        this.actualizarNombres(usuario);
        this.usuario.nombre = this.f2.nombre;
        this.usuario.apellido = this.f2.apellido;
        this.editNames = false;
        this.edit = false;
      } catch (error) {
        this.mostrarError("Ocurrió un error actualizando tus datos");
      } finally {
        this.ocultarOcupado();
      }
    },
    editarDescripcion() {
      if (this.usuario.descripcion) {
        this.descripcion = this.usuario.descripcion;
      }
      this.editDescription = true;
    },
    async guardarDescripcion() {
      if (this.descripcion == this.usuario.descripcion) {
        this.editDescription = false;
        return;
      }
      this.mostrarOcupado({
        titulo: "Actualizando información",
        mensaje: "Estamos guardando tu descripción",
      });
      try {
        let usuario = { descripcion: this.descripcion };
        await db.collection("usuarios").doc(this.usuario.uid).update(usuario);
        this.actualizarDescripcion(usuario);
        this.usuario.descripcion = this.descripcion;
        this.editDescription = false;
        this.edit = false;
      } catch (error) {
        this.mostrarError("Ocurrió un error actualizando tus datos");
      } finally {
        this.ocultarOcupado();
      }
    },
    editarBiografia() {
      if (this.usuario.biografia) {
        this.biografia = this.usuario.biografia;
      }
      this.editBio = true;
    },
    async guardarBiografia() {
      if (this.biografia == this.usuario.biografia) {
        this.editBio = false;
        return;
      }
      this.mostrarOcupado({
        titulo: "Actualizando información",
        mensaje: "Estamos guardando tu biografia",
      });
      try {
        let usuario = { biografia: this.biografia };
        await db.collection("usuarios").doc(this.usuario.uid).update(usuario);
        this.actualizarBiografia(usuario);
        this.usuario.biografia = this.biografia;
        this.editBio = false;
        this.edit = false;
        this.mostrarExito("Se guardo correctamente tu biografia");
      } catch (error) {
        this.mostrarError("Ocurrió un error actualizando tus datos");
      } finally {
        this.ocultarOcupado();
      }
    },
  },
};
</script>


<style>
.fotoPerfil {
  width: 200px;
  height: 100%;
}
.link {
  text-decoration: none;
  font-size: 1rem;
  color: #553f75;
}
.descipcion{
  text-align: justify;
}
</style>
