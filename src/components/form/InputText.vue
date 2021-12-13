<template>
  <label v-if="label">{{ label }}</label>
  <input
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    type="text"
    class="form-control"
    ref="field"
    v-bind="$attrs"
  />
  <form-error v-model="error"></form-error>
</template>

<script>
import FormError from "vio/components/form/FormError";

export default {
  name: "InputText",
  inheritAttrs: false,
  components: {
    FormError,
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
  methods: {},
  mounted() {},
  unmounted() {},
};
</script>

<style scoped>
</style>
