<template>
  <form-field :error="error" class="form-group">
    <slot></slot>
  </form-field>
</template>

<script>
import { inject } from "vue";
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
    const form = inject("form", null);

    return {
      form,
    };
  },
  computed: {},
  methods: {},
  mounted() {},
  unmounted() {},
};
</script>

<style scoped>
</style>
