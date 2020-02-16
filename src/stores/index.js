import { GenerateRandomDataSet } from "../utils";
import * as algorithms from "../algorithms";
import * as algorithmsNames from "../constants/algorithms-names"

const store = {
  state: {
    data: GenerateRandomDataSet(15),
    dataSize: 15,
    indexesStates: [],
    selectedSortingAlgorithm: algorithmsNames.BUBBLE_SORT,
    sortingSpeed: 10,
    isSorting: false,
    showDrawer: false,
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
    setSortingSpeed(state, speed) {
      state.sortingSpeed = speed;
    },
    setIsSorting(state, sorting) {
      state.isSorting = sorting;
    },
    setShowDrawer(state, show) {
      state.showDrawer = show;
    },
    setShowSnackbar(state, show) {
      state.showSnackbar = show;
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
      const getSortingSpeed = () => {
        return state.sortingSpeed;
      };

      commit("setIsSorting", true);

      switch (state.selectedSortingAlgorithm) {
        case algorithmsNames.BUBBLE_SORT:
          await algorithms.BubbleSort(state.data, updateState, setIndexesStates, getSortingSpeed);
          break;

        case algorithmsNames.INSERTION_SORT:
          await algorithms.InsertionSort(state.data, updateState, setIndexesStates, getSortingSpeed);
          break;

        case algorithmsNames.SELECTION_SORT:
          await algorithms.SelectionSort(state.data, updateState, setIndexesStates, getSortingSpeed);
          break;

        case algorithmsNames.MERGE_SORT_RECURSIVE:
          await algorithms.MergeSort(state.data, updateState, setIndexesStates, getSortingSpeed);
          break;
      }
      
      commit("setIsSorting", false);
    }
  }
};

export default store;
