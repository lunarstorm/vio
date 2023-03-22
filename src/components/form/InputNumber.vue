<template>
  <input
    ref="field"
    :value="valueFormatted"
    type="text"
    class="form-control text-right"
    v-bind="$attrs"
    @input.prevent="handleInput"
  >
</template>
  
<script setup>
import numeral from 'numeral';
import { ref, computed } from 'vue';
  
const props = defineProps({
    modelValue: [String, Number],
    format: String,
});
  
const emit = defineEmits(['update:modelValue']);
  
const field = ref(null);
  
const valueFormatted = computed(() => {
    return numeral(props.modelValue).format(props.format);
});
  
function handleInput(event) {
    emit('update:modelValue', normalize(event.target.value));
}
  
function normalize(raw) {
    // Strip any non digits
    let str = String(raw).replace(/\D/g, '');
  
    // Normalize
    str = Math.round(parseFloat(str) * 100) / 100 / 100;
  
    // Format
    let formatted = numeral(str).format('0.00');
  
    return isNaN(formatted) ? 0 : formatted;
}
</script>