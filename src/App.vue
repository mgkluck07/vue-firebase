<template>
  <v-app>
	  <v-navigation-drawer v-model="menu" app temporary>
		  <v-list>
			  <v-list-tile @click="seleccionar('home')">
				  <v-list-tile-action>
					  <v-icon>home</v-icon>
				  </v-list-tile-action>
				  <v-list-tile-content>
					  <v-list-tile-title v-text="'Inicio'"></v-list-tile-title>
				  </v-list-tile-content>
			  </v-list-tile>
			  <v-list-tile @click="seleccionar('perfil')">
				  <v-list-tile-action>
					  <v-icon>account_circle</v-icon>
				  </v-list-tile-action>
				  <v-list-tile-content>
					  <v-list-tile-title v-text="'Perfil'"></v-list-tile-title>
				  </v-list-tile-content>
			  </v-list-tile>
			  <v-list-tile @click="seleccionar('registro')">
				  <v-list-tile-action>
					  <v-icon>contact_mail</v-icon>
				  </v-list-tile-action>
				  <v-list-tile-content>
					  <v-list-tile-title v-text="'Registro'"></v-list-tile-title>
				  </v-list-tile-content>
			  </v-list-tile>
			  <v-list-tile @click="seleccionar('login')">
				  <v-list-tile-action>
					  <v-icon>arrow_forward</v-icon>
				  </v-list-tile-action>
				  <v-list-tile-content>
					  <v-list-tile-title v-text="'Login'"></v-list-tile-title>
				  </v-list-tile-content>
			  </v-list-tile>
		  </v-list>
	  </v-navigation-drawer>
    <v-toolbar color="primary" dark app>
		<v-toolbar-side-icon @click="menu = !menu"></v-toolbar-side-icon>
      <v-toolbar-title @click="componenteActual = 'home'" class="headline logo">
        <span>{{titulo}}</span>
      </v-toolbar-title>
    </v-toolbar>

    <v-content>
		<v-container fluid fill-height>
			<v-slide-y-transition mode="out-in">
				<component :is="componenteActual"></component>
			</v-slide-y-transition>
		</v-container>
    </v-content>
	<v-footer color="primary" dark>
		<v-layout justify-center>
			<span>Curso Vue.js y Firebase - &copy; 2019</span>
		</v-layout>
	</v-footer>
  </v-app>
</template>

<script>
import Home from '@/views/Home'
import Registro from '@/views/Usuario/Registro'
import Login from '@/views/Usuario/Login'
import Perfil from '@/views/Usuario/Perfil'
export default {
  name: 'App',
  components: {Home,Registro,Login,Perfil},
  data () {
    return {
	  titulo: 'Súper Opera',
	  componenteActual: 'home',
	  menu: false
    }
  },
  methods: {
	seleccionar(nombre){
		this.componenteActual = nombre;
		this.menu = false;
	}
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Great+Vibes');
.logo{
  font-family: 'Great Vibes', cursive !important;
  cursor: pointer;
}
</style>
