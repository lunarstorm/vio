<template>
  <span ref="el" :title="dateFormatted">{{ dateFormatted }}</span>
</template>
  
<script setup>
import { DateTime } from 'luxon';
import { computed } from 'vue';
import Date from 'vio/helpers/Date';
  
const props = defineProps({
    date: [String, Number],
    format: {
        type: [String, Object],
        default: DateTime.DATETIME_FULL,
    },
});
  
const dt = Date.parse(props.date);
  
const dateFormatted = computed(() => {
    return dt.toLocaleString(props.format);
});
</script>
  