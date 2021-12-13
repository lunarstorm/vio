<template>
  <label v-if="label">{{ label }}</label>
  <input
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    ref="field"
    type="text"
    class="form-control"
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
  directives: {
    focus: {
      mounted(el, binding) {
        if (binding.value) {
          el.focus();
        }
      },
      updated(el, binding) {
        if (binding.value) {
          el.focus();
        }
      },
    },
  },
  props: {
    modelValue: [String, Number],
    label: [String],
    error: [Array, String],
    focus: Boolean,
  },
  emits: ["update:modelValue"],
  setup(props) {
    return {
      options: props.options,
    };
  },
  computed: {},
  methods: {
    /* focus() {
      this.$refs.field.focus();
    }, */
  },
  mounted() {
    this.$nextTick(() => {
      if (this.focus) {
        this.$refs.field.focus();
      }
    });
  },
  unmounted() {},
};
</script>

<style scoped>
</style>
