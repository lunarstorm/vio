<template>
  <label v-if="label">{{ label }}</label>
  <input
    ref="field"
    :value="modelValue"
    type="text"
    class="form-control"
    v-bind="$attrs"
    @input="onInput"
  >
  <FormError v-model="errorModel" />
</template>
  
<script setup>
import { ref, watchEffect } from 'vue';
import FormError from 'vio/components/form/FormError.vue';
  
const props = defineProps({
    modelValue: [String, Number],
    label: [String],
    error: [Array, String],
});
  
const emit = defineEmits(['update:modelValue']);
  
const field = ref(null);
const errorModel = ref(props.error);
  
watchEffect(() => {
    errorModel.value = props.error;
});
  
function onInput(event) {
    emit('update:modelValue', event.target.value);
}
  
function focus() {
    field.value?.focus();
}

defineExpose({
    focus,
});
</script>
  