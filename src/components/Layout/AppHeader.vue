<template>
  <v-alert color="#6b77cc" tile v-if="show">
    <v-row justify="center" no-gutters>
      <v-col class="shrink">
        <v-btn color="white" outlined @click="generateAndSortHandler">
          Randomize and apply {{ selectedSortingAlgorithm }}
        </v-btn>
      </v-col>
    </v-row>
  </v-alert>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  computed: {
    ...mapState({
      show: state => state.showHeader,
      selectedSortingAlgorithm: state => state.selectedSortingAlgorithm
    })
  },
  methods: {
    ...mapMutations([
      'generateRandomData'
    ]),
    ...mapActions([
      'sort'
    ]),
    generateAndSortHandler() {
      this.generateRandomData();
      this.sort();
    }
  }
    
}
</script>
