<template>
  <div>
    <v-alert color="#6b77cc" tile v-if="!isSorting">
      <v-row justify="center" no-gutters>
        <v-col class="shrink mt-2">
          <v-btn color="white" outlined @click="generateAndSortHandler">
            Randomize and apply {{ selectedSortingAlgorithm }}
          </v-btn>
        </v-col>
      </v-row>
    </v-alert>
    <v-alert color="#6b77cc" tile v-if="isSorting" outlined="">
      <v-row justify="center" no-gutters>
        <v-col cols="1" class="text-center">
          <v-btn text icon color="#6b77cc" @click="decreaseSpeedHandler">
            <v-icon>mdi-rewind</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="10" class="text-center">
          Now running: {{ selectedSortingAlgorithm }} <br />
          Sorting Visualization Speed: {{ sortingSpeed }}
        </v-col>
        <v-col cols="1" class="text-center">
          <v-btn text icon color="#6b77cc" @click="increaseSpeedHandler">
            <v-icon>mdi-fast-forward</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-alert>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  computed: {
    ...mapState({
      isSorting: state => state.isSorting,
      selectedSortingAlgorithm: state => state.selectedSortingAlgorithm,
      sortingSpeed: state => state.sortingSpeed
    })
  },
  methods: {
    ...mapMutations(["generateRandomData", "setSortingSpeed"]),
    ...mapActions(["sort"]),
    generateAndSortHandler() {
      this.generateRandomData();
      this.sort();
    },
    increaseSpeedHandler() {
      if (this.sortingSpeed + 5 >= 20) {
        this.setSortingSpeed(20);
        return
      }
      this.setSortingSpeed(this.sortingSpeed + 5);
    },
    decreaseSpeedHandler() {
      if (this.sortingSpeed - 5 <= 5) {
        this.setSortingSpeed(5);
        return
      }
      this.setSortingSpeed(this.sortingSpeed - 5);
    }
  }
};
</script>

<style lang="css">
.v-alert {
  min-height: 82px;
}
</style>
