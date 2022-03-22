<template>
  <input-group>
    <input
      :value="decimalToPercent(modelValue)"
      @input="$emit('update:modelValue', percentToDecimal($event.target.value))"
      type="text"
      class="form-control"
      ref="field"
      v-bind="$attrs"
    />
    <template #after> % </template>
  </input-group>
</template>

<script>
import InputGroup from "vio/components/form/InputGroup";
export default {
  name: "InputPercent",
  inheritAttrs: false,
  components: {
    InputGroup,
  },
  props: {
    modelValue: [String, Number],
    label: [String],
    error: [Array, String],
  },
  emits: ["update:modelValue"],
  setup(props) {
    return {
      options: props.options,
    };
  },
  computed: {
    ref() {
      return this.$refs.field;
    },
  },
  methods: {
    decimalToPercent(value) {
      if (!value) {
        return null;
      }

      return value * 100;
    },
    percentToDecimal(value) {
      return value / 100;
    },
  },
  mounted() {},
  unmounted() {},
};
</script>

<style scoped>
</style>
