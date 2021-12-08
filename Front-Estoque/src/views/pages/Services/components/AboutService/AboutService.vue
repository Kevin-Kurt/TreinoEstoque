<template>
  <v-container width="100%" style="background: #f5f5f5">
    <div class="d-flex justify-center align-center pa-5">
      <h2>Serviço</h2>
    </div>

    <v-divider color="#96ca4e"></v-divider>

    <v-row class="px-5">
      <v-col>
        <div>
          <p>ID: {{ service.id }}</p>
          <p>Nome: {{ service.name }}</p>
          <p>Valor: R$ {{ service.value }}</p>
          <p>Tipo: {{ service.type }}</p>
          <p>Detalhes: {{ service.description }}</p>
          <p>Data de Cadastro: {{ createFormatedDate }}</p>
          <p>Última atualização: {{ updateFormatedDate }}</p>
        </div>
      </v-col>
    </v-row>

    <div class="mt-5 px-3">
      <h2>Peças</h2>

      <v-divider class="my-3" color="#96ca4e"></v-divider>
    </div>

    <div class="ml-4" v-if="service.parts.length == 0">
      <span>Nenhuma peça foi solicitada</span>
    </div>

    <v-row class="px-5">
      <v-col>
        <v-simple-table style="width: 100%" v-if="service.parts.length != 0">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-center">ID</th>
                <th class="text-center">Nome</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="part in service.parts" :key="part.id">
                <td class="text-center">
                  {{ part.id }}
                </td>
                <td class="text-center">{{ part.name }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>

    <div class="mt-5 px-3">
      <h2>Histórico de Preços</h2>

      <v-divider class="my-3" color="#96ca4e"></v-divider>
    </div>
    <v-timeline dense>
      <v-timeline-item
        v-for="log in service.priceLogs"
        :key="log.id"
        color="primary"
        fill-dot
        small
      >
        <div>
          <strong class="field">R${{ log.price }}</strong>
          <p>{{ formatDate(log.initialDate) }}</p>
        </div>
      </v-timeline-item>
    </v-timeline>
  </v-container>
</template>

<script src="./index.js"></script>
