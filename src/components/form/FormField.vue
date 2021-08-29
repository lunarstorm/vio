<template>
  <div>
    <slot></slot>
    <form-error v-model="error"></form-error>
  </div>
</template>

<script>
import FormError from "vio/components/form/FormError";

export default {
  name: "FormField",
  inheritAttrs: true,
  components: {
    FormError,
  },
  props: {
    error: [Array, String, Number],
  },
  setup(props) {
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
