<template>
  <FormField :error="error" class="form-group">
    <slot />
  </FormField>
</template>
  
<script setup>
import { inject } from 'vue';
import FormField from 'vio/components/form/FormField.vue';
  
const props = defineProps({
    error: [Array, String, Number],
});
  
const form = inject('form', null);
</script>
  