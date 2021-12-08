<template>
  <v-app id="app" style="background: #e9e9e9">
    <router-view />
  </v-app>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap");

html,
body {
  font-family: "Roboto", sans-serif;
}

#app {
  font-family: "Roboto", sans-serif;
}

body::-webkit-scrollbar {
  background-color: #e9e9e9;
  width: 12px;
}

body::-webkit-scrollbar-thumb {
  background-color: rgba(114, 119, 131, 0.5);
  border-radius: 20px;
}

.v-dialog::-webkit-scrollbar {
  background-color: #e9e9e9;
  width: 10px;
  border-radius: 3.5px;
}

.v-dialog::-webkit-scrollbar-thumb {
  background: #c4c4c4;
  border-radius: 3.5px;
}

.v-data-table__wrapper {
  border-top: none;
  font-style: normal;
  font-weight: 300;
  font-size: 20px;
  line-height: 23px;
  letter-spacing: 0.15px;

  color: #808080;

  border-radius: 3px !important;
}

.theme--light.v-data-table .v-data-table__empty-wrapper {
  color: #808080 !important;
}

.v-data-table__mobile-row {
  border: none !important;
  font-style: normal;
  font-weight: 300;
  font-size: 20px;
  line-height: 23px;
  letter-spacing: 0.15px;
  color: #808080;

  border-radius: 3px !important;
}

.theme--light.v-data-table tbody tr:not(:last-child) td:last-child {
  border-bottom: 0.3px solid rgba(0, 0, 0, 0.12) !important;
}

#MainTable
  .v-data-table__mobile-table-row
  .v-data-table__mobile-row:last-child
  .v-data-table__mobile-row__header {
  display: none !important;
}

#MainTable .theme--light.v-data-table tbody tr:not(:last-child) td:last-child {
  border-bottom: 0.3px solid rgba(0, 0, 0, 0.12) !important;
}

@media (max-width: 600px) {
  .theme--light.v-data-table tbody tr:not(:last-child) td:last-child {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>

<script>
export default {
  name: "App",
};
</script>
