import { GenerateRandomDataSet } from "../utils";
import { BubbleSort } from "../algorithms";

const store = {
  state: {
    data: [],
    dataSize: 4,
    activeIndexes: [],
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
    setActiveIndexes(state, indexes) {
      state.activeIndexes = indexes;
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
    }
  },
  actions: {
    async bubbleSort({ commit, state }) {
      const updateState = currentDataSet => {
        const copy = currentDataSet.slice();
        commit("setData", copy);
      };
      const setActiveIndexes = activeIndexes => {
        // const copy = currentDataSet.slice();
        commit("setActiveIndexes", activeIndexes);
      };
      const setSwaping = swaping => {
        commit("setSwaping", swaping);
      };

      commit("setShowHeader", false);
      await BubbleSort(state.data, updateState, setActiveIndexes, setSwaping);
      commit("setShowHeader", true);
    }
  }
};

export default store;
