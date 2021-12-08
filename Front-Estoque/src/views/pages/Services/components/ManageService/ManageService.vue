<template>
  <v-card class="mx-auto" max-width="900">
    <div class="pr-6 pt-6 d-flex justify-end align-center">
      <v-btn color="primary" icon @click="closeWithoutLoading">
        <v-icon large color="quaternary">mdi-close</v-icon>
      </v-btn>
    </div>

    <div class="pb-6 d-flex justify-center align-center">
      <h2>Adicionar Serviço</h2>
    </div>

    <div class="d-flex align-center">
      <v-spacer />

      <v-alert
        type="error"
        v-show="error"
        transition="scale-transition"
        icon="mdi-alert-octagon-outline"
      >
        {{ errorMessage }}
      </v-alert>

      <v-spacer />
    </div>

    <v-window v-model="step" touchless class="px-8">
      <v-window-item :value="1">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-row class="pa-0 ma-0">
            <v-col cols="12" sm="12" md="12" lg="12" class="py-0">
              <span class="ml-1 label"
                >Nome
                <strong style="color: #eb5454">*</strong>
              </span>
              <v-text-field
                color="secondary"
                class="mt-2"
                outlined
                v-model="currentService.name"
                placeholder="Digite o nome do serviço"
                :rules="nameRules"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6" lg="6" class="py-0">
              <span class="ml-1 label"
                >Valor (Mão de Obra)
                <strong style="color: #eb5454">*</strong>
              </span>
              <v-text-field
                color="secondary"
                class="mt-2"
                outlined
                v-model="currentService.value"
                v-mask="['R$##,##', 'R$###,##', 'R$####,##', 'R$#####,##']"
                :rules="priceRules"
                placeholder="R$00,00"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6" lg="6" class="py-0">
              <span class="ml-1 label"
                >Tipo
                <strong style="color: #eb5454">*</strong>
              </span>
              <v-text-field
                color="secondary"
                class="mt-2"
                outlined
                v-model="currentService.type"
                placeholder="Digite o tipo de serviço"
                :rules="[(v) => !!v || 'Tipo requerido']"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="12" md="12" lg="12" class="py-0">
              <span class="ml-1 label"
                >Descrição do Serviço
                <strong style="color: #eb5454">*</strong>
              </span>
              <v-textarea
                color="secondary"
                class="mt-2"
                outlined
                v-model="currentService.description"
                placeholder="Explique, em poucas palavras, o que é o serviço e para que ele serve"
                required
              ></v-textarea>
            </v-col>
            <v-col cols="12" sm="12" md="12" lg="12" class="py-0">
              <span class="ml-1 label">Peças </span>
              <v-combobox
                color="secondary"
                hide-details
                class="mt-2"
                v-model="selectedParts"
                @change="searchServiceInput = ''"
                :search-input.sync="searchServiceInput"
                :items="parts"
                :loading="loading"
                small-chips
                multiple
                outlined
                placeholder="Selecione as peças"
                item-text="nome"
                item-value="id"
              ></v-combobox>
            </v-col>
          </v-row>
        </v-form>

        <v-row class="pa-0 ma-0 mb-8 mt-6" justify="center" align="center">
          <v-simple-table
            v-if="selectedParts.length > 0"
            style="border: 1px solid #ccc; width: 97%"
          >
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-center">Código</th>
                  <th class="text-center">Nome</th>
                  <th class="text-center">Quant.</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in selectedParts" :key="item.id">
                  <td class="text-center">{{ item.codInterno }}</td>
                  <td class="text-center">{{ item.nome }}</td>

                  <td class="d-flex justify-center align-center text-center">
                    <v-text-field
                      v-model="item.amount"
                      :min="1"
                      placeholder="1"
                      class="text-center"
                      color="info"
                      style="min-width: 40px; text-align: center !important"
                    ></v-text-field>
                  </td>

                  <td class="text-center">
                    <v-btn icon color="error" @click="removeItem(index)">
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-row>
      </v-window-item>

      <v-window-item :value="2">
        <div class="fill-height text-center pa-8">
          <v-icon color="secondary" size="208"
            >mdi-checkbox-marked-circle</v-icon
          >

          <span style="display: block; margin-top: 10px; font-size: 1.2rem">{{
            isEditing
              ? "Serviço Atualizado com Sucesso!"
              : "Serviço cadastrado com sucesso!"
          }}</span>
        </div>
      </v-window-item>
    </v-window>

    <v-card-actions class="d-flex justify-center align-center pb-12 px-10 mx-3">
      <v-btn
        height="60"
        width="50%"
        dark
        elevation="0"
        color="quaternary"
        style="border-radius: 6px"
        large
        v-if="step == 1"
        @click="closeWithoutLoading"
        class="mr-3"
      >
        Fechar
      </v-btn>
      <v-btn
        height="60"
        style="border-radius: 6px"
        :color="step === 1 ? 'primary' : 'secondary'"
        width="50%"
        large
        depressed
        @click="next"
      >
        {{ step === 2 ? "Terminar" : "Salvar" }}
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

.form {
  display: flex;
  justify-content: center;
  width: 100%;
}

@media (max-width: 600px) {
  .form {
    flex-direction: column;
  }
}
</style>

<script src="./index.js"></script>
