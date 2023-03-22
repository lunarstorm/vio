<template>
  <label v-if="inline" class="checkbox-inline mr-4">
    <input
      v-model="model"
      :value="value"
      :name="name"
      type="checkbox"
      class="mr-1"
      v-bind="$attrs"
    >
    <slot />
  </label>
  <div v-else class="checkbox">
    <label>
      <input
        v-model="model"
        :value="value"
        :name="name"
        type="checkbox"
        class="mr-1"
        v-bind="$attrs"
      >
      <slot />
    </label>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    name: String,
    modelValue: [String, Number, Boolean, Array],
    value: {
        type: [String, Number, Boolean],
        default: true,
    },
    inline: Boolean,
});

const emit = defineEmits(['update:modelValue']);

const model = computed({
    get() {
        return props.modelValue;
    },
    set(value) {
        emit('update:modelValue', value);
    },
});
</script>

