<template>
  <div>
    <slot name="head"></slot>
    <slot></slot>
  </div>
</template>

<script>
import { provide } from "vue";
import Form from "vio/helpers/Form";

export default {
  name: "FormWrapper",
  inheritAttrs: true,
  components: {},
  props: {
    form: [Form],
  },
  setup(props) {
    provide("form", props.form);

    return {};
  },
  computed: {},
  methods: {},
  mounted() {},
  unmounted() {},
};
</script>

<style scoped>
</style>
