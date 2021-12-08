<template>
  <v-card>
    <v-card-title class="d-flex justify-center align-center">
      <h2>Importar Excel</h2>
    </v-card-title>

    <v-card-text class="pa-4">
      <span class="label">
        Aqui você pode importar arquivos '.xlsx' (Excel) para agilizar o
        processo de adição de serviços em massa!
      </span>
      <br />
      <span class="label">
        Para isso baixe o nosso modelo e preencha da forma que melhor te
        atender.
      </span>
    </v-card-text>

    <v-card-actions>
      <v-row class="ma-0">
        <v-col cols="12" sm="6" md="6" lg="6">
          <v-btn
            height="60"
            width="100%"
            :href="download"
            elevation="0"
            target="_blank"
            color="secondary"
            dark
          >
            Baixar Modelo
          </v-btn>
        </v-col>
        <v-col cols="12" sm="6" md="6" lg="6">
          <v-btn
            height="60"
            width="100%"
            color="primary"
            elevation="0"
            dark
            @click="openFilePicker"
          >
            <span>Importar Excel</span>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-actions>

    <input
      id="excelInput"
      name="excelInput"
      ref="excelInput"
      type="file"
      accept=".xlsx"
      style="display: none"
      @change="setExcelFile"
    />
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
