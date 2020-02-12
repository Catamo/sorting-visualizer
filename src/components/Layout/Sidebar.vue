<template>
  <v-navigation-drawer
    class="app-drawer"
    :class="{ transparent: sizeIsChanging }"
    v-model="show"
    width="100vw"
    absolute
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

    <v-container>
      <v-row class="ma-0" :class="{ 'opacity-0': sizeIsChanging }">
        <v-col class="d-flex justify-center" cols="12">
          <h3>Configuration</h3>
        </v-col>
      </v-row>
      <v-row class="ma-0" :class="{ 'opacity-0': sizeIsChanging }">
        <v-col class="d-flex" cols="12">
          <v-select
            :items="items"
            label="Sorting Algorithm"
            outlined
          ></v-select>
        </v-col>
      </v-row>
      <v-row class="ma-0 slider-container">
        <v-col cols="12">
          <v-subheader class="pl-0">Dataset Size</v-subheader>
          <v-slider
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
      <v-row class="ma-0" :class="{ 'opacity-0': sizeIsChanging }">
        <v-col class="d-flex justify-center" cols="12">
          <v-btn outlined color="#6b77cc" @click="sortButtonClickHandler">Sort</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-navigation-drawer>
</template>

<script>
import { mapActions } from "vuex";

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
    }
  },
  methods: {
    ...mapActions(["bubbleSort"]),
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
      this.bubbleSort();
    }
  },
  data() {
    return {
      items: [
        { text: "Merge Sort", value: "merge" },
        { text: "Quick Sort", value: "quick" },
        { text: "Heap Sort", value: "heap" },
        { text: "Bubble Sort", value: "bubble" }
      ],
      sizeIsChanging: false,
      sizeVal: 0
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
