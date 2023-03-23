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
import 'flatpickr/dist/flatpickr.min.css';
import { ref, onMounted, onUnmounted, onUpdated } from 'vue';
  
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
        allowInput: true,
        enableTime: true,
        noCalendar: true,
        dateFormat: 'H:i',
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
</script>
  