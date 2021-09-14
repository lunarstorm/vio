<template>
  <text-numeric :value="value" format="0,0.00">
    <template v-if="symbol">{{ symbol }}</template>
  </text-numeric>
</template>

<script>
import TextNumeric from "vio/components/text/TextNumeric";

export default {
  name: "TextDollars",
  components: {
    TextNumeric,
  },
  props: {
    value: [String, Number],
    symbol: {
      type: [String, Boolean],
      default: "$",
    },
  },
  setup(props) {},
  methods: {},
  computed: {},
};
</script>

<style scoped>
</style>
