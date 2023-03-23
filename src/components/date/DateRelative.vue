<template>
  <span ref="el" :key="dateFormatted" :title="title">{{ relString }}</span>
</template>
  
<script setup>
import { DateTime } from 'luxon';
import { ref, watchEffect, computed, onMounted } from 'vue';
import Date from 'vio/helpers/Date';
  
const props = defineProps({
    date: [String, Number],
});
  
const dt = Date.parse(props.date);
const relString = ref(null);
  
const delay = computed(() => 1000);
  
const liveDate = computed(() => {
    return Date.parse(props.date);
});
  
const dateFormatted = computed(() => {
    relString.value = liveDate.value.toRelative();
    return relString.value;
});
  
const title = computed(() => {
    return dt.toLocaleString(DateTime.DATETIME_FULL);
});
  
function refresh() {
    relString.value = liveDate.value.toRelative();
}
  
onMounted(() => {
    refresh();
});
</script>
  