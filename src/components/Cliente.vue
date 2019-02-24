<template>
    <div class="seccion">
        <div class="atributo">
            <span>{{ nombreCompleto }}</span>
        </div>
        <div class="atributo">
            <img :src="fotoPerfil" alt="">
        </div>
        <div class="atributo">
            <a :href="biografia" target="_blank">Biografia</a>
        </div>
        <div class="atributo">
            <span>Edad: {{ edad }}</span>
        </div>
        <div class="atributo">
            <span>{{ email }}</span>
        </div>
    </div>
</template>

<script>
export default {
    props: ['email'],
    data() {
        return {
            nombre: 'Isaac',
            apellido: 'Newton',
            fechaNacimiento: new Date(1642, 12, 25),
            fotoPerfil: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Sir_Isaac_Newton_%281643-1727%29.jpg/220px-Sir_Isaac_Newton_%281643-1727%29.jpg',
            biografia: 'https://es.wikipedia.org/wiki/Isaac_Newton'
        }
    },
    computed: {
        nombreCompleto() {
            return `${this.nombre} ${this.apellido}`;
        },
        edad() {
            return this.calcularEdad(this.fechaNacimiento);
        }
    },
    methods: {
        calcularEdad(fecha){
            let fechaActual = new Date();
            let diferencia = fechaActual - fecha;
            return Math.floor(diferencia / (1000 * 60 * 60 * 24 * 365.25));
        }
    },
    created() {
        this.$emit('onCambioEmail','newton@email.com');
    },
}
</script>