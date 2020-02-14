<template>
  <v-app-bar light :elevation="0">
    <v-app-bar-nav-icon @click="showDrawer"></v-app-bar-nav-icon>
    <v-toolbar-title>Sorting Visualizer</v-toolbar-title>
    <v-spacer></v-spacer>

    <span v-html="complexityText" class="d-none d-sm-flex"></span>
  </v-app-bar>
</template>

<script>
import { mapState } from "vuex";
import { ComplexityDictionary } from "../../constants/algorithms-complexities";

export default {
  computed: {
    ...mapState(["selectedSortingAlgorithm"]),
    complexityText() {
      return `<b>${this.selectedSortingAlgorithm}:</b> ${
        ComplexityDictionary[this.selectedSortingAlgorithm]
      }`;
    }
  },
  methods: {
    showDrawer() {
      this.$store.commit("setShowDrawer", true);
    }
  }
};
</script>

<style lang="css">
sup {
  top: 0.5em !important;
}
</style>
