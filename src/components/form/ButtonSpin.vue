<template>
  <button
    type="button"
    :disabled="busy"
  >
    <span
      v-if="busy"
      class="spinner-border spinner-border-sm mr-1"
      role="status"
      aria-hidden="true"
    />
    <slot />
  </button>
</template>

<script>
export default {
    name: 'ButtonSpin',
    inheritAttrs: true,
    props: {
        busy: Boolean,
    },
};
</script>

<style scoped>

</style>
