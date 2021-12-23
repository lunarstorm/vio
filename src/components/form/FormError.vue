<template>
  <div v-if="errorText" class="form-text text-danger">
    {{ errorText }}
  </div>
</template>

<script>
import _ from "lodash";
import { toRefs } from "vue";

export default {
  name: "FormError",
  inheritAttrs: true,
  components: {},
  props: {
    modelValue: [Array, String, Number],
  },
  setup(props) {
    const pRefs = toRefs(props);
    return {
      error: pRefs.modelValue,
    };
  },
  computed: {
    errorText() {
      if (_.isArray(this.error)) {
        return this.error.join(", ");
      }

      return this.error;
    },
  },
  methods: {},
  mounted() {},
  unmounted() {},
};
</script>

<style scoped>
</style>