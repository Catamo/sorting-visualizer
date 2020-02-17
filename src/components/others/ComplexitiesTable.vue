<template>
  <div>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left" width="15%">Algorithm</th>
            <th class="text-left" colspan="3">Time Complexity</th>
            <th class="text-left" width="15%">Space Complexity</th>
          </tr>
          <tr>
            <th class="text-left white--text" width="15%">Algorithm</th>
            <th class="text-left">Best</th>
            <th class="text-left">Average</th>
            <th class="text-left">Worst</th>
            <th class="text-left" width="15%">Worst</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(alg, index) in algorithms"
            :key="index"
            :class="{ selected: alg.name == selectedAlgorithm }"
          >
            <td class="text-left" width="15%">{{ alg.name }}</td>
            <td class="text-left"><code v-html="alg.time.best"></code></td>
            <td class="text-left"><code v-html="alg.time.average"></code></td>
            <td class="text-left"><code v-html="alg.time.worst"></code></td>
            <td class="text-left" width="15%">
              <code v-html="alg.space.worst"></code>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
import { AlgorithmsDetailsDictionary } from "../../constants/algorithms-details";
import { mapState } from "vuex";

export default {
  computed: {
    algorithms() {
      return Object.keys(AlgorithmsDetailsDictionary).map(k => {
        return { name: k, ...AlgorithmsDetailsDictionary[k] };
      });
    },
    ...mapState({
        selectedAlgorithm: state => state.selectedSortingAlgorithm
    })
  }
};
</script>

<style lang="scss">
.v-data-table tbody {
  tr.selected {
    background: #6b77cc80;

    &:hover {
        background: #6b77cc80 !important;
    }
  }
  code {
    min-width: 84px;
  }
}
</style>
