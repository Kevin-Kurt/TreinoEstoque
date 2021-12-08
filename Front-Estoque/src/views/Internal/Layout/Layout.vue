<template>
  <div id="main">
    <Navigation :key="update" />

    <v-content>
      <router-view
        @updateProfileImage="updateProfile"
        @show="showSuccessAlert"
      />
    </v-content>

    <v-scale-transition>
      <v-alert
        v-show="showSuccess"
        elevation="9"
        type="success"
        class="successAlert"
      >
        {{ message }}
      </v-alert>
    </v-scale-transition>
  </div>
</template>

<style scoped>
#main {
  max-width: unset;

  width: 100%;
  height: 100%;
}

.successAlert {
  z-index: 100;
  position: absolute;
  right: 2%;
  top: 10%;
  white-space: nowrap;
}

@media (max-width: 400px) {
  .successAlert {
    position: absolute;
    right: 7%;
    left: 7%;
  }
}
</style>

<script src="./index.js"></script>
