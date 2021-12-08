<template>
  <v-container>
    <v-row justify="center">
      <v-slide-y-transition appear>
        <v-card class="mt-8 px-6 pt-6" width="450">
          <v-card-text class="text-center">
           
         <v-form ref="Form" >
              <v-row class="flex-column" align="start">
                <v-col class="d-flex flex-column align-start py-0">
                  <span>Nome do produto</span>
                </v-col>
                <v-col>
                  <v-text-field   
                   v-model="product.name"      
                    :rules="[(v) => !!v || 'Nome do produto requerido']"               
                    color="secondary"
                    required
                    outlined
                    ref="name"
                  />
                </v-col>
              </v-row>

              <v-row class="flex-column" align="start">
                <v-col class="d-flex flex-column align-start py-0">
                  <span>Preço</span>
                </v-col>
                <v-col>
                  <v-text-field    
                    v-model="product.price"      
                    :rules="[(v) => !!v || 'Preço do produto requerido']"    
                    color="secondary"
                    required
                    outlined
                    ref="price"
                  />
                </v-col>
              </v-row>

              <v-row class="flex-column" align="start">
                <v-col class="d-flex flex-column align-start py-0">
                  <span>Código</span>
                </v-col>
                <v-col>
                  <v-text-field       
                    v-model="product.code"   
                    :rules="[(v) => !!v || 'Código produto requerido']"    
                    color="secondary"
                    required
                    outlined
                    ref="code"
                  />
                </v-col>
              </v-row>

              
            <v-btn
              elevation="0"
              class="button mb-8 mr-8"
              :loading="loading"
              large
              color="primary"
              @click="CreateProduct"
            >           
              <p style="color: white; margin-bottom: 0px">Cadastrar</p>
            </v-btn>

            <v-btn
              elevation="0"          
              class="button mb-8"
              :loading="loading"
              large
              color="primary"
              @click="$router.push({ name: 'Inventory' })"
            >           
              <p style="color: white; margin-bottom: 0px">Tabela</p>
            </v-btn>
          
         </v-form>
           
          </v-card-text>
        </v-card>
      </v-slide-y-transition>
    </v-row>
  </v-container>
</template>

<style scoped>
a {
  margin-bottom: 10px;

  text-decoration: none;
  font-size: 0.9rem;
  color: #999;

  transition: 300ms;
}

a:hover {
  font-size: 1rem;
}

.button:hover {
  background: rgba(141, 198, 63, 0.75);
  opacity: 0.7;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
}

.button:focus {
  background: #8dc63f;
  box-shadow: 0px 4px 50px rgba(141, 198, 63, 0.5);
  border-radius: 6px;
}

.button:active {
  background: #6d9931;
  box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.25);
  border-radius: 6px;
}

</style>

<script src="./index.js"></script>
