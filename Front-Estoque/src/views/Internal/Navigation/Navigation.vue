<template>
  <div>
    <v-app-bar v-if="!isMobile" app flat color="terciary" absolute height="82">
      <v-spacer />

      <Avatar :user="user" />
    </v-app-bar>

    <v-navigation-drawer
      v-if="!isMobile"
      color="secondary"
      height="100%"
      app
      permanent
      :mini-variant.sync="mini"
      mini-variant-width="120"
    >
      <v-list>
        <v-list-item link>
          <v-list-item-content class="d-flex align-center justify-center">
           

            <v-btn
              color="terciary"
              absolute
              right
              small
              fab
              :style="{
                top: '6rem',
                transform: 'translate(85%, -50%)',
                zIndex: '10',
              }"
              @click.stop="mini = !mini"
            >
              <v-icon color="secondary" size="30">{{
                mini ? "mdi-chevron-right" : "mdi-chevron-left"
              }}</v-icon>
            </v-btn>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <div id="items">
        <v-list>
          <v-list-item-group
            v-model="group"
            active-class="info--text text--accent-4"
          >
            <v-list-item
              v-for="header in headers"
              :key="header.url"
              :to="header.url"
              v-show="hasAccess(header.access)"
            >
              <v-list-item-icon>
                <v-icon color="white">{{ header.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title class="white--text">
                {{ header.title }}
              </v-list-item-title>
            </v-list-item>

            <v-list-item to="/settings">
              <v-list-item-icon>
                <v-icon dark>mdi-cog</v-icon>
              </v-list-item-icon>
              <v-list-item-title class="white--text">
                Configurações
              </v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </div>
    </v-navigation-drawer>

    <v-app-bar v-if="isMobile" app flat color="secondary">
      <v-app-bar-nav-icon
        color="white"
        @click="drawer = true"
      ></v-app-bar-nav-icon>

      <v-spacer />

      

      <v-spacer />

      <Avatar :user="user" />
    </v-app-bar>

    <v-navigation-drawer
      v-if="isMobile && drawer"
      v-model="drawer"
      color="secondary"
      style="position: fixed; top: 0; left: 0; overflow-y: scroll !important"
      app
      temporary
    >
      <v-list>
        <v-list-item link>
          <v-list-item-content class="d-flex align-center justify-center">
            <v-img
              max-width="90"
              src="../../../assets/WhiteLev.svg"
              contain
              alt="Lev"
              class="mb-4"
            ></v-img>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="info--text text--accent-4"
        >
          <v-list-item
            v-for="header in headers"
            :key="header.url"
            :to="header.url"
            v-show="hasAccess(header.access)"
          >
            <v-list-item-icon>
              <v-icon color="white">{{ header.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="white--text">
              {{ header.title }}
            </v-list-item-title>
          </v-list-item>

          <v-list-item to="/settings">
            <v-list-item-icon>
              <v-icon dark>mdi-cog</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="white--text">
              Configurações
            </v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<style>
.v-navigation-drawer--mini-variant,
.v-navigation-drawer {
  overflow: visible !important;
}

.v-navigation-drawer__content {
  overflow: visible !important;
}

.v-navigation-drawer__border {
  overflow: scroll !important;
}

#items {
  height: 100%;
  overflow-y: scroll !important;
  overflow-x: hidden !important;
}

#items::-webkit-scrollbar {
  z-index: 1;
  background-color: #2d3038;
  height: 7px;
  width: 7px;
}

#items::-webkit-scrollbar-thumb {
  z-index: 1;
  background-color: rgba(114, 119, 131, 0.5);
  border-radius: 20px;
}

@media (max-height: 850px) {
  #items {
    height: 700px;
  }
}

@media (max-height: 750px) {
  #items {
    height: 650px;
  }
}

@media (max-height: 700px) {
  #items {
    height: 600px;
  }
}
</style>

<script src="./index.js"></script>
