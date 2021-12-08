<template>
  <v-card
    class="d-flex justify-space-around align-center py-7 px-6"
    elevation="0"
  >
    <div style="width: 100%">
      <v-card-title class="card-title"> {{ title }} </v-card-title>
      <v-card-text class="card-text">{{ text }} </v-card-text>
    </div>

    <v-btn
      class="hidden-sm-and-down"
      v-if="haveAction"
      color="primary"
      elevation="0"
      large
      @click="action"
      >{{ actionTitle }}</v-btn
    >

    <v-btn
      fab
      tile
      small
      style="border-radius: 6px"
      class="hidden-md-and-up"
      v-if="haveAction"
      color="primary"
      elevation="0"
      @click="action"
    >
      <v-icon>mdi-plus</v-icon></v-btn
    >
  </v-card>
</template>

<style scoped>
.card-title {
  font-size: 1.9rem;
}

.card-text {
  display: flex;
  justify-content: space-between;

  font-size: 1.4rem;
  font-weight: 300;
  line-height: 1.8;

  width: 50%;

  color: #9c9c9c;
}

@media (max-width: 900px) {
  .card-title {
    font-size: 1.3rem;
    padding: 0;
  }

  .card-text {
    font-size: 1rem;
    width: 90%;
  }
}
</style>

<script src="./index.js" />
