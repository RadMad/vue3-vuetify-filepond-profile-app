<template>
  <v-app>
    <div id="app">
      <Header />
        <router-view />
      <Footer />
    </div>
  </v-app>
</template>

<script setup lang="ts">
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
</script>
