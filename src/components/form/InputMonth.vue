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
import monthSelectPlugin from 'flatpickr/dist/plugins/monthSelect';
import { ref, onMounted, onUpdated, onUnmounted } from 'vue';
  
const props = defineProps({
    modelValue: [String, Object],
    options: {
        type: Object,
        default: () => {},
    },
});
  
const emit = defineEmits(['update:modelValue']);
  
const field = ref(null);
let FP = null;
  
onMounted(() => {
    FP = flatpickr(field.value, {
        ...props.options,
        allowInput: true,
        plugins: [new monthSelectPlugin({ dateFormat: 'Y-m' })],
    });
});
  
onUpdated(() => {
    if (FP) {
        FP.setDate(props.modelValue, true);
    }
});
  
onUnmounted(() => {
    if (FP) {
        FP.destroy();
    }
});
</script>
  