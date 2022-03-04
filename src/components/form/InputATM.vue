<template>
  <input
    :value="modelValue"
    @input.prevent="handleInput"
    type="text"
    class="form-control text-right"
    ref="field"
    v-bind="$attrs"
  />
</template>

<script>
export default {
  name: "InputATM",
  components: {},
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
    handleInput(event) {
      this.$emit("update:modelValue", this.normalize(event.target.value));
    },
    normalize(number) {
      number = number.replace(/\D/g, "");
      let formatted = Math.round(parseFloat(number) * 100) / 100 / 100;
      return isNaN(formatted) ? 0 : formatted;
    },
  },
  mounted() {},
  unmounted() {},
};
</script>

<style scoped>
</style>
