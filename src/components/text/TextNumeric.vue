<template>
  <span><slot /><span v-if="isNumeric(value)">{{ valueFormatted }}</span></span>
</template>
  
<script setup>
import numeral from 'numeral';
import { computed } from 'vue';
  
const props = defineProps({
    value: [String, Number],
    format: {
        type: String,
        default: '0,0',
    },
    precision: Number,
});
  
const numeralInstance = computed(() => numeral(props.value));
const valueFormatted = computed(() => numeralInstance.value.format(props.format));
  
function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}
</script>
  