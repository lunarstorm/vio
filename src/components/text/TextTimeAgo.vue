<template>
  <span ref="el" :title="title">{{ dateFormatted }}</span>
</template>
  
<script setup>
import { DateTime } from 'luxon';
import { computed } from 'vue';
import Date from 'vio/helpers/Date';
  
const props = defineProps({
    value: [String, Number],
});
  
const dt = Date.parse(props.value);
  
const dateFormatted = computed(() => dt.toRelative());
  
const title = computed(() => dt.toLocaleString(DateTime.DATETIME_FULL));
</script>
  