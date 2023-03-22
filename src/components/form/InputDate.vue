<template>
  <input
    ref="field"
    :value="modelValue"
    type="text"
    class="form-control"
    @change="$emit('update:modelValue', $event.target.value)"
  >
</template>
  
<script setup>
import flatpickr from 'flatpickr';
import { ref, onMounted, onUpdated, onUnmounted } from 'vue';
  
const DATE_FORMAT = 'yyyy-MM-dd';
  
const props = defineProps({
    modelValue: [String, Object],
    options: {
        type: Object,
        default: {},
    },
});
  
const emit = defineEmits(['update:modelValue']);
  
const field = ref(null);
let FP = null;
  
onMounted(() => {
    FP = flatpickr(field.value, {
        allowInput: true,
        ...props.options,
    });
});
  
onUpdated(() => {
    FP.setDate(props.modelValue, true);
});
  
onUnmounted(() => {
    if (FP) {
        FP.destroy();
    }
});
  
function focus() {
    field.value?.focus();
}
</script>
  
  <style scoped>
  </style>
  