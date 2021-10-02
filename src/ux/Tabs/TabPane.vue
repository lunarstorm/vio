<template>
  <div class="tab-pane" role="tabpanel">
    <slot>Tab Content</slot>
  </div>
</template>

<script>

export default {
  name: "TabPane",
  components: {},
  emits: [],
  props: {},
  setup(props) {
    return {};
  },
  mounted() {
  },
  computed: {},
  methods: {
    clear() {},
  },
};
</script>

<style scoped>
</style>
