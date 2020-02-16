<template>
  <v-navigation-drawer
    class="app-drawer"
    :class="{ transparent: sizeIsChanging }"
    v-model="show"
    v-if="show"
    :width="window.width >= 1100 ? '30vw' : '100vw'"
    floating=""
    absolute=""
    temporary
  >
    <v-list-item>
      <v-list-item-icon
        @click="hideDrawer"
        :class="{ 'opacity-0': sizeIsChanging }"
      >
        <v-icon>mdi-arrow-left</v-icon>
      </v-list-item-icon>
    </v-list-item>

    <div class="px-4">
      <v-row class="ma-0" :class="{ 'opacity-0': sizeIsChanging }">
        <v-col class="d-flex justify-center" cols="12">
          <h3>Configuration</h3>
        </v-col>
      </v-row>
      <v-row class="ma-0" :class="{ 'opacity-0': sizeIsChanging }">
        <v-col class="d-flex" cols="12">
          <v-select
            :disabled="isSorting"
            :items="items"
            v-model="selectedSortingAlgorithm"
            label="Sorting Algorithm"
            outlined
          ></v-select>
        </v-col>
      </v-row>
      <v-row class="ma-0 slider-container">
        <v-col cols="12">
          <v-subheader class="pl-0">Dataset Size</v-subheader>
          <v-slider
            :disabled="isSorting"
            v-model="datasetSize"
            thumb-label
            track-color="#6b77cc80"
            color="#6b77cc"
            min="2"
            max="50"
            @start="sliderStartHandler"
            @end="sliderEndHandler"
            @change="sliderChangeHandler"
          ></v-slider>
        </v-col>
      </v-row>
      <v-row class="ma-0 slider-container">
        <v-col cols="12">
          <v-subheader class="pl-0">Sorting Speed</v-subheader>
          <v-slider
            v-model="sortingSpeed"
            thumb-label
            track-color="#6b77cc80"
            color="#6b77cc"
            min="5"
            max="20"
            @start="sliderStartHandler"
            @end="sliderEndHandler"
            @change="sliderChangeHandler"
          ></v-slider>
        </v-col>
      </v-row>
      <v-row class="ma-0" :class="{ 'opacity-0': sizeIsChanging }">
        <v-col class="d-flex justify-center" cols="12">
          <v-btn
            :disabled="isSorting"
            :class="'white--text'"
            color="#6b77cc"
            @click="sortButtonClickHandler"
            >Apply {{ selectedSortingAlgorithm }}</v-btn
          >
        </v-col>
        <v-col class="d-flex justify-center" cols="12">
          <v-btn
            class="mr-4"
            :disabled="isSorting"
            color="#6b77cc"
            outlined=""
            @click="randomizeDataHandler"
            >Randomize and {{ selectedSortingAlgorithm }}</v-btn
          >
        </v-col>
      </v-row>
    </div>
  </v-navigation-drawer>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
import * as algoNames from "../../constants/algorithms-names";

export default {
  computed: {
    //Based on https://ypereirareis.github.io/blog/2017/04/25/vuejs-two-way-data-binding-state-management-vuex-strict-mode/
    show: {
      get() {
        return this.$store.state.showDrawer;
      },
      set(value) {
        this.$store.commit("setShowDrawer", value);
      }
    },
    datasetSize: {
      get() {
        return this.$store.state.dataSize;
      },
      set(value) {
        this.$store.commit("setDataSize", value);
      }
    },
    sortingSpeed: {
      get() {
        return this.$store.state.sortingSpeed;
      },
      set(value) {
        this.$store.commit("setSortingSpeed", value);
      }
    },
    selectedSortingAlgorithm: {
      get() {
        return this.$store.state.selectedSortingAlgorithm;
      },
      set(value) {
        this.$store.commit("setSelectedSortingAlgorithm", value);
      }
    },
    items() {
      return Object.keys(algoNames).map(key => {
        return {
          text: algoNames[key],
          value: algoNames[key]
        };
      });
    },
    ...mapState(["isSorting"])
  },
  methods: {
    ...mapMutations(["generateRandomData"]),
    ...mapActions(["sort"]),
    hideDrawer() {
      this.show = false;
    },
    sliderStartHandler() {
      this.sizeIsChanging = true;
    },
    sliderEndHandler() {
      this.sizeIsChanging = false;
    },
    sliderChangeHandler(val) {
      this.sizeVal = val;
    },
    sortButtonClickHandler() {
      this.hideDrawer();
      this.sort();
    },
    randomizeDataHandler() {
      this.hideDrawer();
      this.generateRandomData();
      this.sort();
    },
    handleResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;
    }
  },
  created() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  data() {
    return {
      sizeIsChanging: false,
      sizeVal: 0,
      window: {
        width: 0,
        height: 0
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.opacity-0 {
  opacity: 0;
}

.slider-container {
  background: #ffffffd1;
  border-radius: 4px;
}

.app-drawer {
  transition: background 200ms;
}
</style>
