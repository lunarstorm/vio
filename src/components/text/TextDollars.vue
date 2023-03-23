<template>
  <TextNumeric :value="value" format="0,0.00">
    <template v-if="symbol">
      {{ symbol }}
    </template>
  </TextNumeric>
</template>

<script setup>
import TextNumeric from 'vio/components/text/TextNumeric.vue';

const props = defineProps({
    value: [String, Number],
    symbol: {
        type: [String, Boolean],
        default: '$',
    },
});
</script>
