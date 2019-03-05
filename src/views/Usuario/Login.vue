<template>
    <v-layout justify-center align-center>
        <v-flex xs12 sm8 md6 lg5 xl4>
            <v-slide-y-transition mode="out-in">
                <v-card class="elevation-6">
                    <v-toolbar color="primary" dark card>
                        <v-toolbar-title>
                            Ingresa tus credenciales
                        </v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-text-field label="Email" v-model="formulario.email" :error-messages="erroresEmail" @blur="$v.formulario.email.$touch()"></v-text-field>
                        <v-text-field label="Password" @keyup.enter="ingresar" type="password" v-model="formulario.password" :error-messages="erroresPassword" @blur="$v.formulario.password.$touch()"></v-text-field>
                    </v-card-text>
                    <v-card-text>
                        <v-layout justify-end>
                            <v-btn @click="ingresar" :depressed="$v.formulario.$invalid" :disabled="$v.formulario.$invalid" color="secondary">Ingresar</v-btn>
                        </v-layout>
                    </v-card-text>
                </v-card>
            </v-slide-y-transition>
        </v-flex>
    </v-layout>
</template>

<script>
import {required,email,minLength,maxLength} from 'vuelidate/lib/validators';
export default {
    data() {
        return {
            formulario: {
                email: '',
                password: ''
            }
        }
    },
    validations: {
        formulario: {
            email: {
                required,
                email
            },
            password: {
                required,
                minLength: minLength(6),
                maxLength: maxLength(20)
            }
        }
    },
    methods: {
        ingresar(){
            if(this.$v.formulario.$invalid){
                this.$v.formulario.$touch();
                return
            }
            alert('...Consultando');
        }
    },
    computed: {
        erroresEmail(){
            let errores = [];
            if(!this.$v.formulario.email.$dirty){ return errores; }
            if(!this.$v.formulario.email.required){ errores.push('Ingresa un email');}
            if(!this.$v.formulario.email.email){ errores.push('Ingresa un email valido');}
            return errores;
        },
        erroresPassword(){
            let errores = [];
            if(!this.$v.formulario.password.$dirty){ return errores; }
            if(!this.$v.formulario.password.required){ errores.push('Ingresa una contraseña');}
            if(!this.$v.formulario.password.minLength){ errores.push('Ingresa una contraseña de al menos 6 caracteres.');}
            if(!this.$v.formulario.password.maxLength){ errores.push('Ingresa una contraseña de menos a 20 caracteres.');}
            return errores;
        }
    }
}
</script>
