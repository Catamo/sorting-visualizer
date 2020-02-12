<template>
  <v-alert color="#6b77cc" tile v-if="show">
    <v-row justify="center" no-gutters>
      <v-col class="shrink">
        <v-btn color="white" outlined>
          Generate and Sort
        </v-btn>
      </v-col>
    </v-row>
  </v-alert>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      show: state => state.showHeader
    })
  },
    
}
</script>
