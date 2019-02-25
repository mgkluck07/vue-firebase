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
                        <v-text-field label="Email"></v-text-field>
                        <v-text-field label="Password" type="password"></v-text-field>
                    </v-card-text>
                    <v-card-text>
                        <v-layout justify-end>
                            <v-btn color="secondary">Siguiente</v-btn>
                        </v-layout>
                    </v-card-text>
                </v-card>
            </v-slide-y-transition>
        </v-flex>
    </v-layout>
</template>