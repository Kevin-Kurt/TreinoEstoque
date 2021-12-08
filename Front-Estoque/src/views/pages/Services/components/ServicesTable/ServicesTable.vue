<template>
  <v-container id="MainTable" style="max-width: unset" class="pa-0 ma-0">
    <HeaderCard
      title="Serviços"
      text="Cadastre, atualize, remova, mude os valores, importe serviços em massa via excel e veja informações sobre os serviços"
      actionTitle="Novo serviço"
      :haveAction="true"
      @action="addService"
    />

    <v-container style="max-width: unset" class="pa-6 pt-0">
      <v-dialog v-model="dialog" max-width="760px">
        <ManageService
          title="Adicionar Serviço"
          @close="closeDialog"
          @closeNoLoading="closeNoLoading"
          :key="dialogKey"
        />
      </v-dialog>

      <v-dialog v-model="excelDialog" max-width="650px">
        <ExcelModal
          @update="updateTable"
          @close="closeDialog"
          @closeNoLoading="closeNoLoading"
          :key="dialogKey"
        />
      </v-dialog>

      <v-dialog max-width="600px" v-model="readjustDialog">
        <ReadjustValue @close="closeDialog" @closeNoLoading="closeNoLoading" />
      </v-dialog>

      <v-dialog
        class="hidden-md-and-up"
        v-model="filterDialog"
        max-width="600px"
      >
        <v-container style="background: #f5f5f5">
          <v-card-title class="d-flex justify-center align-center">
            <h2>Filtros</h2>
          </v-card-title>

          <v-row>
            <v-col>
              <v-text-field
                outlined
                v-model="serviceName"
                label="Nome"
                required
                class="mx-5"
              ></v-text-field>

              <v-text-field
                v-model="serviceType"
                label="Tipo"
                required
                class="mx-5 hidden-sm-and-down"
              ></v-text-field>

              <div class="d-flex mx-5">
                <v-btn elevation="0" color="secondary" @click="reset">
                  <span>Limpar</span>
                </v-btn>

                <v-spacer></v-spacer>

                <v-btn
                  elevation="0"
                  color="primary"
                  @click="filterTable"
                  :loading="loading"
                >
                  <v-icon class="mr-2" small>mdi-filter</v-icon>
                  <span>Filtrar</span>
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-dialog>

      <div class="d-flex align-center justify-end my-4">
        <v-btn
          elevation="0"
          fab
          tile
          style="border-radius: 6px"
          class="mr-2 hidden-md-and-up"
          small
          color="secondary"
          @click="filterDialog = true"
        >
          <v-icon> mdi-filter </v-icon>
        </v-btn>

        <v-btn
          elevation="0"
          class="hidden-sm-and-down mr-2"
          color="secondary"
          :loading="loading"
          @click="showFilters ? filterTable() : (showFilters = true)"
        >
          <v-icon class="mr-2" small>mdi-filter</v-icon>
          <span>Filtrar</span>
        </v-btn>

        <v-btn
          elevation="0"
          fab
          tile
          style="border-radius: 6px"
          small
          class="mr-2"
          color="secondary"
          dark
          @click="excelDialog = true"
        >
          <v-icon>mdi-microsoft-excel</v-icon>
        </v-btn>

        <v-btn
          elevation="0"
          color="secondary"
          dark
          class="hidden-sm-and-down"
          @click="readjustDialog = true"
        >
          <span>Reajustar preços</span>
        </v-btn>

        <v-btn
          elevation="0"
          fab
          tile
          style="border-radius: 6px"
          small
          color="secondary"
          dark
          class="hidden-md-and-up mr-2"
          @click="readjustDialog = true"
        >
          <v-icon>mdi-cash</v-icon>
        </v-btn>
      </div>

      <v-card
        transition="scale-transition"
        v-if="showFilters"
        class="d-flex my-4"
        elevation="0"
        style="border-radius: 6px"
      >
        <v-row class="pt-6 pr-6 pl-6 pb-2 hidden-sm-and-down">
          <v-col
            class="d-flex flex-column align-start py-0"
            sm="4"
            md="4"
            lg="4"
          >
            <span class="field-label mb-1">Nome</span>
            <v-text-field
              color="secondary"
              dense
              outlined
              style="width: 100%"
              v-model="serviceName"
              required
              class="hidden-sm-and-down"
            ></v-text-field>
          </v-col>

          <v-col
            class="d-flex flex-column align-start py-0"
            sm="4"
            md="4"
            lg="4"
          >
            <span class="field-label mb-1">Tipo</span>
            <v-text-field
              color="secondary"
              dense
              outlined
              style="width: 100%"
              v-model="serviceType"
              required
              class="hidden-sm-and-down"
            ></v-text-field>
          </v-col>
        </v-row>

        <div class="d-flex justify-space-around mr-6 mt-5">
          <v-btn
            fab
            tile
            style="border-radius: 6px"
            small
            class="my-6 hidden-sm-and-down"
            elevation="0"
            color="terciary"
            @click="reset"
            :loading="loading"
          >
            <v-img
              contain
              max-height="16"
              src="../../../../../assets/icons/refresh.svg"
            >
            </v-img>
          </v-btn>
        </div>
      </v-card>

      <v-dialog v-model="editDialog" max-width="760px">
        <ManageService
          title="Editar"
          :service="currentService"
          @close="closeDialog"
          @closeNoLoading="closeNoLoading"
          :key="dialogKey"
        />
      </v-dialog>

      <v-dialog v-model="aboutDialog" max-width="800px">
        <AboutService
          :service="currentService"
          @close="closeDialog"
          :key="dialogKey"
        />
      </v-dialog>

      <v-dialog v-model="deleteDialog" max-width="300px">
        <div class="text-center">
          <v-sheet
            class="px-7 pt-7 pb-4 mx-auto text-center d-inline-block"
            color="blue-grey darken-3"
            dark
          >
            <div class="grey--text text--lighten-1 text-body-2 mb-4">
              Tem certeza de que deseja excluir este serviço?
            </div>

            <v-btn
              :disabled="loading"
              class="ma-1"
              color="grey"
              text
              @click="deleteDialog = false"
            >
              Cancelar
            </v-btn>

            <v-btn
              :loading="loading"
              class="ma-1"
              color="error"
              text
              @click="remove"
            >
              Excluir
            </v-btn>
          </v-sheet>
        </div>
      </v-dialog>

      <v-data-table
        :loading="loading"
        loading-text="Carregando..."
        no-data-text="Nenhum serviço encontrado"
        :headers="headers"
        :items="services"
        class="elevation-0 mt-3 pa-4"
        hide-default-header
        hide-default-footer
        :items-per-page="pageSize"
        :header-props="headerProps"
      >
        <template v-slot:header="{ props: { headers } }">
          <thead class="table-header py-4">
            <tr>
              <th
                class="text-center table-header-item"
                v-for="header in headers"
                :key="header.value"
              >
                {{ header.text }}
              </th>
            </tr>
          </thead>
        </template>

        <template v-slot:item.actions="{ item }">
          <v-btn
            outlined
            style="border-radius: 6px"
            height="40px"
            class="ma-1 table-button hidden-sm-and-down"
            color="secondary"
            dark
            small
            @click="openAbout(item)"
          >
            <span>Detalhar</span>
          </v-btn>

          <v-btn
            outlined
            fab
            tile
            small
            style="border-radius: 6px"
            height="40px"
            class="ma-1 table-button hidden-md-and-up"
            color="secondary"
            dark
            @click="openAbout(item)"
          >
            <v-icon>mdi-information-outline</v-icon>
          </v-btn>

          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-hover v-slot="{ hover }">
                <v-btn
                  outlined
                  fab
                  tile
                  style="border-radius: 6px"
                  small
                  class="ma-1 edit-button"
                  color="quaternary"
                  @click="editService(item)"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-img
                    v-if="hover"
                    contain
                    max-height="20"
                    src="../../../../../assets/icons/pen_outline.svg"
                  >
                  </v-img
                  ><v-img
                    v-else
                    contain
                    max-height="20"
                    src="../../../../../assets/icons/pen_outline.svg"
                  >
                  </v-img>
                </v-btn>
              </v-hover>
            </template>
            <span>Editar</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-hover v-slot="{ hover }">
                <v-btn
                  outlined
                  fab
                  tile
                  style="border-radius: 6px"
                  small
                  class="ma-1 delete-button"
                  color="quaternary"
                  @click="deleteService(item)"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-img
                    v-if="hover"
                    contain
                    max-height="20"
                    src="../../../../../assets/icons/Remove.svg"
                  >
                  </v-img
                  ><v-img
                    v-else
                    contain
                    max-height="20"
                    src="../../../../../assets/icons/Remove.svg"
                  >
                  </v-img>
                </v-btn>
              </v-hover>
            </template>
            <span>Excluir</span>
          </v-tooltip>
        </template>
      </v-data-table>

      <div class="my-5 text-center d-flex align center justify-center">
        <v-pagination
          v-model="page"
          :length="totalPages"
          :total-visible="7"
          circle
        ></v-pagination>

        <v-menu bottom offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              style="position: absolute; max-width: 50px; left: 1.8rem"
              v-bind="attrs"
              v-on="on"
            >
              qtd: {{ pageSize }}
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(size, i) in sizes"
              :key="i"
              @click="pageSize = size"
            >
              <v-list-item-title>{{ size }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-container>
  </v-container>
</template>

<style scoped>
.field-label {
  font-weight: 300;
  font-size: 15px;
  line-height: 18px;
  letter-spacing: 0.15px;
  color: #979797;
}

.item {
  background: #2bad70 !important;
}

.item span {
  font-size: 0.9rem;
  color: #fff;
}

.back {
  background: #e9e9e9 !important;
}

.delete-button {
  border: 2px solid #eb5454;
  box-sizing: border-box;
  border-radius: 4px;
  font-weight: bold;
  transition: 300ms;
}

.delete-button:hover {
  background: #f9a2a2;
  color: white !important;
}

.delete-button:focus {
  background: #eb5454;
  color: white !important;
  border: none !important;
}

.edit-button {
  border: 2px solid #d3d3d3;
  font-weight: bold;
  transition: 300ms;
}

.edit-button:hover {
  background: grey;
  color: white !important;
  border: none !important;
}

.edit-button:focus {
  background: #444854;
  color: white !important;
  border: none !important;
}

.table-button {
  border: 2px solid #2d3038;
  font-weight: bold;
  transition: 300ms;
}

.table-button:hover {
  background: #2d3038;
  color: white !important;
}

.table-button:focus {
  background: #444854;
  color: white !important;
}

.table-header {
  padding: 1rem;
  background: #f5f5f5;
}

.table-header-item {
  font-weight: bold;
  font-size: 1rem;
  line-height: 23px;
  letter-spacing: 0.15px;

  color: #808080;
}

.table-header tr th {
  font-style: normal;
  font-weight: bold;
  line-height: 23px;
  border: none !important;
  letter-spacing: 0.15px;
}

.table-header tr th:first-child {
  border-radius: 0 4px 4px 0;
}

.table-header tr th:last-child {
  border-radius: 0 4px 4px 0;
}

@media (max-width: 330px) {
  .v-menu__content {
    left: 15px !important;
    max-width: unset;
  }
}

@media (max-width: 860px) {
  .table-header {
    display: none;
  }
}
</style>

<script src="./index.js"></script>
