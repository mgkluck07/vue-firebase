<template>
  <v-layout column justify-center text-xs-center>
    <div class="home-title">
      <h1>Súper Ópera</h1>
    </div>
    <v-layout wrap>
      <v-flex xs12 sm6 md4 lg3 v-for="item in 4" :key="item">
        <v-card class="elevation-5 ma-3">
          <v-img src="https://dummyimage.com/512x512/fff/000"></v-img>
        </v-card>
      </v-flex>
    </v-layout>
  </v-layout>
</template>

<script>
  export default {
  }
</script>

<style>
.home-title{
  font-family: 'Great Vibes', cursive;
  font-size: 2rem;
  color: #553f75;
  text-shadow: 1px 1px 5px #acacac;
}
</style>
