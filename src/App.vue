<template>
  <v-app>
    <Header />
    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<script setup lang="ts">
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
</script>

<style>
html { 
  overflow-y: auto !important; 
}

pre {
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.filepond-container, .filepond-container label {
  cursor: pointer !important;
}

.v-card, .v-avatar {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1) !important;
}

.v-list-item {
  padding-inline: 0 !important;
}

.v-list-item-title {
  white-space: normal !important;
}

@media screen and (max-width: 500px) {
  .v-toolbar-title {
    display: none;
  }
}
</style>
