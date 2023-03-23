<template>
  <span ref="el" :title="dateFormatted">{{ dateFormatted }}</span>
</template>
  
<script setup>
import { computed } from 'vue';
import Date from 'vio/helpers/Date';
  
const props = defineProps({
    date: [String, Number],
});
  
const dt = Date.parse(props.date);
  
const dateFormatted = computed(() => {
    return dt.toISODate();
});
</script>
  