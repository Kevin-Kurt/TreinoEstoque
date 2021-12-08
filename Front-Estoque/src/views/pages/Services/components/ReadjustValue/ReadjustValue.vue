<template>
  <v-card>
    <v-card-title class="d-flex justify-center align-center">
      <h2>Reajuste de Preço</h2>
    </v-card-title>

    <v-card-text>
      <v-form ref="form">
        <v-row>
          <v-col cols="12" sm="8" md="8" lg="8">
            <span class="ml-1 label"
              >Porcentagem
              <strong style="color: #eb5454">*</strong>
            </span>
            <v-text-field
              color="secondary"
              outlined
              class="mt-2"
              v-model="value"
              placeholder="Digite a porcentagem que deseja aplicar"
              :rules="[(v) => !!v || 'Campo Obrigatório']"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4" md="4" lg="4">
            <span class="ml-1 label"
              >Método
              <strong style="color: #eb5454">*</strong>
            </span>
            <v-select
              attach
              class="mt-2"
              v-model="type"
              :items="['Porcentagem', 'Valor Fixo']"
              outlined
              required
            ></v-select>
          </v-col>
        </v-row>
      </v-form>
      <div>
        <v-icon class="mr-1" small> mdi-information-outline</v-icon>
        <small>Este reajuste vai afetar igualmente todos os serviços</small>
      </div>
    </v-card-text>

    <v-card-actions class="d-flex justify-center align-center pb-6 px-5 mx-3">
      <v-btn
        height="60"
        width="50%"
        dark
        elevation="0"
        color="quaternary"
        style="border-radius: 6px"
        large
        @click="closeWithoutLoading"
        class="mr-3"
      >
        Fechar
      </v-btn>
      <v-btn
        color="primary"
        height="60"
        style="border-radius: 6px"
        width="50%"
        large
        depressed
        @click="save"
        :loading="loading"
      >
        Salvar
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<style scoped>
.label {
  font-style: normal;
  font-weight: 300;
  font-size: 15px;
  line-height: 18px;
  margin-bottom: 8px;
  letter-spacing: 0.15px;
  color: #979797;
}
</style>

<script src="./index.js"></script>
