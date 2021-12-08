<template>
  <v-alert
    transition="scale-transition"
    class="alert"
    :type="type"
    v-show="show"
  >
    {{ message }}
  </v-alert>
</template>

<style scoped>
.alert {
  position: fixed;
  top: 3rem;
  right: 3rem;
  z-index: 100;
}
</style>

<script>
export default {
  name: "Alert",

  props: {
    message: String,
    type: String,
    show: Boolean,
  },
};
</script>
