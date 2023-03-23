<template>
  <div v-if="errorText" class="form-text text-danger">
    {{ errorText }}
  </div>
</template>
  
<script setup>
import _ from 'lodash';
import { computed } from 'vue';
  
const props = defineProps({
    modelValue: [Array, String, Number],
});

const errorText = computed(() => {
    if (_.isArray(props.modelValue)) {
        return props.modelValue.join(', ');
    }
  
    return props.modelValue;
});
</script>
  