<template>
    <div>
        <Anuncio></Anuncio>
        <Cliente :email="email" @onCambioEmail="actualizarEmail"></Cliente>
        <Boletos></Boletos>
        <Email :emailRecibido="email" @onCambioEmail="actualizarEmail"></Email>
        <Firma></Firma>
    </div>
</template>

<script>
import Cliente from '@/components/Cliente';
import Anuncio from '@/components/Anuncio';
import Boletos from '@/components/Boletos';
import Firma from '@/components/Firma';
import Email from '@/components/Email';
export default {
    components: { Cliente, Anuncio,Boletos,Firma,Email },
    data() {
        return {
            email: '',
        }
    },
    methods: {
        actualizarEmail(email){
            this.email = email;
        }
    },
}
</script>

<style>
.seccion{
    font-size: 2.4rem;
    color: #202020;
    background-color: #e9e9e9;
    border-radius: 5px;
    margin: 10px;
    padding: 10px;
}
.atributo{
    margin: 10px;
}
</style>
