<template>
  <ul :class="alertVisible && 'alert-visible'">
    <li v-for="(dataPoint, index) in data" :key="dataPoint">
      <div class="bar">
        <div
          class="value"
          :class="getStateClass(index)"
          :style="`height: ${calcHeight(dataPoint)}%;`"
        ></div>
      </div>
    </li>
  </ul>
</template>

<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";
import { SELECTED, TRAVERSING, SWAPING } from "../../constants/index-states";

export default {
  computed: {
    ...mapState({
      data: state => state.data,
      indexesStates: state => state.indexesStates,
      swaping: state => state.swaping,
      alertVisible: state => state.show
    }),
    ...mapGetters(["dataMaxValue"])
  },
  methods: {
    calcHeight(point) {
      return (point / this.dataMaxValue) * 100;
    },
    getStateClass(index) {
      if (this.indexesStates[index] == SELECTED) {
        return "active";
      }
      if (this.indexesStates[index] == TRAVERSING) {
        return "traversing";
      }
      if (this.indexesStates[index] == SWAPING) {
        return "swaping";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
/*Inspired by https://codepen.io/maggiben/pen/VYZyxo*/
$break-mobile: 425px;

ul {
  display: flex;
  justify-content: center;
  width: 100%;
  height: calc(90vh - 145px);

  @media screen and (max-width: $break-mobile) {
    height: calc(100vh - 185px);
  }

  &.alert-visible {
    height: calc(100vh - 228px);

    @media screen and (max-width: $break-mobile) {
      height: calc(100vh - 185px);
    }
  }

  li {
    width: 5%;
    max-width: 20px;
    float: left;
    margin-left: 0.5%;
    margin-right: 0.5%;
    height: 100%;

    .bar {
      position: relative;
      overflow: hidden;
      height: 100%;

      .value {
        position: absolute;
        bottom: 0;
        width: 100%;
        background: #6b77cc;
        color: #ffffff;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        opacity: 0.5;

        &.active {
          background: #92cc6b;
        }

        &.swaping {
          background: #cc6b6b;
        }

        &.traversing {
          background: #ad6bcc;
        }
      }
    }
  }
}
</style>
