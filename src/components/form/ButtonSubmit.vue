<template>
  <button
    type="submit"
    class="btn btn-primary"
    :disabled="busy"
  >
    <span
      v-if="busy"
      class="spinner-border spinner-border-sm mr-1"
      role="status"
      aria-hidden="true"
    />
    <slot>Submit</slot>
  </button>
</template>

<script setup>
defineProps({
    busy: {
        type: Boolean,
        default: false,
    },
});
</script>