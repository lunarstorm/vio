<template>
  <textarea
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    v-autosize
    class="form-control"
    ref="field"
  ></textarea>
</template>

<script>
import autosize from "vio/directives/autosize";

export default {
  name: "InputTextarea",
  inheritAttrs: true,
  directives: { autosize },
  components: {},
  props: {
    modelValue: [String, Number],
  },
  emits: ["update:modelValue"],
  setup(props) {
    return {};
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
