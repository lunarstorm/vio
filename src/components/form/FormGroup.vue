<template>
  <form-field :error="error" class="form-group">
    <slot></slot>
  </form-field>
</template>

<script>
import FormField from "vio/components/form/FormField";

export default {
  name: "FormGroup",
  inheritAttrs: true,
  components: {
    FormField,
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
