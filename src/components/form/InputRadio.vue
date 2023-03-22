<template>
  <label v-if="inline" class="radio-inline">
    <input
      v-model="localModelValue"
      :value="value"
      :name="name"
      type="radio"
      class="mr-1"
      @input="onInput"
    >
    <slot />
  </label>
  <div v-else class="radio">
    <label>
      <input
        v-model="localModelValue"
        :value="value"
        :name="name"
        type="radio"
        class="mr-1"
        @input="onInput"
      >
      <slot />
    </label>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue';

const props = defineProps({
    name: String,
    modelValue: [String, Number, Boolean],
    value: [String, Number, Boolean],
    inline: Boolean,
});

const emit = defineEmits(['update:modelValue']);

const localModelValue = ref(props.modelValue);

watchEffect(() => {
    localModelValue.value = props.modelValue;
});

function onInput(event) {
    emit('update:modelValue', event.target.value);
}
</script>
