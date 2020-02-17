<template>
  <v-app-bar light :elevation="0">
    <v-app-bar-nav-icon @click="showDrawer"></v-app-bar-nav-icon>
    <v-toolbar-title>Sorting Visualizer</v-toolbar-title>
    <v-spacer></v-spacer>

    <v-bottom-sheet v-model="showBottomSheet" attach=".container .v-card" inset>
      <template v-slot:activator="{ on }">
        <v-btn text icon v-on="on">
          <v-icon>mdi-information-outline</v-icon>
        </v-btn>
      </template>
      <v-sheet class="text-center" height="65vh">
        <v-btn
          text
          icon
          @click="showBottomSheet = !showBottomSheet"
          class="mt-2"
        >
          <v-icon>mdi-chevron-down</v-icon>
        </v-btn>
        <div class="py-2">
          <complexities-table />
        </div>
      </v-sheet>
    </v-bottom-sheet>

    <span v-html="complexityText" class="d-none d-sm-flex"></span>
  </v-app-bar>
</template>

<script>
import { mapState } from "vuex";
import { ComplexityDictionary } from "../../constants/algorithms-complexities";
import ComplexitiesTable from "../others/ComplexitiesTable";

export default {
  components: {
    ComplexitiesTable
  },
  computed: {
    ...mapState(["selectedSortingAlgorithm"]),
    complexityText() {
      return `<b>${this.selectedSortingAlgorithm}</b>&nbsp;- <code>${
        ComplexityDictionary[this.selectedSortingAlgorithm]
      }</code>`;
    }
  },
  methods: {
    showDrawer() {
      this.$store.commit("setShowDrawer", true);
    }
  },
  data() {
    return {
      showBottomSheet: false
    };
  }
};
</script>
