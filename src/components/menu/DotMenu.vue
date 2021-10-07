<template>
  <div class="btn-group">
    <slot name="before"></slot>
    <button
      type="button"
      class="btn btn-light px-2"
      data-toggle="dropdown"
      data-boundary="viewport"
      aria-haspopup="true"
      aria-expanded="false"
    >
      <i class="bi bi-three-dots font-size-130"></i>
    </button>
    <div class="dropdown-menu dropdown-menu-right">
      <slot name="items"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "DotMenu",
  props: {},
  components: {},
  setup(props) {
    return {};
  },
  computed: {},
  mounted() {},
};
</script>

<style scoped>
</style>
