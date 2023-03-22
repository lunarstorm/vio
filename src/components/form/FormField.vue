<template>
  <div>
    <slot />
    <FormError v-model="localError" />
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import FormError from 'vio/components/form/FormError.vue';

const props = defineProps({
    error: [Array, String, Number],
});

const localError = ref(props.error);

watchEffect(() => {
    localError.value = props.error;
});
</script>
