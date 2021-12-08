<template>
  <v-container
    fluid
    class="d-flex align-center justify-center"
    style="height: 100%; max-width: unset"
  >
    <v-card
      style="border-radius: 6px"
      max-width="706"
      class="d-flex flex-column justify-center pa-7"
      elevation="0"
    >
      <v-card-title class="d-flex justify-center align-center my-3">
        <h1 style="word-break: normal">Configurações do sistema</h1>
      </v-card-title>

      <v-card-subtitle class="d-flex justify-center align-center">
        <span class="label">
          Aqui você pode editar os dias de tolerância para começar a cobrar o
          custo de armazenagem da bicicleta caso o cliente atrase a data
          estimada de busca da mesma, além de também configurar o preço por dia
          excedente.
        </span>
      </v-card-subtitle>

      <Configurations @success="showMessage" />
    </v-card>
  </v-container>
</template>

<script src="./index.js"></script>

<style scoped>
.label {
  font-style: normal;
  font-weight: 300;
  font-size: 1.2rem;
  line-height: 35px;
  text-align: center;
  color: #9c9c9c;
}
</style>
