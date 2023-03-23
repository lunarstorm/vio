<template>
  <div>
    <slot name="head" />
    <slot />
  </div>
</template>

<script setup>
import { provide } from 'vue';
import Form from 'vio/helpers/Form';

const props = defineProps({
    form: [Form],
});

provide('form', props.form);
</script>
