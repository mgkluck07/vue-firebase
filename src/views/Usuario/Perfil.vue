<template>
    <v-layout text-xs-center align-start justify-center>
        <v-card class="elevation-6">
            <v-card-text>
                <div class="ma-2">
                    {{ usuario.nombre }} {{ usuario.apellido }}
                </div>
                <v-img class="ma-2 fotoPerfil" :src="usuario.fotoPerfil" alt=""></v-img>
                <div class="ma-2">
                    {{ usuario.descripcion }}
                </div>
                <a class="ma-2 link" :href="usuario.biografia" target="_blank">Biografía</a>
            </v-card-text>
        </v-card>
    </v-layout>
</template>

<script>
export default {
    computed: {
        usuario(){
            return this.$store.state.usuario
        }
    },
}
</script>


<style>
.fotoPerfil{
    width: 200px;
    height: 100%;
}
.link{
    text-decoration: none;
    font-size: 1rem;
    color: #553f75;
}
</style>
