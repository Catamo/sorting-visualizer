import { GenerateRandomDataSet } from "../utils";
import * as algorithms from "../algorithms";
import * as algorithmsNames from "../constants/algorithm-names"

const store = {
  state: {
    data: [],
    dataSize: 15,
    indexesStates: [],
    selectedSortingAlgorithm: algorithmsNames.BUBBLE_SORT,
    swaping: false,
    showDrawer: false,
    showHeader: true
  },
  getters: {
    dataMaxValue: state => {
      return Math.max(...state.data);
    }
  },
  mutations: {
    setData(state, data) {
      state.data = data;
    },
    setIndexesStates(state, indexesStates) {
      state.indexesStates = indexesStates;
    },
    setSelectedSortingAlgorithm(state, sortingAlgo) {
      state.selectedSortingAlgorithm = sortingAlgo;
    },
    setSwaping(state, swaping) {
      state.swaping = swaping;
    },
    setShowDrawer(state, show) {
      state.showDrawer = show;
    },
    setShowHeader(state, show) {
      state.showHeader = show;
    },
    setDataSize(state, size) {
      state.dataSize = size;
      state.data = GenerateRandomDataSet(size);
    },
    generateRandomData(state) {      
      state.data = GenerateRandomDataSet(state.dataSize);
    }
  },
  actions: {
    async sort({ commit, state }) {
      const updateState = currentDataSet => {
        const copy = currentDataSet.slice();
        commit("setData", copy);
      };
      const setIndexesStates = indexesStates => {
        commit("setIndexesStates", indexesStates);
      };

      commit("setShowHeader", false);

      switch (state.selectedSortingAlgorithm) {
        case algorithmsNames.BUBBLE_SORT:
          await algorithms.BubbleSort(state.data, updateState, setIndexesStates);
          break;

        case algorithmsNames.INSERTION_SORT:
          await algorithms.InsertionSort(state.data, updateState, setIndexesStates);
          break;

        case algorithmsNames.SELECTION_SORT:
          await algorithms.SelectionSort(state.data, updateState, setIndexesStates);
          break;
      }
      
      commit("setShowHeader", true);
    }
  }
};

export default store;
