<template>
  <v-container id="background">
    <router-view />
  </v-container>
</template>

<style scoped>
#background {
  display: flex;
  align-items: center;
  height: 100vh;
  background: #5e1886;
  max-width: unset;
}
</style>

<script src="./index.js"></script>
