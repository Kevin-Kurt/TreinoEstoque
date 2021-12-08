<template>
  <v-container>
    <v-row justify="center">
      <v-slide-y-transition appear>
        <v-card class="mt-8 px-6 pt-6" width="450">
          <v-card-text class="text-center">
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-row class="flex-column" align="start">
                <v-col class="d-flex flex-column align-start py-0">
                  <span>Digite seu nome de usuário </span>
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="user.name"
                    :rules="[(v) => !!v || 'Nome de usuario requerido']"
                    color="secondary"
                    required
                    outlined
                  />
                </v-col>
              </v-row>

              <v-row class="flex-column" align="start">
                <v-col class="d-flex flex-column align-start py-0">
                  <span>Digite seu Email de usuário </span>
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="user.email"
                    :rules="[(v) => !!v || 'Nome seu email requerido']"                 
                    color="secondary"
                    required
                    outlined
                  />
                </v-col>
              </v-row>
            
            <v-row class="flex-column" align="start">
              <v-col class="d-flex flex-column align-start py-0 ml-1">
                <span>Senha</span>
              </v-col>
              <v-col>
                <v-text-field
                  v-model="user.password"
                  @keydown.space.prevent
                  color="secondary"
                  :rules="[
                    (v) =>
                      v.length > 5 || 'A senha deve ter no mínimo 6 caracteres',
                  ]"
                  type="password"
                  outlined
                />
              </v-col>
            </v-row>

            <v-row class="flex-column" align="start">
              <v-col class="d-flex flex-column align-start py-0 ml-1">
                <span>Confirme a Senha</span>
              </v-col>
              <v-col>
                <v-text-field
                  v-model="confirmPassword"
                  @keydown.space.prevent
                  color="secondary"
                  :rules="[(v) => v == user.password || 'As senhas não batem']"
                  type="password"
                  outlined
                />
              </v-col>
            </v-row>        
          </v-form>

            <v-btn
              elevation="0"
              block
              class="button mb-8"
              :loading="loading"
              :disabled="!valid"
              large
              color="primary"
              @click="CreateUser"
            >           
              <p style="color: white; margin-bottom: 0px">Cadastrar</p>
            </v-btn>

            <a @click="$router.push({ name: 'Login' })">
              <p>Logar</p>
            </a>
            

           
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
