<template>
  <span>{{ dateFormatted }}</span>
</template>
  
<script setup>
import { DateTime } from 'luxon';
import { computed, defineProps } from 'vue';
import Date from 'vio/helpers/Date';
  
const props = defineProps({
    date: String,
    from: {
        type: String,
        default: null,
    },
    format: {
        type: String,
        default: 'yyyy-MM-dd',
    },
});
  
const dateObject = computed(() => Date.parse(props.date));
const dateFormatted = computed(() => {
    let dt = dateObject.value;
  
    try {
        let formatted = dt.toFormat(props.format);
        return formatted;
    } catch (e) {}
  
    return '';
});
</script>
  