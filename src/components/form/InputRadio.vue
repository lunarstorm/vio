<template>
  <label v-if="inline" class="radio-inline">
    <input
      v-model="modelValue"
      :value="value"
      @input="$emit('update:modelValue', $event.target.value)"
      :name="name"
      type="radio"
      class="mr-1"
    />
    <slot></slot>
  </label>
  <div v-else class="radio">
    <label>
      <input
        v-model="modelValue"
        :value="value"
        @input="$emit('update:modelValue', $event.target.value)"
        :name="name"
        type="radio"
        class="mr-1"
      />
      <slot></slot>
    </label>
  </div>
</template>

<script>
import { toRefs } from "vue";

export default {
  name: "InputRadio",
  inheritAttrs: true,
  components: {},
  props: {
    name: String,
    modelValue: [String, Number, Boolean],
    value: [String, Number, Boolean],
    inline: Boolean,
  },
  emits: ["update:modelValue"],
  setup(props) {
    let propRefs = toRefs(props);

    return {
      value: propRefs.value,
      inline: propRefs.inline,
    };
  },
  computed: {},
  methods: {},
  mounted() {},
  unmounted() {},
};
</script>

<style scoped>
</style>
