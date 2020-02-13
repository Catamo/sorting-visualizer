<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="12" md="9">
            <v-card class="elevation-12">
              <sidebar></sidebar>
              <toolbar></toolbar>
              <app-header></app-header>
              <v-card-text>
                <router-view></router-view>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Toolbar from "./components/Layout/Toolbar";
import Sidebar from "./components/Layout/Sidebar";
import AppHeader from "./components/Layout/AppHeader";

export default {
  components: {
    Toolbar,
    Sidebar,
    AppHeader
  }
};
</script>

<style lang="scss">
$break-mobile: 768px;

@media screen and (max-width: $break-mobile) {
  html,
  body {
    overflow: hidden;
  }
}

.container,
.container .row > [class^="col-"] {
  @media screen and (max-width: $break-mobile) {
    padding: 0 6px 0 6px;
  }
}
</style>
