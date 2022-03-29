<template>
  <input
    :value="modelValue"
    @change="$emit('update:modelValue', $event.target.value)"
    ref="field"
    type="text"
    class="form-control"
  />
</template>

<script>
import flatpickr from "flatpickr";
import { toRefs } from "vue";

const DATE_FORMAT = "yyyy-MM-dd";

export default {
  name: "InputDate",
  components: {},
  props: {
    modelValue: [String, Object],
    options: {
      type: Object,
      default: {},
    },
  },
  emits: ["update:modelValue"],
  setup(props) {
    let propRefs = toRefs(props);
    let FP = null;

    return {
      options: propRefs.options,
      FP,
    };
  },
  computed: {},
  methods: {},
  created() { },
  mounted() {
    let $field = this.$refs.field;

    this.FP = flatpickr($field, {
      allowInput: true,
      ...this.options,
    });
  },
  updated() {
    this.FP.setDate(this.modelValue, true);
  },
  unmounted() {
    if (this.FP) {
      this.FP.destroy();
    }
  },
};
</script>

<style scoped>
</style>
