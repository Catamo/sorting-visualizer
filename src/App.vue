<template>
  <v-app id="inspire">
    <v-content>
      <v-container>
        <v-row align="center" justify="center" :class="'fill-height'">
          <v-col cols="12" :class="'fill-height'">
            <v-card class="elevation-6 d-flex flex-column" :class="'fill-height'">
              <sidebar></sidebar>
              <toolbar></toolbar>
              <app-header></app-header>
              <v-card-text :class="'fill-height'">
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
    overflow: -moz-hidden-unscrollable;
  }
}

.container {
  height: 100%;
  width: 100% !important;
}

.container,
.container .row > [class^="col"] {
  @media screen and (max-width: $break-mobile) {
    padding: 0 6px 0 6px;
  }
}

.v-application div code {
    padding-top: 1px;
    background-color: transparent;
    color: inherit;
    -webkit-box-shadow: none; 
    box-shadow: none;
}
</style>
