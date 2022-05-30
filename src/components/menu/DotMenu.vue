<template>
  <div class="btn-group">
    <slot name="before" />
    <template v-if="!!$slots.items">
      <button
        type="button"
        class="btn btn-light px-2"
        data-toggle="dropdown"
        data-boundary="viewport"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <i class="bi bi-three-dots font-size-130" />
      </button>
      <div class="dropdown-menu dropdown-menu-right">
        <slot name="items" />
      </div>
    </template>
  </div>
</template>

<script>
export default {
    name: 'DotMenu',
    components: {},
    props: {},
    setup(props) {
        return {};
    },
    computed: {},
    mounted() { },
};
</script>

<style scoped>
</style>
