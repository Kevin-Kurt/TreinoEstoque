<template>
  <v-menu bottom min-width="150px" rounded offset-y>
    <template v-slot:activator="{ on }">
      <v-btn
        icon
        plain
        text
        class="mx-1 hidden-sm-and-down"
        style="font-size: 0.8rem"
        width="10px"
        @click="logout"
      >
        <img src="../../../assets/icons/Logout.svg" />
      </v-btn>

      <v-btn icon x-large v-on="on" class="mr-6 hidden-sm-and-down">
        <v-avatar>
          <img
            v-if="user.image != null"
            :src="image"
            :alt="user.name"
            style="object-fit: cover"
          />

          <img
            v-if="user.image == null"
            src="../../../assets/icons/UserGrey.svg"
          />
        </v-avatar>
      </v-btn>

      <v-btn icon x-large v-on="on" class="hidden-md-and-up" color="terciary">
        <v-avatar>
          <img
            v-if="user.image != null"
            :src="image"
            :alt="user.name"
            style="object-fit: cover"
          />

          <img
            v-if="user.image == null"
            src="../../../assets/icons/UserWhite.svg"
          />
        </v-avatar>
      </v-btn>
    </template>

    <v-card>
      <v-list-item-content class="justify-center align-center">
        <div class="mx-auto text-center">
          <v-avatar class="mt-2">
            <img
              :key="change"
              v-if="user.image != null"
              :src="image"
              :alt="user.name"
              style="object-fit: cover"
            />

            <v-icon v-if="user.image == null" size="45">
              mdi-account-circle
            </v-icon>
          </v-avatar>

          <h3 class="mt-3">{{ user.name }}</h3>
          <p class="caption mt-1">
            {{ user.email }}
          </p>

          <v-divider class="mx-2"></v-divider>

          <div class="d-flex flex-column">
            <v-btn rounded text @click="goToProfile"> Perfil </v-btn>
          </div>
        </div>
      </v-list-item-content>
    </v-card>
  </v-menu>
</template>

<script src="./index.js"></script>
