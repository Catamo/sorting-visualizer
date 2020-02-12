<template>
  <v-app-bar light :elevation="0">
    <v-app-bar-nav-icon @click="showDrawer"></v-app-bar-nav-icon>
    <v-toolbar-title>Sorting Visualizer</v-toolbar-title>
    <v-spacer></v-spacer>

    <v-menu left bottom>
      <template v-slot:activator="{ n }">
        <v-btn icon v-on="n">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item v-for="n in 5" :key="n" @click="() => {}">
          <v-list-item-title>Option {{ n }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
export default {
  methods: {
    showDrawer() {
      this.$store.commit("setShowDrawer", true);
    }
  }
};
</script>
