<template>
  <div :class="'fill-height'">
    <bar-chart-visualization />
  </div>
</template>

<script>
import BarChartVisualization from "../components/visualization/BarChartVisualization";
import { mapMutations } from "vuex";
import { AlgorithmsRoutesDictionary } from "../constants/algorithms-routes";

export default {
  props: {
    algorithm: String
  },
  components: {
    BarChartVisualization
  },
  methods: {
    ...mapMutations(["setSelectedSortingAlgorithm"])
  },
  created() {
    if (this.algorithm) {
      this.setSelectedSortingAlgorithm(
        AlgorithmsRoutesDictionary[this.algorithm]
      );
      this.$router.push("/");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
