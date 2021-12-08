<template>
  <v-container class="pa-5">
    <div class="ml-5">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-row justify="center" align="center" class="flex-column">
          <v-col cols="12" sm="8" md="8" lg="8">
            <span class="ml-1 label"
              >Dias de tolerância
              <strong style="color: #eb5454">*</strong>
            </span>
            <v-text-field
              class="mt-2"
              outlined
              style="max-width: 371px"
              v-model="configs.toleranceDays"
              :rules="[(v) => !!v || 'Campo Obrigatório']"
              label=""
              required
              type="number"
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="8" md="8" lg="8">
            <span class="ml-1 label"
              >Preço por dia excedente
              <strong style="color: #eb5454">*</strong>
            </span>
            <v-text-field
              class="mt-2"
              outlined
              style="max-width: 371px"
              v-model="configs.price"
              :rules="[(v) => !!v || 'Campo Obrigatório']"
              label=""
              required
              type="number"
            ></v-text-field>
          </v-col>
          <v-col
            class="d-flex justify-space-between"
            cols="12"
            sm="8"
            md="8"
            lg="8"
          >
            <v-btn
              width="47%"
              elevation="0"
              height="60"
              color="quaternary"
              dark
              @click="reset"
            >
              Cancelar
            </v-btn>
            <v-btn
              width="47%"
              elevation="0"
              height="60"
              color="primary"
              darlk
              @click="submit"
              :disabled="!valid"
            >
              Salvar
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </div>
  </v-container>
</template>

<style scoped>
.label {
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 18px;
  letter-spacing: 0.15px;

  color: #808080;
}
</style>

<script src="./index.js"></script>
